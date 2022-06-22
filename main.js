const {
    Spot
} = require('@binance/connector')
// 创建账户
const apiKey = 'apw9iP8TgvENLUkttwxzS2yagL3TjUDcPoPgApWzy4EFBa8mxkh3HSeUvO95xre4'
const apiSecret = 'bA6DkaGRYtNWBfSvywonrWLQL84j3TBQm55jB1ZMjT4RHpA8SJTY0plTWHhTch7t'
const base_url = "https://api.binance.com"
//'https://testnet.binance.vision'
const client = new Spot(apiKey, apiSecret, {
    baseURL: base_url
})

// BTC初始值，会在第一次请求结束后更新
var BTCPrice = 0

// 连接到账户
client.account().then((res) => {
    client.logger.log(res.data)
}).catch((err) => {
    // client.logger.log(err)
})

// 每过两秒钟更新BTC Price
// setInterval(() => {

// }, 2000);

client.avgPrice("BTCUSDT").then((res) => {
    console.log(res)
    BTCPrice = res.data.price
}).catch((err) => {
    console.log(err)
})

// 网格交易
// btc价格每变动1%就进行操作
const grid = 0.02
// 中间线
const line = 42000
let tradeTime = 0;
// 模拟10000USDT
let balance = 10000;
// 交易
if (BTCPrice > line * (1 + tradeTime * grid)) {
    // 买入的操作
    tradeTime++
} else if (BTCPrice < line * (1 + tradeTime * grid)) {
    // 卖出的操作
    tradeTime--
}