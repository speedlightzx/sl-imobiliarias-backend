import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createLeadDTO } from './dto/createLead.dto';
import { updateLeadDTO } from './dto/updateLead.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schemas/schemas'
import { and, eq } from 'drizzle-orm';

@Injectable()
export class LeadsService {

    constructor(
        @Inject('db')
        private readonly db:NodePgDatabase<typeof schema>
    ) {}

    async createLead(dto: createLeadDTO, userId:number) {
        const [listExists] = await this.db
        .select()
        .from(schema.lists)
        .where(
            and(
                eq(schema.lists.id, dto.listId),
                eq(schema.lists.user_id, userId)
            )
        )

        if(!listExists) throw new NotFoundException(`Não foi encontrado nenhuma lista com o ID ${dto.listId}`)

        const [createdLead] = await this.db
        .insert(schema.leads)
        .values({
            name: dto.name,
            status: dto.status,
            list_id: dto.listId
        })
        .returning()

        return createdLead
    }

    async updateLead(dto: updateLeadDTO, userId:number, leadId:number) {
        if(!dto.name && !dto.status && !dto.listId) throw new BadRequestException('Você precisa enviar ao menos um campo para editar.')

        const [leadExists] = await this.db
        .select()
        .from(schema.leads)
        .innerJoin(schema.lists, eq(schema.lists.id, schema.leads.list_id))
        .where(
            and(
                eq(schema.leads.id, leadId),
                eq(schema.lists.user_id, userId),
            )
        )
        .limit(1)

        if(!leadExists) throw new NotFoundException(`Não foi possível encontrar o lead de ID ${leadId}.`)
        
        if(dto.listId) {
            const [listExists] = await this.db
            .select()
            .from(schema.lists)
            .where(
                and(
                    eq(schema.lists.id, dto.listId),
                    eq(schema.lists.user_id, userId),
                )
            )

            if(!listExists) throw new NotFoundException(`Não foi possível encontrar a lista de ID ${dto.listId}.`)
        }

        await this.db
        .update(schema.leads)
        .set({
            name: dto.name,
            status: dto.status,
            list_id: dto.listId
        })
        .where(eq(schema.leads.id, leadId))
    }

    async deleteLead(userId:number, leadId:number) {
        const [leadExists] = await this.db
        .select()
        .from(schema.leads)
        .innerJoin(schema.lists, eq(schema.lists.user_id, userId))
        .where(
            and(
                eq(schema.leads.id, leadId),
                eq(schema.lists.user_id, userId)
            )
        )

        if(!leadExists) throw new NotFoundException(`Não foi encontrado nenhum lead com o ID ${leadId}`)

        await this.db
        .delete(schema.leads)
        .where(eq(schema.leads.id, leadId))
    }
}
