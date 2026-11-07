<p align="center"><img src="../assets/branding/Logo%20RIG2DKARTA%20d%E2%80%99animation%202D.png" alt="RIG2DKARTA logo" width="760"></p>

[Français](../README.md) · [Español](README.es.md) · [English](README.en.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

# RIG2DKARTA — 2D骨骼绑定与动画工作室

> 开源浏览器编辑器，用于组装、绑定和制作分层2D角色动画。

![Status](https://img.shields.io/badge/status-early%20prototype-orange) ![React](https://img.shields.io/badge/React-19-149eca) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![PixiJS](https://img.shields.io/badge/PixiJS-8-purple)

## 项目简介

RIG2DKARTA是一款**本地优先**的浏览器2D编辑器，旨在让创作者导入透明PNG图层、组装角色、设置关节，并通过时间轴制作动画。未来计划支持骨骼绑定、网格变形、面部表情以及GIF和视频导出。**这些功能目前尚未全部实现。**

## 当前状态 — 0.1原型

| 功能 | 状态 |
| --- | --- |
| React界面与PixiJS画布 | 初步实现，仍需测试 |
| 导入多个PNG | 初步实现 |
| 选择和拖动图层 | 初步实现 |
| 图层显示、隐藏和排序 | 初步实现 |
| 位置、旋转、缩放和枢轴 | 初步实现 |
| 保存和读取包含图片的JSON | 初步实现 |
| 骨骼层级与关节 | 计划中 |
| 时间轴与关键帧 | 计划中 |
| GIF及PNG序列导出 | 计划中 |
| 网格变形 | 未来功能 |
| AI辅助绑定 | 未来功能 |

> **注意：** 本项目仍处于早期开发阶段。Vercel生产构建已成功，但尚未完成全部浏览器交互测试。

## 安装

### 环境要求
- 较新版本的Node.js（建议LTS）
- npm
- 支持WebGL的现代浏览器

### 本地运行
```bash
git clone https://github.com/kartade/RIG2DKARTA.git
cd RIG2DKARTA
npm install
npm run dev
```

打开Vite显示的本地地址（通常为 `http://localhost:5173`）。

### 生产构建
```bash
npm run build
npm run preview
```

## 原型使用方法

1. 点击 **Importer PNG**，选择多个透明PNG图层。
2. 在列表或画布中选择图层。
3. 拖动图层，或在 **Propriétés** 中修改坐标。
4. 调整旋转、缩放及枢轴。
5. 更改图层顺序或显示状态。
6. 点击 **Enregistrer**，保存 `rig2d-project.json`。
7. 使用 **Ouvrir projet** 重新打开项目。

目前界面按钮仍使用法语。图片直接嵌入JSON，可能导致文件较大；未来考虑采用资源分离的ZIP项目格式。

## 架构

```text
RIG2DKARTA/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    └── style.css
```

**当前技术栈：** React、TypeScript、Vite、PixiJS。Zustand已列为依赖，但尚未使用。

**目标架构：**
- **Editor UI：** 面板、操作工具、属性检查器和时间轴
- **Rigging Core：** 枢轴、骨骼、层级及局部/全局变换
- **Animation Engine：** 关键帧、插值、循环和确定性播放
- **Renderer：** PixiJS渲染与交互
- **Project I/O：** 可移植项目的导入与导出
- **Exporters：** PNG序列、GIF以及后续的视频导出

上述模块划分是未来重构目标，并非当前代码结构。

## 开发路线图

### 阶段1 — 图层编辑器
- [x] 初始化仓库和界面
- [x] 添加PNG导入及变换属性
- [x] 添加初始JSON项目格式
- [x] 在Vercel完成生产构建
- [ ] 验证浏览器交互
- [ ] 修复交互并加入撤销/重做
- [ ] 添加缩放、平移和辅助线

### 阶段2 — 骨骼绑定
- [ ] 创建和编辑骨骼
- [ ] 定义父子关系
- [ ] 显示枢轴和关节
- [ ] 区分初始姿势和动画姿势

### 阶段3 — 动画
- [ ] 多轨时间轴
- [ ] 关键帧和插值
- [ ] 播放、暂停、循环和帧率设置
- [ ] 可复用动画

### 阶段4 — 导出与稳定性
- [ ] 可移植项目格式
- [ ] PNG及PNG序列导出
- [ ] 透明GIF导出
- [ ] 自动化测试和示例

### 未来功能
- 网格变形
- 反向运动学（IK）
- 面部表情和口型同步
- 图像分层及绑定辅助
- 视频导出
- 研究从单张插画自动生成可编辑绑定

## 项目原则

- **本地优先：** 编辑无需账号或服务器
- **通用：** 不限制角色格式或美术风格
- **非破坏性：** 保留原始图片和可编辑变换
- **可移植：** 优先采用有文档的可导出格式
- **可扩展：** 将动画引擎与界面分离

## 验证示例

Q版角色**Néa**是首个测试对象：导入PNG部件、组装初始姿势，再制作骨骼舞蹈动画。还将使用不同比例的角色验证通用性。

## 参与贡献

欢迎通过GitHub Issues提交错误报告、易用性建议和架构提案。进行重大修改前请先创建Issue。

## 许可证

RIG2DKARTA依据[GNU Affero General Public License v3.0（AGPL-3.0-only）](../LICENSE)开源。允许商业使用、修改和再分发，但须遵守许可证规定，包括某些分发或通过网络提供的修改版本所适用的源代码共享义务。

使用RIG2DKARTA创作的作品**不会自动受到软件AGPL许可证的约束**；作品权利取决于其内容和素材许可。完整条款请参阅[LICENSE](../LICENSE)。

---

**让浏览器中的2D骨骼绑定更加触手可及。**