import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getUsers(): import("./users.model").User[] {
        throw new Error('Method not implemented.');
    }
}
