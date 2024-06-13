# madi.nasa.gov
**DNS**: _madi.nasa.gov_ <br/>
**SHORTNAME**: _madi_

___________
## Getting Started
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

###







## API

### Updating the secrets in GCP

From the `/api` folder, run the following gcloud command to get the current env secrets.
```shell
ENV=develop
gcloud secrets versions access latest --secret "${ENV}-env-overrides" > ./config/${ENV}.yml;
```

Update the secrets as necessary and then reupload with
```shell
ENV=test
if gcloud secrets describe "${ENV}-env-overrides" &>/dev/null; then
    echo "Secret exists, updating..."
    gcloud secrets versions add "${ENV}-env-overrides" --data-file="./config/${ENV}.yml"
else
    echo "Secret does not exist, creating..."
    gcloud secrets create "${ENV}-env-overrides" --replication-policy="automatic" --data-file="./config/${ENV}.yml"
fi
```

The environment options are [ `develop`, `test`, `production` ]

### Updating the variables in Github actions

To update the github environments, run the following:

```shell
ENV=develop
PROJECT_ID=xxxxxxx
gh variable set PROJECT_ID -b"${PROJECT_ID}" -e"${ENV}""
gh variable set SERVICE -b"api-${PROJECT_ID}" -e"${ENV}"
```





### Folder Structure
The code is stored as described below.
```
├── README.md
├── api
│   ├── specifications (OpenAPI specification and Mock Server Dockerfile)
│   ├── ...
│   └── src (Feathers Application)
├── .cicd
│   └── docker
│       └── ... (where we store CICD related docker compose files)
├── docker-compose.yml (Full service Docker setup)
├── plugins
│   ├── ... 
│   └── cas_langchain (Langchain based Pipeline of CAS specific code)
├── interface
│   ├── ... 
│   └── components (Primary elements based on chat-lite-ui open sources options)
├── storage
│   └── uploads (local space for storage that is used for stateful testing of mock GCS server)
└── terraform (TBD, in the terraform branch)
    ├── ... (service level terraform)
    └── root-terraform (Project/Network terraform) 
```

The code is separated into multiple repositories, each with their own components.  These components are referenced here as one complete polyrepo architecture.  To load everything, you can use the `meta` tool.  

