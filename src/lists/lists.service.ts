import { Inject, Injectable } from '@nestjs/common';
import * as schema from '@/database/schemas/schemas'
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

@Injectable()
export class ListsService {

    constructor(
        @Inject('db')
        private readonly db:NodePgDatabase<typeof schema>
    ) {}

    async getAllLists(userId:number) {
        const lists = await this.db
        .select()
        .from(schema.lists)
        .where(eq(schema.lists.user_id, userId))

        return { lists }
    }
}
