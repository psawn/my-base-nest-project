import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(ConfigService);
  // dùng app.select.get để tránh lỗi khi có các dependency phụ thuộc 2 chiều vào nhau
  // const configService = new ConfigService();

  setupSwagger(app);
  await app.listen(configService.port);
  logger.log(`Application listening on port ${configService.port}`);
}
bootstrap();
