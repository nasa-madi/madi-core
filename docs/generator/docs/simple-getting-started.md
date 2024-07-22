---
sidebar_position: 2
---

# Simple Getting Started
This documentation is for spinning up a local instance of MADI for direct usage.  It does not enable any local coding.


### 1. Installing Docker

#### MacOS

Docker is a platform for developing, shipping, and running applications inside containers. Follow these steps to install Docker on macOS.

1. **Download Docker Desktop for Mac**

   Visit the Docker Desktop for Mac download page and download the installer:
   [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)

2. **Install Docker Desktop**

   - Open the downloaded `.dmg` file.
   - Drag the Docker icon to the Applications folder.

3. **Launch Docker Desktop**

   - Open Docker from the Applications folder.
   - You may be prompted to authorize Docker with your system password.
   - Follow the on-screen instructions to complete the setup.

4. **Verify Installation**

   Open a terminal and run the following command to verify that Docker is installed correctly:
```shell
docker --version
```
   You should see the Docker version information.

5. **Run a Test Container**

    To ensure Docker is working correctly, run a test container:

```shell
docker run hell-world
```

    This command downloads a test image and runs it in a container. If Docker is installed correctly, you will see a "Hello from Docker!" message.

    For more detailed instructions and troubleshooting, refer to the official Docker documentation: [Docker Documentation](https://docs.docker.com/docker-for-mac/install/)


#### Windows

[tbd]


### 2. Pulling the latest images

Once you have docker installed, you need to get a copy of the docker compose file with all of the necessary components.

Fetch the file with this command:
```shell
curl -o docker-compose.yml https://github.com/nasa-madi/madi-core/blob/main/docker-compose-simple.yml
```



### 6. Adding Env Variables
Some variables in the `/api` repository cannot be stored in the repository.  You can work with an existing developer to get additional keys and variables for your local instance.  But here's the basic setup process.

The `node-config` library, which handles the `api` configurtions, will merge the `/api/config/default.yml` and the `local.yml` we are about to create and update.  This command duplicates the example.yml config file and creates a local.yml.

```shell
cp ./api/config/example.yml ./api/config/local.yml
```

You will have to get an OpenAI apiKey and add it to the local.yml file like so:

```yml
openai: 
  key: <<YOUR_KEY_GOES_HERE>>
```

### 7. 

