import { ICard, ICardData, TItems } from '../types';
import { IEvents } from './base/events';

export class CardData implements ICardData {
	protected _cards: ICard[];
	protected _preview: string;
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

	addCardBasket(id: string): void {
		let cards = this.getAddedCards();
    let card = cards.find((card) => card.id === id)
		if (!card) {
      let index = cards.indexOf(card);
			cards[index].added = true;
			this.events.emit('basket:changed');
		} else {
			throw new Error('Item already in basket');
		}
	}
	deleteCardBasket(id: string): void {
		let cards = this.getAddedCards();
    let card = cards.find((card) => card.id === id)
		if (!!card) {
      let index = cards.indexOf(card);
			cards[index].added = false;
			this.events.emit('basket:changed');
		} else {
			throw new Error('Item isn`t in basket');
		}
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
		let total = 0;
		items.forEach((item) => {
			total = +item.price;
		});
		return total;
	}

	getCard(cardId: string): ICard {
		return this._cards.find((item) => item.id === cardId);
	}

	get preview() {
		return this._preview;
	}
}
