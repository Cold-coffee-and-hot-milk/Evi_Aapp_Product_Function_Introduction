// 工具函数文件
// 这里可以添加通用的工具函数

// 示例工具函数：格式化日期
function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

// 示例工具函数：显示提示信息
function showToast(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
}

// 示例工具函数：获取URL参数
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
