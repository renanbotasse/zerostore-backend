export class UserCartDto {
  cart: {
    product_ref: number;
    quantity: number;
    price: number;
  }[];
}
