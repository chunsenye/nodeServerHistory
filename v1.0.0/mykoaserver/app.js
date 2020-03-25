const Koa = require('koa')
const Router = require('koa-router')
const Sequelize = require('sequelize')

var client = require('./client.js')
var model = require('./models/user')
const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
    await next();
});

router.get('/getUser', async (ctx) => {
    let data
    try {
        const pool = new model(client, Sequelize);
        data = await pool.findAndCountAll({})
    } catch (e) {
        console.log(e);
    }
    ctx.body = {
        data
    }
})

app.use(router.routes());

app.listen(8080, () => {
    console.log(`Server is listening on 8080`);
});
