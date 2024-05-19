import { IBasketModel, ICard, TItems } from "../types";
import { IEvents } from "./base/Events";

export class BasketModel implements IBasketModel {
  protected _items: TItems;
  protected events: IEvents;
  protected total: number;

  constructor(events: IEvents){
    this.events = events;
    this._items = [];
  }

  get items(){
    return this._items;
  }

  setTotal(items: ICard[]){
    this.total = 0;
    items.forEach((item) => {
      this.total =+item.price;
    })
  }

  getTotal():number{
    return this.total;
  }

  add(id: string): void {
    if ((this._items.indexOf(id) == -1)){
      this._items.push(id);
      this.events.emit('basket:changed')
    } else {
      throw new Error("Item already in basket")
    }
  }
  delete(id: string): void {
    let index = this._items.indexOf(id);
    if (index !== -1){
      this._items.splice(index, 1)
      this.events.emit('basket:changed')
    } else {
      throw new Error("Item isn`t in basket")
    }
  }

}