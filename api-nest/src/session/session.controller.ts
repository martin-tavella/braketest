import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  getSession(@Query('year') year: string, @Query('gp') gp: string) {
    if (!year || !gp) {
      throw new BadRequestException('Year and GP are required');
    }
    return this.sessionService.getSession(+year, gp);
  }
}
