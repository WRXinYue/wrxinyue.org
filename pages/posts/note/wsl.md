---
title: Windows 开发技巧：WSL 篇
lang: zh
type: note
---

[[toc]]

# Windows 开发技巧：WSL 篇

在使用 Windows 系统时，我尽量保持简约，避免过多折腾，以减少潜在的问题。由于开发环境需要 Linux，WSL（Windows Subsystem for Linux）提供了良好的系统隔离。关于 Windows 11 的相关优化，可以参考这篇文章：[接纳不等于忍受，为舒服使用 Windows 11 的若干优化调整记录](https://blog.ichr.me/post/win11-optimization-notes/)。目前网络上许多 WSL 教程已经过时，本文作为个人记录，方便回顾。

- 知识点： [WSL](https://github.com/microsoft/WSL) | [Dev Home](https://github.com/microsoft/devhome)

## 本机环境

- Windows 11: Version 22H2 (OS Build 22621.4317)
- WSL: 2.3.24
- Ubuntu: 24.04.1 LTS
- Kernel: Linux version 5.15.153.1-microsoft-standard-WSL2
- Dev Home: 0.1801.640.0

## 使用 Dev Home 安装 WSL

[Dev Home](https://github.com/microsoft/devhome) 可以简化开发环境配置选项，支持一键安装 WSL、Docker、Visual Studio Code 等常用开发工具。

[安装](https://apps.microsoft.com/detail/9n8mhtphngvv) 并打开 [Dev Home](https://learn.microsoft.com/windows/dev-home/)，点击 [Environments](https://learn.microsoft.com/windows/dev-home/environments) 菜单项，选择 [Create environment](https://learn.microsoft.com/windows/dev-home/environments#create-a-new-environment-using-dev-home)，并选择 [Microsoft WSL](https://learn.microsoft.com/windows/wsl/install)。

这样安装的好处在于，它会自动配置环境，包括自动安装 Hyper-V 扩展和 WSL 扩展，避免不必要的麻烦。

在某些情况下，可能需要配置虚拟化功能，具体管理方式可参考 [虚拟化功能管理文档](https://learn.microsoft.com/windows/dev-home/windows-customization#virtualization-feature-management)。

## 设置 WSL 代理

> [!TIP]
> 不同 WSL 版本之间可能存在差异。在 [WSL 2.2.3+](https://github.com/microsoft/WSL/releases/tag/2.2.3) 版本中，可以通过 `wslinfo --wsl-version` 查看当前 WSL 版本，最新版本信息可在 <https://github.com/microsoft/WSL/releases> 查询。

在运行 Windows 11 22H2 及更高版本的计算机上，[WSL默认网络模式为NAT](https://learn.microsoft.com/windows/wsl/networking#default-networking-mode-nat)，可以在 [.wslconfig](https://learn.microsoft.com/zh-cn/windows/wsl/wsl-config#configuration-settings-for-wslconfig) 文件中的 [wsl2] 下设置 `networkingMode=mirrored` 以启用镜像模式网络。 启用此功能 WSL 将会采用全新的网络架构，将 Windows 上的网络接口“镜像”到 Linux 中，以增强网络功能和兼容性。

> [!Warning]
> 在 [2.0.5](https://github.com/microsoft/WSL/releases/tag/2.0.5)+ 版本中，建议 `.wslconfig` 配置使用 [wsl2] 而不是 [experimental]。

```bash
vim ~/.wslconfig
```

```powershell
# Settings apply across all Linux distros running on WSL 2
[wsl2]
networkingMode=mirrored # NAT | mirrored
dnsTunneling=true # Enable DNS tunneling by default (2.1.0)
autoProxy=true # Only mirror supported proxy settings when autoproxy is enabled (2.0.7)
firewall=true # Hyper-V firewall feature will be turned on by default (2.0.9)
```

- [DNS Tunneling](https://learn.microsoft.com/windows/wsl/networking#dns-tunneling)
- [Auto Proxy](https://learn.microsoft.com/windows/wsl/networking#auto-proxy)
- [WSL and firewall WSL](https://learn.microsoft.com/windows/wsl/networking#wsl-and-firewall)
- [Main WSL settings](https://learn.microsoft.com/windows/wsl/wsl-config#main-wsl-settings)

随后输入 `wsl --shutdown` 重启 WSL

> [!NOTE]
> - [What is the difference between wsl.conf and .wslconfig?](https://learn.microsoft.com/windows/wsl/wsl-config#what-is-the-difference-between-wslconf-and-wslconfig)
> - [you may need to bind your application to 0.0.0.0 instead of 127.0.0.1](https://learn.microsoft.com/windows/wsl/networking#connecting-via-remote-ip-addresses).

在 NAT 网络模式下，可以通过以下命令获取主机的 IP 地址：`ip route show | grep -i default | awk '{ print $3}'`。

而在镜像模式网络下，Linux 内部通过 localhost 地址 127.0.0.1 连接到 Windows 服务器。注意不支持 IPv6 localhost 地址 ::1。

测试：

```bash
curl -x 127.0.0.1:10809 https://www.google.com
# curl --socks5 127.0.0.1:10808 https://www.google.com
```

> 在默认情况下，wsl2 会自动设置系统代理，但某些程序仍需手动设置。
