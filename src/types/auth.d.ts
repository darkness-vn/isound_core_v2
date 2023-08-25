import type { Request } from "express"
import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"

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
    user?: DecodedIdToken;
  }