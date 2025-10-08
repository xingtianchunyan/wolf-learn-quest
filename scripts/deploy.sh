#!/bin/bash

# Wolf Learn Quest 部署脚本
# 用于自动化部署流程

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查必要的工具
check_dependencies() {
    log_info "检查部署依赖..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装"
        exit 1
    fi
    
    log_success "依赖检查完成"
}

# 环境检查
check_environment() {
    log_info "检查环境配置..."
    
    if [ ! -f ".env.production" ]; then
        log_warning ".env.production 文件不存在，使用示例配置"
        if [ -f ".env.production.example" ]; then
            cp .env.production.example .env.production
            log_warning "请编辑 .env.production 文件并填入正确的配置值"
        fi
    fi
    
    log_success "环境检查完成"
}

# 安装依赖
install_dependencies() {
    log_info "安装项目依赖..."
    
    if command -v pnpm &> /dev/null; then
        pnpm install --frozen-lockfile
    else
        npm ci
    fi
    
    log_success "依赖安装完成"
}

# 运行测试
run_tests() {
    log_info "运行测试套件..."
    
    if command -v pnpm &> /dev/null; then
        pnpm run test
    else
        npm run test
    fi
    
    log_success "测试通过"
}

# 构建项目
build_project() {
    log_info "构建生产版本..."
    
    if command -v pnpm &> /dev/null; then
        pnpm run build
    else
        npm run build
    fi
    
    log_success "构建完成"
}

# 部署到Vercel
deploy_vercel() {
    log_info "部署到 Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI 未安装，正在安装..."
        npm install -g vercel
    fi
    
    vercel --prod
    log_success "Vercel 部署完成"
}

# 部署到Netlify
deploy_netlify() {
    log_info "部署到 Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        log_warning "Netlify CLI 未安装，正在安装..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=dist
    log_success "Netlify 部署完成"
}

# Docker部署
deploy_docker() {
    log_info "构建 Docker 镜像..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装"
        exit 1
    fi
    
    # 构建镜像
    docker build -t wolf-learn-quest:latest .
    
    # 停止旧容器
    docker stop wolf-learn-quest 2>/dev/null || true
    docker rm wolf-learn-quest 2>/dev/null || true
    
    # 启动新容器
    docker run -d \
        --name wolf-learn-quest \
        -p 8080:8080 \
        --restart unless-stopped \
        wolf-learn-quest:latest
    
    log_success "Docker 部署完成"
}

# PM2部署
deploy_pm2() {
    log_info "使用 PM2 部署..."
    
    if ! command -v pm2 &> /dev/null; then
        log_warning "PM2 未安装，正在安装..."
        npm install -g pm2
    fi
    
    # 安装serve用于静态文件服务
    if ! command -v serve &> /dev/null; then
        npm install -g serve
    fi
    
    # 创建日志目录
    mkdir -p logs
    
    # 启动或重启应用
    pm2 start ecosystem.config.js --env production
    pm2 save
    
    log_success "PM2 部署完成"
}

# 健康检查
health_check() {
    log_info "执行健康检查..."
    
    local url=$1
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "$url" > /dev/null; then
            log_success "健康检查通过: $url"
            return 0
        fi
        
        log_info "等待服务启动... ($attempt/$max_attempts)"
        sleep 2
        ((attempt++))
    done
    
    log_error "健康检查失败: $url"
    return 1
}

# 清理函数
cleanup() {
    log_info "清理临时文件..."
    # 这里可以添加清理逻辑
    log_success "清理完成"
}

# 主函数
main() {
    local deployment_type=${1:-"build"}
    
    log_info "开始部署流程: $deployment_type"
    
    # 设置错误处理
    trap cleanup EXIT
    
    # 基础检查
    check_dependencies
    check_environment
    
    # 安装依赖和构建
    install_dependencies
    
    # 运行测试（可选）
    if [ "$SKIP_TESTS" != "true" ]; then
        run_tests
    fi
    
    build_project
    
    # 根据部署类型执行相应操作
    case $deployment_type in
        "vercel")
            deploy_vercel
            ;;
        "netlify")
            deploy_netlify
            ;;
        "docker")
            deploy_docker
            health_check "http://localhost:8080"
            ;;
        "pm2")
            deploy_pm2
            health_check "http://localhost:8080"
            ;;
        "build")
            log_success "构建完成，可以手动部署 dist 目录"
            ;;
        *)
            log_error "未知的部署类型: $deployment_type"
            log_info "支持的部署类型: vercel, netlify, docker, pm2, build"
            exit 1
            ;;
    esac
    
    log_success "部署流程完成!"
}

# 显示帮助信息
show_help() {
    echo "Wolf Learn Quest 部署脚本"
    echo ""
    echo "用法: $0 [部署类型]"
    echo ""
    echo "部署类型:"
    echo "  build    - 仅构建项目（默认）"
    echo "  vercel   - 部署到 Vercel"
    echo "  netlify  - 部署到 Netlify"
    echo "  docker   - 使用 Docker 部署"
    echo "  pm2      - 使用 PM2 部署"
    echo ""
    echo "环境变量:"
    echo "  SKIP_TESTS=true  - 跳过测试"
    echo ""
    echo "示例:"
    echo "  $0 build"
    echo "  $0 vercel"
    echo "  SKIP_TESTS=true $0 docker"
}

# 检查参数
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_help
    exit 0
fi

# 执行主函数
main "$@"