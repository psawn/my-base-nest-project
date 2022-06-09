import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { customDecorators } from 'src/common/custom-decorators/custom-response.decorator';
import { MailService } from './mail.service';

@ApiTags('Email')
@Controller('emails')
export class EmailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/test/sendgrid')
  @ApiResponse({
    status: 200,
    description: 'Send mail with Sendgrid successfully.',
  })
  @customDecorators()
  async testSendgrid() {
    const result = await this.mailService.testSendMailWithSendGrid();
    return {
      data: result,
    };
  }

  @Get('/test/gmail')
  @ApiResponse({
    status: 200,
    description: 'Send mail with Gmail successfully.',
  })
  @customDecorators()
  async testGmail() {
    const result = await this.mailService.testSendMailWithGmail();
    return {
      data: result,
    };
  }
}
