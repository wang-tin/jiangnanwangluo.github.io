# WT Tool 客户端

使用 C# Windows Forms 开发的客户端应用程序，用于连接到 GitHub Pages + RAW 链接构建的管理员后台。

## 功能特性

- **左边专区导航**：包含公告、检测软件、春秋检测、Momo、牛头、Luan、模块下载、SH文件管理
- **现代化界面**：美观的 Windows Forms 界面
- **连接管理员后台**：从 GitHub Pages 获取数据
- **响应式设计**：适配不同屏幕尺寸

## 技术实现

- **开发语言**：C#
- **框架**：.NET 6.0 Windows Forms
- **网络请求**：System.Net.Http
- **UI设计**：自定义控件和布局

## 编译和运行

### 方法1：使用 Visual Studio

1. **打开项目**：
   - 启动 Visual Studio
   - 点击 "文件" → "打开" → "项目/解决方案"
   - 选择 `WT-Tool-Client.csproj` 文件

2. **编译项目**：
   - 点击 "生成" → "生成解决方案"

3. **运行应用程序**：
   - 点击 "调试" → "开始执行(不调试)"

### 方法2：使用 .NET CLI

1. **安装 .NET 6.0 SDK**：
   - 从 [Microsoft 官网](https://dotnet.microsoft.com/download/dotnet/6.0) 下载并安装 .NET 6.0 SDK

2. **编译项目**：
   ```bash
   dotnet build
   ```

3. **运行应用程序**：
   ```bash
   dotnet run
   ```

## 项目结构

```
WT-Tool-Client/
├── Program.cs          # 应用程序入口点
├── MainForm.cs         # 主窗口
├── WT-Tool-Client.csproj  # 项目文件
└── README.md           # 说明文档
```

## 管理员后台连接

客户端通过以下 URL 连接到管理员后台：
```
https://wang-tin.github.io/jiangnanwangluo.github.io/
```

## 功能模块

1. **公告**：查看和刷新公告信息
2. **检测软件**：管理和下载 APK 文件
3. **春秋检测**：查看词条和解决方案
4. **Momo**：查看 Momo 相关的词条和解决方案
5. **牛头**：查看牛头相关的词条和解决方案
6. **Luan**：查看 Luan 相关的词条和解决方案
7. **模块下载**：管理和下载 ZIP 模块文件
8. **SH文件管理**：管理和下载 SH 脚本文件

## 注意事项

- 客户端需要网络连接才能从管理员后台获取数据
- 首次运行时可能需要等待数据加载
- 请确保管理员后台已正确部署在 GitHub Pages

## 许可证

MIT License