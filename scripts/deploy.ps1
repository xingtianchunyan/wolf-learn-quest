# Wolf Learn Quest Windows 部署脚本
# PowerShell 版本的自动化部署脚本

param(
    [Parameter(Position=0)]
    [ValidateSet("build", "vercel", "netlify", "docker", "pm2")]
    [string]$DeploymentType = "build",
    
    [switch]$SkipTests,
    [switch]$Help
)

# 颜色定义
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Blue"
    White = "White"
}

# 日志函数
function Write-LogInfo {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Colors.Blue
}

function Write-LogSuccess {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Colors.Green
}

function Write-LogWarning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Colors.Yellow
}

function Write-LogError {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Colors.Red
}

# 显示帮助信息
function Show-Help {
    Write-Host "Wolf Learn Quest Windows 部署脚本" -ForegroundColor $Colors.White
    Write-Host ""
    Write-Host "用法: .\deploy.ps1 [部署类型] [选项]" -ForegroundColor $Colors.White
    Write-Host ""
    Write-Host "部署类型:" -ForegroundColor $Colors.White
    Write-Host "  build    - 仅构建项目（默认）"
    Write-Host "  vercel   - 部署到 Vercel"
    Write-Host "  netlify  - 部署到 Netlify"
    Write-Host "  docker   - 使用 Docker 部署"
    Write-Host "  pm2      - 使用 PM2 部署"
    Write-Host ""
    Write-Host "选项:" -ForegroundColor $Colors.White
    Write-Host "  -SkipTests  - 跳过测试"
    Write-Host "  -Help       - 显示帮助信息"
    Write-Host ""
    Write-Host "示例:" -ForegroundColor $Colors.White
    Write-Host "  .\deploy.ps1 build"
    Write-Host "  .\deploy.ps1 vercel"
    Write-Host "  .\deploy.ps1 docker -SkipTests"
}

# 检查命令是否存在
function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# 检查必要的工具
function Test-Dependencies {
    Write-LogInfo "检查部署依赖..."
    
    if (-not (Test-Command "node")) {
        Write-LogError "Node.js 未安装"
        exit 1
    }
    
    if (-not (Test-Command "npm")) {
        Write-LogError "npm 未安装"
        exit 1
    }
    
    Write-LogSuccess "依赖检查完成"
}

# 环境检查
function Test-Environment {
    Write-LogInfo "检查环境配置..."
    
    if (-not (Test-Path ".env.production")) {
        Write-LogWarning ".env.production 文件不存在，使用示例配置"
        if (Test-Path ".env.production.example") {
            Copy-Item ".env.production.example" ".env.production"
            Write-LogWarning "请编辑 .env.production 文件并填入正确的配置值"
        }
    }
    
    Write-LogSuccess "环境检查完成"
}

# 安装依赖
function Install-Dependencies {
    Write-LogInfo "安装项目依赖..."
    
    try {
        if (Test-Command "pnpm") {
            & pnpm install --frozen-lockfile
        } else {
            & npm ci
        }
        Write-LogSuccess "依赖安装完成"
    }
    catch {
        Write-LogError "依赖安装失败: $_"
        exit 1
    }
}

# 运行测试
function Invoke-Tests {
    Write-LogInfo "运行测试套件..."
    
    try {
        if (Test-Command "pnpm") {
            & pnpm run test
        } else {
            & npm run test
        }
        Write-LogSuccess "测试通过"
    }
    catch {
        Write-LogError "测试失败: $_"
        exit 1
    }
}

# 构建项目
function Build-Project {
    Write-LogInfo "构建生产版本..."
    
    try {
        if (Test-Command "pnpm") {
            & pnpm run build
        } else {
            & npm run build
        }
        Write-LogSuccess "构建完成"
    }
    catch {
        Write-LogError "构建失败: $_"
        exit 1
    }
}

# 部署到Vercel
function Deploy-Vercel {
    Write-LogInfo "部署到 Vercel..."
    
    if (-not (Test-Command "vercel")) {
        Write-LogWarning "Vercel CLI 未安装，正在安装..."
        & npm install -g vercel
    }
    
    try {
        & vercel --prod
        Write-LogSuccess "Vercel 部署完成"
    }
    catch {
        Write-LogError "Vercel 部署失败: $_"
        exit 1
    }
}

