export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: TCost;
	added?: boolean;
	index?: number;
}

export interface IOrderInfo {
	payment?: TPayment;
	email?: string;
	phone?: string;
	address?: string;
	total?: TCost;
	items?: TItems;
}

export interface ICardData {
	cards: ICard[];
	getCard(cardId: string): ICard;
}

export interface IOrderData {
	payment: TPayment;
	email: string;
	phone: string;
	address: string;
	total: TCost;
	items: string[];
	getOrderInfo(): IOrderInfo;
	checkValidation(): boolean;
	setOrderInfo(data: IOrderInfo): void;
	clear(): void;
}

export interface IBasketModel {
	items: TItems;
	add(id: string): void;
	delete(id: string): void;
	setTotal(items: ICard[]): void;
	getTotal(): number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export type TItems = string[];

export type TPayment = 'online' | 'offline';

export type TCost = number | null;

export type TPaymentInfo = Pick<IOrderInfo, 'payment' | 'address'>;

export type TCustomerContactInfo = Pick<IOrderInfo, 'email' | 'phone'>;

export type TItemsCategories =
	| 'софт-скил'
	| 'хард-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка';
