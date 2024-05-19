import { ICard, ICardData, TItems } from '../types';
import { IEvents } from './base/events';

export class CardData implements ICardData {
	protected _cards: ICard[];
<<<<<<< HEAD
=======
	protected _preview: string;
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
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

<<<<<<< HEAD
	changeAddStatus(id: string): void {
    let card = this.cards.find((card) => card.id === id)
    let index = this.cards.indexOf(card);
		this._cards[index].added = !(this._cards[index].added);
		this.events.emit('basket:changed', this.getAddedCards());
	}

=======
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
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163

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
<<<<<<< HEAD
		return items.reduce((acc, val)=> acc + val.price, 0
		)
=======
		let total = 0;
		items.forEach((item) => {
			total = +item.price;
		});
		return total;
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
	}

	getCard(cardId: string): ICard {
		return this._cards.find((item) => item.id === cardId);
	}

<<<<<<< HEAD

	clearBusket(): void{
		this.cards.forEach((card) => {
			card.added = false;
		})
=======
	get preview() {
		return this._preview;
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
	}
}
