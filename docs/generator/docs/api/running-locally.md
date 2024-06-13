---
sidebar_position: 4
---

# Running the Service Locally

### Requirements
1. [Docker installed](https://docs.docker.com/get-started/)
2. An OpenAI API Key
3. A Google Search API key
4. A SERP API Key

First you must acquire the necessary keys and set them in `plugins/cas_langchain/.env`.  There is an example file stored in the repo.

To start the service, from the root folder, run: `docker-compose up`.

That will initiate a docker postgres volume (persistence). If you want to wipe and refresh the whole storage, run: `docker-compose down -v`

To refresh all the images, from root run: `docker-compose up --force-recreate --build`

### Trying it out

Visit http://localhost:3030 to see the interface.  

