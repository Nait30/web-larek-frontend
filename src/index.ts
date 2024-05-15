import { BasketModel } from './components/BasketModel';
import { CardCatalog } from './components/Card';
import { CardData } from './components/CardsData';
import { OrderData } from './components/OrderData';
import { ShopAPI } from './components/ShopAPI';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cards } from './utils/tempConstants';


const events = new EventEmitter();

const cardsData = new CardData(events);
const orderData = new OrderData(events);
const api = new ShopAPI(CDN_URL, API_URL);

const cardCatalogItem = document.getElementById('card-catalog') as HTMLTemplateElement;
const testSection = document.querySelector('.gallery');

const cardGallery = new CardCatalog(cardCatalogItem, events)

cardGallery.setData(cards[0]);

console.log(cardGallery.render())

testSection.append(cardGallery.render());

api.getProductList()
.then((items) => {
    cardsData.cards = items;
})
.then((dats) => {
    cardGallery.setData(cardsData.cards[2]);
})
.catch((err) => {
    console.error(err);
  }) 