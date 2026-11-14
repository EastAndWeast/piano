# 琴始 · 键盘钢琴

用电脑键盘学习钢琴的中文网页应用。纯 HTML、CSS 和 JavaScript，使用 Web Audio API 发声，无需安装依赖或配置后端。

## 功能

- 电脑键盘、鼠标和触屏弹奏，支持和弦与空格延音
- 4 种合成音色、音量调节和节拍器
- 分级曲库、5 项基础训练、示范播放和跟弹判定
- 沉浸式课程，含故事导入、瀑布流和简谱视图
- 跟弹和示范循环：默认 1 轮，可设为 1–20 轮，轮间停顿 2 秒，支持停止
- 练习完成情况保存在当前浏览器的 localStorage

## 本地运行

在仓库根目录运行：

```sh
python3 -m http.server 5173 --directory dist
```

浏览器打开 http://localhost:5173 ，点击“走进第一节课”。浏览器需要用户交互后才能播放声音。

白键：`A S D F G H J K L ; ' ]`；黑键：`W E T Y U O P`；空格：延音。

## 部署到 Cloudflare Pages（GitHub 自动部署）

1. 在 Cloudflare 控制台进入 **Workers & Pages → Create application → Pages**。
2. 选择 **Import an existing Git repository**，授权并选择 `EastAndWeast/piano`。
3. 配置如下：

| 设置 | 值 |
| --- | --- |
| 项目名称 | `piano`（如已占用，可换名称并同步修改 wrangler.jsonc 中的 name） |
| 生产分支 | `main` |
| 框架预设 | `None` |
| 根目录 | 仓库根目录（留空） |
| 构建命令 | `exit 0` |
| 输出目录 | `dist` |
| 环境变量 | 无需配置 |

4. 点击 **Save and Deploy**。成功后 Cloudflare 会提供实际的 `*.pages.dev` 地址。
5. 后续推送到 `main` 将触发自动部署。

此项目使用 **Pages**，创建时请选择 Pages，而非需要 Worker 入口的 Workers 部署流程。

官方参考：[静态 HTML 部署](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)、[Wrangler 配置](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)。

## 文件结构

```text
dist/
  index.html   页面与资源入口
  style.css    学习空间和沉浸琴房样式
  app.js       琴键、音频、曲库、基础训练
  room.js      沉浸式课程与瀑布流
  repeat.js    循环训练与停止控制
wrangler.jsonc Cloudflare Pages 配置
```

`dist` 就是可直接部署的源文件目录，没有额外构建步骤。所有站内资源使用相对路径。

## 当前范围

曲库为内置简化旋律片段；音色为浏览器合成，并非真实钢琴采样。真人演奏参考使用外部视频，受网络与视频平台可用性影响。学习进度只保存在当前浏览器，不跨设备同步。
