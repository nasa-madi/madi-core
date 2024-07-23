---
sidebar_position: 2
slug: '/simple'
title: 'Simple'
---

# Simple Getting Started
This documentation is for spinning up a local instance of MADI for direct usage.  It does not enable any local coding.

### 1. Install Docker

For OSX, see [these instructions](https://docs.docker.com/desktop/install/mac-install/)

For Windows, see [these instructions](https://docs.docker.com/desktop/install/windows-install/)

To verify that your Docker instance is work, trying running a test container:

```shell
docker run hell-world
```

This command downloads a test image and runs it in a container. If Docker is installed correctly, you will see a "Hello from Docker!" message.

For more detailed instructions and troubleshooting, refer to the official Docker documentation: [Docker Documentation](https://docs.docker.com/docker-for-mac/install/)


### 2. Pull the latest images

Once you have docker installed, you need to get a copy of the docker compose file with all of the necessary components.

Fetch the file with this command:
```shell
curl -o docker-compose-simple.yml https://github.com/nasa-madi/madi-core/blob/main/docker-compose-simple.yml
```

From the same folder that you downloaded the file above, you can now pull the relevant images.

```shell
docker compose pull
```


### 3. Add Env Variables

In the new `docker-compose.yml` file that you created, locate the following section:

```yml
  api:
    image: nasamadi/madi-api:latest
    environment:
      - NODE_ENV=development
      - NODE_CONFIG_ENV=docker
      - OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXX
    ports:
      - "3030:3030"
```

Replace the `sk-XXXXXXXXXXXXXXXXXXXXXXXX` with your own OpenAI API key and save

### 4. Running the Stack

From the terminal, run the following command:

```shell
docker compose -f docker-compose-simple.yml -p madi-simple up
```

Assuming there are no errors in booting up the various containers, you can now go to `http://localhost:3000` and see your local MADI instance.

