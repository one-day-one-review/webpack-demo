# WDS(webpack-dev-server)

LiveReload 或 Browsersync之类的工具允许在开发应用程序时刷新浏览器并避免刷新CSS更改。可以通过browser-sync-webpack-plugin设置Browsersync以使用webpack ，但是webpack在这方面有更多招数针对开发方面的优化。

## Webpack watch Mode 和 webpack-dev-server

在其监视模式下使用 webpack 可以让你的开发环境更友好。您可以通过传递--watch给webpack 来激活它。
示例：npm run build -- --watch。启用后，监视模式会检测对文件所做的更改并自动重新编译。

webpack-dev-server（WDS）实现了一种监视模式，甚至更进一步。

WDS是在内存中运行的开发服务器，默认情况下，WDS会在您开发应用程序时自动在浏览器中刷新内容，因此您无需亲自执行此操作。但它也支持高级Webpack功能，热模块更换（HMR）。

HMR允许在没有完全刷新的情况下修补浏览器状态，这使得它更像React这样的库，其中更新会破坏应用程序状态。

## 从WDS发送文件

尽管出于性能原因默认WDS在内存中运行是好的，但有时将文件发送到文件系统会很好。如果要与希望查找文件的其他服务器集成，则这变得至关重要。`write-file-webpack-plugin` 允许你这样做。

## WDS入门

```shell
# 安装wds模块
cnpm install webpack-dev-server --save-dev
```

在 package.json 中添加 `"start": "webpack-dev-server --mode development"`

```js
"scripts": {
  ...
  "start": "webpack-dev-server --mode development"
},
```

可以执行 `npm run start` 或 `npm start` 可以执行编译项目。
如果您尝试修改代码，您应该在终端中看到输出。浏览器还应该对更改执行硬刷新。

WDS尝试在另一个端口运行，以防使用默认端口。终端输出告诉您它最终运行的位置。
您可以使用类似命令调试情境netstat -na | grep 8080。
如果端口8080上正在运行某些东西，它应该在Unix上显示一条消息。

## 通过Webpack配置配置WDS

修改 webpacK.config.js 配置以添加wds配置。

```js
module.exports = {

  devServer: {
    // Display only errors to reduce the amount of output.
    stats: "errors-only",

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
  },
  ...
};
```

完成此更改后，您可以通过环境参数配置服务器主机和端口选项（示例:) `PORT=3000 npm start`。

dotenv 允许您通过 .env 文件定义环境变量。dotenv 允许您快速控制设置的主机和端口设置。

## 启用错误覆盖

WDS提供了一个覆盖，用于捕获与编译相关的警告和错误：

```js
module.exports = {
  devServer: {
    ...

    overlay: true,

  },
  ...
};
```

如果你想要更好的输出，请考虑 error-overlay-webpack-plugin ，因为它更好地显示了错误的起源。

## 启用 HMR

参考 [HMR](https://survivejs.com/webpack/appendices/hmr/)

## 从网络访问开发服务器

```js
module.exports = {
  devServer: {
    ...

    host: "0.0.0.0"

  },
  ...
};
```

在Unix上，这可以使用 `ifconfig | grep inet`。在Windows上，`ipconfig`可以使用。npm包 `node-ip` 可用。

## 快速开发配置

当您更改打包文件时，WDS将处理重新启动服务器，但是当您编辑webpack配置时呢？每次进行更改时重新启动开发服务器都会在一段时间后变得无聊。该过程可以通过使用nodemon监视工具在GitHub中进行自动化。

```js
cnpm install nodemon --save-dev
```

修改 package.json 中的启动命令

```js
"scripts": {
  "start": "nodemon --watch webpack.config.js --exec \"webpack-dev-server --mode development\""
},
```

可以监视webpack配置并在更改时重新启动WDS。

