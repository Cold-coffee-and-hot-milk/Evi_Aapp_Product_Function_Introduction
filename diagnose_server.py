#!/usr/bin/env python3
import socket
import subprocess
import platform
import sys


def get_ip():
    """获取所有可用的IP地址"""
    ips = []
    for iface in socket.if_nameindex():
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(('8.8.8.8', 53))
            local_ip = s.getsockname()[0]
            if local_ip != '127.0.0.1':
                ips.append(local_ip)
            s.close()
        except:
            pass
    return ips


def check_port(port=8000):
    """检查端口是否真正可访问"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(2)

    # 测试0.0.0.0绑定
    try:
        result = sock.connect_ex(('0.0.0.0', port))
        print(f"0.0.0.0:{port} - {'✅ 可达' if result == 0 else '❌ 不可达'}")
    except:
        print(f"0.0.0.0:{port} - ❌ 连接失败")

    # 测试127.0.0.1
    try:
        sock2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock2.settimeout(2)
        result = sock2.connect_ex(('127.0.0.1', port))
        print(f"127.0.0.1:{port} - {'✅ 可达' if result == 0 else '❌ 不可达'}")
    except:
        print(f"127.0.0.1:{port} - ❌ 连接失败")

    sock.close()


def main():
    print("=== 网络诊断工具 ===")

    # 1. 获取IP
    print("\n1. 可用的网络接口IP:")
    ips = get_ip()
    if ips:
        for ip in ips:
            print(f"   ✅ {ip}")
    else:
        print("   ❌ 未找到可用IP地址")

    # 2. 检查防火墙
    print("\n2. 防火墙状态检查:")
    system = platform.system()
    if system == "Darwin":  # macOS
        try:
            result = subprocess.run(['/usr/libexec/ApplicationFirewall/socketfilterfw', '--getglobalstate'],
                                    capture_output=True, text=True)
            print(f"   {result.stdout.strip()}")
        except:
            print("   无法检查防火墙状态")

    # 3. 测试URL
    print("\n3. 测试访问地址:")
    if ips:
        for ip in ips:
            print(f"   手机访问地址: http://{ip}:8000")
    print("   本地访问地址: http://localhost:8000")
    print("   本地访问地址: http://127.0.0.1:8000")

    # 4. 检查端口
    print("\n4. 端口检查 (请在启动服务器后运行):")
    check_port(8000)


if __name__ == "__main__":
    main()