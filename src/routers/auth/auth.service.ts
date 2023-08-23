import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';

import HttpException from '../../exceptions/http.exception';
import { DataStoredInToken, TokenData } from '../../types/auth';
import { store } from '../../firebase/firebase.app';

const createToken = (userID: string): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: userID };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, "SECRET_KEY", { expiresIn }) };
}

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
}

type RegisterInput = {
  username: string, password: string, email: string
}

@Service()
export class AuthService {
  public async register({ username, password, email }: RegisterInput) {
    const hashedPassword = await hash(password, 10);
    const snapshot = await store.collection("users").where("email", "==", email).get()

    if (snapshot.empty) {
      console.log('No matching, can register')
      const newUser = await store.collection("users").add({ username, password: hashedPassword, email })
      console.log(newUser.id)
      const token = createToken(newUser.id)
      const cookie = createCookie(token)

      return { cookie, newUser }
    } else {
      console.log('Can not register')
      throw new HttpException(409, `This email ${email} already exists`)
    }
  }
}
