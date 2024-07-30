---
sidebar_position: 3
slug: '/getting-started/advanced'
title: 'Developer Instructions'
---

### Overview

MADI is built as a collection of indepedent components.  This enables easier debugging and flexibility in deployments. Each component is available, for the most part, is available as a distinct Docker container, enabling mix-and-match service offerings.  

The key components are:
1. **API**: FeathersJS in NodeJS
1. **Database**: PostgreSQL / CloudSQL
1. **Blob Storage**: Google Cloud Storage
1. **Repository Managment**: Meta (instead of Git Submodules)
1. **Parsers**: NLM-Ingestor (An Apache Tika-based Document Parser)
1. **Infrastructure as Code**: Terraform

### Cloud Compatability

The code is relatively cloud-agnostic, with two caveats:
1. The Blob Storage service is emulated with a Google Cloud Storage emulator.  Similar emulators exist for AWS buckets.
1. The Terraform code is only written for Google Cloud, currently. AWS and Azure support are on the roadmap, but not a top priority.  Nothing precludes adapting this code for AWS or Azure, since almost all components are docker-based or have cloud-native analogs to GCP.
1. The DB is built on postgres _with pgvector_.  While not the most advanced vector search solution, it is now widely available and scalable in almost every cloud provider's native offerings. Using a plugin to connect to Weaviate, Pinecone, etc. is absolutely possible, as is connection to any other DB engine.

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
Now that nvm is install we can install the right version of node.  We suggest starting with `^20.x` or later.

```shell
nvm install node;
nvm use node;
```

### 3. Installing Docker on macOS

Docker is a platform for developing, shipping, and running applications inside containers. Follow these steps to install Docker for you specific platform.

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
Meta is a tool that splits the difference between git-submodules and a monorepo.  The `madi-core` repo is the "parent" repo, laying out a common development environment for all contributors to MADI.  But a monorepo was infeasible, given the size, complexity, and varying deployment needs of each sub-component.  Meta effectively "loops" over each register sub-repo inside the parent repo and performs the same command.  This enables easy `git updates` and `npm install` commands without the frustration of git submodules.  For more information checkout https://github.com/mateodelnorte/meta


The `madi-core` repo contains a `.meta` file which links to all the various repos needed to stand up the full MADI stack and some extras.  Almost all components can be run as Docker containers instead of pulling the full submodule.  We will assume that all submodules will be cloned for this install.

First we need to install `meta`.  Run `npm i -g meta` on your machine. NPM should be installed with your node instance already.

Then `cd` into the folder for this repo. Then run `meta git update` and it should clone all of the repos in the `.meta` file.  


> NOTE: If you encounter an error with `madi-terraform` you may not have permissions for that repo.  Access can be provisioned on a need-basis.

> NOTE: If `meta git update` does not pull the sub repos, try deleting the placeholder folder (e.g. `/api`) and running again. 


### 5. Install Node Dependencies
Meta can loop over multiple repos and run the same commands.  So we can do that to install our node dependencies.  
```shell
meta exec "npm install"
```

### 6. Adding Env Variables
Some variables in the `/api` repository cannot be stored in the repository.  You can work with an existing developer to get additional keys and variables for your local instance.  

The API uses the `node-config` library as part of default configuration management inside [FeathersJS](https://feathersjs.com/).  Configurations are all stored in `/api/config/` folder, with defaults set in `default.yml`.  A `local.yml` will override all other environment configs, so that's what we will create. This command duplicates the example.yml config file and creates a local.yml.

```shell
cp ./api/config/example.yml ./api/config/local.yml
```

You will have to get an OpenAI apiKey and add it to the local.yml file like so:

```yml
openai: 
  key: <<YOUR_KEY_GOES_HERE>>
```

### 7. Building from Raw Code

The full stack can be spun up and rebuilt from raw code with the `docker-compose.yml` file in the `madi-core` root folder.  To start up the various profiles defined in your Docker Compose file, follow these steps:

1. **Navigate to the directory containing your [`docker-compose.yml`]**

```sh
cd /path/to/madi-core
```

2. **Start a specific profile:** Use the `--profile` flag followed by the profile name to start services associated with that profile.  The options are `frontend`, `backend`, and `fullstack`

```sh
docker-compose --profile fullstack up
```

3. **Stop the services:** To stop the services, use:
```sh
docker-compose down
```

4. **View available profiles:** To see the profiles defined in your `docker-compose.yml` file, you can open the file and look for the `profiles` section.

\```

