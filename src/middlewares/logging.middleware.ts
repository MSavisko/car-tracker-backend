// logging.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const startTime = Date.now();
        const { method, originalUrl, body } = req;
        const safeBody = omit(req.body, ['password']);
        const logMessage = `[Request] ${method} ${originalUrl} Body: ${JSON.stringify(safeBody)}`;
        console.log(logMessage);

        res.on('finish', () => {
            console.log(`[Response] ${req.method} ${req.url} Status: ${res.statusCode} Duration: ${Date.now() - startTime}ms`);
        });

        next();
    }
}
