import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';

export const createPasswordHashed = async (
  password: string,
): Promise<string> => {
  const saltOrRounds = 10;

  return bcrypt.hash(password, saltOrRounds);
};

export const validatePassword = async (
  password: string,
  passwordHashed: string,
): Promise<boolean> => {
  return compare(password, passwordHashed);
};
