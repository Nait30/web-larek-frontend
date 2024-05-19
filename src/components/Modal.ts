import { IOrderInfo, TPayment } from "../types";
import { cloneTemplate } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Modal<T> extends Component<T> {
  protected modal: HTMLElement;
  protected events: IEvents;
  protected content: HTMLTemplateElement;
  protected contentContainer: HTMLElement;

  constructor(container: HTMLElement, events: IEvents, content?: HTMLTemplateElement){
    super(container);
    this.events = events;
    this.contentContainer = this.container.querySelector('.modal__content');
    if (content){
    this.content = cloneTemplate(content)};
    const closeBtnElement = this.container.querySelector('.modal__close');
    closeBtnElement.addEventListener("click", (evt)=> {
      evt.preventDefault();
      this.close();
    })
    this.container.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget){
        this.close();
      }
    })
    this.handleEscUp = this.handleEscUp.bind(this);
  }


  open() {
    this.container.classList.add('modal_active');
    this.contentContainer.replaceChildren(this.content);
    document.addEventListener('keyup', this.handleEscUp);
  }

  close(){
    this.container.classList.remove('modal_active');
    document.removeEventListener('keyup', this.handleEscUp);
  }

  handleEscUp (evt: KeyboardEvent) {
    if (evt.key === 'Escape'){
      this.close();
    }
  }
}

interface IModalForm{
  valid: boolean;
  inputValues: Record<string, string>
}

export class ModalWithForm extends Modal<IModalForm>{
  protected submitButton: HTMLButtonElement;
  protected inputs: NodeListOf<HTMLInputElement>;

  constructor(container: HTMLElement, events: IEvents, content: HTMLTemplateElement){
    super(container, events, content);
    this.inputs = this.content.querySelectorAll('.form__input')
    this.submitButton = this.content.querySelector('.button__submit');
    this.content.addEventListener('input', (event: InputEvent) => {
      this.setDisabled(this.submitButton, !(this.checkValidation()));
    })
  }

  protected getInputValues() {
		const valuesObject: Record<string, string> = {};
		this.inputs.forEach((element) => {
			valuesObject[element.name] = element.value;
		});
		return valuesObject;
  }
  protected checkValidation():boolean{
    const values = Object.values(this.getInputValues());
    return values.every(value => {
      return !!(value);
    })
  }

  open() {
    this.setDisabled(this.submitButton, true);
    this.container.classList.add('modal_active');
    this.contentContainer.replaceChildren(this.content);
    document.addEventListener('keyup', this.handleEscUp);
    this.clear();
  }
  protected clear(){
    this.inputs.forEach((input)=> {
      input.value = '';
    })
  }
}

export class ModalWithOrderForm extends ModalWithForm {
  protected paymentButtons: NodeListOf<HTMLButtonElement>;
  protected payment: TPayment;

  constructor(container: HTMLElement, events: IEvents, content: HTMLTemplateElement){
    super(container, events, content);
    this.paymentButtons = this.content.querySelectorAll('.button_alt');
    this.paymentButtons.forEach((button) => {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();
        const target = evt.target as HTMLButtonElement;
        this.setPaymentButtons(target);
        this.setDisabled(this.submitButton, !this.checkValidation());
      })
    })
    this.content.addEventListener('submit', (evt) => {
      evt.preventDefault();
      let orderInfo :Partial<IOrderInfo> = this.getInputValues();
      orderInfo.payment = this.payment;
      this.events.emit('orderStart:submit', orderInfo);
    })
  }

  setPaymentButtons(selectedButton?: HTMLButtonElement) {
    this.paymentButtons.forEach((button)=> {
      button.classList.remove('button_alt-active')
    })
    if (selectedButton) {
      selectedButton.classList.add('button_alt-active');
      this.payment = selectedButton.name as TPayment;
    }
  }
  protected checkValidation():boolean{
    const values = Object.values(this.getInputValues());
    const inputsValidity = values.every(value => {
      return !!(value);
    })
    return !!this.payment && inputsValidity;
  }

  protected clear(){
    super.clear();
    this.paymentButtons.forEach((button)=> {
      button.classList.remove('button_alt-active');
    })
    this.payment = null;
  }
}

export class ModalWithContactsForm extends ModalWithForm {
  constructor (container: HTMLElement, events: IEvents, content: HTMLTemplateElement){
    super(container, events, content);
    this.content.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.events.emit('orderContacts:submit', this.getInputValues());
    })
  }
}

export class ModalWithItem extends Modal<HTMLElement> {
  
  constructor (container: HTMLElement, events: IEvents){
    super(container, events);
  }

  open(card?: HTMLElement) {
    this.container.classList.add('modal_active');
    if(card){
      this.contentContainer.replaceChildren(card);
    }
    document.addEventListener('keyup', this.handleEscUp);
  }
  close(){
    this.container.classList.remove('modal_active');
    document.removeEventListener('keyup', this.handleEscUp);
  }
}

export class ModalWithBusket extends Modal<HTMLElement[]> {
  protected cardList: HTMLElement;
  protected submitButton: HTMLButtonElement;
  protected basketPrice: HTMLSpanElement;
  constructor (container: HTMLElement, events: IEvents, content: HTMLTemplateElement){
    super(container, events, content);
    this.cardList = this.content.querySelector('.basket__list');
    this.basketPrice = this.content.querySelector('.basket__price');
    this.submitButton = this.content.querySelector('.basket__button');
    this.submitButton.addEventListener('click', () =>{
      events.emit('basket:submit');
    });
  }


  open(cards?: HTMLElement[], total?: number) {
    this.cardList.replaceChildren();
    if(cards){
      cards.forEach((card) => {
        this.cardList.append(card);
      })
    }
    this.setDisabled(this.submitButton, !cards.length);
    this.container.classList.add('modal_active');
    this.contentContainer.replaceChildren(this.content);
    this.basketPrice.textContent = String(total);

    document.addEventListener('keyup', this.handleEscUp);
  }
}

export class ModalWithOrderComplete extends Modal <number>{
  protected button: HTMLButtonElement;
  protected orderSuccessDescription: HTMLElement;

  constructor(container: HTMLElement, events: IEvents, content: HTMLTemplateElement){
    super(container, events, content);
    this.orderSuccessDescription = this.content.querySelector('.order-success__description');
    this.button = this.content.querySelector('.order-success__close');
    this.button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.close();
    })
  }
  open(total?:number) {
    this.container.classList.add('modal_active');
    this.contentContainer.replaceChildren(this.content);
    document.addEventListener('keyup', this.handleEscUp);
    this.orderSuccessDescription.textContent = `Списано ${total} синапсов`;
  }
}