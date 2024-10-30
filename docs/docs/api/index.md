---
sidebar_position: 30
slug: /api
---

# API


:::warning

This page is incomplete and may not contain correct information.

:::


##  Features

See [FeathersJS](https://feathersjs.com)




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

<!-- ---

##  Project Roadmap

- [X] `► INSERT-TASK-1`
- [ ] `► INSERT-TASK-2`
- [ ] `► ...` -->

---

## **Connecting to the API behind an IAP Proxy

   [See here](/api/direct-access)


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
