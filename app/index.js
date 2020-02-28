import Router from 'koa-router';

import {
    configs
} from './configs.js';
import {
    render
} from './render.js';

export const app = koa => {
    const router = Router()

    configs.forEach(config => router.get(config.url, async (ctx, next) => {

        const effect = await render(config);
        if (effect.result !== 1) return ctx.body = effect.message;

        return next();
    }))

    koa.use(router.routes());
}