```
npm install meta-git -g
```
Then you can clone all of the necessary repositories with:
```
meta git update
```
For more information, check out [this link](https://www.npmjs.com/package/meta-git)

To spin up all of the necessary components of the full stack, you can use the docker compose file.
```
docker compose up
```
or if you want to run individual services
```
docker compose up mock api database ui vss cas storage
```


### Running the Service Locally
##### Requirements
1. [Docker installed](https://docs.docker.com/get-started/)
2. An OpenAI API Key
3. A Google Search API key
4. A SERP API Key

First you must acquire the necessary keys and set them in `plugins/cas_langchain/.env`.  There is an example file stored in the repo.

To start the service, from the root folder, run: `docker-compose up`.

That will initiate a docker postgres volume (persistence). If you want to wipe and refresh the whole storage, run: `docker-compose down -v`

To refresh all the images, from root run: `docker-compose up --force-recreate --build`

##### Trying it out

Visit http://localhost:3030 to see the interface.  



## Connecting to the Bastion Host

1. Login to the console and make sure the bastion host is running. https://console.cloud.google.com/compute/instances
1. 



## Contributing to the API Code

##### Requirements
1. [Docker installed](https://docs.docker.com/get-started/)
1. [Node v16+ or nvm installed](https://github.com/nvm-sh/nvm/blob/master/README.md)
1. [Postman](https://www.postman.com/)

##### Getting started
1. Open (or create) `/api/config/local.json`. 
3. `cd api` to get into the right folder
4. Run `npm install` to install the local dependencies
5. Run `npm run dev` to start the nodemon version of the application (auto-refreshes)
6. Test the api at the port specified in the launching logs (probably port 3030)

## The Architecture
- TO BE Architecture Diagrams: https://app.mural.co/t/nasa4590/m/nasa4590/1699385860129/36b18cb256133b55459a4dc8f619b97f2717f660?sender=u4ab490edf45746f4d4197588
- Architecture Documentation: see ./ARCHITECTURE.md



## Digging into the Code Base
The application is built using [FeathersJS](https://feathersjs.com/), a microservice-focused, Node API framework.  Feathers can support almost any database, external, or internal service connection.  It can also be used with sockets. This application is built on Postgres + Sequelize + Express/REST

Feathers comes with a CLI tool to help create new code elements and routes.  To install:
```
npm install @feathersjs/cli -g
```

To [add a new route](https://docs.feathersjs.com/guides/basics/services.html#feathers-services) to the api (called a `service`), you will want to run the following from the command line:
```
feathers generate service
```

The entire API runs on series of middlewares.  The middleware sequence is predetermined by the route and method.  In this way, Feathers here is effectively is just a framework around ExpressJS.  An express flow looks like this:

```
Inbound Request
└── app.js
    ├── Parse Req/Response
    └── Middleware(req, resp)
        └── Middleware(req, resp)
            └── Function(req)
                └── return response
Outbound Respone ───────<
```


All feathers does is give that flow repeatability and structure with [hooks](https://docs.feathersjs.com/guides/basics/hooks.html#quick-example).  Hooks are essentially just middleware snippets that operate on a standardized request and response model that ALL Feathers services share.  That way a hook on a postgres service will operate the same on a redis service.  The Feathers flow looks like this:

```
Inbound POST Request (Create)
└── feathers/app.js
    ├── Parse Req/Response
    └── All/Universal Before Hooks (req)
        └── Create Before Hook (req)
            ├── Service (req)
            |   └── (Sends to DB)
            └── Service Formats response (resp)
        └── Create After Hook (resp)
    └── All/Universal After Hooks (resp)
Return Response
```

Note that in the example, the universal "all" hooks run first and last.  Then within that, the method specific hooks, which are POST/Create hooks in the example above.  Then the most inner step is the `service` itself, which can be customized but is often just a data model + a DB library to do the heavy lifting between the API and the database of choice.  We are using the feathers-sequelize library to transform SQL for our PostgreSQL DB.

Hooks are promises, but they are run "sequentially" to ensure that they operate like middleware still.  They take a "context" variable which is effectively the original Express Request object.  It is curried deeper and deeper through the "before hooks" until the service adds a "result" field to the request and then it is curried back out in the "after hooks".  Then Feathers converts the request (now with a result field) to a traditional express response and sends back to the client.



## Testing Locally
There are several "layers" of testing that are applied to this stack.  Each has a specific purpose.

#### ----- SHOULD BE DONE INSIDE A PIPELINE -----
1. [ ] *API Mock Testing* - Do the API specs meet our simplest contract tests (i.e. blueprints)?
1. [ ] *API Unit Tests* - Does each function do what we expect with given inputs and outputs, without a DB?
1. [ ] *API Integration Tests* - With a temporary DB, does the API interact with other models, entities, and DB specific elements as we expect?
1. [ ] *API Contract Testing* - Does the actual API now meet our simplest contract tests (i.e. blueprints)?
1. [ ] *API Migration Tests* - With a stable DB, does our migration flow work as expected?
1. [ ] *API Load Test* - With a single instance, does our code meet our benchmarks?

#### ----- MUST BE DONE AGAINST REAL ENVIRONMENTS ------
1. [ ] *API Soak Test* - Does the system hold up under larger, higher, sustained load?
1. [ ] *API Spike Test* - Does the system hold up with huge instant load?
1. [ ] *API Capacity Test* - When pushed to the limit, does the system fail gracefully?
1. [ ] *Downtime Test* - When deploying a new version, does the system falter or transition gracefully?
1. [ ] *Rollback Test* - When deploying a bad new version, does the system rollback safely?

#### ----- MUST BE DONE AGAINST REAL ENVIRONMENTS ------
1. [ ] *API Secure Contract Tests* - Does the system, behind heightened security (like SSL or a firewall), still pass the contract tests?


#### Getting Started.
When you run `npm start` or `npm run dev` from the `/api` folder, the Feathers api plays "dumb" and expects a `config/local.json` or will rely on the `config/default.json`.  These configuration files tell Feathers where to expect the Postgres database.  But... you may not have one yet.  If you open the `default.json` you can see that the Postgres port is set as a default of 35432, which assumes that you have a local postgres DB running on port 35432 (unlikely).  Most local Postgres instances are on port 5432.  That different default port is purposeful because it forces new developers to write a `local.json` override or leverage one of the docker-compose files.

If you don't want to or can't built a local, persistent Postgres application, you can always run `docker-compose up --build database` from root, and then from a separate terminal process, `cd api` and then `npm start`.  That will run a Postgres instance on 35432 and then start a Node thread with `npm start`.


#### Testing the API
Of course, when you write code you want to make sure your code can pass tests locally before you waste the time trying to merge.  To enable local testing across all of the pipeline steps, each step effectively maps to a docker-compose file that will run the exact same way as the pipeline.  You can also run certain services locally in a continuous fashion, that way every time you save a file, you can see if your tests pass.  These types of tests are routed through the `/test/test-runner.sh` file, which is a bash script that does some of the flagging and option handling for you.

1. Make sure Docker is installed.
1. `cd api` into the API folder.
1. To run all unit/intergration tests once, run `npm run test`.
1. To run a single test file once, run `npm run test ./test/services/{service}.test.js`
1. To run all unit/integrations tests continually, retesting on save, run `npm run test-dev`.
1. To run a single test file continually, retesting on each save, run `npm run test-dev ./test/services/{service}.test.js`.
1. To run the unit, integration, and coverage test as if your are gitlab, run `npm run test-unit` from the `/api` folder, or `cd` to root and run: `docker-compose -f ./.cicd/docker/docker-compose.local.unit.yml up --exit-code-from unit_test --force-recreate --build`. Note that the `force-recreate` and `build` flags force the full rebuild everytime.  This ensures clean testing in early stages of development.  When deploying, these flags will not exist.
1. To run the contract mock tests, run `npm run test-mock` from the `/api` folder, or `cd` to root and run: `docker-compose -f ./.cicd/docker/docker-compose.local.contract-mock.yml up --exit-code-from blueprint_mock_test --force-recreate --build`.
1. To run the contract api tests, run `npm run test-api` from the `/api` folder, or `cd` to root and run: `docker-compose -f ./.cicd/docker/docker-compose.local.contract-api.yml up --exit-code-from blueprint_api_test --force-recreate --build`.
1. To run the consumer flow tests, run `npm run test-consumer` from the `/api` folder, or `cd` to root and run: `docker-compose -f ./.cicd/docker/docker-compose.local.consumer-api.yml up --exit-code-from consumer_api_test --force-recreate --build`.
1. To run the migration tests, `cd` to root and run: `npm run test-migration`.
1. To run the load test, `cd` to root and run: `npm run test-k6`.


> Note that each of the docker-compose files maps to a stage of the gitlab build pipeline.  This means that each step is locally testable and that the gitlab-ci.yml can be more generic. This pattern should be maintained moving forward.


#### Mocking API
Each type of test has different requirements for interacting with the API code or with external dependencies.  Because not every test suite can interact with the dependencies without billing, we use a mock server in specific suites.

| Test Suite          | API  | Dep    |
|---------------------|------|--------|
| Blueprint Mock Test | mock |        |
| Unit Tests          | api  | nock   |
| Blueprint API Test  | api  | mock   |
| Remote API Test     | api  | real   |
| Load Test           | api  | mock   |
| Remote Load Test    | api  | mock   |


The *Nock* server (note the N) is a javascript library that will intercept http calls in a unit test.
The *Mock* server for both the API and Deps leverages OpenAPI specs in the `/specifications` folder and is run as a concurrent container in the docker-compose setup.


## Code Coverage
Code coverage is managed inside the `.nyrc` settings.  Each type of coverage threshold can be set on its own.  For more information, review the [Istanbul Docs](https://istanbul.js.org/)


## Making Changes to the API Specs

The API Specs are our source of truth about what should and should not be built.  The entire pipeline is based around these tests being correctly designed up front.  If your code changes/adds a field or adds a route, the change to the spec SHOULD be part of the PR or part of an earlier PR — specs before code.

1. First make sure the API spec is updated (copy and paste is your friend here).
1. Then make sure the examples are sufficient at the bottom. 
1. Make sure Prism starts in docker (docker-compose up --force-recreate --build api_mock).  If it doesn’t start, your specs are incorrect.
1. Duplicate the shared Blueprint collection in Postman and make changes to your copy as necessary.  You can docker-compose up and then run each check manually in the UI with Postman. 
1. Edit your code in feathers to meet the tests. 
1. Add/update unit tests to get coverage on any individual functions. (npm run test-dev is great here)
1. When ready, export the collection and save it as /api/specifications/blueprint.postman_collection.json .  That makes the Postman changes part of your PR and enables testing in the pipeline.
1. You can check that the pipeline will pass by running local docker tests.  See the README for the three docker-compose -f {filename}.yml --force-recreate --build for unit tests, contract API tests and contract Mock tests.
1. Once those three docker tests pass locally, then you can be 99% sure the tests will pass when committed!
1. Push to github, wait for green, tag for reviews… etc.
1. Once accepted, please move or re-import the postman file so the shared version is up-to-date!




