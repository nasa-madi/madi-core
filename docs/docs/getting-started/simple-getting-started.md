---
sidebar_position: 2
slug: '/getting-started/simple'
title: 'Simple Getting Started'
---

# Simple Getting Started

This documentation provides instructions for setting up a local instance of MADI using Docker. This setup is designed for direct usage and does not include local coding capabilities.

### 1. Install Docker

First, you need to install Docker on your system.

- **For macOS**: Follow [these instructions](https://docs.docker.com/desktop/install/mac-install/) to install Docker Desktop for macOS.
- **For Windows**: Follow [these instructions](https://docs.docker.com/desktop/install/windows-install/) to install Docker Desktop for Windows.

To verify that Docker is installed correctly, you can run a test container. Open your terminal and execute:

```shell
docker run hello-world
```

This command downloads a test image and runs it in a container. If Docker is installed correctly, you will see a message saying "Hello from Docker!"

For more detailed instructions and troubleshooting, refer to the official Docker documentation: [Docker Documentation](https://docs.docker.com/).

### 2. Pull the Latest Images

After installing Docker, you need to fetch the Docker Compose file that includes all the necessary components for MADI.

Download the necessary files using the following command:

```shell
mkdir simple-stack
cd simple-stack
curl -o docker-compose.yml https://raw.githubusercontent.com/nasa-madi/madi-core/main/examples/simple-stack/docker-compose.yml
curl -o config.yml https://raw.githubusercontent.com/nasa-madi/madi-core/main/examples/simple-stack/config.yml
```

Once the file is downloaded, you can start up the docker compose services from the `simple-stack` folder:

```shell
docker compose pull
```

### 3. Add Environment Variables

In the `config.yml` file that you downloaded, locate the section related to openai:

```yaml
openai: 
  key: sk-XXXXXXXXXXXXXXXXXX #This is what you change.
```

Replace `sk-XXXXXXXXXXXXXXXXXXXXXXXX` with your own OpenAI API key. Ensure that you keep the key secure and do not expose it publicly. Save the changes to the file.  This config file will be pulled into the API container and used locally to run your API with your own key.

### 4. Running the Stack
To start the MADI stack, run the following command in your terminal:

```shell
docker compose up
```

If everything is configured correctly, Docker will start up the containers and you should be able to access your local MADI instance by navigating to `http://localhost:3000` in your web browser.







### 5. Side-Loading a Plugin
```yaml
  api:
    image: nasamadi/madi-api:latest
    environment:
      # other configs
      - PLUGINS={"default":"casConfluence"}}
    ports:
      - "3030:3030"
```
