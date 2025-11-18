<h1 align="center">NAA (Nest-Antd-Admin)</h1>

<p align="center">

</p>

<p align="center">一款简单高效的前后端分离的权限管理系统。</p>

### 简介

使用 NestJS + Ant Design Admin 等技术栈，采用 monorepo 管理（前端后台、后端 API、文档站点统一在一个仓库），开箱即用的中后台权限管理系统与最佳实践。

[在线预览](https://admin.hexuntao.dpdns.org) 演示账号: test / 123456

---

### 技术栈

- 后端：NestJS、TypeORM、MySQL、Redis、Bull、Swagger、Winston
- 前端：React 18、Umi Max、Ant Design 5、ProComponents、Tailwind（按需）
- 文档：Next.js + Nextra
- 工程化：TypeScript、Turbo、ESLint/Prettier、pnpm workspaces、dotenv

### 主要功能

- 认证与鉴权：登录/注销、JWT、角色/权限、菜单/按钮级权限
- 系统管理：用户、角色、部门、岗位、菜单、字典、参数配置、公告
- 监控审计：登录日志、操作日志、在线用户、缓存监控、定时任务（队列）
- 工具能力：文件上传/下载、Excel 导出、代码生成（基于元数据/模板）
- 统一规范：全局异常与统一响应、请求日志、数据权限拦截、Swagger 接口文档

### 目录结构（简要）

```
apps/
  api/    # NestJS 后端服务
  admin/  # 后台前端（Umi + AntD）
  docs/   # 文档站点（Next.js + Nextra）
  block/  # 未开发完成，请忽略
packages/
  eslint-config/  # 统一 ESLint 规则
  ts-config/      # 统一 tsconfig 预设
sql/
  naa.sql         # 初始化数据库脚本
```

### API 模块结构与功能（apps/api）

```
modules/
  auth/                        # 认证模块
    login/                    # 登录/验证码/会话信息

  config/                      # 配置中心（应用配置装载、读取、缓存）

  core/                        # 核心基础（全局异常/响应、DTO、实体基类、工具）
    exceptions/               # 统一异常与过滤器
    decorators/               # 参数/安全等装饰器（如防重复提交）
    middlewares/              # 全局中间件（favicon、全局上下文）
    pipes/                    # 全局校验管道
    utils/                    # 日期/对象/安全/树等工具

  datascope/                   # 数据权限（SQL 限制、注解 + 拦截器）

  excel/                       # Excel 导出能力（装饰器 + 服务）

  file/                        # 文件模块
    file/                     # 上传记录实体、文件下载/预览接口
    upload/                   # 上传存储与配置（本地/策略）

  gen/                         # 代码生成器
    gen/                      # 元数据读取、模板渲染、下载打包
    template/                 # 后端 Nest / 前端 React 模板
    utils/                    # 模板助手与工具

  health/                      # 健康检查（DB/Redis 等探针）

  logger/                      # 日志体系
    decorators/               # 操作日志注解
    interceptors/             # 日志拦截器（请求/响应）
    services/                 # RPC/持久化日志
    winston.*                 # Winston 适配与传输

  monitor/                     # 运维监控
    cache/                    # 缓存信息查看/清理
    job/                      # 定时任务（Bull 队列、任务执行、日志）
    login-log/                # 登录日志
    online-user/              # 在线用户（会话追踪/强退）
    oper-log/                 # 操作日志

  mybatis/                     # MyBatis 风格 Mapper 支持（XML + Mapper）

  security/                    # 安全与鉴权
    guards/                   # 认证/权限守卫
    decorators/               # 权限声明装饰器
    services/                 # JWT、权限校验服务

  shared/                      # 共享拦截器与基础模块

  swagger/                     # Swagger 文档封装（装饰器、服务）

  system/                      # 系统管理域
    config/                   # 参数配置（系统参数维护）
    dept/                     # 部门管理（树结构、层级关系）
    dict/                     # 字典类型/数据（缓存 + 下发）
    menu/                     # 菜单/按钮（权限资源）
    notice/                   # 公告通知
    post/                     # 岗位（职位/职责）
    profile/                  # 个人中心（资料/密码/头像）
    role/                     # 角色与授权（角色-菜单/部门关联）
    user/                     # 用户管理（用户-角色/岗位关联）
```

说明：上面树形结构按模块归类，括号内为核心职责；更细的实体/DTO/VO/Controller/Service 可在对应目录内查看。

### 环境要求

- Node >= 16.14.1
- pnpm >= 8.6.10
- MySQL 8.x（或兼容版本）
- Redis（可选，用于队列/缓存等）

### 快速开始

安装依赖：

```bash
git clone https://github.com/hexuntao/naa.git
cd naa
pnpm install
```

初始化数据库：

```bash
# 创建数据库（示例）
mysql -u <user> -p -e "CREATE DATABASE naa DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_general_ci;"
# 导入结构与示例数据
mysql -u <user> -p naa < sql/naa.sql
```

配置环境（可选）：

- 后端环境变量参考 `apps/api/src/config/env.ts` 与 `apps/api/src/config/database.config.ts`
- 默认端口：API 6010、Admin 6020、Docs 6030

### 开发与运行

一键同时启动（后端 + 前端）：

```bash
pnpm run dev
```

分别启动：

```bash
# 仅后端（NestJS）
pnpm run dev:api

# 仅前端（Admin，自动同时确保 API 运行）
pnpm run dev:admin

# 仅文档站点
pnpm run dev:docs
```

服务地址：

- 后端接口：http://localhost:6010/api
- 接口文档：http://localhost:6010/api-docs
- 后台页面：http://localhost:6020
- 教程文档：http://localhost:6030

### 构建与部署

构建全部应用：

```bash
pnpm build
```

单应用脚本（在各自目录下或通过 turbo 过滤执行）：

- 后端：`apps/api` 中 `pnpm run build` / `pnpm run start:prod`
- 前端：`apps/admin` 中 `pnpm run build`
- 文档：`apps/docs` 中 `pnpm run build && pnpm start`

建议使用 PM2 / Docker 进行生产部署；后端默认提供 Swagger 文档与健康检查。

### 常用脚本（根目录）

- `pnpm run dev`：并行启动开发服务
- `pnpm run dev:api`：仅启动后端开发服务
- `pnpm run dev:admin`：启动前端并联动后端
- `pnpm run dev:docs`：启动文档站点
- `pnpm build`：构建所有 workspace
- `pnpm lint`：代码检查
- `pnpm format`：统一格式化

### 贡献

欢迎提交 Issue 与 PR。提交前请确保通过 `pnpm lint` 与基本构建。

### LICENSE

[MIT](./LICENSE)

