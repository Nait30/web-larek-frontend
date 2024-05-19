import { ICard } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

<<<<<<< HEAD

=======
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
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

<<<<<<< HEAD
	render(CardData: ICard) {
		this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.price.textContent = String(CardData.price);
		return this.renderElement();
=======
	setData(CardData: ICard) {
		this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.price.textContent = String(CardData.price);
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
	}

	get id() {
		return this.CardId;
	}

<<<<<<< HEAD
	renderElement() {
		Object.assign(this)
		return this.element;
=======
	render() {
			 return this.element;
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
	}
}

export class CardCatalog extends Card {
	protected category: HTMLSpanElement;
	protected image: HTMLImageElement;

	constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container, events);
		this.category = this.element.querySelector('.card__category');
		this.image = this.element.querySelector('.card__image');

<<<<<<< HEAD
		this.element.addEventListener('click', () =>
=======
		this.image.addEventListener('click', () =>
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
			this.events.emit('card:select', {id: this.CardId})
		);
	}

<<<<<<< HEAD
	render(CardData: ICard) {
		this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		if (CardData.price == null){
			this.price.textContent = 'null'//можно написать 0, но так смотрится гораздо лучше в этой тематике.
		} else{
			this.price.textContent = String(CardData.price);
		}
		this.category.textContent = CardData.category;
		this.image.src = CardData.image;

    setCardCategoryColor((this.category), CardData, this.toggleClass);
		return this.renderElement();
=======
	setData(CardData: ICard) {
		this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.price.textContent = String(CardData.price);
		this.category.textContent = CardData.category;
		this.image.src = CardData.image;

    checkCardCategoryColor((this.category), CardData, this.toggleClass);
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
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
<<<<<<< HEAD
			this.events.emit('cardInBasket:delete', {id: this.CardId})
		)
	}

  render(CardData: ICard){
=======
			this.events.emit('card:delete', {id: this.CardId})
		)
	}

  setData(CardData: ICard): void {
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
    this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.price.textContent = String(CardData.price);
    this.index.textContent = String(CardData.index);
<<<<<<< HEAD

		return this.renderElement();
=======
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
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

<<<<<<< HEAD
		this.addButton.addEventListener('click', (evt) =>
			this.events.emit('card:add', {id: this.CardId})
		)
	}
	render(CardData: ICard) {
		this.CardId = CardData.id;
		this.cardTitle.textContent = CardData.title;
		this.category.textContent = CardData.category;
		this.image.src = CardData.image;

    setCardCategoryColor((this.category), CardData, this.toggleClass);
		this.setAddStatus(CardData.added);
		this.setDisabled(this.addButton, !(CardData.price))
		if (CardData.price == null){
			this.price.textContent = 'null'; 
		} else {this.price.textContent = String(CardData.price);}

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
=======
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
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
	}
  
}

<<<<<<< HEAD
function setCardCategoryColor(element:HTMLSpanElement, card:ICard, func: Function){
	element.classList.remove('card__category_soft', 'card__category_other', 'card__category_additional', 'card__category_hard', 'card__category_button')
  if (card.category === 'софт-скил') {
    func(element, 'card__category_soft');
  } else if (card.category === 'другое') {
    func(element, 'card__category_other');
  }else if (card.category === 'дополнительное') {
    func(element, 'card__category_additional');
  }else if (card.category === 'хард-скил') {
    func(element, 'card__category_hard');
  } else if (card.category === 'кнопка') {
		func(element, 'card__category_button')
	}
=======
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
>>>>>>> e0117c2b3707fa365c164485bb3066e31ec7a163
}