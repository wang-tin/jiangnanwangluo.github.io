using System;
using System.Drawing;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WTToolClient
{
    public partial class MainForm : Form
    {
        private Panel sidebarPanel;
        private Panel contentPanel;
        private Button[] sidebarButtons;
        private string[] sectionNames = { "公告", "检测软件", "春秋检测", "Momo", "牛头", "Luan", "模块下载", "SH文件管理" };
        private string[] sectionKeys = { "announcement", "detection", "spring-autumn", "momo", "niutou", "luan", "module", "sh-file" };
        private string adminApiUrl = "https://wang-tin.github.io/jiangnanwangluo.github.io/";

        public MainForm()
        {
            InitializeComponent();
            SetupUI();
        }

        private void SetupUI()
        {
            // 表单设置
            this.Text = "WT Tool 客户端";
            this.Size = new Size(1000, 700);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.BackColor = Color.FromArgb(245, 245, 245);

            // 创建侧边栏
            sidebarPanel = new Panel
            {
                Dock = DockStyle.Left,
                Width = 200,
                BackColor = Color.White,
                BorderStyle = BorderStyle.FixedSingle
            };
            this.Controls.Add(sidebarPanel);

            // 创建主内容区域
            contentPanel = new Panel
            {
                Dock = DockStyle.Fill,
                BackColor = Color.White,
                BorderStyle = BorderStyle.FixedSingle
            };
            this.Controls.Add(contentPanel);

            // 创建侧边栏按钮
            sidebarButtons = new Button[sectionNames.Length];
            for (int i = 0; i < sectionNames.Length; i++)
            {
                sidebarButtons[i] = new Button
                {
                    Text = sectionNames[i],
                    Width = sidebarPanel.Width - 20,
                    Height = 40,
                    Location = new Point(10, 10 + i * 50),
                    BackColor = Color.FromArgb(240, 240, 240),
                    FlatStyle = FlatStyle.Flat,
                    Font = new Font("微软雅黑", 10),
                    Tag = sectionKeys[i]
                };
                sidebarButtons[i].FlatAppearance.BorderSize = 0;
                sidebarButtons[i].Click += SidebarButton_Click;
                sidebarPanel.Controls.Add(sidebarButtons[i]);
            }

            // 设置默认选中的按钮
            SetActiveButton(0);
            LoadSectionContent(sectionKeys[0]);
        }

        private void SidebarButton_Click(object sender, EventArgs e)
        {
            Button button = (Button)sender;
            string sectionKey = button.Tag.ToString();
            int index = Array.IndexOf(sectionKeys, sectionKey);
            SetActiveButton(index);
            LoadSectionContent(sectionKey);
        }

        private void SetActiveButton(int index)
        {
            for (int i = 0; i < sidebarButtons.Length; i++)
            {
                if (i == index)
                {
                    sidebarButtons[i].BackColor = Color.FromArgb(59, 130, 246);
                    sidebarButtons[i].ForeColor = Color.White;
                }
                else
                {
                    sidebarButtons[i].BackColor = Color.FromArgb(240, 240, 240);
                    sidebarButtons[i].ForeColor = Color.Black;
                }
            }
        }

        private async void LoadSectionContent(string sectionKey)
        {
            contentPanel.Controls.Clear();

            // 创建加载指示器
            Label loadingLabel = new Label
            {
                Text = "加载中...",
                AutoSize = true,
                Location = new Point(contentPanel.Width / 2 - 40, contentPanel.Height / 2),
                Font = new Font("微软雅黑", 12)
            };
            contentPanel.Controls.Add(loadingLabel);

            try
            {
                // 模拟从管理员后台获取数据
                await Task.Delay(500); // 模拟网络延迟
                string content = await GetSectionContent(sectionKey);

                // 清除加载指示器
                contentPanel.Controls.Clear();

                // 创建内容标签
                Label contentLabel = new Label
                {
                    Text = content,
                    AutoSize = true,
                    Location = new Point(20, 20),
                    Font = new Font("微软雅黑", 10),
                    MaximumSize = new Size(contentPanel.Width - 40, 0)
                };
                contentPanel.Controls.Add(contentLabel);

                // 根据 section 添加相应的操作按钮
                AddSectionSpecificControls(sectionKey);
            }
            catch (Exception ex)
            {
                contentPanel.Controls.Clear();
                Label errorLabel = new Label
                {
                    Text = $"加载失败: {ex.Message}",
                    AutoSize = true,
                    Location = new Point(20, 20),
                    Font = new Font("微软雅黑", 10),
                    ForeColor = Color.Red
                };
                contentPanel.Controls.Add(errorLabel);
            }
        }

        private async Task<string> GetSectionContent(string sectionKey)
        {
            // 这里应该从管理员后台获取数据
            // 由于是模拟，返回静态内容
            switch (sectionKey)
            {
                case "announcement":
                    return "公告管理\n\n这里显示最新的公告信息。\n\n公告是向所有用户发布的重要信息，包括系统更新、维护通知等。";
                case "detection":
                    return "检测软件\n\n这里管理各种检测软件的APK文件。\n\n检测软件用于检测系统安全状态和潜在威胁。";
                case "spring-autumn":
                    return "春秋检测\n\n这里管理春秋检测的词条和解决方案。\n\n春秋检测用于识别和处理特定类型的问题。";
                case "momo":
                    return "Momo管理\n\n这里管理Momo相关的词条和解决方案。\n\nMomo管理模块用于处理与Momo相关的问题。";
                case "niutou":
                    return "牛头管理\n\n这里管理牛头相关的词条和解决方案。\n\n牛头管理模块用于处理与牛头相关的问题。";
                case "luan":
                    return "Luan管理\n\n这里管理Luan相关的词条和解决方案。\n\nLuan管理模块用于处理与Luan相关的问题。";
                case "module":
                    return "模块下载\n\n这里管理各种功能模块的ZIP文件。\n\n模块是可扩展的功能组件，可以增强系统能力。";
                case "sh-file":
                    return "SH文件管理\n\n这里管理各种SH脚本文件。\n\nSH文件是Shell脚本，用于自动化执行各种任务。";
                default:
                    return "未知分区";
            }
        }

        private void AddSectionSpecificControls(string sectionKey)
        {
            // 根据不同分区添加特定的控件
            switch (sectionKey)
            {
                case "detection":
                case "module":
                case "sh-file":
                    // 添加下载按钮
                    Button downloadButton = new Button
                    {
                        Text = "下载文件",
                        Width = 100,
                        Height = 35,
                        Location = new Point(20, 100),
                        BackColor = Color.FromArgb(59, 130, 246),
                        ForeColor = Color.White,
                        FlatStyle = FlatStyle.Flat
                    };
                    downloadButton.FlatAppearance.BorderSize = 0;
                    downloadButton.Click += (sender, e) => DownloadFile(sectionKey);
                    contentPanel.Controls.Add(downloadButton);
                    break;
                case "spring-autumn":
                case "momo":
                case "niutou":
                case "luan":
                    // 添加查看解决方案按钮
                    Button solutionButton = new Button
                    {
                        Text = "查看解决方案",
                        Width = 120,
                        Height = 35,
                        Location = new Point(20, 100),
                        BackColor = Color.FromArgb(16, 185, 129),
                        ForeColor = Color.White,
                        FlatStyle = FlatStyle.Flat
                    };
                    solutionButton.FlatAppearance.BorderSize = 0;
                    solutionButton.Click += (sender, e) => ViewSolutions(sectionKey);
                    contentPanel.Controls.Add(solutionButton);
                    break;
                case "announcement":
                    // 添加刷新公告按钮
                    Button refreshButton = new Button
                    {
                        Text = "刷新公告",
                        Width = 100,
                        Height = 35,
                        Location = new Point(20, 100),
                        BackColor = Color.FromArgb(245, 158, 11),
                        ForeColor = Color.White,
                        FlatStyle = FlatStyle.Flat
                    };
                    refreshButton.FlatAppearance.BorderSize = 0;
                    refreshButton.Click += (sender, e) => LoadSectionContent(sectionKey);
                    contentPanel.Controls.Add(refreshButton);
                    break;
            }
        }

        private void DownloadFile(string sectionKey)
        {
            // 模拟文件下载
            MessageBox.Show($"开始下载{sectionKey}文件...");
            // 这里应该实现从GitHub Pages下载文件的逻辑
        }

        private void ViewSolutions(string sectionKey)
        {
            // 模拟查看解决方案
            MessageBox.Show($"查看{sectionKey}的解决方案...");
            // 这里应该实现从GitHub Pages获取解决方案的逻辑
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // MainForm
            // 
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Name = "MainForm";
            this.Text = "MainForm";
            this.ResumeLayout(false);
        }
    }
}