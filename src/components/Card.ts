import { ICard } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export abstract class Card extends Component<ICard> {
	protected element: HTMLElement;
	protected events: IEvents;
	protected cardTitle: HTMLElement;
	protected price: HTMLSpanElement;
	protected CardId: string;

	constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container);
		this.events = events;
		this.element = cloneTemplate(container);

		this.cardTitle = this.element.querySelector('.card__title')
		this.price = this.element.querySelector('.card__price');
	}

	setData(CardData: ICard) {
		this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.price.textContent = String(CardData.price);
	}

	get id() {
		return this.CardId;
	}

	render() {
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

		this.image.addEventListener('click', () =>
			this.events.emit('card:select', {id: this.CardId})
		);
	}

	setData(CardData: ICard) {
		this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.price.textContent = String(CardData.price);
		this.category.textContent = CardData.category;
		this.image.src = CardData.image;

    checkCardCategoryColor((this.category), CardData, this.toggleClass);
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
			this.events.emit('card:delete', {id: this.CardId})
		)
	}

  setData(CardData: ICard): void {
    this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.price.textContent = String(CardData.price);
    this.index.textContent = String(CardData.index);
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

		this.addButton.addEventListener('click', () =>
			this.events.emit('card:add', {id: this.CardId})
		)
	}
	setData(CardData: ICard) {
		this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.price.textContent = String(CardData.price);
		this.category.textContent = CardData.category;
		this.image.src = CardData.image;
    checkCardCategoryColor((this.category), CardData, this.toggleClass);
	}
  
}

function checkCardCategoryColor(element:HTMLSpanElement, card:ICard, func: Function){
  if (card.category === 'софт-скил') {
    func(element, '.card__category_soft');
  } else if (card.category === 'другое') {
    func(element, '.card__category_other');
  }else if (card.category === 'дополнительное') {
    func(element, '.card__category_additional');
  }else if (card.category === 'хард-скил') {
    func(element, '.card__category__hard');
  }
}