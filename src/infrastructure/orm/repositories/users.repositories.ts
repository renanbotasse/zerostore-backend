import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../../../user/entities/user.entity';
import { UserCartEntity } from '../../../user/entities/user.cart-item.entity';

@EntityRepository(UserEntity)
export class UsersPostgresRepository extends Repository<UserEntity> {
  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.save(user);
  }

  async updateUser(
    userId: number,
    user: Partial<UserEntity>,
  ): Promise<UserEntity | undefined> {
  
    const updateResult = await this.createQueryBuilder('user')
      .update(UserEntity)
      .set(user)
      .where('user.userId = :userId', { userId })
      .returning(['*']) 
      .execute();

    if (updateResult.affected === 0) {
      return undefined; 
    }

    return updateResult.raw[0] as UserEntity;
  }

  async deleteUser(userId: number): Promise<void> {
    await this.delete(userId);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.find();
  }

  async finduserId(userId: number): Promise<number | null> {
    const user = await this.createQueryBuilder('user')
      .select('user.userId', 'userId')
      .where('user.userId = :userId', { userId })
      .getRawOne();

    return user ? user.userId : null;
  }

  async searchUsers(keyword: string): Promise<UserEntity[]> {
    return await this.find({ where: { name: keyword } });
  }

  async getUserOrders(userId: number): Promise<string[]> {
    const user = await this.createQueryBuilder('user')
      .select('user.ordersId', 'ordersId')
      .where('user.id = :userId', { userId })
      .getRawOne();

    return user ? user.ordersId : [];
  }

  async getUserCart(userId: number): Promise<UserCartEntity[]> {
    const user = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.cart', 'cart')
      .where('user.id = :userId', { userId })
      .getOne();

    return user ? user.cart : [];
  }

  async createUserCart(
    userId: number,
    cartItem: UserCartEntity,
  ): Promise<UserEntity | undefined> {
    const updateResult = await this.createQueryBuilder('user')
      .update(UserEntity)
      .set({
        cart: () => `array_append(cart, '${JSON.stringify(cartItem)}')`,
      })
      .where('user.userId = :userId', { userId })
      .returning(['*']) 
      .execute();

    if (updateResult.affected === 0) {
      return undefined;
    }

    return updateResult.raw[0] as UserEntity;
  }

  async updateUserCart(
    userId: number,
    cartItemId: number,
    partialCartItem: Partial<UserCartEntity>,
  ): Promise<UserEntity | undefined> {
    const updateResult = await this.createQueryBuilder('user')
      .update(UserEntity)
      .set({
        cart: () =>
          `jsonb_set(cart, '{${cartItemId}}', '${JSON.stringify(partialCartItem)}', true)`,
      })
      .where('user.userId = :userId', { userId })
      .returning(['*'])
      .execute();

    if (updateResult.affected === 0) {
      return undefined; 
    }

    return updateResult.raw[0] as UserEntity;
  }

  async removeUserCart(
    userId: number,
    cartItemId: number,
  ): Promise<UserEntity | undefined> {
    const updateResult = await this.createQueryBuilder('user')
      .update(UserEntity)
      .set({
        cart: () => `cart - ${cartItemId}`,
      })
      .where('user.userId = :userId')
      .returning(['*']) 
      .execute();

    if (updateResult.affected === 0) {
      return undefined;
    }

    return updateResult.raw[0] as UserEntity;
  }
}
