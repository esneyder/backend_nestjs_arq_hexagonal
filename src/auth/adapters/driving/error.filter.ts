import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { DomainError } from 'src/auth/domain/domain-error';
import { Response } from 'express';
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (
      exception instanceof DomainError ||
      exception instanceof HttpException
    ) {
      const status = exception.getStatus ? exception.getStatus() : 500;
      let message: any = exception.getResponse();
      if (typeof message === 'object' && message.message) {
        message = message.message;
      }
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    }
    return response.status(500).json({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
