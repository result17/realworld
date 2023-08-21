import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

import { TagsVo } from './vo'

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<TagsVo> {
    const tags = await this.tagService.findAll()
    return {
      tags: tags.map(({ name }) => name)
    }
  }
}
