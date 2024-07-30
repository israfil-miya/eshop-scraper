import { WebsitesProps } from '../types';

const websitesProps: WebsitesProps = new Map([
  [
    'store.steampowered.com',
    {
      site: 'Steam',
      selector: {
        price: ['div.game_purchase_price', 'div.discount_final_price'],
        name: ['div#appHubAppName_responsive'],
      },
    },
  ],
  [
    'amazon.com',
    {
      site: 'Amazon',
      selector: {
        price: ['span[data-a-color="base"] span.a-offscreen'],
        name: ['#title'],
      },
    },
  ],
  [
    'amazon.in',
    {
      site: 'Amazon',
      selector: {
        price: ['span[data-a-color="base"] span.a-offscreen'],
        name: ['#title'],
      },
    },
  ],
  [
    'crutchfield.com',
    {
      site: 'Crutchfield',
      selector: {
        price: ['div.price.js-price'],
        name: ['h1.prod-title'],
      },
    },
  ],
  [
    'store.playstation.com',
    {
      site: 'PlayStation',
      selector: {
        price: ['span.psw-t-title-m'],
        name: ['h1[data-qa="mfe-game-title#name"]'],
      },
    },
  ],
  [
    'gear.playstation.com',
    {
      site: 'PlayStation',
      selector: {
        price: ['div.pw-itemdetail-priceandup span.price'],
        name: ['div.pw-itemdetail-title'],
      },
    },
  ],
  [
    'ebay.com',
    {
      site: 'E-Bay',
      selector: {
        price: ['div.x-price-primary'],
        name: ['div.x-item-title'],
      },
    },
  ],
  [
    'bikroy.com',
    {
      site: 'Bikroy',
      selector: {
        price: ['div.amount--3NTpl'],
        name: ['h1.title--3s1R8'],
      },
    },
  ],
]);

export default websitesProps;
