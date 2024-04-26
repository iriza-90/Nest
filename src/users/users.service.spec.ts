import { Injectable } from '@nestjs/common';
import { User } from './users.model'; 

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Iriza' },
    { id: 2, name: 'Joella' },
    { id: 3, name: 'Mee' },
  ];

  getUsers() {
    return this.users;
  }
}