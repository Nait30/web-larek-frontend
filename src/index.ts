import { BasketModel } from './components/BasketModel';
import { CardCatalog } from './components/Card';
import { CardsContainer } from './components/CardsContainer';
import { CardData } from './components/CardsData';
import { OrderData } from './components/OrderData';
import { ShopAPI } from './components/ShopAPI';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/BasketV';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cards } from './utils/tempConstants';


const events = new EventEmitter();

const cardsData = new CardData(events);
const orderData = new OrderData(events);
const api = new ShopAPI(CDN_URL, API_URL);

const cardCatalogItem = document.getElementById('card-catalog') as HTMLTemplateElement;
const testSection = document.querySelector('.gallery') as HTMLElement;

const cardsContainer = new CardsContainer(testSection);

const basketIco = document.querySelector('.header__basket') as HTMLElement;

const basket = new Basket(basketIco, events)

basket.numberItems = 4;



events.onAll((event) => {
    console.log(event.eventName, event.data)
})

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