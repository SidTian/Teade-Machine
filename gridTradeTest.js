const {
    Spot
} = require('@binance/connector')
const mysql = require('mysql')
const database = mysql.createPool({
    // 本地
    host: 'localhost',
    user: 'root',
    password: 'root',
    // 数据库名称
    database: 'Trade',
    port: 3306
});
// 创建账户
const apiKey = 'apw9iP8TgvENLUkttwxzS2yagL3TjUDcPoPgApWzy4EFBa8mxkh3HSeUvO95xre4'
const apiSecret = 'bA6DkaGRYtNWBfSvywonrWLQL84j3TBQm55jB1ZMjT4RHpA8SJTY0plTWHhTch7t'
const base_url = "https://testnet.binance.vision" //https://api.binance.com
const client = new Spot(apiKey, apiSecret, {
    baseURL: base_url
})
// 交易手续费0.075%
const tradeFee = 0.00075
// 间隔0.5% 就进行交易
const grid = 0.005
// 中间线  
const line = 40000
// 买入or卖出的次数
let tradeTime = 0
// 余额  USDT
let balance = 100000
// btc 余额
let BTCbalance = 0
setInterval(() => {
    client.avgPrice("BTCUSDT").then((res) => {
        database.query("INSERT INTO `BTC-USDT` ( `date`, `price`) VALUES (?,?)", [res.headers.date, res.data.price], err => {
            if (err) return console.log(err);
        })

    }).catch((err) => {
        console.log(err)
    })
}, 2000);

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// let res = {
//     headers: {
//         date: 1
//     },
//     data: {
//         price: 42000
//     }
// }
// setInterval(() => {
//     readline.question(`BTC price?`, price => {
//         res.data.price = price
//     })
//     let BTCPrice = res.data.price
//     res.headers.date++
//     console.log(BTCPrice);
//     // 交易
//     if (BTCPrice < line * (1 - tradeTime * grid) && balance >= 5000) {
//         // 一次买入本金的5%
//         balance -= 5000;
//         // 买入的数量
//         let buyingNum = 5000 / BTCPrice
//         BTCbalance += buyingNum
//         tradeTime++
//         database.query("INSERT INTO `TradeTest` ( `option`, `date`, `balance`, `BTCbalance`, `tradeTime`, `tradePrice`) VALUES (?,?,?,?,?,?)", ["buy", res.headers.date, balance, BTCbalance, tradeTime, res.data.price], err => {
//             if (err) return console.log(err);
//         })
//     } else if (BTCPrice > line * (1 + tradeTime * grid) && BTCbalance - (5000 / BTCPrice) > 0) {
//         // 卖出的数量   先写5000
//         let sellingNum = 5000 / BTCPrice
//         BTCbalance -= sellingNum
//         balance += 5000;
//         tradeTime--
//         database.query("INSERT INTO `TradeTest` ( `option`, `date`, `balance`, `BTCbalance`, `tradeTime`, `tradePrice`) VALUES (?,?,?,?,?,?)", ["sell", res.headers.date, balance, BTCbalance, tradeTime, res.data.price], err => {
//             if (err) return console.log(err);
//         })
//     }
// }, 4000);