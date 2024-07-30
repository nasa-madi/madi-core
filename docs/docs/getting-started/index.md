---
sidebar_position: 1
slug: /getting-started
---

# Getting Started

MADI is built as a collection of indepedent components.  This enables easier debugging and flexibility in deployments.  What suits one organization may not suit another.

The key components are:

1. **API**: FeathersJS in NodeJS
1. **Database**: PostgreSQL / CloudSQL
1. **Blob Storage**: Google Cloud Storage
1. **Repository Managment**: Meta (instead of Git Submodules)
1. **Parsers**: NLM-Ingestor (An Apache Tika-based Document Parser)
1. **Infrastructure as Code**: Terraform

If you are not a developer, setting up the entire codebase for MADI is likely overkill.  If you are interested in simply testing the system out locally, you should follow these instructions:
- [Simple Setup / Docker Only](/getting-started/simple)

If you are a developer or looking to build a plugin for MADI for your organization, you should proceed to to the advanced instructions:
- [Advanced Setup](/getting-started/advanced)

> NOTE:
Neither version of MADI currently supports fully local processing.  If your organization does not allowing sharing of data with OpenAI, then you should not be using this setup.  



