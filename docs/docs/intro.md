---
sidebar_position: 1
slug: /
---

#  Overview

The MADI project aims to improve how we visualize and interact with digital infrastructure data for aerospace applications. Sponsored by NASA's Aeronautics Research Mission Directorate and the Convergent Aeronautics Solutions Project, it uses artificial intelligence (AI) to streamline the analysis and management of large datasets, global trends, and future challenges.

This repository contains the core API of the MADI system. By combining AI capabilities from OpenAI with a core API framework provided by Feathers v5, MADI helps reduce the infrastructure burden for new teams and supports customized prompt engineering. The API can be expanded with plugins. See the Tools section for more details.

### Architecture

![Architecture Diagram](/img/architecture.png)

### Features

- **Bring Your Own Interface**
    - Compatible with various interfaces, including Web and Chrome Extension (development currently paused).
- **Model Agnostic (ish)**
    - Supports a range of AI models such as GPT 3.5+, Claude 3+, and any tool supporting chat models.
- **Easy Plugin Developer Experience**
    - Simplified plugin development using Docker and JavaScript, making it easy to extend and customize functionality.
- **Built-In / Opt-In Capabilities**
    - Includes features like vector search, document parsing, and document management, which can be enabled as needed.
- **Cloud-Native, Enterprise-Approved Components**
    - Utilizes cloud-native components that meet enterprise standards for security and reliability.
- **Authentication & Permissioning**
    - Robust authentication and permissioning system to ensure secure access and control.
- **Automated Deployments**
    - Supports automated deployment and CICD processes, enhancing efficiency and consistency in managing the application.
- **Dockerized**
    - All components are wrapped in individual Docker containers, enabling mix-and-match composing of services.

