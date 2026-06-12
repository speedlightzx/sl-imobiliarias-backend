import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '@/database/schemas/schemas'
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq, sql } from 'drizzle-orm';
import { createListDTO } from './dto/createList.dto';
import { leadStatusEnum } from '@/database/schemas/schemas'
import { updateListDTO } from './dto/updateList.dto';

@Injectable()
export class ListsService {

    constructor(
        @Inject('db')
        private readonly db:NodePgDatabase<typeof schema>
    ) {}

    async getAllLists(userId:number) {
        const lists = await this.db
        .select({
            id: schema.lists.id,
            name: schema.lists.name,
            color: schema.lists.color,
            leads: sql<{ name: string, status: typeof leadStatusEnum, id: number }[]>`
            COALESCE(
                json_agg(
                    json_build_object(
                        'name', ${schema.leads.name},
                        'status', ${schema.leads.status},
                        'id', ${schema.leads.id}
                    )
                ) FILTER (WHERE ${schema.leads.id} IS NOT NULL),
            '[]'::json
            ) 

            `
        })
        .from(schema.lists)
        .where(eq(schema.lists.user_id, userId))
        .leftJoin(schema.leads, eq(schema.leads.list_id, schema.lists.id))
        .groupBy(schema.lists.id)

        return { lists }
    }

    async createList(userId:number, dto:createListDTO) {
        const [createdList] = await this.db
        .insert(schema.lists)
        .values({
            name: dto.name,
            color: dto.color,
            user_id: userId
        })
        .returning()

        return createdList
    }

    async updateList(userId:number, dto:updateListDTO, listId:number) {
        if(!dto.name && !dto.color) throw new BadRequestException('Você precisa enviar ao menos um campo para editar.')
        
        const [listExists] = await this.db
        .select()
        .from(schema.lists)
        .where(
            and(
                eq(schema.lists.id, listId),
                eq(schema.lists.user_id, userId)
            )
        )

        if(!listExists) throw new NotFoundException(`Não foi encontrada nenhuma lista com id ${listId}`)

        await this.db
        .update(schema.lists)
        .set({
            name: dto.name,
            color: dto.color
        })
        .where(
            and(
                eq(schema.lists.id, listId),
                eq(schema.lists.user_id, userId)
            )
        )
    }

    async deleteList(userId:number, listId:number) {        
        const [listExists] = await this.db
        .select()
        .from(schema.lists)
        .where(
            and(
                eq(schema.lists.id, listId),
                eq(schema.lists.user_id, userId)
            )
        )

        if(!listExists) throw new NotFoundException(`Não foi encontrada nenhuma lista com id ${listId}`)

        await this.db
        .delete(schema.lists)
        .where(
            and(
                eq(schema.lists.id, listId),
                eq(schema.lists.user_id, userId)
            )
        )
    }
}
