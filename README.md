# KmWebAuthDynamicValue

KM 公司的 Web 认证方式帮助函数。用于在 Paw / Postman 中生成动态认证 value 方便开发和调试工作。

认证本身的机制很简单：通过把请求处理成字符串，在头或者尾部添加预置密钥，然后计算 MD5 作为请求签名。


