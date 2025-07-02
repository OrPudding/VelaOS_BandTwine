## 许可

本项目的游戏引擎部分遵循GNU Affero通用公共许可证（AGPLv3）开源。这意味着：

- 您可以自由地使用、修改和分发本软件，包括商业用途。

- 但是，如果您修改了游戏引擎部分，并且以任何形式发布（包括通过网络提供服务），则必须将修改后的完整源代码公开，并遵循AGPLv3协议。


特别地，文件 `src/common/game-data.json` 被允许闭源使用。这意味着您可以单独使用该文件而不需要公开其衍生作品。

有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

## 快速上手

### 1. 开发

```
npm install
npm run start
```

### 2. 构建

```
npm run build
npm run release
```

### 3. 调试

```
npm run watch
```
### 4. 代码规范化配置
代码规范化可以帮助开发者在git commit前进行代码校验、格式化、commit信息校验

使用前提：必须先关联git

macOS or Linux
```
sh husky.sh
```

windows
```
./husky.sh
```


## 了解更多

你可以通过我们的[官方文档](https://iot.mi.com/vela/quickapp)熟悉和了解快应用。
