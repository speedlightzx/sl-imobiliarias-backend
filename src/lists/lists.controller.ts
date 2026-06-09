import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { AuthGuard } from '@/auth/auth.guard';
import type { AuthenticatedRequest } from '@/types/AuthenticatedRequest';

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
}
