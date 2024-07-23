---
sidebar_position: 3
slug: '/advanced'
title: 'Advanced'
---

# Advanced Getting Started
The service is composed of three major components, a frontend interface, a Node API on a PostgresDB, and a Langchain Pipeline server. 

The tool set is as follows:
 - FeathersJS in NodeJS
 - Docker / CloudRun
 - PostgreSQL / CloudSQL 
 - Blob Storage in GCS / local folder
 - Meta ( a repository manager )
 - NLM-Ingestor (An Apache Tika-based Document Parser)
 - Terraform

### 1. Installing Node Version Manager
nvm is a version manager for node.js, designed to be installed per-user, and invoked per-shell. nvm works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and windows WSL.

See this link for more info: https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script

Install with curl and add the env vars:

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash;

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm;
```

### 2. Install Node
Now that nvm is install we can install the right version of node.

```shell
nvm install node;
nvm use node;
```

### 3. Installing Docker on macOS

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


### 4. Meta Repo Manager
This repo contains a `.meta` file which links to all the various repos needed to stand up the full MADI stack and some extras. 

First we need to install `meta`.  Run `npm i -g meta` on your machine. NPM should be installed with your node instance already.

Then `cd` into the folder for this repo. Then run `meta git update` and it should clone all of the repos in the `.meta` file.  

For more information checkout https://github.com/mateodelnorte/meta

> NOTE: If you encounter an error with `madi-terraform` you may not have permissions for that repo.

> NOTE: If `meta git update` does not pull the sub repos, try deleting the placeholder folder (e.g. `/api`) and running again.


### 5. Install Node Dependencies
Meta can loop over multiple repos and run the same commands.  So we can do that to install our node dependencies.  
```shell
meta exec "npm install"
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

