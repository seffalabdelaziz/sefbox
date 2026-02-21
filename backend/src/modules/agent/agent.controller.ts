import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AgentService } from './agent.service';
import { AgentMessageDto } from './dto/agent-message.dto';

@Controller({ path: 'agent', version: '1' })
@UseGuards(JwtAuthGuard)
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('message')
  message(@Body() dto: AgentMessageDto) {
    return this.agentService.processMessage(dto);
  }
}
