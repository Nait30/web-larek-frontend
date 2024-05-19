import { Component } from './base/Component';

interface ICardsContainer {
	catalog: HTMLElement[];
}

export class CardsContainer extends Component<ICardsContainer> {
	protected _catalog: HTMLElement;
	protected container: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);
		this.container = container;
	}

	set catalog(items: HTMLElement[]) {
		this.container.replaceChildren(...items);
	}
}
