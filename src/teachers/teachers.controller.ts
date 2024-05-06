import { Controller, Get, Post, Body, Param,HttpException, HttpStatus, Put, Delete,NotFoundException, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './teachers';
import { writeFile, readFile } from 'fs/promises';
import { TeacherDto } from './teachers';
import { UpdateTeacherDto } from './teachers';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {

    private readonly jsonFilePath = './src/teachers/teachers.json';

    @Get('/all')
    async getTeachers() {
        try {
            const jsonData = await readFile(this.jsonFilePath, 'utf8');
            const teachers = JSON.parse(jsonData);
            return teachers;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw new HttpException('Failed to retrieve teachers', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Post('./create')

    async create(@Body() createTeacherDto: CreateTeacherDto) {
     try {
        const jsonData = await readFile(this.jsonFilePath, 'utf8');
        const existingTeachers = JSON.parse(jsonData);
        const newTeacher : TeacherDto = {

            id: existingTeachers.length + 1,
            name:createTeacherDto.name,
            subject:createTeacherDto.subject
        };

        existingTeachers.push(newTeacher);
        await writeFile(this.jsonFilePath, JSON.stringify(existingTeachers,null,2), 'utf8');
        return newTeacher;

     } catch (error) {
        throw new HttpException('Failed to create teacher', HttpStatus.INTERNAL_SERVER_ERROR);
     }
    }


    @Put('/update/:id')

    async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
        const jsonData = await readFile(this.jsonFilePath, 'utf8');
        let teachers : TeacherDto[] = JSON.parse(jsonData);
        const listOfTeachersToUpdate = teachers.filter(teacher => teacher.id ==parseInt(id));
        const listOfDormantTeachers = teachers.filter(teacher => teacher.id != parseInt(id));

        if(!listOfTeachersToUpdate) {
            throw new NotFoundException('Teacher being updated is not found');
        }

        const teacherToUpdate = listOfTeachersToUpdate[0];
        teacherToUpdate.name = updateTeacherDto.name;
        teacherToUpdate.subject = updateTeacherDto.subject;

        listOfDormantTeachers.push(teacherToUpdate);
        await writeFile(this.jsonFilePath, JSON.stringify(listOfDormantTeachers, null,2), 'utf8');
        return teacherToUpdate;
    }

    @Delete('/delete/:id')
    async deleteTeacher(@Param('id') id:string) {
        try {
            const jsonData = await readFile(this.jsonFilePath, 'utf8');
            let teachers: TeacherDto[] =JSON.parse(jsonData);
            const filteredTeachers = teachers.filter(teacher => teacher.id !=parseInt(id));

            if (teachers.length === filteredTeachers.length) {
                throw new NotFoundException('Teacher not found');
            }

            const deletedTeacher = teachers.filter(teacher => teacher.id == parseInt(id))[0];
            await writeFile(this.jsonFilePath, JSON.stringify(filteredTeachers,null,2), 'utf8');
            return { success:true, deletedTeacher};

        } catch (error) {
            throw new HttpException('Failed to delete user' , HttpStatus.INTERNAL_SERVER_ERROR);
            
        }
    }
}