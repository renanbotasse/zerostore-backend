import { UserEntity } from '../entities/user.entity';
import { AddressEntity } from '../entities/user.address.entity';
import { UserCartEntity } from '../entities/user.cart-item.entity';

export interface UserRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
  updateUser(userId: number, user: Partial<UserEntity>): Promise<UserEntity>;
  deleteUser(userId: number): Promise<void>;
  findAllUsers(): Promise<UserEntity[]>;
  findUserById(userId: number): Promise<UserEntity>;
  searchUsers(keyword: string): Promise<UserEntity[]>;
  getUserAddress(userId: number): Promise<AddressEntity>;
  getUserOrders(userId: number): Promise<string[]>;
  getUserCart(userId: number): Promise<UserCartEntity[]>;
  createUserCart(userId: number, cartItem: UserCartEntity): Promise<UserEntity>;
  updateUserCart(
    userId: number,
    cartItemId: number,
    partialCartItem: Partial<UserCartEntity>,
  ): Promise<UserEntity>;
  removeUserCart(userId: number, cartItemId: number): Promise<UserEntity>;
}
