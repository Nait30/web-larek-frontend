import { IOrderData, IOrderInfo, TCost, TCustomerContactInfo, TItems, TPayment, TPaymentInfo } from "../types";
import { IEvents } from "./base/events";

export class OrderData implements IOrderData {

protected _payment: TPayment|null;
protected _email: string;
protected _phone: string;
protected _address: string;
protected _total: TCost;
protected _items: TItems;
protected events: IEvents;

constructor(events: IEvents){
  this.events = events;
}


  getOrderInfo(): IOrderInfo {
    return {
      "payment": this._payment,
      "email": this._email,
      "phone": this._phone,
      "address": this._address,
      "total": this._total,
      "items": this._items
    }
  }
  set payment(payment: TPayment) {
    this._payment = payment;
  }
  set email(email: string) {
    this._email = email;
  }
  set phone(phone: string) {
    this._phone = phone;
  }
  set address(address: string) {
    this._address = address;
  }
  set total(total: number) {
    this._total = total
  }
  set items(items: TItems) {
    this._items = items;
  }
  checkValidation(): boolean {
    return !!(this.payment&&this._email&&this.phone&&this._address&&this.total&&this.items);
  }
  clear(): void {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
    this.total = 0;
    this.items = [];
  }
  
}