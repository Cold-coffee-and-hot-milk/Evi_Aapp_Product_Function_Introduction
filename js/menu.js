// 菜单交互功能
document.addEventListener('DOMContentLoaded', function() {
    setupMenuInteractions();
});

// 设置菜单交互
function setupMenuInteractions() {
    // 为所有菜单项链接添加点击事件
    document.querySelectorAll('.menu-item-link, .submenu-item-link, .subsubmenu-item-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const menuItem = this.parentElement;
            const isActive = menuItem.classList.contains('active');

            // 检查菜单项是否有子菜单
            const hasSubmenu = menuItem.classList.contains('has-submenu');
            
            // 如果有子菜单，处理展开/折叠逻辑
            if (hasSubmenu) {
                // 切换当前菜单的激活状态
                menuItem.classList.toggle('active');
                
                // 获取子菜单元素
                const submenu = menuItem.querySelector('.submenu-items, .subsubmenu-items');
                if (submenu) {
                    // 切换子菜单的显示状态
                    if (menuItem.classList.contains('active')) {
                        submenu.style.display = 'block';
                    } else {
                        submenu.style.display = 'none';
                    }
                }
                
                // 关闭其他同级菜单
                if (menuItem.classList.contains('menu-item')) {
                    document.querySelectorAll('.menu-item.has-submenu.active').forEach(item => {
                        if (item !== menuItem) {
                            item.classList.remove('active');
                            const otherSubmenu = item.querySelector('.submenu-items');
                            if (otherSubmenu) {
                                otherSubmenu.style.display = 'none';
                            }
                        }
                    });
                } else if (menuItem.classList.contains('submenu-item')) {
                    const parent = menuItem.closest('.menu-item.has-submenu');
                    if (parent) {
                        parent.querySelectorAll('.submenu-item.has-submenu.active').forEach(item => {
                            if (item !== menuItem) {
                                item.classList.remove('active');
                                const otherSubmenu = item.querySelector('.subsubmenu-items');
                                if (otherSubmenu) {
                                    otherSubmenu.style.display = 'none';
                                }
                            }
                        });
                    }
                }
            } 
            // 如果没有子菜单，处理页面加载逻辑
            else {
                const pageName = menuItem.getAttribute('data-page');
                if (pageName) {
                    // 直接使用loadPage函数加载页面，包括设备工况页面
                    loadPage(pageName);
                    
                    // 在移动端关闭菜单
                    closeMenu();
                }
            }
        });
    });
}