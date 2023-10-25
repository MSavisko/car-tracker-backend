import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as client from 'prom-client';

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.001, 0.01, 0.1, 1, 10], // buckets for response time in seconds
});

@Injectable()
export class PrometheusMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        const startEpoch = Date.now();

        res.on('finish', () => {
            const responseTimeInSec = (Date.now() - startEpoch) / 1000;
            httpRequestDurationMicroseconds
                .labels(req.method, req.route.path, res.statusCode.toString())
                .observe(responseTimeInSec);
        });

        next();
    }
}