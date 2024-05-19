import { Component } from "./base/Component";
import { IEvents } from "./base/Events";

export interface IBasket {
  numberItems: number
}

export class Basket extends Component<number> implements IBasket {
  protected basketCounter: HTMLElement;
  protected events: IEvents;

  constructor(container:HTMLElement, events:IEvents){
    super(container);
    this.events = events;

    this.basketCounter = this.container.querySelector('.header__basket-counter');
  }

  set numberItems (number: number){
    this.basketCounter.textContent = String(number);
  }
}