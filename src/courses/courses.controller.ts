import { Controller, Get, Post, Body, Param,HttpException, HttpStatus, Put, Delete,NotFoundException, Query } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { CreateCourseDto } from './data/courses';
import { courses } from './data/courses';
import { CourseDto } from './data/courses';
import { UpdatecourseDto } from './data/courses';

@Controller('courses')
export class CoursesController {  
   
    private readonly jsonFilePath = './src/courses/data/courses.json';
       
    @Get('/all')
    async getCourses() {
        try {
            const jsonData = await readFile(this.jsonFilePath, 'utf8');
            const courses = JSON.parse(jsonData);
            return courses;

                } catch (error) {
                    console.error('Error reading JSON file:', error);
                    throw new HttpException('Failed to retrieve users', HttpStatus.INTERNAL_SERVER_ERROR);
                }

    }

    @Post('/create')
    async create(@Body() createCourseDto: CreateCourseDto) {
        try {
            const jsonData = await readFile(this.jsonFilePath, 'utf8');
            const existingCourses = JSON.parse(jsonData);
            const newCourse : CourseDto = {
                id: existingCourses.length+1,
                name: createCourseDto.name,
                teacherId :existingCourses.teacherId,
                students : existingCourses.students
            };
            existingCourses.push(newCourse);
            await writeFile(this.jsonFilePath, JSON.stringify(existingCourses, null, 2),'utf8');
        
            return newCourse;
        } catch (error) {
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @Post('/update/:id')
    async update(@Param('id') id:string, @Body() updateCourseDto: UpdatecourseDto) {
         const jsonData = await readFile(this.jsonFilePath, 'utf8' );
         let courses: CourseDto[] = JSON.parse(jsonData);
         const listofCoursesToUpdate = courses.filter(courses => courses.id == parseInt(id));
         const listOfDormantCourses = courses.filter(courses => courses.id !=parseInt(id));
         if (listofCoursesToUpdate) {
            throw new NotFoundException('User being updated is not found');

         }

         const courseToUpdate = listofCoursesToUpdate[0];
         courseToUpdate.name=updateCourseDto.name;
         courseToUpdate.teacherId = updateCourseDto.teacherId;
         courseToUpdate.students = updateCourseDto.student;

         listOfDormantCourses.push(courseToUpdate);
         await writeFile(this.jsonFilePath, JSON.stringify(listOfDormantCourses, null, 2),'utf8');
        return courseToUpdate;
    }

    @Delete('/delete/:id')
    async deleteCourse(@Param('id') id: string) {
      try {
        const jsonData = await readFile(this.jsonFilePath, 'utf8');
        let courses: CourseDto[] = JSON.parse(jsonData);
        const filteredCourses = courses.filter(courses => courses.id != parseInt(id));

        if (courses.length === filteredCourses.length) {
            throw new NotFoundException('Course not found');
        }

        const deletedCourse = courses.filter(courses => courses.id == parseInt(id))[0];

        await writeFile(this.jsonFilePath, JSON.stringify(filteredCourses, null, 2), 'utf8');
        return { success: true , deletedCourse };
    } catch (error) {
        throw new HttpException('Failed to delete course', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
