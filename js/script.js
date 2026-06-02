// 等待DOM内容加载完毕后再执行脚本
document.addEventListener('DOMContentLoaded', function() {

    // 获取所有导航链接和内容区块
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // 函数：切换活动部分
    function switchActiveSection(sectionId) {
        // 隐藏所有内容区块
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // 移除所有导航链接的活跃状态
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // 显示目标内容区块
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // 为当前点击的导航链接添加活跃状态
        const activeLink = document.querySelector(`a[href="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // 为每个导航链接添加点击事件监听器
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认的锚点跳转行为

            const targetId = this.getAttribute('href'); // 获取href属性，如 #overview

            // 切换活动部分
            switchActiveSection(targetId);

            // 可选：平滑滚动到目标区块顶部
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }

            // 更新浏览器地址栏的URL（不刷新页面）
            history.pushState(null, null, targetId);
        });
    });

    // 可选：监听浏览器前进/后退按钮
    window.addEventListener('popstate', function() {
        const currentHash = window.location.hash || '#overview';
        switchActiveSection(currentHash);
    });

    // 初始化页面：根据URL哈希决定显示哪个部分，默认显示概述
    const initialHash = window.location.hash;
    if (initialHash) {
        switchActiveSection(initialHash);
    } else {
        switchActiveSection('#overview');
    }
});