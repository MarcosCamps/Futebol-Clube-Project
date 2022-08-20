export interface iLogin {
  email: string,
  password: string,
  username?: string,
  role?: string,
}

export interface IServiceM {
  login(email: string, password: string, next: any): Promise<iLogin>,
}
