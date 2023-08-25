import { JwtPayload } from "jsonwebtoken"

export interface iAPIToken {
    key: string
    token_expires: ExpiresIn | Date
    uid: string
    limit: number
    token_name: string
    token_content: string
    tags: string[]
  }
  
export interface ExpiresIn {
  _seconds: number
  _nanoseconds: number
}

export interface TokenAPIJwtPayload extends JwtPayload {
  tokenDocId: string
}
  