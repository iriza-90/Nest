import {IsNotEmpty , IsEmail, IsOptional, IsString } from 'class-validator' ;

export var teachers =  [
    [
        {
          "id": 1,
          "name": "Mr. Smith",
          "subject": "Physics"
        },
        {
          "id": 2,
          "name": "Ms. Johnson",
          "subject": "Mathematics"
        },
        {
          "id": 3,
          "name": "Dr. Brown",
          "subject": "Web"
        },
        {
            "id": 4,
            "name": "Mr. Nobody",
            "subject": "Nope" 
        },
        {
            "id": 5,
          "name": "Damnn",
          "subject": "SE"
        }
      ]
  ]

  export class CreateTeacherDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly subject : string;


  }

  export class TeacherDto {
    id : number ;
    name : string ;
    subject : string;
  }

  export class UpdateTeacherDto {
    @IsOptional()
  @IsString()
  name?: string;


  @IsOptional()
  @IsString()
  subject?: string;
  }

 