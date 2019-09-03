# 入门

## 环境

- shell(mac 或者 window)
- node
- npm 或者 yarn
- git

## 配置项目

```shell

# 创建一个项目目录
mkdir webpack-demo

# 移动到目录中
cd webpack-demo

# 初始化项目信息
npm init -y # -y generates *package.json*, skip for more control
# npm init中的默认值可以在〜/ .npmrc中设置默认值。

# 初始化git仓库
git init
```

## 安装 Webpack

```shell

# 本地安装webpack和webpack命令行模块（不建议全局安装）
npm install webpack webpack-cli --save-dev # -D to type less

# 使用--save和--save-dev分离应用程序和开发依赖项。前者安装和写入package.json dependencies字段，而后者写入devDependencies。

```

## 检查 Webpack 是否成功安装到项目本地

```shell

# 查看本地安装的webpack版本
node_modules/.bin/webpack -v

```

## 配置 Webpack 资源

在项目跟目录下新建 src/index.js 文件，并添加代码

```js
console.log("Hello world");
```

```shell

# 执行webpack编译命令
node_modules/.bin/webpack --mode development

```

执行后，应该在项目根目录下的dist目录可以找到输出文件main.js

**注意:** *尝试--mode production并比较--mode development 俩者的输出*

继续增加项目的复杂度，增加src/component.js

```js component.js
export default (text = "Hello world") => {
    const element = document.createElement("div");
  
    element.innerHTML = text;
  
    return element;
};
```

```js index.js
import component from "./component";

document.body.appendChild(component());
```

再次执行`node_modules/.bin/webpack --mode development`

观察终端输出信息以及dist中的main.js文件（要使输出main.js更清晰易读，--devtool false 请将参数传递给webpack，使用`node_modules/.bin/webpack --devtool false --mode development`）。

## 配置测试代码环境

通过编写指向生成的文件的index.html文件来解决测试我们的js代码问题。我们可以使用html-webpack-plugin插件和webpack配置来实现这一目标，而不是自己做。

```shell
# 安装插件
cnpm install html-webpack-plugin --save-dev
```

添加webpack配置
项目根目录下的 `webpack.config.js` 文件是webpack项目默认配置文件。

```js webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack demo",
    }),
  ],
};
```

配置完成之后，

- 使用构建项目 `node_modules/.bin/webpack --mode production`。你也可以尝试这种 development 模式。
- 使用输入构建目录 cd dist。
- 使用 serve（npm i serve -g）或类似命令运行服务器。
- 通过Web浏览器检查结果。你应该看到执行结果。

```shell
$ node_modules/.bin/webpack --mode production
Hash: 4396fc36689817b0df09
Version: webpack 4.39.3
Time: 242ms
Built at: 2019-09-03 12:17:34
     Asset       Size  Chunks             Chunk Names
index.html  181 bytes          [emitted]  
   main.js   1.04 KiB       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js + 1 modules 231 bytes {0} [built]
    | ./src/index.js 77 bytes [built]
    | ./src/component.js 154 bytes [built]
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [2] (webpack)/buildin/global.js 472 bytes {0} [built]
    [3] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 2 hidden modules
```

输出说明了很多信息：

- Hash: 4396fc36689817b0df09 - 构建的哈希。您可以使用此选项通过[hash]占位符使资产无效。
- Version: webpack 4.39.3 - Webpack版本。
- Time: 242ms - 执行构建所花费的时间。
- main.js   1.04 KiB  0 [emitted]   main - 生成的资产的名称，大小，与其相关的块的ID，告知其生成方式的状态信息，块的名称。
- index.html 181 bytes [emitted] - 流程发出的另一个生成资产。
- [0] ./src/index.js + 1 modules 231 bytes {0} [built] - 条目资产的ID，名称，大小，条目块ID，生成方式。
- Child html-webpack-plugin for "index.html": - 这是与插件相关的输出。在这种情况下，html-webpack-plugin自己创建这个输出。

检查dist/目录下的输出。如果仔细观察，可以在源代码中看到相同的ID。

## 添加构建快捷方式

在 package.json 中的scripts配置下添加`"build": "webpack --mode production"`

```js

"scripts": {
  ...
  "build": "webpack --mode production"
},
```

下次你可以在终端中的项目根目录中 `npm run build` 而不是使用 `node_modules/.bin/webpack --mode production` 来编译项目。

## HtmlWebpackPlugin 的扩展

虽然可以HtmlWebpackPlugin使用自己的模板替换模板，但有预制的模板，如html-webpack-template或html-webpack-template-pug。

还有一些扩展HtmlWebpackPlugin功能的特定插件：

- favicons-webpack-plugin 能够生成favicon。
- script-ext-html-webpack-plugin 使您可以更好地控制脚本标记，并允许您进一步调整脚本加载。
- style-ext-html-webpack-plugin 将CSS引用转换为内联CSS。作为初始有效负载的一部分，该技术可用于快速向客户端提供关键CSS。
- resource-hints-webpack-plugin 为您的HTML文件添加资源提示，以加快加载时间。
- preload-webpack-plugin 支持rel=preload脚本功能并有助于延迟加载。
- webpack-cdn-plugin 允许您指定通过内容交付网络（CDN）加载的依赖项。这种常用技术用于加速流行库的加载。
- dynamic-cdn-webpack-plugin 实现了类似的结果。
