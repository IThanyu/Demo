/** pomelo对象 */
var pomelo = require('pomelo');

/** 日志对象 */
var logger = require("pomelo-logger").getLogger("app", __filename);

/**
 * 初始化app对象
 */
var app = pomelo.createApp();
app.set('name', 'GameServer');

// app 相关配置信息
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });
});

// 启动 app
app.start((ex) => {
  if (ex !== null) { logger.error(ex.message); }
});

// 处理未捕捉到的异常
process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
