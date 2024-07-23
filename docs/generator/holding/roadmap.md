---
sidebar_position: 5
---

# Roadmap
  
## Administrative 

- [ ]  Blueprint/template for a new service
- [ ]  API Documentation
	- [ ] DNS description for environments
	- [ ] Public Routes
	- [ ] Private Routes
	- [ ] Postman rendered Specs
	- [ ] Top Level Readme
		- [ ] Getting Started
		- [ ] Folder Structure
		- [ ] How to Test / Testing commands
		- [ ] Terraform Explanation of components
		- [ ] Interfaces documentation
                -   Restful API [Swagger](http://swagger.io/)
                -   Port and service description
         - [ ] Service should be able to set itself up
         - [ ] Configuration options are explained
- [ ] Architecture Documentation
	- [ ] Ladder Diagram
	- [ ] API Specs
	- [ ] Logical Diagram
	- [ ] Physical/Deployment Diagram
	- [ ] Architecture Justification Doc & Load Estimations
	- [ ] Feature Approval Process Flow

## Automated processes

- [ ] Continuous development
	- [ ]  Automated tests
		- [ ] Unit tests
		- [ ] Contract tests on all edges (no knowledge of code)
        - [ ] Dockerized testing (can be run locally)
	- [ ] Load Tests
		- [ ] Performance tests
		- [ ] Spike Test
		- [ ] Soak Test
		- [ ] Capacity Test
	- [ ] Docker Cleanup
		- [ ] Images have been optimized for caching
- [ ] Continuous Integration
	- [ ] Fully automated pipeline
		- [ ] Pipeline steps are represented as docker-compose wherever possible.
	- [ ] HotFix Support
	- [ ] Rollback Support
	- [ ] Migration Support
	- [ ] Code style checks
	- [ ] SAST checks
	- [ ] DAST checks
	- [ ] License checks
	- [ ] Dependency checks
	- [ ] Code coverage percentage
    - [ ] BlueGreen (or Canary) Support 
	    - [ ] Health checks
	- [ ] Pipeline optimization
		- [ ] Caching enabled in pipeline
		- [ ] Runner is tuned down to necessary size
		- [ ] Base images are common or cached
    - [ ] Artifact Storage
		- [ ] Cleanup policy (Delete old tags with timeout)
	- [ ] Data Backups
		- [ ] Clean up policy
- [ ] Failover Testing
	- [ ] (Chaos Engineering goes here??)

## Monitoring
- [ ] Logging & Monitoring
	- [ ] Errors sent to `<MONITORING SOLUTION>` (e.g. Bugsnag)
	- [ ] Transactions to`<LOGGING SOLUTION>` (e.g. Stackdriver)
	- [ ] Billing labels on all resources
	- [ ] Billing report
	- [ ] Network latency monitoring
	- [ ] Resource and load monitoring
			-   Availability of each node in the cluster
            -   All services up and running
            -   Connectivity between different pods and services
            -   Public endpoints accessibility	

## Support
- [ ] Alerting policy
- [ ] Incident Training
	- [ ] Incident plan for a downed application
	- [ ] Incident plan for a downed DB
	- [ ] Incident plan to recovery from a backup
	- [ ] Incident plan to recover from a failed Rollback
- [ ] Support Training
	- [ ] Instructions to add a CP configuration
	- [ ] Instructions to modify an existing CP's configuration


## Cloud Deployments
- [ ] Infrastructure as Code
    - [ ] Terraform Templating
        - [ ] GCP terraform templates
        - [ ] AWS terraform templates
        - [ ] Azure terraform templates
    - [ ] Secrets and Security (for each Template)
        - [ ] Production Secrets are restricted from Devs
        - [ ] No secrets in code
        - [ ] SAST sufficient for Production
        - [ ] DAST sufficient for Production
        - [ ] Docker images are hardened
        - [ ] Production secrets are different than other environments
    - [ ] Networking
        - [ ] Extra Ports are inaccessible
        - [ ] DB is not directly accessible
        - [ ] DNS uses WAF proxy or alternative
        - [ ] DNS configuration is configurable via terraform


