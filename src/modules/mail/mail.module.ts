import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
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
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
