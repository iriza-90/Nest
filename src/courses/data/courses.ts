import {IsNotEmpty , IsEmail, IsOptional, IsString } from 'class-validator' ;

export var courses =[
    [
        {
          "id": 1,
          "name": "Physics 101",
          "teacherId": 1,
          "students": [1]
        },
        {
          "id": 2,
          "name": "Algebra 201",
          "teacherId": 2,
          "students": [1, 2]
        },
        {
          "id": 3,
          "name": "Web",
          "teacherId": 3,
          "students": [2]
        },
        {
          "id": 4,
          "name": "S.E",
          "teacherId":5 ,
          "students": [2]
        },
        {
          "id": 5,
          "name": "Nope",
          "teacherId": 4,
          "students": [2]
        }
      ]
      
]
export class CreateCourseDto {
    @IsNotEmpty()
    readonly name: string;

   
  }

  export class CourseDto {
    id : number ;
    name : string ;
   teacherId  :number ;
    students : string;
  }

  export class UpdatecourseDto {
    @IsOptional()
  @IsString()
  name?: string;
  
  
  @IsOptional()
  @IsString()
  teacherId?: number;

  
  @IsOptional()
  @IsString()
  student?: string;
  
  }
  
 

 

  
