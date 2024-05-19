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
  if (this.checkValidation()){
    return {
      "payment": this._payment,
      "email": this._email,
      "phone": this._phone,
      "address": this._address,
      "total": this._total,
      "items": this._items
   }
  }
  }

  setOrderInfo(data: IOrderInfo) {
    this.payment = data.payment;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.total = data.total;
    this.items = data.items;
  }

  set payment(payment: TPayment) {
    if(payment){
    this._payment = payment;}
  }
  set email(email: string) {
    if (email){
    this._email = email;}
  }
  set phone(phone: string) {
    if (phone){
    this._phone = phone;}
  }
  set address(address: string) {
    if (address){
    this._address = address;}
  }
  set total(total: number) {
    if (total){
    this._total = total}
  }
  set items(items: TItems) {
    if (items){
    this._items = items;}
  }
  checkValidation(): boolean {
    return !!(this._payment&&this._email&&this._phone&&this._address&&this._total&&this._items);

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