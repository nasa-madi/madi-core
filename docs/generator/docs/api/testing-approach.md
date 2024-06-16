---
sidebar_position: 7
---


# TBD - Testing Approach
There are several "layers" of testing that are applied to this stack.  Each has a specific purpose.

> NOTE: These testing pipelines are TBD

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

When contributing to the API codebase, you must consider if additional tests are required for any impacted layer of these three sets.



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
