// 上外新生攻略系统 - JavaScript交互功能

// 页面导航函数
function navigateToPage(pageName) {
    // 添加点击反馈效果
    const clickedCard = event.currentTarget;
    clickedCard.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        clickedCard.style.transform = '';
        // 导航到目标页面
        window.location.href = pageName;
    }, 150);
}

// 搜索功能
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        // 搜索按钮点击事件
        searchBtn.addEventListener('click', performSearch);
        
        // 回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // 实时搜索建议
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 0) {
                highlightMatchingCards(query);
            } else {
                clearHighlights();
            }
        });
    }
}

// 执行搜索
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        alert('请输入搜索关键词');
        return;
    }
    
    // 搜索关键词映射
    const searchMap = {
        '军训': '入学准备.html',
        '入学': '入学准备.html',
        '报到': '入学准备.html',
        '新生': '入学准备.html',
        '选课': '学术相关.html',
        '专业': '学术相关.html',
        '转专业': '学术相关.html',
        '辅修': '学术相关.html',
        '院系': '学术相关.html',
        '教材': '学术相关.html',
        '制度': '政策制度.html',
        '规章': '政策制度.html',
        '学分': '政策制度.html',
        '考试': '政策制度.html',
        '文化': '校园文化.html',
        '历史': '校园文化.html',
        '校训': '校园文化.html',
        '传统': '校园文化.html',
        '服务': '校园服务.html',
        '图书馆': '校园服务.html',
        '食堂': '校园服务.html',
        '医务': '校园服务.html',
        '银行': '校园服务.html',
        '网络': '校园服务.html',
        '生活': '校园生活.html',
        '宿舍': '校园生活.html',
        '社团': '校园生活.html',
        '体育': '校园生活.html',
        '娱乐': '校园生活.html'
    };
    
    // 查找匹配的页面
    let targetPage = null;
    for (const keyword in searchMap) {
        if (query.includes(keyword)) {
            targetPage = searchMap[keyword];
            break;
        }
    }
    
    if (targetPage) {
        // 添加搜索动画效果
        searchInput.style.transform = 'scale(0.95)';
        setTimeout(() => {
            searchInput.style.transform = '';
            window.location.href = targetPage;
        }, 200);
    } else {
        alert('未找到相关内容，请尝试其他关键词');
    }
}

// 高亮匹配的卡片
function highlightMatchingCards(query) {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            card.style.border = '2px solid var(--accent-orange)';
            card.style.transform = 'scale(1.02)';
        } else {
            card.style.opacity = '0.6';
        }
    });
}

// 清除高亮效果
function clearHighlights() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.style.border = '';
        card.style.transform = '';
        card.style.opacity = '';
    });
}

// 卡片悬停效果增强
function enhanceCardInteractions() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        // 鼠标进入效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
        });
        
        // 鼠标离开效果
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // 点击波纹效果
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 107, 53, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - this.offsetLeft) + 'px';
            ripple.style.top = (e.clientY - this.offsetTop) + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化搜索功能
    initializeSearch();
    
    // 增强卡片交互
    enhanceCardInteractions();
    
    // 添加页面加载动画
    document.body.classList.add('page-transition');
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// 添加波纹动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 返回顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 监听滚动事件，显示返回顶部按钮 - 已禁用
// 注释掉自动生成右下角返回顶部按钮的功能，保留页面底部的手动按钮
/*
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
        if (!document.querySelector('.back-to-top')) {
            const backToTopBtn = document.createElement('button');
            backToTopBtn.className = 'back-to-top modern-button';
            backToTopBtn.innerHTML = '↑ 返回顶部';
            backToTopBtn.style.position = 'fixed';
            backToTopBtn.style.bottom = '20px';
            backToTopBtn.style.right = '20px';
            backToTopBtn.style.zIndex = '1000';
            backToTopBtn.onclick = scrollToTop;
            document.body.appendChild(backToTopBtn);
        }
    } else {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            backToTopBtn.remove();
        }
    }
});
*/

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl + F 或 Cmd + F 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // ESC 键清除搜索
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
            clearHighlights();
        }
    }
});

// 导出函数供全局使用
window.navigateToPage = navigateToPage;
window.scrollToTop = scrollToTop;
