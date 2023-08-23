import type { Request } from "express"

export interface User {
    username: string,
    _id?: string;
}

export interface DataStoredInToken {
    _id: string;
  }
  
  export interface TokenData {
    token: string;
    expiresIn: number;
  }

export interface RequestWithUser extends Request {
    user: User;
  }