import {IsNotEmpty , IsEmail, IsOptional, IsString } from 'class-validator' ;

export var students =  [
    {
      "id": 1,
      "username": "userOne",
      "email": "userone@example.com",
      "telephone": "+1234567890"
    },
    {
      "id": 2,
      "username": "userTwo",
      "email": "usertwo@example.com",
      "telephone": "+0987654321"
    },
    {
      "id": 3,
      "username": "userThree",
      "email": "userthree@example.com",
      "telephone": "+1122334455"
    },
    {
      "id": 4,
      "username": "userFour",
      "email": "userfour@example.com",
      "telephone": "+2233445566"
    },
    {
      "id": 5,
      "username": "userFive",
      "email": "userfive@example.com",
      "telephone": "+3344556677"
    }
  ]

  export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email : string;

    @IsString()
    readonly telephone : string;
  }

  export class UserDto {
    id : number ;
    username : string ;
    email  :string ;
    telephone : string;
  }

  export class UpdateuserDto {
    @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telephone?: string;
  }

 