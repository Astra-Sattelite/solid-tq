export type Product = {
  [k: string]: string
}

export type User = {
  id: string
  username: string
  status: Status
  [k: string]: string
}

export type PaginateBy = 4 | 8 | 12

export type Status = 'write' | 'wait' | 'test' | 'offline'