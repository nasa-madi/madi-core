---
sidebar_position: 2
slug: '/getting-started/plugin'
title: 'Making your Own Plugin'
---

# Making your Own Plugin

This documentation provides instructions for setting up a local instance of MADI using Docker. This setup is designed for side-loading of a plugin-script only and does not provide the ability to customize anything outside of a plugin.  

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
mkdir -p plugin-loader/plugins/devGetTime
cd plugin-loader
curl -o docker-compose.yml https://raw.githubusercontent.com/nasa-madi/madi-core/main/examples/plugin-loader/docker-compose.yml
curl -o config.yml https://raw.githubusercontent.com/nasa-madi/madi-core/main/examples/plugin-loader/config.yml
curl -o ./plugins/devGetTime/index.js https://raw.githubusercontent.com/nasa-madi/madi-core/main/examples/plugin-loader/plugins/devGetTime/index.js
```

Once the file is downloaded, you can start up the docker compose services from the `plugin-loader` folder:

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
An example plugin is provided in the `/plugins/devGetWeather` folder.  The way side-loading works is by volume-mounting the `plugins/devGetWeather` folder and then reading the index file in.  

If you want to create a new plugin, there are couple of conventions that need to be followed and some files to edit.  First, you must modify the `plugins` section of the `config.yml` file that you downloaded. For example, if you want to create a plugin called `searchJokeDatabase`, you would add the line to the `development:` section of the plugins config like so:

```yaml
plugins:
  failOnImportError: true
  path: ../plugins
  start: index.js
  default:
    - casHIT                #included
    - casScamper            #included
    - casScenarios          #included
    - searchSemanticScholar #included
  restricted:
    # - searchPatents
  development:
    - devGetWeather         #included
    - devGetTime            #Side Loaded
    - searchJokeDatabase    #Side Loaded <----- YOUR NEW PLUGIN
```

That tells the API to look for an index file at this location: `/plugins/searchJokeDatabase/index.js`.  You can also set a custom path and injection file with this format:

```yaml
plugins:
  # ...
  development:
    - searchJokeDatabase:
        path: '../custom-folder'
        start: 'main.js` 
```

For a new plugin, you must also let Docker know to mount the folder into the API container.  If you open the `docker-compose.yml` file, you will see the `api` service at the top.  In that service definition, you must add a line to the `volumes:` section to include your new plugin folder.

```yaml
api:
  # ... other stuff
  volumes:
    - ./config.yml:/app/config/local.yml
    
    ###### YOU MUST COPY THIS LINE FOR EVERY PLUGIN YOU INSTALL
    - ./plugins/devGetTime:/app/plugins/devGetTime
    ## e.g.   `./plugins/PLUGIN_NAME:/app/plugins/PLUGIN_NAME`
    #########

    ###### Joke Example below
    - ./plugins/searchJokeDatabase:/app/plugins/searchJokeDatabase
```

Once that's done, you can run `docker compose down` and then `docker compose up` and the new files will be booted up into your container.  If successful, the Docker logs will show something like this:

```shell
api-1            | info: PLUGINS: Fetched defaults plugins: casHIT casScamper casScenarios searchSemanticScholar
api-1            | info: PLUGINS: Fetched restricted plugins:
api-1            | info: PLUGINS: Fetched development plugins: devGetWeather devGetTime searchJokeDatabase  #<--- Note the addition of your plugin
api-1            | info: PLUGINS: Initializing plugins...
api-1            | info: PLUGINS: Initializing plugin: casHIT
api-1            | info: PLUGINS: Initializing plugin: casScamper
api-1            | info: PLUGINS: Initializing plugin: casScenarios
api-1            | info: PLUGINS: Initializing plugin: searchSemanticScholar
api-1            | info: PLUGINS: Initializing plugin: devGetWeather
api-1            | info: PLUGINS: Initializing plugin: devGetTime
api-1            | info: PLUGINS: Initializing plugin: searchJokeDatabse  #<--- Note the addition of your plugin
api-1            | info: PLUGINS: Plugins successfully initialized.
```

Now when you load [http://localhost:3000](http://localhost:3000), you should see the name of your plugin in the plugin-selector dropdown, just above the prompt input.




