import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailServer: MailerService) {}

  async sendMail() {
    await this.mailServer.sendMail({
      from: 'bao.doan@savvycomsoftware.com',
      to: 'psawn0972055909@yahoo.com.vn',
      subject: 'Welcome to Nice App! Confirm your Email',
      html: ' <h1>Click the link to verify your email</h1>',
    });
  }
}
