/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export default function loggingMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const startTime = new Date();

  response.on('finish', () => {
    const { method, originalUrl } = request;
    const { statusCode, statusMessage } = response;
    const requestParramaters = {} as { body?: any; query?: any };
    if (request.body && Object.entries(request.body).length) {
      requestParramaters.body = request.body;
    }
    if (Object.entries(request.query).length) {
      requestParramaters.query = request.query;
    }
    if (Object.entries(requestParramaters).length) {
      Logger.log(JSON.stringify(requestParramaters));
    }

    const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${
      new Date().getTime() - startTime.getTime()
    }ms`;
    if (statusCode >= 200 && statusCode < 400) {
      Logger.log(message);
    } else {
      Logger.error(message);
    }
  });
  next();
}
