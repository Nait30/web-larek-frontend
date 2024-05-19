import { ICard } from '../types';
import { cardCategoryConfig } from '../utils/constants';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/Events';

export abstract class Card extends Component<ICard> {
	protected element: HTMLElement;
	protected events: IEvents;
	protected cardTitle: HTMLElement;
	protected price: HTMLSpanElement;
	protected cardId: string;

	constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container);
		this.events = events;
		this.element = cloneTemplate(container);

		this.cardTitle = this.element.querySelector('.card__title')
		this.price = this.element.querySelector('.card__price');
	}

	render(cardData: ICard) {
		this.cardId = cardData.id;
		this.cardTitle.textContent = cardData.title;
		this.price.textContent = String(cardData.price);
		return this.renderElement();
	}

	get id() {
		return this.cardId;
	}

	setCardCategoryColor(element: HTMLSpanElement, config: Record<string, string>){
		Object.values(config).forEach((selector)=>{
			element.classList.remove(selector);
		})
		const key = element.textContent;
		element.classList.add(config[key]);
	}

	renderElement() {
		Object.assign(this)
		return this.element;
	}
}

export class CardCatalog extends Card {
	protected category: HTMLSpanElement;
	protected image: HTMLImageElement;

	constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container, events);
		this.category = this.element.querySelector('.card__category');
		this.image = this.element.querySelector('.card__image');

		this.element.addEventListener('click', () =>
			this.events.emit('card:select', {id: this.cardId})
		);
	}

	render(cardData: ICard) {
		this.cardId = cardData.id;
		this.cardTitle.textContent = cardData.title;
		if (cardData.price == null){
			this.price.textContent = 'Бесценно'
		} else{
			this.price.textContent = `${String(cardData.price)} синапсов`;
		}
		this.category.textContent = cardData.category;
		this.image.src = cardData.image;

    this.setCardCategoryColor((this.category), cardCategoryConfig);
		return this.renderElement();
	}

}

export class CardInBasket extends Card {
  protected index: HTMLSpanElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container, events);

    this.index =  this.element.querySelector('.basket__item-index');
    this.deleteButton = this.element.querySelector('.basket__item-delete');

		this.deleteButton.addEventListener('click', () =>
			this.events.emit('cardInBasket:delete', {id: this.cardId})
		)
	}

  render(CardData: ICard){
    this.cardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.price.textContent = `${String(CardData.price)} синапсов`;
    this.index.textContent = String(CardData.index);

		return this.renderElement();
  }
}

export class CardPreview extends Card {
  protected category: HTMLSpanElement;
  protected description: HTMLElement;
  protected addButton: HTMLButtonElement;
  protected image: HTMLImageElement;

  constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container, events);

    this.category =  this.element.querySelector('.card__category');
		this.image =  this.element.querySelector('.card__image');
    this.description =  this.element.querySelector('.card__text');
    this.addButton =  this.element.querySelector('.basket__item-add');

		this.addButton.addEventListener('click', (evt) =>
			this.events.emit('card:add', {id: this.cardId})
		)
	}
	render(CardData: ICard) {
		this.cardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.category.textContent = CardData.category;
		this.image.src = CardData.image;

    this.setCardCategoryColor((this.category), cardCategoryConfig);
		this.setAddStatus(CardData.added);
		this.setDisabled(this.addButton, !(CardData.price))
		if (CardData.price == null){
			this.price.textContent = 'Бесценно'; 
		} else {this.price.textContent = `${String(CardData.price)} синапсов`;}
		return this.renderElement();
	}


	setAddStatus(status:boolean){
		if (status){
			this.setText(this.addButton, 'Убрать')
		} else {
			this.setText(this.addButton, 'В корзину')
		}
	}

	changeAddStatus (){
		if (this.addButton.textContent == 'В корзину'){
			this.setText(this.addButton, 'Убрать');
		} else {
			this.setText(this.addButton, 'В корзину')
		}
	}
  
}