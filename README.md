# 爱智造 · AI Forge

可直接部署到 GitHub Pages 的静态团队网站。保留最初 demo 的深蓝/青绿配色、Segoe UI 字体、灰白背景、编号研究卡片、成员卡片和蓝色渐变联系区；正文为英文，保留「爱智造」名称。

## 页面与预览

导航名称固定为 **Home、Research、Team、Our work、Contact**，对应五个独立 HTML 页面，不使用长页面锚点作为主导航。

| 导航 | 文件 | 内容 |
| --- | --- | --- |
| Home | `index.html` | 等宽左右两栏：左侧团队介绍，右侧 4 张论文/成果图片轮播；图片无外围边框或留白，简短说明叠在底部紧凑的半透明条上；手机上下排列 |
| Research | `research.html` | 六个研究与开发方向，每行一张完整宽度卡片；编号与右侧标题同排，介绍位于下方，高度随内容自动扩展 |
| Team | `team.html` | 全部成员按博士、硕士、本科生从上到下分组，小标题与横线分隔；桌面每行两张宽卡片、手机每行一张，头像保持原大小，教育背景与领域标签并排；无左上角序号、Team role、View profile、详情弹窗、筛选或分页 |
| Our work | `outputs.html` | 独立成果卡片，标题、作者、期刊卷期等按参考文献资料填充，按年份从新到旧完整展示，直接提供 DOI/项目链接；无 Code 链接、序号、详情弹窗、搜索、筛选或分页 |
| Contact | `contact.html` | 合作介绍与邮箱链接，无复制按钮 |

直接打开 `index.html`，或在项目目录运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

访问 <http://127.0.0.1:4173/index.html>。使用 Python 标准库，无需安装依赖。旧的 `team.html#research`、`#outputs`、`#contact`、`#about` 地址会转到对应独立页面。

## 部署到 GitHub Pages

