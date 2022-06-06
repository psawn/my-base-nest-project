import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { customDecorators } from 'src/common/custom-decorators/custom-response.decorator';
import { MailService } from './mail.service';

@ApiTags('Email')
@Controller('emails')
export class EmailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Send mail with Sendgrid successfully.',
  })
  @customDecorators()
  async test() {
    const result = await this.mailService.sendMailWithSendGrid();
    return {
      data: result,
    };
  }
}
