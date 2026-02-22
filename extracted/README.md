# WT Tool 管理员后台

使用 GitHub Pages + RAW 链接构建的管理员后台网站，用于管理 WT Tool 客户端的各种内容。

## 功能特性

- **公告管理**：发布和更新公告
- **检测软件**：管理APK文件链接
- **春秋检测**：添加词条和解决方案
- **Momo管理**：添加词条和解决方案
- **牛头管理**：添加词条和解决方案
- **Luan管理**：添加词条和解决方案
- **模块下载**：管理ZIP文件链接
- **SH文件管理**：管理SH文件链接

## 部署步骤

### 1. 创建GitHub仓库
1. 在GitHub上创建一个新的仓库
2. 将本项目的 `admin-portal` 文件夹内容上传到仓库

### 2. 启用GitHub Pages
1. 进入仓库设置
2. 找到 "Pages" 选项
3. 在 "Source" 下拉菜单中选择 "main" 分支
4. 点击 "Save" 按钮
5. 等待几分钟，GitHub Pages 会生成一个访问URL

### 3. 上传文件到GitHub

#### 对于APK、ZIP、SH文件：
1. 在仓库中创建一个 `uploads` 文件夹
2. 将文件上传到该文件夹
3. 复制文件的RAW链接（点击文件 → 点击 "Raw" 按钮 → 复制URL）

### 4. 使用管理员后台
1. 访问GitHub Pages生成的URL
2. 使用各个功能模块管理内容
3. 所有数据会保存在浏览器的本地存储中
4. 内容管理完成后，需要手动更新到GitHub仓库

## 数据结构

### 公告数据
```json
{
  "id": "1234567890",
  "title": "公告标题",
  "content": "公告内容",
  "date": "2026-02-22T00:00:00.000Z"
}
```

### 检测软件数据
```json
{
  "id": "1234567890",
  "name": "软件名称",
  "apkUrl": "https://raw.githubusercontent.com/.../app.apk",
  "date": "2026-02-22T00:00:00.000Z"
}
```

### 词条数据（春秋、Momo、牛头、Luan）
```json
{
  "id": "1234567890",
  "keyword": "词条",
  "solution": "解决方案",
  "date": "2026-02-22T00:00:00.000Z"
}
```

### 模块数据
```json
{
  "id": "1234567890",
  "name": "模块名称",
  "zipUrl": "https://raw.githubusercontent.com/.../module.zip",
  "date": "2026-02-22T00:00:00.000Z"
}
```

### SH文件数据
```json
{
  "id": "1234567890",
  "name": "文件名称",
  "shUrl": "https://raw.githubusercontent.com/.../script.sh",
  "date": "2026-02-22T00:00:00.000Z"
}
```

## 注意事项

1. 本管理员后台使用浏览器本地存储保存数据，刷新页面后数据会保留
2. 如果需要在多台设备上管理内容，建议定期导出数据
3. GitHub Pages 有一定的访问限制，请合理使用
4. 上传的文件大小应控制在合理范围内，避免超过GitHub的限制

## 客户端集成

WT Tool 客户端（C#开发）可以通过以下方式集成：

1. 访问GitHub Pages上的管理员后台获取数据
2. 使用RAW链接直接下载文件
3. 定期检查公告更新

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub Pages

## 许可证

MIT License