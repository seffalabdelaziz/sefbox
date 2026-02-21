import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ListSkillsDto } from './dto/list-skills.dto';

@Controller({ path: 'skills', version: '1' })
@UseGuards(JwtAuthGuard)
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post('import')
  import(@Body('workspaceId') workspaceId: string) {
    return this.skillService.importSkills(workspaceId);
  }

  @Get()
  list(@Query() query: ListSkillsDto) {
    return this.skillService.listSkills(query);
  }
}
