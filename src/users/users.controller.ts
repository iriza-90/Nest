import { Controller, Get, Post, Body, Param,HttpException, HttpStatus, Put, Delete,NotFoundException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './data/users';
import { User } from './users.model';
import { writeFile, readFile } from 'fs/promises';
import { UserDto } from './data/users';
import { UpdateuserDto } from './data/users';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {  
    // users: { id: number; username: string; email: string; telephone: string; }[];
private readonly jsonFilePath = './src/users/data/users.json';

 @Get('/all')
  async getUsers() {
    try {
        const jsonData = await readFile(this.jsonFilePath, 'utf8');
        const users = JSON.parse(jsonData);
        return users;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw new HttpException('Failed to retrieve users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    

    @Post('/create')
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            const jsonData = await readFile(this.jsonFilePath, 'utf8');
            const existingUsers = JSON.parse(jsonData);
            const newUser : UserDto = {
                id: existingUsers.length + 1,
                username: createUserDto.username,
                email: createUserDto.email,
                telephone: createUserDto.telephone
            };
            existingUsers.push(newUser);
            await writeFile(this.jsonFilePath, JSON.stringify(existingUsers, null, 2), 'utf8');
            return newUser;
        } catch (error) {
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateuserDto) {
        const jsonData = await readFile(this.jsonFilePath, 'utf8');
        let users: UserDto[] = JSON.parse(jsonData);
        const listofUsersToUpdate = users.filter(user => user.id == parseInt(id));
        const listOfDormantUsers = users.filter(user => user.id != parseInt(id));
        if (!listofUsersToUpdate) {
            throw new NotFoundException('User being updated is not found');
        }
        const userToUpdate = listofUsersToUpdate[0];
        userToUpdate.telephone = updateUserDto.telephone
        userToUpdate.email = updateUserDto.email
        userToUpdate.username = updateUserDto.username

        // persist or save the updated user
        // await writeFile(this.jsonFilePath, JSON.stringify(),'utf8');
        
        listOfDormantUsers.push(userToUpdate);
        await writeFile(this.jsonFilePath, JSON.stringify(listOfDormantUsers, null, 2), 'utf8');
        return userToUpdate;
        // const updated={updateUserDto,...updatedUser}

        // return updatedUser;
    }
    @Delete('/delete/:id')
    async deleteUser(@Param('id') id: string) {
      try {
        const jsonData = await readFile(this.jsonFilePath, 'utf8');
        let users: UserDto[] = JSON.parse(jsonData);
        const filteredUsers = users.filter(user => user.id != parseInt(id));

        if (users.length === filteredUsers.length) {
            throw new NotFoundException('User not found');
        }

        const deletedUser = users.filter(user => user.id == parseInt(id))[0];

        await writeFile(this.jsonFilePath, JSON.stringify(filteredUsers, null, 2), 'utf8');
        return { success: true , deletedUser };
    } catch (error) {
        throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


    @Get('/id/:id')
    async getUserById(@Param('id') id: number) {
        try{
         const jsonData = await readFile(this.jsonFilePath, 'utf8');
        const users: UserDto[] = JSON.parse(jsonData);
        const user = users.filter(user => user.id == id);
        console.log(users);
        console.log(user);
        if (!user.length) {
            return { data: null };
        } else {
            return { data: user };
        }
    } catch (error) {
        return { error : 'Failed'};
    }
}

    @Get('/email/:email')
    async getUserByemail(@Param('email') email : string) {
        try{
        const jsonData = await readFile(this.jsonFilePath, 'utf8');
        const users: UserDto[] = JSON.parse(jsonData);
        const user = users.filter(user => user.email === email);
        console.log(users);
        console.log(user);
        if (!user.length) {
            return { data: null };
        } else {
            return { data: user };
        }
    } catch (error) {
        return {error: 'Failed'};
    }
}

    @Get('/phone/:telephone')
    async getUserByPhone(@Param('telephone') telephone : string) {
        try {
        const jsonData = await readFile(this.jsonFilePath,'utf8' );
        const users: UserDto[] = JSON.parse(jsonData);
        const user = users.filter(user => user.telephone === telephone);
        console.log(users);
        console.log(user);
        if (!user.length) {
            return { data: null };
        } else {
            return { data: user };
        }
    } catch (error) {
        return {error: 'Failed'};
        }
}

// one Api takes all telephone , email 
  @Get("/qparms/phone/email")
  async getUsersByPhoneOrEmail(@Query('phone') phone : string , @Query('email') email : string){
    const jsonData = await readFile(this.jsonFilePath,'utf8' );
    const users: UserDto[] = JSON.parse(jsonData);
    let filteredUsers;
    if(email != undefined){
      users
    }else if(phone != undefined){

    }else if(phone != undefined && email != undefined){

    }else{

    }
  }
}



   







