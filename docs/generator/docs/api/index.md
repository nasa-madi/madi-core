---
sidebar_position: 1
slug: /api
---

# Architecture

##  Features

See FeathersJS




The MADI-API project provides the following features:

1. Authentication and Authorization: The API supports authentication and authorization using the `@feathersjs/authentication` package. It includes strategies for Google Identity-Aware Proxy (IAP) authentication and user management with role-based access control (RBAC). The API enforces user abilities and permissions defined in the `@casl/ability` library.

2. Database Management: The API connects to a PostgreSQL database using the Knex.js query builder library. It includes database migrations and seed files to manage the database schema and populate it with initial data. The database connection configuration is stored in the `knexfile.js` file.

3. RESTful API Endpoints: The API exposes RESTful endpoints for various resources, including users, documents, chats, chunks, uploads, and tags. It follows the OpenAPI specification for documenting the endpoints and includes security definitions and response schemas.

4. Service Architecture: The API is structured using a service-oriented architecture. Each resource has its own service module that handles CRUD operations and business logic. The services follow a common structure and implement hooks for authentication, validation, and error handling.

5. Data Validations and Schemas: The API includes data validation using the Ajv library and defines schemas and validators for each resource. It ensures that the input data and query parameters conform to the specified schema and enforces data consistency.

6. Error Handling and Logging: The API includes hooks and middleware for error handling and logging. It logs errors using the Winston library and provides customizable error messages and error codes for different scenarios.

7. Test Suite: The API includes a test suite for unit testing the endpoints, services, and utility functions. It uses the Mocha test framework, Chai assertion library, and Supertest library for making HTTP requests.

8. Continuous Integration/Deployment (CI/CD): The API includes a GitHub Actions workflow (`deploy-cloudrun.yml`) for automated deployment to Google Cloud Run. It builds and deploys the application when changes are pushed to the main branch.

9. Documentation: The API includes API documentation generated from the OpenAPI specification. It provides detailed information about the available endpoints, their request/response structures, and examples.

10. Custom Plugins and Tools: The API includes custom plugins and tools, such as a tool for retrieving the current weather using OpenWeather API and a tool for searching scholarly articles using the Semantic Scholar API. These plugins are organized in the `src/plugin-tools` directory.

11. Extensibility and Modularity: The API is designed to be extensible and modular. It follows best practices for organizing code and provides clear separation of concerns between different modules and components.

12. Contribution Guidelines: The API includes contribution guidelines and a code of conduct for contributors. It encourages community participation through pull requests, discussions, and issue reporting.


