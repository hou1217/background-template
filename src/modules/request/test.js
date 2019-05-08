const {Request} = require('./index.js')

console.log(Request);

// //Get请求
// var url = "http://fat.metricsserver.dc.wallan-tech.com/mgmt/info";
// Request.Get(url).execute().then(function(res){
//   console.log(`fetch url: ${url} success:`);
//   console.log(res);
// }).catch(function(err){
//   console.log(`fetch url: ${url} exception:`);
//   console.log(err);
// });
//
//
// //Post请求  contentType=application/json
// var url = "http://fat.mediaplatform.dc.wallan-tech.com/dc/account/login";
// Request.Post(url).headers({}).body({"phoneNum": "19017345018"}, Request.CONTENT_TYPE_JSON).execute().then(function(res){
//   console.log(`fetch url: ${url} success:`);
//   console.log(res);
// }).catch(function(err){
//   console.log(`fetch url: ${url} exception:`);
//   console.log(err);
// });
//
// //Post请求 contentType=application/json
// var url = "http://fat.redpacket.dc.wallan-tech.com/redpacket/create";
// Request.Post(url).headers({
//   "WALLAN-TOKEN": "d6vh8N0Wz1MVX5_YBXJMNdE-m3_7NSVk-IMOYCM1EVjjKgxfj8XiYDfZWfXUxf8_P-aCUqcw6ytkoh9-AKJMotphEu1Zk2Xb_-_jY2KKYbvKjXmiyX3EJ6vKYTMPHzrhr9JPeNDDlui8M2TAyWh51mjbUa8lesR7jgkE9C62HQg",
//   "WALLAN-DEVICENUM": "19017345018"
// }).body({
//   "redPacketType": "P2P",
//   "message": "我的红包",
//   "price": "0.01",
//   "count": "1",
//   "amount": "0.01",
//   "sessionId": 1,
//   "sessionType": 1,
//   "from": "PC"
// }, Request.CONTENT_TYPE_JSON).execute().then(function(res){
//   console.log(`fetch url: ${url} success:`);
//   console.log(res);
// }).catch(function(err){
//   console.log(`fetch url: ${url} exception:`);
//   console.log(err);
// });


