export class UserCartDto {
  cart: {
    product_reference: number;
    quantity: number;
    price: number;
  }[];
}
