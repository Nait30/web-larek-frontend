import { ICard, ICardData, TItems } from '../types';
import { IEvents } from './base/events';

export class CardData implements ICardData {
	protected _cards: ICard[];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	get cards() {
		return this._cards;
	}

	set cards(cards: ICard[]) {
		this._cards = cards.map((card) => {
			card.added = false;
			return card;
		});
		this.events.emit('cards:uploaded');
	}

	changeAddStatus(id: string): void {
    let card = this.cards.find((card) => card.id === id)
    let index = this.cards.indexOf(card);
		this._cards[index].added = !(this._cards[index].added);
		this.events.emit('basket:changed', this.getAddedCards());
	}


	getAddedCards(): ICard[] {
		let cards = this.cards.filter((card) => {
			return card.added === true;
		});
		return cards.map((card) => {
			card.index = cards.indexOf(card) + 1;
			return card;
		});
	}

	getAddedCardsList(): TItems {
		let cards = this.getAddedCards();
		return cards.map((card) => {
			return card.id;
		});
	}

	getBasketTotal(): number {
		let items = this.getAddedCards();
		return items.reduce((acc, val)=> acc + val.price, 0
		)
	}

	getCard(cardId: string): ICard {
		return this._cards.find((item) => item.id === cardId);
	}


	clearBusket(): void{
		this._cards.forEach((card) => {
			card.added = false;
		})
		this.events.emit('basket:changed', this.getAddedCards());
	}
}
