import { CardCatalog, CardInBasket, CardPreview } from './components/Card';
import { CardsContainer } from './components/CardsContainer';
import { CardData } from './components/CardsData';
import { OrderData } from './components/OrderData';
import { ShopAPI } from './components/ShopAPI';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/BasketV';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { ModalWithBusket, ModalWithContactsForm, ModalWithItem, ModalWithOrderComplete, ModalWithOrderForm } from './components/Modal';
import { ICard, IOrderResult, TPayment } from './types';


const events = new EventEmitter();

const cardsData = new CardData(events);
const orderData = new OrderData(events);
const api = new ShopAPI(CDN_URL, API_URL);


const cardCatalogItem = document.getElementById('card-catalog') as HTMLTemplateElement;

const gallery = document.querySelector('.gallery') as HTMLElement;
const cardsContainer = new CardsContainer(gallery);

const cardPreview = new CardPreview(document.getElementById('card-preview') as HTMLTemplateElement, events);

const basketIco = document.querySelector('.header__basket') as HTMLElement;
const basket = new Basket(basketIco, events);

const baseModal = document.getElementById('modal-container');

const modalWithItem = new ModalWithItem(baseModal, events);

const modalWithBasket = new ModalWithBusket(baseModal, events, document.getElementById('basket') as HTMLTemplateElement);

const modalWithOrder = new ModalWithOrderForm(baseModal, events, document.getElementById('order') as HTMLTemplateElement);

const modalWithContacts = new ModalWithContactsForm(baseModal, events, document.getElementById('contacts') as HTMLTemplateElement)

const modalWithOrderComplete = new ModalWithOrderComplete(baseModal, events, document.getElementById('success') as HTMLTemplateElement);



api.getProductList()
.then((items) => {
    cardsData.cards = items;
    events.emit('cards:uploaded')
})
.catch((err) => {
    console.error(err);
  }) 


  events.on('cards:uploaded', () => {
    const cardsArr = cardsData.cards.map((card) => {
        const cardInstant = new CardCatalog(cardCatalogItem, events);
        return cardInstant.render(card);
    });

    cardsContainer.render({catalog: cardsArr});
  })

  events.on('card:select', (cardId: {id: string})=> {
    const card = cardsData.getCard(cardId.id);
    modalWithItem.open(cardPreview.render(card));
  })

  events.on('card:add', (cardId: {id: string}) => {
    cardPreview.changeAddStatus();
    cardsData.changeAddStatus(cardId.id);
  })

  basketIco.addEventListener('click', ()=> {
    events.emit('basket:open');
  })

  events.on('basket:open', () => {
    const cardsArr = cardsData.getAddedCards().map((card)=> {
      const cardInstant = new CardInBasket(document.getElementById('card-basket') as HTMLTemplateElement, events)
      return cardInstant.render(card);
    })
    modalWithBasket.open(cardsArr, cardsData.getBasketTotal());
  })

events.on('basket:submit', () => {
  modalWithOrder.open();
})

events.on('orderStart:submit', (data:{payment:TPayment, address: string})=> {
  modalWithContacts.open();
  orderData.setOrderInfo(data);
})

events.on('orderContacts:submit', (data:{email: string, phone: string}) => {
  orderData.setOrderInfo(data);
  orderData.setOrderInfo({total: cardsData.getBasketTotal(), items: cardsData.getAddedCardsList()})
  api.orderProducts(orderData.getOrderInfo())
  .then((data: IOrderResult) => {
    modalWithOrderComplete.open(data.total);
    orderData.clear();
    cardsData.clearBusket();
  })
})

events.on('basket:changed', (cards: ICard[])=> {
  basket.numberItems = cards.length;
})

events.on('card:delete', (data: {id: string}) => {
  cardsData.changeAddStatus(data.id);
})

events.on('cardInBasket:delete', (data: {id: string}) => {
  events.emit('card:delete', {id: data.id})
  events.emit('basket:open');
})
