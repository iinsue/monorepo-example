import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module.js';
import type { DatabaseInstance } from '@mono/database';
import { posts, desc } from '@mono/database';
import { CreatePostDto } from './dto/create-post.dto.js';

@Injectable()
export class PostsService {
  constructor(@Inject(DRIZZLE) private readonly db: DatabaseInstance) {}

  async create(dto: CreatePostDto) {
    const [result] = await this.db
      .insert(posts)
      .values({
        title: dto.title,
        content: dto.content,
        author: dto.author || 'API 작성자',
      })
      .returning();
    return result;
  }

  async findAll() {
    return this.db.select().from(posts).orderBy(desc(posts.createdAt));
  }
}
