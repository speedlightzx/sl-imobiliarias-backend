import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { AuthGuard } from '@/auth/auth.guard';
import type { AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { createListDTO } from './dto/createList.dto';

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
}
