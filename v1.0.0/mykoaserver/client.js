const Sequelize = require('sequelize')
const params = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: "+08:00",
    pool: {
        max: 10000, //最大连接数
        min: 0,     //最小连接数
        acquire: 1000000,   //请求超时时间
        idle: 10000 //断开连接后，连接实例在连接池保持的时间
    },
    define: {
        timestamps: false
    },

    operatorsAliases: false
}
const client = new Sequelize('my_super_db', 'root', '123456', params);

module.exports = client
