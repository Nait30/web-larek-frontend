export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: TCost;
}

export interface ICustomer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: TCost;
  items: string[];
}

export interface ICardData {
  cards: ICard[];
  preview: string | null;
  fill(cards: ICard[]): void;
  updateCard(card: ICard, payload: Function | null): void;
  getCard(cardId: string): ICard;
}

export interface ICustomerData {
  getCustomerInfo():ICustomer;
  setPayment(payment: TCost): void;
  setEmail(email: string): void;
  setPhone(phone: string): void;
  setAddress(address: string): void;
  setTotalCost(total: TCost): void;
  setItems(items: string[]): void;
  checkValidation(data: Record<keyof (TPaymentInfo|TCustomerContactInfo), string>): boolean;
  clear(): void;
}

export type TItems = Set<string>;

export type TPayment = 'online'|'offline';

export type TCost = number | null;

export type TPaymentInfo = Pick<ICustomer, 'payment' | 'address'>;

export type TCustomerContactInfo = Pick<ICustomer, 'email' | 'phone'>