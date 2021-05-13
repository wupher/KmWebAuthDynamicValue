/**
 *  K 米签名计算
 *  签名算法估计是抄自美团。对于输入参数添加 appid，secret，然后计算 md5
 *  为什么不简单使用 hmac ？ I don't known.
 *  这个脚本是为了方便 paw 计算对应签名
 */
function calculateBodySignStr(body, appid, secret){
  var bodyMap = JSON.parse(body)
  bodyMap["appid"] = appid
  let keyArray = Object.keys(bodyMap)
	let sortKey = keyArray.sort();
	var resultStr = "";
	sortKey.forEach(function (item, index, array) {
		let value = bodyMap[item];
		resultStr = resultStr + item + value;
	});
	resultStr+=secret
  return resultStr
}

var SignDynamicValue = function() {
  this.evaluate = function(context) {
    var request = context.getCurrentRequest()
    var body = request.body
    var headers = request.headers
    var appid = headers["appid"]
    var signStr = calculateBodySignStr(body, appid, this.secret)
    console.log("signStr: " + signStr);
    var dynamicValue = new DynamicValue('com.luckymarmot.HashDynamicValue',
     {
          'input': signStr,
          'hashType': 2 ,
          'encoding'  : 0,
          "uppercase" : true
  });
   var sign = dynamicValue.getEvaluatedString();
    console.log("signedValue: " + sign);
    return sign;
  }
  
  this.title = function(context){
    return SignDynamicValue.title
  }

  this.text = function(context){
    return SignDynamicValue.help
  }

}
SignDynamicValue.identifier = "com.ktvme.SignDynamicValue";
SignDynamicValue.title = "K米签名";
SignDynamicValue.help = "用于根据指定的 appid 和 secret 计算 K 米签名";
SignDynamicValue.inputs = [
  InputField("secret", "secret", "String", {persisted: true, defaultValue:"123456"})
]
registerDynamicValueClass(SignDynamicValue);
