## Frida Simple Scripts

### 关于

一些比较通用的脚本：

+ `dump_view_tree.js`： 从 `DecorView` 开始打印整棵 `View` 树，你可以在脚本里面的 `FIELDS` 变量里面加上你希望打印出来的属性，例如 `mPrivateFlags4`、`mSuppressLayout`，这比 `adb dumpsys` 能够打印的东西更多。如果你没有指定需要打印的属性，那么就只会打印 `View` 本身的 `toString` 方法。获取出来的 view 树将以 `json` 的形式输出。

+ `track_touch_events.js`： 将从 `DecorView` 开始跟踪 `TouchEvent` 在 `View` 树中的传递。

+ `track_measure_events.js`： 将从 `DecorView` 开始跟踪 `measure` 以及 `onMeasure` 的传递。

+ `track_layout_events.js`： 将从 `DecorView` 开始跟踪 `layout` 以及 `onLayout` 的传递。

+ `track_draw_events.js`： 将从 `DecorView` 开始跟踪 `draw` 以及 `onDraw` 的传递。

## 如何使用

电脑上安装 `frida`，并下载 `frida-server` 推送到手机上，运行 `frida-server`，然后推荐使用 `vscode` 来运行调试。具体网上有很多教程了，可以自行谷歌。

## 限制

只有可以使用 `root` 用户权限的手机才可以运行。