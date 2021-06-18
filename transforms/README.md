# 开发必读

## 1. 返回值说明

要标准化 transform 输出，codemod 未命中或不需要运行时请 return null，命中时才 return 修改后内容。

**注意：不能所有都 return 文件内容！会影响 check 方法结果！**

## 2. 入参说明

transform 入参会增加 projectType（rax,react,vue）、projectFramework(rax-app,icejs) 及 projectLanguageType(js,ts)。

## 3. 文档说明

在 [jscodeshift](https://www.npmjs.com/package/jscodeshift) transform 的开发逻辑不变的基础上，增加 markdown 说明文档配置方案。

文档名和 transform 名称对应。check 方法命中的 codemod 后，会查询对应 markdown 说明配置文件，获取此条 codemod 信息，并拼接此文档地址提示用户阅读。

仓库目录结构如下：

```markdown
codemod                                                 
├─ docs                                     
│  └─ plugin-rax-component-to-component.md                     
├─ transforms                               
│  └─ plugin-rax-component-to-component.js  
└─ package.json                             

```

markdown 说明配置文件示例如下：

```markdown
---
title: Component 工程升级
message: 切换 rax-component-plugin
severity: 1
npm-deprecate: "plugin-rax-component-to-component@<1.x" 
---

说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明

```

* severity：其值 > 0 的 codemod 会在用户启动 VS Code 插件时给予提示。
* npm-deprecate：非必须，配置命中对应 codemod 后用户编辑到对应 npm 包时会有删除线提示。

**注意：增加 transform 后，务必补充对应文档！**
