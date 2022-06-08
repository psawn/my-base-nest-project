import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from 'src/shared/services/config.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailServer: MailerService,
    private readonly configService: ConfigService,
  ) {
    SendGrid.setApiKey(configService.sendgrid.sendgridAPIKey);
  }

  async sendMailWithGmail() {
    const mail = {
      from: 'bao.doan@savvycomsoftware.com',
      to: 'psawn0972055909@yahoo.com.vn',
      subject: 'Welcome to Nice App! Confirm your Email',
      html: ' <h1>Click the link to verify your email</h1>',
    };
    const transport = await this.mailServer.sendMail(mail);
    return transport;
  }

  async sendMailWithSendGrid() {
    const mail = {
      to: 'psawn0972055909@yahoo.com.vn',
      subject: 'Greeting Message from NestJS Sendgrid',
      from: 'mrpsawn1996@gmail.com',
      text: 'Hello World from NestJS Sendgrid',
      html: '<h1>Hello World from NestJS Sendgrid</h1>',
    };
    const transport = await SendGrid.send(mail);
    return transport;
  }
}
