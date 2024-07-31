import { EshopScraper } from './dist/index.js';

let scraper = new EshopScraper({
  timeout: 20,
  retry: 3,
});

// console.log(scraper._currencyMap);

// works fine
let store_steampowered_com =
  'https://store.steampowered.com/app/1243830/Overcooked_All_You_Can_Eat/';
let bikroy_com =
  'https://bikroy.com/en/ad/nokia-3310-nkiyaa-new-for-sale-dhaka';
let amazon_com =
  'https://www.amazon.com/l-f-Reviver-Nourishing-High-shine-Cruelty-free/dp/B0CMJXGCFQ/ref=sr_1_1?_encoding=UTF8&sr=8-1';
let amazon_in =
  'https://www.amazon.in/ArtAge-Shankh-Tortoise-Showpiece-Decorative/dp/B07VX6Y6W4/?_encoding=UTF8&ref_=pd_hp_d_btf_kar_gw_pc_en_';
let crutchfield_com =
  'https://www.crutchfield.com/p_580NR6100/Onkyo-TX-NR6100.html?tp=179';
let store_playstation_com =
  'https://store.playstation.com/en-us/product/UP9000-PPSA03016_00-MSM2DDEUPGRADE00';
let gear_playstation_com =
  'https://gear.playstation.com/Product/1461973-Helldivers_Cup_of_Liber-tea_Mug#frm%3Dpopular_items_1%26p%3D0';
let ebay_com = 'https://www.ebay.com/p/21057814646?iid=365039030351';

(async () => {


  if (res.isError) {
    console.log('error = ', res.errorMsg);
  } else {
    console.log('currencyMap = ', scraper._currencyMap);
  }

  //   let store_steampowered_com_data = await scraper.getData(
  //     store_steampowered_com,
  //   );
  //   let bikroy_com_data = await scraper.getData(bikroy_com);
  //   let amazon_com_data = await scraper.getData(amazon_com);
  //   let amazon_in_data = await scraper.getData(amazon_in);
  //   let crutchfield_com_data = await scraper.getData(crutchfield_com);
  //   let store_playstation_com_data = await scraper.getData(store_playstation_com);
  //   let gear_playstation_com_data = await scraper.getData(gear_playstation_com);
  //   let ebay_com_data = await scraper.getData(ebay_com);

  //   console.log('store_steampowered_com_data = ', store_steampowered_com_data);
  //   console.log('bikroy_com_data = ', bikroy_com_data);
  //   console.log('amazon_com_data = ', amazon_com_data);
  //   console.log('amazon_in_data = ', amazon_in_data);
  //   console.log('crutchfield_com_data = ', crutchfield_com_data);
  //   console.log('store_playstation_com_data = ', store_playstation_com_data);
  //   console.log('gear_playstation_com_data = ', gear_playstation_com_data);
  //   console.log('ebay_com_data = ', ebay_com_data);

  process.exit(0);
})();
