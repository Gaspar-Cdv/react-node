export interface Session {
  user: UserDto
}

export interface UserDto {
  userId: number,
  username: string,
  email: string
}
