import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import type { AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { AuthGuard } from '@/auth/auth.guard';
import { createLeadDTO } from './dto/createLead.dto';
import { updateLeadDTO } from './dto/updateLead.dto';

@Controller('leads')
export class LeadsController {

    constructor(
        private readonly leadsService:LeadsService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async createLead(
        @Body() body: createLeadDTO,
        @Req() req: AuthenticatedRequest
    ) {
        const userId = req.userId
        return await this.leadsService.createLead(body, userId)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateLead(
        @Body() body: updateLeadDTO,
        @Req() req: AuthenticatedRequest,
        @Param('id', ParseIntPipe) leadId: number
    ) {
        const userId = req.userId
        return await this.leadsService.updateLead(body, userId, leadId)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteLead(
        @Req() req: AuthenticatedRequest,
        @Param('id', ParseIntPipe) leadId: number
    ) {
        const userId = req.userId
        return await this.leadsService.deleteLead(userId, leadId)
    }
}
