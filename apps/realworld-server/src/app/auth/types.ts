export interface AuthPayload {
  email: string,
  username: string,
}

export interface JwtAuthPayload extends AuthPayload {
  iat: number,
  exp: number
}