目标仓库为 [54Xander/ai-forge](https://github.com/54Xander/ai-forge)，发布来源为 **main 分支的根目录**。这是纯静态网站，无需 npm、打包服务或后端；页面和资源使用相对路径，兼容 `/ai-forge/` 项目站点路径。

1. 将五个 HTML 文件、`assets/` 及 `.nojekyll` 保留在 `main` 分支根目录。其他项目文档和验证脚本可一起保存在源代码仓库，但网站运行不依赖它们。
2. 打开 [Settings → Pages](https://github.com/54Xander/ai-forge/settings/pages)，在 **Build and deployment** 中选择 **Deploy from a branch**。
3. 分支选择 **main**，目录选择 **/(root)**，保存。
4. 等待 GitHub Pages 构建完成，在 Pages 设置页查看实际访问地址。

启用并构建成功后的默认地址为 [https://54xander.github.io/ai-forge/](https://54xander.github.io/ai-forge/)。仅提交源代码不代表 Pages 已开通，是否上线以 Pages 的构建状态和实际访问结果为准。后续修改在本地完成验证后提交并推送到 `main`，已启用的 Pages 会自动更新。

依据：[GitHub Pages 建站说明](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)、[发布来源配置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。本地 Git 依据用户明确授权关联到上述已有仓库，并保留远端提交历史。

## 维护入口

- `assets/team.css`：全站共享样式；基线颜色为 `#1f3a5f`、`#2c6e91`、`#1abc9c`，背景为 `#f7f9fc`。不要自行换成其他设计风格。
- `assets/team-data.js`：成员、成果及标签；成员按 `level`（`phd`、`masters`、`undergrad`）自动分组，组内保持数据顺序；成果按 `year` 降序分组，同年保持数据顺序。
- `assets/team.js`：渲染包含完整资料的成员分组卡片和含参考文献资料的成果卡片，启用首页图片轮播和移动导航；兼容无相关组件的页面。
- `assets/mark.svg`：蓝青色本地图标。
- `assets/highlight-placeholder.svg`：首页共用的本地图片占位图，无需外部图片服务。
- `.nojekyll`：关闭默认 Jekyll 处理，按静态文件发布。
- `scripts/check-site.py`：校验入口、页面元信息、内部链接及本地资源。

导航和页脚写在每个 HTML 中，调整时保持五页一致；页面各自有标题和 `aria-current="page"` 状态。没有运行时页面拼装或路由服务依赖。

首页图片在 `index.html` 的 `#highlights` 区域维护，目前预留 4 张，桌面与介绍按 1:1 等宽排列，小屏上下排列。轮播每次显示一张，支持上一张/下一张、圆点点击，以及焦点位于控件内时的左右方向键切换；首尾循环，不自动播放。箭头按钮为 28 × 28px，与较小的圆点在图片下方居中紧凑排列，距图片 8px。将真实图片放入 `assets/`，把对应 `<img>` 的 `src="assets/highlight-placeholder.svg"` 改为图片的相对路径，同时更新 `alt`、图片实际 `width` / `height` 和 `<figcaption><h3>` 中的简短说明。说明以白字叠在图片底部的半透明深蓝条上，上下内边距为 6px、左右为 10px，轮播上方不另设标题。图片贴边展示，无外围边框、阴影、内边距或虚线框；宽度填满所在栏，高度按原图比例自动调整，不裁切或添加留白。当前占位图比例为 4:3；替换后的图片若比例不同，轮播高度也会随之变化。增减图片时复制或删除整个 `<figure class="card highlight-card">` 区块即可，圆点和图片计数自动更新。禁用 JavaScript 时图片按顺序完整展示。

成果条目的参考文献字段为 `authors`（按署名顺序的字符串数组）、`title`、`venue`（期刊/会议/项目来源）、`year`（四位年份）、`volume`、`issue`、`pages`（页码或文章编号）。直接链接字段为 `doi`（DOI 标识符或 doi.org 地址）、`url`（全文或项目网站）；页面不展示 Code 链接。补充资料后会自动出现在完整列表中，无需调整分页或筛选配置。缺少年份的条目放在末尾的 **Year to be added** 分组，参考文献以 `n.d.` 表示；缺失 DOI 不生成链接，论文条目显示 **DOI to be added**。只填写已核实的信息。

## 资料边界

成员以 **2 位博士、4 位硕士、4 位本科生**展示，总计 10 人；硕士、本科生确切人数仍待确认。原 demo 只有 Zhaoxiang Liu 的个人资料，其余 9 个成员和研究方向是 `placeholder: true` 的占位，界面标为 To be added。头像字段 `photo` 是相对站点页面的本地路径；不填或加载失败时显示字母头像，保持原有的 220px 头像区高度和字母大小。卡片直接展示 `name`（姓名）、`role`（学术身份）、`description`（简介）、`education`（教育背景）和 `tags`（领域标签）；无需点击进入资料页。桌面每行两张卡片，手机每行一张；教育背景与领域标签并排，文字完整显示，卡片按内容自然增高。研究领域使用小标签，按顺序循环采用浅绿、浅紫、浅橙、浅蓝底色与对应深色文字，配色仅作用于成员领域标签，不再重复展示 `focus` 段落；若未填写 `tags`，则将 `focus` 作为标签展示。左上角序号和 Team role 均不展示，原有 `responsibility` 数据保留但不渲染。缺失的教育背景和方向显示 To be added，占位成员的示例方向标为 Example focus。

成果有 12 条：原 demo 的 DistRMI、RSID，加 10 条 `sample: true` 展示样例。样例不代表已发表论文、已交付项目或已举办活动。确认真实资料后才移除 Sample / To be added 标记。未提供的作者、论文链接、姓名、学历和机构不得猜测。

DistRMI 的作者顺序、2025 年、期刊 *Briefings in Bioinformatics*、26(6)、文章编号 bbaf660 和 DOI `10.1093/bib/bbaf660` 于 2026-09-17 根据 [Oxford Academic 期刊原文](https://academic.oup.com/bib/article/26/6/bbaf660/8375362) 核实并补齐。RSID 保留原项目地址，年份与其他书目字段尚未确认；十条样例继续保留 Sample 标记，不赋予虚构的作者、年份或 DOI。

联系邮箱仍为 `Liuzhaoxiang@webmail.hzau.edu.cn`，来自原 demo；通过 `mailto:` 链接打开邮件客户端，不包含复制按钮或邮件发送后端。

## 验证

```sh
python3 scripts/check-site.py
node --check assets/team-data.js
node --check assets/team.js
```

浏览器验收覆盖五页导航和当前页标记、桌面/手机布局、首页左右排版和轮播按钮/圆点/键盘切换及首尾循环、图片完整显示、Research 编号与标题同排、成员按 2/4/4 分组且资料在卡片内完整展示、无成员详情入口或弹窗、成果按年份降序完整列出、未定年份置后、DOI/项目直达链接和联系邮箱链接。另在带仓库名前缀的本地路径下验证五个页面，模拟 GitHub Pages 项目站点。外部 RSID 服务的可用性不属于本地网站验收。

2026-09-17 多页面拆分验证：静态检查通过（5 页、69 个资源/链接引用），两项 JavaScript 语法检查通过；五页切换与当前页标记正常，桌面和实际 390/320 像素视口均未横向溢出，成员筛选、成果搜索/展开、弹窗 Esc/焦点恢复及邮箱复制通过。五个页面在 `/Project_TeamWeb/` 模拟部署路径下均能访问并正确加载样式和交互；旧研究锚点跳转正确。浏览器未记录页面错误，桌面原始卡片样式与手机成员页截图已检查。

同日首页简化：删除首页人数卡片、对应说明及 Meet the team / Explore our work 按钮，并移除其专用样式和统计渲染代码。复验通过（5 页、67 个资源/链接引用及两项 JavaScript 语法检查）；浏览器刷新确认相关模块已移除，五个导航项、介绍和五个研究标签正常显示。

## 使用的工作规则

遵循用户提供和本地 AGENTS 的边界、保留内容、范围内实现与验证要求。使用 Sites 的建站技能；按其「明确指定其他托管平台时尊重用户选择」规则，交付 GitHub Pages 静态文件，不注册 Sites 云站点。执行配置检测结果为 portable / configured=false，沿用现有静态结构，没有套用新脚手架或重置项目规则。
