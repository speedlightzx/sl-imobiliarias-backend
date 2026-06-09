import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { AuthGuard } from '@/auth/auth.guard';
import type { AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { createListDTO } from './dto/createList.dto';
import { updateListDTO } from './dto/updateList.dto';

@Controller('lists')
export class ListsController {

    constructor(
        private readonly listsService:ListsService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async getAllLists(
        @Req() req: AuthenticatedRequest
    ) {
        const userId = req.userId
        
        return this.listsService.getAllLists(userId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    async createList(
        @Req() req: AuthenticatedRequest,
        @Body() body: createListDTO
    ) {
        const userId = req.userId

        return this.listsService.createList(userId, body)
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    async updateList(
        @Req() req: AuthenticatedRequest,
        @Body() body: updateListDTO,
        @Param('id', ParseIntPipe) listId: number
    ) {
        const userId = req.userId

        return this.listsService.updateList(userId, body, listId)
    }
}
