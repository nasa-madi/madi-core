---
sidebar_position: 3
---

# Architecture

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

