import Koa from 'koa';

import Static from 'koa-static';
import {
    app as render
} from './app/index.js';

const app = new Koa();

render(app)

app.use(Static('build'));

app.listen(8080);