[**Return**](#)

---

##  Repository Structure

```sh
└── madi-api/
    ├── .cicd
    │   └── upsertTag.cjs
    ├── .github
    │   └── workflows
    │       └── deploy-cloudrun.yml
    ├── Dockerfile
    ├── config
    │   ├── custom-environment-variables.json
    │   └── default.yml
    ├── docker-compose.yml
    ├── knexfile.js
    ├── migrations
    │   ├── 20231122170107_user.js
    │   ├── 20231122170718_document.js
    │   ├── 20231122171125_chat.js
    │   └── 20231219155838_chunk.js
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── index.html
    │   └── spec.json
    ├── seeds
    │   └── dev-admin.js
    ├── specifications
    │   ├── openai.yml
    │   ├── openapi
    │   │   ├── _merged.yml
    │   │   ├── errors.yml
    │   │   ├── security.yml
    │   │   ├── shared.yml
    │   │   └── spec.yml
    │   └── postman
    │       ├── contract.postman_collection.json
    │       └── postman.json
    ├── src
    │   ├── app.js
    │   ├── auth
    │   │   ├── abilites.js
    │   │   ├── authentication.js
    │   │   ├── authorize.hook.js
    │   │   ├── createUser.hook.js
    │   │   ├── googleIAP.strategy.js
    │   │   └── permissions.yml
    │   ├── configuration.js
    │   ├── hooks
    │   │   └── log-error.js
    │   ├── index.js
    │   ├── logger.js
    │   ├── plugin-tools
    │   │   ├── index.js
    │   │   ├── investigations
    │   │   ├── semantic-scholar
    │   │   ├── sources
    │   │   ├── tags
    │   │   └── weather
    │   ├── postgresql.js
    │   ├── services
    │   │   ├── chats
    │   │   ├── chunks
    │   │   ├── documents
    │   │   ├── index.js
    │   │   ├── uploads
    │   │   ├── users
    │   │   └── utils
    │   └── validators.js
    └── test
        ├── app.test.js
        ├── client.test.js
        └── services
            ├── chats
            ├── chunks
            ├── documents
            ├── investigations
            ├── madi
            ├── sources
            ├── tags
            ├── uploads
            └── users
```

---
<!-- 
##  Modules

<details closed><summary>.</summary>

| File                                                                                       | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---                                                                                        | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [docker-compose.yml](https://github.com/nasa-madi/madi-api/blob/master/docker-compose.yml) | This code snippet defines the docker-compose configuration for a parent repository. It sets up a mock API, a real API, a PostgreSQL database, and a storage server. These services are interconnected and can be accessed through specific ports.                                                                                                                                                                                                                                             |
| [.dockerignore](https://github.com/nasa-madi/madi-api/blob/master/.dockerignore)           | The `.dockerignore` file in the repository's root directory is used to exclude specific configuration files (`local.*`, `develop.*`, and `production.*`) from being included in the Docker image during the build process. This ensures that sensitive configuration data is not exposed in the image.                                                                                                                                                                                        |
| [package-lock.json](https://github.com/nasa-madi/madi-api/blob/master/package-lock.json)   | The code snippet in this repository is responsible for managing the database migrations and seeds of the application. It ensures that the database schema is updated and populated correctly, maintaining data integrity and consistency.                                                                                                                                                                                                                                                     |
| [knexfile.js](https://github.com/nasa-madi/madi-api/blob/master/knexfile.js)               | The `knexfile.js` file in the `madi-api` repository is responsible for loading the database connection information from the application configuration. It imports the `app` object from `./src/app.js` and retrieves the PostgreSQL configuration.                                                                                                                                                                                                                                            |
| [package.json](https://github.com/nasa-madi/madi-api/blob/master/package.json)             | This code snippet represents the package.json file of the repository. It includes dependencies, scripts, and other configurations for running and managing the FeathersJS-based API for NASA's MADI infrastructure. The codebase follows a specific structure with directories for different components of the API, such as services, hooks, and plugins. The main role of this code snippet is to define the project's metadata, dependencies, and scripts for building and running the API. |
| [.gitignore](https://github.com/nasa-madi/madi-api/blob/master/.gitignore)                 | The code snippet is located in the `.gitignore` file of the repository. It specifies the files and directories that should be ignored by git, such as logs, coverage reports, dependencies, IDE files, and compiled binary addons.                                                                                                                                                                                                                                                            |
| [Dockerfile](https://github.com/nasa-madi/madi-api/blob/master/Dockerfile)                 | The Dockerfile in the madi-api repository sets up the container environment and executes various commands, including running migrations and seeding data, before starting the application with npm start.                                                                                                                                                                                                                                                                                     |

</details>

<details closed><summary>test</summary>

| File                                                                                    | Summary                                                                                                                                                                                                                                                                                                                    |
| ---                                                                                     | ---                                                                                                                                                                                                                                                                                                                        |
| [app.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/app.test.js)       | This code snippet contains tests for a Feathers application. It verifies that the application starts properly and can display the index page. It also checks for a 404 JSON error and validates the response code and error details.                                                                                       |
| [client.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/client.test.js) | This code snippet tests the client-side functionality of an application by creating and authenticating a user with email and password. It verifies the creation of an access token for the user and ensures that the password is hidden to clients. The test also includes a step to remove the test user from the server. |

</details>

<details closed><summary>test.services.sources</summary>

| File                                                                                                       | Summary                                                                                                                                                                                      |
| ---                                                                                                        | ---                                                                                                                                                                                          |
| [sources.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/services/sources/sources.test.js) | This code snippet tests whether the sources service is registered in the parent repository. It verifies the functionality of the service by checking if it has been successfully registered. |

</details>

<details closed><summary>test.services.investigations</summary>

| File                                                                                                                            | Summary                                                                                                                                                                             |
| ---                                                                                                                             | ---                                                                                                                                                                                 |
| [investigations.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/services/investigations/investigations.test.js) | This code snippet tests if the investigations service is registered in the parent repository. It imports the FeatherJS app and asserts that the service is successfully registered. |

</details>

<details closed><summary>test.services.uploads</summary>

| File                                                                                                       | Summary                                                                                                                                                                                         |
| ---                                                                                                        | ---                                                                                                                                                                                             |
| [uploads.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/services/uploads/uploads.test.js) | The code snippet in the file `uploads.test.js` verifies the registration of the uploads service in the application. It ensures that the service is correctly initialized and available for use. |

</details>

<details closed><summary>test.services.madi</summary>

| File                                                                                              | Summary                                                                                                                                                                                                                         |
| ---                                                                                               | ---                                                                                                                                                                                                                             |
| [madi.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/services/madi/madi.test.js) | This code snippet tests whether the madi service is properly registered in the parent repository. It imports the necessary dependencies, including the FeathersJS app, and asserts that the service is successfully registered. |

</details>

<details closed><summary>test.services.users</summary>

| File                                                                                                 | Summary                                                                                                                                                                  |
| ---                                                                                                  | ---                                                                                                                                                                      |
| [users.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/services/users/users.test.js) | This code snippet tests the registration of the users service in the Madi API repository. It ensures that the service is successfully registered within the application. |

</details>

<details closed><summary>test.services.tags</summary>

| File                                                                                              | Summary                                                                                                                                                    |
| ---                                                                                               | ---                                                                                                                                                        |
| [tags.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/services/tags/tags.test.js) | This code snippet tests if the tags service is registered within the parent repository. It checks if the service is properly set up and available for use. |

</details>

<details closed><summary>test.services.chunks</summary>

| File                                                                                                    | Summary                                                                                                                                                  |
| ---                                                                                                     | ---                                                                                                                                                      |
| [chunks.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/services/chunks/chunks.test.js) | This code snippet is a test for the chunks service in the MADI API repository. It checks whether the service is registered correctly in the application. |

</details>

<details closed><summary>test.services.documents</summary>

| File                                                                                                             | Summary                                                                                                                                                                                  |
| ---                                                                                                              | ---                                                                                                                                                                                      |
| [documents.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/services/documents/documents.test.js) | This code snippet is a test file located at `test/services/documents/documents.test.js`. It tests whether the `documents` service is registered in the parent repository's architecture. |

</details>

<details closed><summary>test.services.chats</summary>

| File                                                                                                 | Summary                                                                                                                                      |
| ---                                                                                                  | ---                                                                                                                                          |
| [chats.test.js](https://github.com/nasa-madi/madi-api/blob/master/test/services/chats/chats.test.js) | The code snippet in `test/services/chats/chats.test.js` verifies that the chats service is successfully registered in the parent repository. |

</details>

<details closed><summary>public</summary>

| File                                                                              | Summary                                                                                                                                                                                                                                                                      |
| ---                                                                               | ---                                                                                                                                                                                                                                                                          |
| [index.html](https://github.com/nasa-madi/madi-api/blob/master/public/index.html) | The code snippet in the file public/index.html is responsible for rendering Swagger UI, which displays the API documentation based on the spec.json file. It makes an API request to retrieve the spec.json file and initializes Swagger UI with the received specification. |
| [spec.json](https://github.com/nasa-madi/madi-api/blob/master/public/spec.json)   | This code snippet in the parent repository's architecture plays a crucial role in handling user authentication. It includes features like defining user abilities and permissions.                                                                                           |

</details>

<details closed><summary>specifications</summary>

| File                                                                                      | Summary                                                                                                                                                                                                                           |
| ---                                                                                       | ---                                                                                                                                                                                                                               |
| [openai.yml](https://github.com/nasa-madi/madi-api/blob/master/specifications/openai.yml) | Error generating text for specifications/openai.yml: Client error '400 Bad Request' for url 'https://api.openai.com/v1/chat/completions'
For more information check: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400 |

</details>

<details closed><summary>specifications.openapi</summary>

| File                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                        |
| ---                                                                                                   | ---                                                                                                                                                                                                                                                                                                                                            |
| [shared.yml](https://github.com/nasa-madi/madi-api/blob/master/specifications/openapi/shared.yml)     | The code snippet defines shared data models for an OpenAPI specification file in the repository's `specifications/openapi/shared.yml` path. It includes schemas for IntegerId, Uuid, ObjectId, and ISODate with specific data type restrictions and example values.                                                                            |
| [_merged.yml](https://github.com/nasa-madi/madi-api/blob/master/specifications/openapi/_merged.yml)   | This code snippet is part of the `madi-api` repository. It includes various files and directories related to the configuration, authentication, logging, and services of the API. It plays a critical role in setting up the necessary components and defining the behavior of the API, ensuring secure access and efficient handling of data. |
| [spec.yml](https://github.com/nasa-madi/madi-api/blob/master/specifications/openapi/spec.yml)         | The code snippet is located in the `specifications/openapi/spec.yml` file. It contains OpenAPI specifications for the API endpoints and their associated security schemes, tags, paths, responses, examples, and schemas. This file plays a critical role in documenting and defining the structure of the API.                                |
| [security.yml](https://github.com/nasa-madi/madi-api/blob/master/specifications/openapi/security.yml) | The `security.yml` file in the `openapi` directory of the repository's `specifications` folder defines the security requirements and settings for the API endpoints specified in the OpenAPI specification. It ensures that proper authentication and authorization mechanisms are implemented to protect the API.                             |
| [errors.yml](https://github.com/nasa-madi/madi-api/blob/master/specifications/openapi/errors.yml)     | This code snippet defines the structure of an Error object in the openapi/errors.yml file. It specifies the required properties, such as code and message, and their data types.                                                                                                                                                               |

</details>

<details closed><summary>specifications.postman</summary>

| File                                                                                                                                          | Summary                                                                                                                                                                                                                                   |
| ---                                                                                                                                           | ---                                                                                                                                                                                                                                       |
| [contract.postman_collection.json](https://github.com/nasa-madi/madi-api/blob/master/specifications/postman/contract.postman_collection.json) | The code snippet in this repository is responsible for managing the repository's CI/CD pipeline, specifically the deployment of the application to Google Cloud Run. It includes a workflow file and a script for creating/updating tags. |
| [postman.json](https://github.com/nasa-madi/madi-api/blob/master/specifications/postman/postman.json)                                         | The code snippet in `specifications/postman/postman.json` defines a Postman request to add a new chat. It provides the necessary information and structure for creating a chat in the parent repository.                                  |

</details>

<details closed><summary>migrations</summary>

| File                                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                              |
| ---                                                                                                                   | ---                                                                                                                                                                                                                                                                                                                                  |
| [20231122170107_user.js](https://github.com/nasa-madi/madi-api/blob/master/migrations/20231122170107_user.js)         | The code snippet in migrations/20231122170107_user.js is responsible for creating and removing the users table in the database. It utilizes the Knex.js query builder to define the table schema and perform the corresponding operations.                                                                                           |
| [20231122171125_chat.js](https://github.com/nasa-madi/madi-api/blob/master/migrations/20231122171125_chat.js)         | This code snippet, located in the `migrations` directory, creates and drops a table named chats in the database using the `knex` library.                                                                                                                                                                                            |
| [20231122170718_document.js](https://github.com/nasa-madi/madi-api/blob/master/migrations/20231122170718_document.js) | This code snippet is responsible for creating the documents table in the database. It defines the structure and attributes of the table, such as title, type, description, author, publication date, URL, and more. The table also includes timestamps and references to other tables for related data.                              |
| [20231219155838_chunk.js](https://github.com/nasa-madi/madi-api/blob/master/migrations/20231219155838_chunk.js)       | The code snippet in the `migrations/20231219155838_chunk.js` file creates and drops a table called chunks in the database. It defines the table schema and includes various fields such as id, hash, metadata, pageContent, documentId, and userId. Additionally, it creates an index on the embedding field for efficient querying. |

</details>

<details closed><summary>config</summary>

| File                                                                                                                            | Summary                                                                                                                                                                                                                                                                                                                                   |
| ---                                                                                                                             | ---                                                                                                                                                                                                                                                                                                                                       |
| [custom-environment-variables.json](https://github.com/nasa-madi/madi-api/blob/master/config/custom-environment-variables.json) | This code snippet, located in `config/custom-environment-variables.json`, defines the custom environment variables used in the parent repository. It specifies the port, host, and authentication secret for the application.                                                                                                             |
| [default.yml](https://github.com/nasa-madi/madi-api/blob/master/config/default.yml)                                             | The code snippet is part of the parent repository's architecture. It includes the default configuration file (`default.yml`) that defines various settings such as the database connection, API keys, authentication strategies, and testing options. This file provides critical information for the proper functioning of the codebase. |

</details>

<details closed><summary>src</summary>

| File                                                                                       | Summary                                                                                                                                                                                                                                                                                                                                                  |
| ---                                                                                        | ---                                                                                                                                                                                                                                                                                                                                                      |
| [app.js](https://github.com/nasa-madi/madi-api/blob/master/src/app.js)                     | This code snippet is a configuration file for a Feathers.js application. It configures middleware, sets up services and transports, and registers hooks for error handling and logging. The main file is app.js, which exports the configured Feathers.js app.                                                                                           |
| [validators.js](https://github.com/nasa-madi/madi-api/blob/master/src/validators.js)       | The code snippet in src/validators.js provides data and query validation using the Ajv library. It adds various formats for validation, ensuring the correctness of input data and query parameters in the parent repository's architecture.                                                                                                             |
| [index.js](https://github.com/nasa-madi/madi-api/blob/master/src/index.js)                 | The code snippet in the `src/index.js` file sets up a server using the Feathers.js framework and starts it on a specified port. It also logs the server's listening status. The code connects the server to the `app.js` file and imports the necessary dependencies and configurations.                                                                 |
| [configuration.js](https://github.com/nasa-madi/madi-api/blob/master/src/configuration.js) | The code snippet in `src/configuration.js` defines a configuration schema and validator for the parent repository. It imports functions from @feathersjs/typebox to define and validate the configuration settings related to host, port, and public attributes. This ensures that the configuration data is valid and conforms to the specified schema. |
| [postgresql.js](https://github.com/nasa-madi/madi-api/blob/master/src/postgresql.js)       | The code snippet in `src/postgresql.js` is responsible for configuring and setting up a PostgreSQL database connection using the Knex library. It extends the Knex QueryBuilder to include a method for calculating cosine distance. The configured database connection is then set as a property on the application object.                             |
| [logger.js](https://github.com/nasa-madi/madi-api/blob/master/src/logger.js)               | The code snippet in `src/logger.js` defines and configures a logger that uses the Winston library. It allows for logging at different levels and formats, with the option to use Google Cloud Logging when `GOOGLE_CLOUD_PROJECT` environment variable is set.                                                                                           |

</details>

<details closed><summary>src.services</summary>

| File                                                                                | Summary                                                                                                                                                                                                                                                                          |
| ---                                                                                 | ---                                                                                                                                                                                                                                                                              |
| [index.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/index.js) | This code snippet is responsible for configuring and registering various services within the parent repository. It imports and configures services for chunks, uploads, tools, chats, documents, and users. The main role is to organize and register all services in one place. |

</details>

<details closed><summary>src.services.uploads</summary>

| File                                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---                                                                                                           | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [uploads.schema.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/uploads/uploads.schema.js) | Summary: This code snippet defines schemas and validators for handling uploads in the service module of the parent repository. It includes data models and data validation for creating, updating, and querying uploads.Parent repository architecture: The parent repository is structured with various directories and files, including configuration files, source code, tests, and specifications. The code snippet is part of the `src/services/uploads` directory and contributes to the functionality related to handling uploads. |
| [uploads.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/uploads/uploads.js)               | The code snippet in the `uploads.js` file is responsible for registering and configuring the upload service in the parent repository. It sets up the necessary hooks, validators, resolvers, and middleware for handling file uploads. The service exposes methods for finding, getting, creating, patching, and removing files.                                                                                                                                                                                                          |
| [uploads.class.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/uploads/uploads.class.js)   | The code snippet is a skeleton for a custom service class called UploadService. It provides methods for finding, getting, creating, updating, patching, and removing uploads. It can handle single or multiple uploads and returns the results as objects. The class can be customized by removing or adding more methods as needed.                                                                                                                                                                                                      |
| [uploads.spec.yml](https://github.com/nasa-madi/madi-api/blob/master/src/services/uploads/uploads.spec.yml)   | The code snippet in src/services/uploads/uploads.spec.yml handles the API endpoints related to file uploads. It includes operations for retrieving uploads, creating new uploads, retrieving a single upload by ID, deleting uploads, and updating upload details.                                                                                                                                                                                                                                                                        |

</details>

<details closed><summary>src.services.users</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---                                                                                                     | ---                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [users.spec.yml](https://github.com/nasa-madi/madi-api/blob/master/src/services/users/users.spec.yml)   | The code snippet located at `src/services/users/users.spec.yml` defines the specifications for the `/users` endpoint in the parent repository. It includes details for retrieving users based on query parameters, creating a new user, retrieving a single user by ID, soft deleting multiple users, and patching a user's fields. The specifications include request/response details, error handling, and schema definitions. |
| [users.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/users/users.js)               | The code snippet in `src/services/users/users.js` is responsible for defining and configuring the `users` service in the parent repository. It includes service registration, method definitions, and hooks for authentication, authorization, validation, and resolving data.                                                                                                                                                   |
| [users.schema.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/users/users.schema.js) | The code snippet in `src/services/users/users.schema.js` defines schemas and validators for the user data model. It includes the main data model, schema for creating new entries, schema for updating existing entries, and schema for allowed query properties. These schemas help validate and structure user data in the parent repository's architecture.                                                                   |
| [users.class.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/users/users.class.js)   | This code snippet is part of the parent repository's architecture. It defines a User service class that extends the KnexService class from the @feathersjs/knex library. It provides customizable functionality for handling user-related operations using the Knex adapter service methods. Additionally, a function is provided to configure the service with pagination, the PostgreSQL client, and the name users.           |

</details>

<details closed><summary>src.services.chunks</summary>

| File                                                                                                       | Summary                                                                                                                                                                                                                                                                                                                                                                                      |
| ---                                                                                                        | ---                                                                                                                                                                                                                                                                                                                                                                                          |
| [chunks.class.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/chunks/chunks.class.js)   | The code snippet is a class called ChunksService, which extends the KnexService class. It implements the _find method to retrieve data from the database using Knex, with support for pagination and filtering. It also includes logic for handling search queries and sorting based on cosine distance. The code is part of the src/services/chunks/chunks.class.js file in the repository. |
| [openapi3.yml](https://github.com/nasa-madi/madi-api/blob/master/src/services/chunks/openapi3.yml)         | The code snippet in the `src/services/chunks/openapi3.yml` file defines the OpenAPI specification for the `/chunks` endpoint. It specifies the request and response schemas, including examples and error messages. This code ensures proper documentation and communication between the API and its consumers.                                                                              |
| [chunks.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/chunks/chunks.js)               | This code snippet defines the functionality of the chunks service within the parent repository. It includes service registration, method definitions, and various hooks for authentication, validation, and resolving data. The code also handles error messages for duplicate values.                                                                                                       |
| [chunks.yml](https://github.com/nasa-madi/madi-api/blob/master/src/services/chunks/chunks.yml)             | The code snippet in `src/services/chunks/chunks.yml` defines an OpenAPI specification for the `/chunks` endpoint. It specifies the request and response schemas, including examples and error handling. This code ensures consistent communication and documentation for chunk creation in the parent repository's architecture.                                                             |
| [chunks.schema.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/chunks/chunks.schema.js) | This code snippet defines the schema and validators for the chunks service in the repository. It includes functions to generate hash and embedding values, resolve user and document information, and validate queries.                                                                                                                                                                      |

</details>

<details closed><summary>src.services.documents</summary>

| File                                                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---                                                                                                                 | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [documents.schema.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/documents/documents.schema.js) | This code snippet defines the schema and validator for the documents service in a Feathers.js API. It includes fields for document metadata, page content, and embedding. It also handles data hashing and embedding retrieval.                                                                                                                                                                                                                                                 |
| [vector.hooks.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/documents/vector.hooks.js)         | The code snippet in src/services/documents/vector.hooks.js provides functions for generating an ID from text and adding vector and hash resolvers. These functions are utilized in the parent repository's architecture for document-related operations.                                                                                                                                                                                                                        |
| [documents.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/documents/documents.js)               | The code snippet in src/services/documents/documents.js is responsible for registering a Feathers service for handling documents. It defines the service methods and hooks that enforce data validation and authentication. It also exposes the necessary schemas and class for external use.                                                                                                                                                                                   |
| [documents.class.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/documents/documents.class.js)   | This code snippet is a class called DocumentService that extends KnexService. It provides a method called similaritySearchWithOffset, which performs a similarity search on a table using a given embedding and returns the results with pagination. The method also allows for filtering the results based on metadata. The snippet also includes a placeholder method to enable searching the metadata JSON column directly from query params.                                |
| [vector.storage.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/documents/vector.storage.js)     | The `KnexCustomStore` class in the `vector.storage.js` file is responsible for managing vector storage in a database using Knex.js. It provides functions for table creation, similarity search, adding vectors, finding documents, patching data, and creating new documents. The class utilizes the Knex.js library, dotenv for environment configuration, and the OpenAIEmbeddings class for embedding documents. It also defines a set of arguments to configure the store. |
| [documents.spec.yml](https://github.com/nasa-madi/madi-api/blob/master/src/services/documents/documents.spec.yml)   | The code snippet located at `src/services/documents/documents.spec.yml` defines the API endpoints and their associated operations for handling documents in the parent repository. It includes endpoints for retrieving, creating, updating, and deleting documents. The snippet also specifies the expected request bodies and response structures for each operation.                                                                                                         |

</details>

<details closed><summary>src.services.chats</summary>

| File                                                                                                                    | Summary                                                                                                                                                                                                                                                                                                                                                                             |
| ---                                                                                                                     | ---                                                                                                                                                                                                                                                                                                                                                                                 |
| [chats.class.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/chats/chats.class.js)                   | The code snippet in `src/services/chats/chats.class.js` is part of the Madi API repository. It defines the `ChatService` class, which is responsible for creating chat messages using OpenAI. The `create` method takes in chat data, formats it, and makes a request to OpenAI's chat completions API.                                                                             |
| [openapi_chat_subset.yml](https://github.com/nasa-madi/madi-api/blob/master/src/services/chats/openapi_chat_subset.yml) | The code snippet in the parent repository's architecture serves as a log error hook for the software application. It ensures that any errors encountered during execution are appropriately logged. This helps in identifying and addressing issues in the application.                                                                                                             |
| [chats.spec.yml](https://github.com/nasa-madi/madi-api/blob/master/src/services/chats/chats.spec.yml)                   | This code snippet in the `src` directory is responsible for handling authentication and authorization in the parent repository's architecture. It includes files related to user abilities, authentication logic, and authorization hooks.                                                                                                                                          |
| [chats.schema.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/chats/chats.schema.js)                 | The `chats.schema.js` file in the `src/services/chats` directory defines the schema and validators for the chat data model. It specifies the structure and validation rules for creating new chat entries. The schema includes properties like messages, model, frequency_penalty, logit_bias, and more. It also provides query schema and validators for allowed query properties. |
| [chats.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/chats/chats.js)                               | This code snippet is part of the chats service in the parent repository. It includes the implementation of the service, its schema, and hooks. It also handles streaming of chat data.                                                                                                                                                                                              |

</details>

<details closed><summary>src.services.utils</summary>

| File                                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                                                |
| ---                                                                                                         | ---                                                                                                                                                                                                                                                                                                                                                                    |
| [getIdFromText.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/utils/getIdFromText.js)   | This code snippet, located at `src/services/utils/getIdFromText.js`, defines a function `getIdFromText` that generates a unique identifier (SHA1 hash) based on a given text string using the crypto library.                                                                                                                                                          |
| [deltaReducer.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/utils/deltaReducer.js)     | The `deltaReducer.js` file in the `src/services/utils` directory is responsible for reducing and merging changes made to an object. It recursively applies the changes to the object and returns the updated version. This function is used in the parent repository's architecture to handle and manage deltas in an efficient manner.                                |
| [fetchEmbedding.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/utils/fetchEmbedding.js) | This code snippet, located in the `src/services/utils` directory, fetches an embedding for a given text using OpenAI's text-embedding model. It returns the embedding data.                                                                                                                                                                                            |
| [cacheProxy.js](https://github.com/nasa-madi/madi-api/blob/master/src/services/utils/cacheProxy.js)         | The `cacheProxy.js` code snippet is a utility function that acts as a proxy for caching responses from OpenAI API requests. It reads from a cache file and returns the cached response if available, or forwards the request to the API and caches the response for future use. The code also includes configuration options to enable or disable the caching feature. |

</details>

<details closed><summary>src.plugin-tools</summary>

| File                                                                                    | Summary                                                                                                                                                                                                                                                              |
| ---                                                                                     | ---                                                                                                                                                                                                                                                                  |
| [index.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/index.js) | This code snippet defines a module in the parent repository that exports tools related to weather and semantic scholar. It provides functions to get the current weather and search for scholarly articles. The module also includes descriptions and default tools. |

</details>

<details closed><summary>src.plugin-tools.sources</summary>

| File                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---                                                                                                               | ---                                                                                                                                                                                                                                                                                                                                                                                                              |
| [sources.class.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/sources/sources.class.js)   | The code snippet in the file src/plugin-tools/sources/sources.class.js defines a custom service called SourcesService that extends the KnexService class from the @feathersjs/knex library. It also exports a function getOptions that returns an object with configuration options for the service. This code is part of the Madi API repository and is responsible for handling operations related to sources. |
| [sources.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/sources/sources.js)               | The code snippet in `src/plugin-tools/sources/sources.js` registers a service called Sources on a Feathers application. It exposes methods for finding, getting, creating, and patching sources. It also applies authentication and schema validation hooks for authorization and data consistency.                                                                                                              |
| [sources.schema.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/sources/sources.schema.js) | The code snippet in src/plugin-tools/sources/sources.schema.js defines the schema and validators for the sources data model in the parent repository. It includes schemas for creating, updating, and querying sources.                                                                                                                                                                                          |
| [sources.shared.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/sources/sources.shared.js) | In the parent repository's architecture, the code snippet in `src/plugin-tools/sources/sources.shared.js` defines the path, methods, and client for interacting with the sources resource. This allows clients to find, get, create, patch, and remove sources.                                                                                                                                                  |

</details>

<details closed><summary>src.plugin-tools.investigations</summary>

| File                                                                                                                                   | Summary                                                                                                                                                                                                                                                              |
| ---                                                                                                                                    | ---                                                                                                                                                                                                                                                                  |
| [investigations.class.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/investigations/investigations.class.js)   | This code snippet defines a custom service for handling investigations using the Knex adapter in a Feathers.js application. It provides default methods but can also be customized. It includes options for pagination and the PostgreSQL client model.              |
| [investigations.schema.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/investigations/investigations.schema.js) | This code snippet defines the schema and validators for the Investigations data model in the parent repository's architecture. It includes the main data schema, data and patch validators, and query schema and validator for this model.                           |
| [investigations.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/investigations/investigations.js)               | The code snippet in `src/plugin-tools/investigations/investigations.js` is responsible for configuring and registering the Investigations service in the parent repository. It sets up authentication, validation, and resolution hooks for various service methods. |
| [investigations.shared.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/investigations/investigations.shared.js) | The code snippet in `investigations.shared.js` defines the path, methods, and client configuration for the investigations service in the parent repository. It enables communication with the service through a client object using specified methods.               |

</details>

<details closed><summary>src.plugin-tools.tags</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                                                                                                                                                     |
| ---                                                                                                      | ---                                                                                                                                                                                                                                                                                                                                                         |
| [tags.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/tags/tags.js)               | The code in `src/plugin-tools/tags/tags.js` registers and configures a Tags service for the parent repository. It includes hooks for authentication, schema validation, query resolving, and data resolving. The service exposes methods externally and handles events.                                                                                     |
| [tags.shared.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/tags/tags.shared.js) | The code snippet in `src/plugin-tools/tags/tags.shared.js` defines the path and methods for interacting with the tags module in the parent repository. It exports the `tagsPath` and `tagsMethods` constants, and a function `tagsClient` that sets up the client connection and defines the methods for the tags module.                                   |
| [tags.schema.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/tags/tags.schema.js) | The code snippet in `src/plugin-tools/tags/tags.schema.js` defines the schema and validators for the `tags` data model in the repository's architecture. It specifies the structure and validation rules for creating, updating, and querying `tags` entries.                                                                                               |
| [tags.class.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/tags/tags.class.js)   | This code snippet defines a TagsService class that extends the KnexService class from the @feathersjs/knex library. It also exports a getOptions function that returns options for configuring the service, including pagination and the model name. The TagsService class provides methods for interacting with the tags table in the PostgreSQL database. |

</details>

<details closed><summary>src.plugin-tools.semantic-scholar</summary>

| File                                                                                                                                     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---                                                                                                                                      | ---                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [searchSemanticScholar.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/semantic-scholar/searchSemanticScholar.js) | This code snippet, located in the `src/plugin-tools/semantic-scholar/searchSemanticScholar.js` file, is responsible for searching academic papers from Semantic Scholar. It sends a request to the Semantic Scholar API with the provided query and returns the search results. The code handles error cases and returns the data as a JSON string. The accompanying information provides details about the function and its parameters. |

</details>

<details closed><summary>src.plugin-tools.weather</summary>

| File                                                                                                                    | Summary                                                                                                                                                                                                                                  |
| ---                                                                                                                     | ---                                                                                                                                                                                                                                      |
| [getCurrentWeather.js](https://github.com/nasa-madi/madi-api/blob/master/src/plugin-tools/weather/getCurrentWeather.js) | This code snippet is a function that retrieves the current weather for a given location. It returns a JSON object containing the location, temperature, and unit. It is part of the Weather API plugin in the repository's architecture. |

</details>

<details closed><summary>src.hooks</summary>

| File                                                                                     | Summary                                                                                                                                                                                                                                                                                                               |
| ---                                                                                      | ---                                                                                                                                                                                                                                                                                                                   |
| [log-error.js](https://github.com/nasa-madi/madi-api/blob/master/src/hooks/log-error.js) | The `log-error.js` hook in the `src/hooks` directory is responsible for logging errors that occur in the parent repository. It uses the `logger` module to handle error logging. When an error is caught, it logs the error stack. If the error contains data, it also logs the data. Finally, it rethrows the error. |

</details>

<details closed><summary>src.auth</summary>

| File                                                                                                      | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---                                                                                                       | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [authorize.hook.js](https://github.com/nasa-madi/madi-api/blob/master/src/auth/authorize.hook.js)         | This code snippet, located at src/auth/authorize.hook.js, contains a function named authorizeHook. It imports the defineAbilitiesFor function from./abilites.js and the authorize function from feathers-casl. The main role of this code is to authorize the user based on their abilities and permissions defined in the defineAbilitiesFor function. It sets the user's abilities in the context.params object and uses the authorize function to perform the authorization process using the @feathersjs/knex adapter. Ultimately, it returns the updated context object. |
| [abilites.js](https://github.com/nasa-madi/madi-api/blob/master/src/auth/abilites.js)                     | The code snippet in `src/auth/abilites.js` defines the abilities of different user roles using the `@casl/ability` library. It allows superadmins to manage all, admins to create users, and regular users to read tools, create chats, and have limited access to user management.                                                                                                                                                                                                                                                                                           |
| [permissions.yml](https://github.com/nasa-madi/madi-api/blob/master/src/auth/permissions.yml)             | This code snippet defines the permissions for different user roles (superadmin, admin, common) in the authentication module of the parent repository. It specifies what actions each role can perform on various resources, such as managing all, creating users, reading tools, creating chats, and updating users with certain conditions. The snippet also restricts certain actions, like updating the roleId field or deleting users, for specific conditions.                                                                                                           |
| [authentication.js](https://github.com/nasa-madi/madi-api/blob/master/src/auth/authentication.js)         | This code snippet in the `authentication.js` file is responsible for setting up the authentication system in the parent repository using the `@feathersjs/authentication` package. It creates an instance of the `AuthenticationService` and registers the `GoogleIAPStrategy` as a supported authentication strategy. This code sets up the authentication middleware for the application.                                                                                                                                                                                   |
| [googleIAP.strategy.js](https://github.com/nasa-madi/madi-api/blob/master/src/auth/googleIAP.strategy.js) | The code snippet `googleIAP.strategy.js` is part of a larger codebase. It provides a strategy for authenticating users using Google Identity-Aware Proxy (IAP). It retrieves the user's email and user ID from the request headers and uses them to authenticate the user. If the user is authenticated, it returns the authentication details. Otherwise, it throws an error indicating that the user is not authenticated.                                                                                                                                                  |
| [createUser.hook.js](https://github.com/nasa-madi/madi-api/blob/master/src/auth/createUser.hook.js)       | This code snippet is from the `createUser.hook.js` file in the `src/auth` directory. It includes the logic to create a user and handle authentication using the Feathers-CASL library. It checks if the user is a superadmin and verifies their credentials. If the user is not authenticated, it throws a `NotAuthenticated` error.                                                                                                                                                                                                                                          |

</details>

<details closed><summary>.cicd</summary>

| File                                                                                   | Summary                                                                                                                                                                                                                              |
| ---                                                                                    | ---                                                                                                                                                                                                                                  |
| [upsertTag.cjs](https://github.com/nasa-madi/madi-api/blob/master/.cicd/upsertTag.cjs) | This code snippet, located at `.cicd/upsertTag.cjs`, is responsible for updating or creating a Git tag using the GitHub REST API. The code checks if the tag exists, and if it does, it updates it; otherwise, it creates a new tag. |

</details>

<details closed><summary>seeds</summary>

| File                                                                                 | Summary                                                                                                                                                                                                |
| ---                                                                                  | ---                                                                                                                                                                                                    |
| [dev-admin.js](https://github.com/nasa-madi/madi-api/blob/master/seeds/dev-admin.js) | The `dev-admin.js` file is responsible for seeding the initial admin users in the database. It ensures that the user sequence value is properly set and inserts the admin users with predefined roles. |

</details>

<details closed><summary>.github.workflows</summary>

| File                                                                                                           | Summary                                                                                                                                                                                                                                                                                                    |
| ---                                                                                                            | ---                                                                                                                                                                                                                                                                                                        |
| [deploy-cloudrun.yml](https://github.com/nasa-madi/madi-api/blob/master/.github/workflows/deploy-cloudrun.yml) | This code snippet, located in the `.github/workflows/deploy-cloudrun.yml` file, is responsible for deploying the codebase to Cloud Run as part of the Continuous Integration and Deployment (CI/CD) process. It defines the workflow for building and deploying the application on the Cloud Run platform. |

</details>

---
 -->




##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **JavaScript**: `version x.y.z`

###  Installation

1. Clone the madi-api repository:

```sh
git clone https://github.com/nasa-madi/madi-api
```

2. Change to the project directory:

```sh
cd madi-api
```

3. Install the dependencies:

```sh
npm install
```

###  Running madi-api

Use the following command to run madi-api:

```sh
node app.js
```

###  Tests

To execute tests, run:

```sh
npm test
```

---

##  Project Roadmap

- [X] `► INSERT-TASK-1`
- [ ] `► INSERT-TASK-2`
- [ ] `► ...`

---




## **Connecting to an IAP-Protected API on GCP**

To securely connect to an API protected by Google Cloud's Identity-Aware Proxy (IAP), follow these detailed steps to authenticate requests using a service account or user-managed identity. This guide assumes that you have already set up IAP to protect your API and have appropriate permissions configured for accessing the resource.

#### **1. Setting Up Environment Variables**

First, define the environment and client ID variables that you will use in your authentication requests. These variables are essential for acquiring an authentication token and for making API requests to the IAP-protected service.

```shell
gcloud config set project <PROJECT_ID>
gcloud iap oauth-brands list
```

This will respond with something like:
```
name: projects/[PROJECT_NUMBER]/brands/[BRAND_ID]
applicationTitle: [APPLICATION_TITLE]
supportEmail: [SUPPORT_EMAIL]
orgInternalOnly: true
```
Next, copy the projects and brands link and run the following command

```shell
gcloud iap oauth-clients list projects/351312167908/brands/351312167908
```

You should see a response like the following

```
name: projects/[PROJECT_NUMBER]/brands/[BRAND_NAME]/identityAwareProxyClients/[CLIENT_ID]
secret: [CLIENT_SECRET]
displayName: [NAME]
```

Now you have sufficient information to generate a token.  Use the `[CLIENT_ID]` and the right env variables below.

```shell
ENV="dev"  #or 'test' or 'prod'
DOMAIN="example.app" # or simliar domain where the app is hosted
CLIENT_ID="XXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com"
TOKEN=$(gcloud auth print-identity-token --audiences=$CLIENT_ID)
```

- **ENV**: This variable represents the deployment environment (e.g., `dev`, `prod`). Adjust it according to your specific environment names.
- **DOMAIN**: This variable represents the domain that you will be connecting to through IAP.
- **CLIENT_ID**: This is the client ID associated with the IAP. You can find this ID in your Google Cloud Console under the IAP section.
- **TOKEN**: This command generates an identity token for the specified client ID using the currently authenticated gcloud session. Ensure your gcloud is authenticated with a user or service account that has permission to access the IAP-protected resource.

#### **2. Verify Service Account or User Access**

Before making broader API calls, verify that the service account or user has the necessary permissions and can authenticate through IAP by creating a test user. This step confirms that your setup can successfully post data to the IAP-protected API.  For more information [see instructions here](https://cloud.google.com/iap/docs/programmatic-oauth-clients)

```shell
curl --location --request POST "https://$ENV.$DOMAIN/api/users/" \
--header "Authorization: Bearer $TOKEN" \
--data '{}'
```

- This `curl` command makes a POST request to the API to create a new user.  If the users exists for the provided token it will error and say that you cannot create new users.
- It uses the Bearer token obtained in the previous step for authentication.
- Ensure that there is no trailing whitespace or additional characters that might break the header formatting or the URL.

#### **3. General Usage of Token**

After successfully verifying that the token works for a simple POST request, you can use the same method to authenticate other types of requests to the API. Adjust the HTTP method and endpoint according to the specific actions you need to perform.  For example, here's a request that lists the available tools (provided by plugins):

```shell
curl --location "https://$ENV.$DOMAIN/api/tools" \
--header "Authorization: Bearer $TOKEN"
```

#### **Best Practices and Troubleshooting**

- **Token Expiry**: Be aware that the tokens generated are temporary. For long-term operations, ensure your application can handle token renewal.
- **Error Handling**: Implement robust error handling in your code to manage and log errors returned by the IAP or the API.
- **Security Practices**: Keep your client IDs and service account credentials secure. Avoid hard-coding sensitive information directly in your application's source code.

This setup ensures that your applications can securely access APIs protected by Google's Identity-Aware Proxy using authenticated tokens that verify the identity and permissions of the requester.


## **Connecting to the Database Directly**

The easiest way to connect to the database is through a bastion host.  The commands for this can be fetched from the terraform output with the following command:

```shell
cd ../terraform
terraform workspace select <ENV> #develop #test #production
terraform output
```

You must be in the `/terraformm` folder of the main `/madi` project and must have permissions to run the terraform.



##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github/nasa-madi/madi-api/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github/nasa-madi/madi-api/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github/nasa-madi/madi-api/issues)**: Submit bugs found or log feature requests for Madi-api.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/nasa-madi/madi-api
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

##  License

This project is protected under the [MIT](https://opensource.org/license/mit) License. For more details, refer to the [LICENSE](https://github.com/nasa-madi/madi-core/blob/main/LICENSE) file.

---

##  Acknowledgments

Special thanks go out to the MADI contributors:

- [@jamesvillarrubia](https://github.com/jamesvillarrubia)
- [@annie-miller](https://github.com/annie-miller)
- [@jfortnermonegan](https://github.com/jfortnermonegan)
- [@kimmoonjae](https://github.com/kimmoonjae)
- [@waggyz](https://github.com/waggyz)


[**Return**](#)

---
