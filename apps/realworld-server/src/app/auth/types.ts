export interface AuthPayload {
  email: string,
  username: string,
  id: number,
}

export interface JwtAuthPayload extends AuthPayload {
  iat: number,
  exp: number
}
