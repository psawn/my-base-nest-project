import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    const responseMsg = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: process.env.HOST + process.env.PORT + request.url,
      message: message,
    };

    Logger.warn('warning', responseMsg);
    response.status(status).json(responseMsg);
  }
}
