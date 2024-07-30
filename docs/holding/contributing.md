---
sidebar_position: 7
---

# TBD - Contributing to the API Code

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




#### Getting Started.
When you run `npm start` or `npm run dev` from the `/api` folder, the Feathers api plays "dumb" and expects a `config/local.json` or will rely on the `config/default.json`.  These configuration files tell Feathers where to expect the Postgres database.  But... you may not have one yet.  If you open the `default.json` you can see that the Postgres port is set as a default of 35432, which assumes that you have a local postgres DB running on port 35432 (unlikely).  Most local Postgres instances are on port 5432.  That different default port is purposeful because it forces new developers to write a `local.json` override or leverage one of the docker-compose files.

If you don't want to or can't built a local, persistent Postgres application, you can always run `docker-compose up --build database` from root, and then from a separate terminal process, `cd api` and then `npm start`.  That will run a Postgres instance on 35432 and then start a Node thread with `npm start`.


## Making Changes to the API Specs

The API Specs are our source of truth about what should and should not be built.  The entire pipeline is based around these tests being correctly designed up front.  If your code changes/adds a field or adds a route, the change to the spec SHOULD be part of the PR or part of an earlier PR — specs before code.

1. First make sure the API spec is updated (copy and paste is your friend here).
1. Then make sure the examples are sufficient at the bottom. 
1. Make sure Prism starts in docker (docker-compose up --force-recreate --build api_mock).  If it doesn’t start, your specs are incorrect.
1. Duplicate the shared Blueprint collection in Postman and make changes to your copy as necessary.  You can docker-compose up and then run each check manually in the UI with Postman. 
1. Edit your code in feathers to meet the tests. 
1. Add/update unit tests to get coverage on any individual functions. (npm run test-dev is great here)
1. When ready, export the collection and save it as /api/specifications/blueprint.postman_collection.json .  That makes the Postman changes part of your PR and enables testing in the pipeline.
1. You can check that the pipeline will pass by running local docker tests.  See the README for the three `docker-compose -f {filename}.yml --force-recreate --build` for unit tests, contract API tests and contract Mock tests.
1. Once those three docker tests pass locally, then you can be 99% sure the tests will pass when committed!
1. Push to github, wait for green, tag for reviews… etc.
1. Once accepted, please move or re-import the postman file so the shared version is up-to-date!

<p></p>