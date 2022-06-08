import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from 'src/shared/services/config.service';
import { EmailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          clientId: process.env.GOOGLE_EMAIL_ID,
          clientSecret: process.env.GOOGLE_EMAIL_SECRET,
          refreshToken: process.env.GOOGLE_EMAIL_REFRESH_TOKEN,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [MailService, ConfigService],
  exports: [MailService],
})
export class MailModule {}