# 部署到Netlify
function Deploy-Netlify {
    Write-LogInfo "部署到 Netlify..."
    
    if (-not (Test-Command "netlify")) {
        Write-LogWarning "Netlify CLI 未安装，正在安装..."
        & npm install -g netlify-cli
    }
    
    try {
        & netlify deploy --prod --dir=dist
        Write-LogSuccess "Netlify 部署完成"
    }
    catch {
        Write-LogError "Netlify 部署失败: $_"
        exit 1
    }
}

# Docker部署
function Deploy-Docker {
    Write-LogInfo "构建 Docker 镜像..."
    
    if (-not (Test-Command "docker")) {
        Write-LogError "Docker 未安装"
        exit 1
    }
    
    try {
        # 构建镜像
        & docker build -t wolf-learn-quest:latest .
        
        # 停止旧容器
        & docker stop wolf-learn-quest 2>$null
        & docker rm wolf-learn-quest 2>$null
        
        # 启动新容器
        & docker run -d --name wolf-learn-quest -p 8080:8080 --restart unless-stopped wolf-learn-quest:latest
        
        Write-LogSuccess "Docker 部署完成"
    }
    catch {
        Write-LogError "Docker 部署失败: $_"
        exit 1
    }
}

# PM2部署
function Deploy-PM2 {
    Write-LogInfo "使用 PM2 部署..."
    
    if (-not (Test-Command "pm2")) {
        Write-LogWarning "PM2 未安装，正在安装..."
        & npm install -g pm2
    }
    
    # 安装serve用于静态文件服务
    if (-not (Test-Command "serve")) {
        & npm install -g serve
    }
    
    try {
        # 创建日志目录
        if (-not (Test-Path "logs")) {
            New-Item -ItemType Directory -Path "logs" | Out-Null
        }
        
        # 启动或重启应用
        & pm2 start ecosystem.config.js --env production
        & pm2 save
        
        Write-LogSuccess "PM2 部署完成"
    }
    catch {
        Write-LogError "PM2 部署失败: $_"
        exit 1
    }
}

# 健康检查
function Test-Health {
    param([string]$Url)
    
    Write-LogInfo "执行健康检查..."
    
    $maxAttempts = 30
    $attempt = 1
    
    while ($attempt -le $maxAttempts) {
        try {
            $response = Invoke-WebRequest -Uri $Url -Method Get -TimeoutSec 5 -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-LogSuccess "健康检查通过: $Url"
                return $true
            }
        }
        catch {
            # 忽略错误，继续尝试
        }
        
        Write-LogInfo "等待服务启动... ($attempt/$maxAttempts)"
        Start-Sleep -Seconds 2
        $attempt++
    }
    
    Write-LogError "健康检查失败: $Url"
    return $false
}

# 清理函数
function Invoke-Cleanup {
    Write-LogInfo "清理临时文件..."
    # 这里可以添加清理逻辑
    Write-LogSuccess "清理完成"
}

# 主函数
function Invoke-Main {
    param([string]$DeploymentType, [bool]$SkipTests)
    
    Write-LogInfo "开始部署流程: $DeploymentType"
    
    try {
        # 基础检查
        Test-Dependencies
        Test-Environment
        
        # 安装依赖和构建
        Install-Dependencies
        
        # 运行测试（可选）
        if (-not $SkipTests) {
            Invoke-Tests
        }
        
        Build-Project
        
        # 根据部署类型执行相应操作
        switch ($DeploymentType) {
            "vercel" {
                Deploy-Vercel
            }
            "netlify" {
                Deploy-Netlify
            }
            "docker" {
                Deploy-Docker
                Test-Health "http://localhost:8080"
            }
            "pm2" {
                Deploy-PM2
                Test-Health "http://localhost:8080"
            }
            "build" {
                Write-LogSuccess "构建完成，可以手动部署 dist 目录"
            }
            default {
                Write-LogError "未知的部署类型: $DeploymentType"
                Write-LogInfo "支持的部署类型: vercel, netlify, docker, pm2, build"
                exit 1
            }
        }
        
        Write-LogSuccess "部署流程完成!"
    }
    catch {
        Write-LogError "部署过程中发生错误: $_"
        exit 1
    }
    finally {
        Invoke-Cleanup
    }
}

# 脚本入口点
if ($Help) {
    Show-Help
    exit 0
}

# 执行主函数
Invoke-Main -DeploymentType $DeploymentType -SkipTests $SkipTests