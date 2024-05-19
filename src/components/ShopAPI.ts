import { ICard, IOrderInfo, IOrderResult } from "../types";
import { Api } from "./base/api";
import { ApiListResponse } from "../types/index";

export interface IShopAPI {
  getProductList: () => Promise<ICard[]>;
  getProductItem: (id: string) => Promise<ICard>;
  orderProducts: (order: IOrderInfo) => Promise<IOrderResult>;
}

export class ShopAPI extends Api implements IShopAPI {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit){
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProductList(): Promise<ICard[]>{
    return this.get('/product')
    .then((data: ApiListResponse<ICard>) =>
        data.items.map((item) => ({
          ...item,
          image: this.cdn + item.image
        }))
  );
  }
  getProductItem(id: string): Promise<ICard>{
    return this.get(`/product/${id}`).then((item: ICard) => item)
  };

  orderProducts(order: IOrderInfo): Promise<IOrderResult>{
    return this.post('/order', order).then(
      (data: IOrderResult) => data
    )
  };
}