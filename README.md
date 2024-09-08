# E-Commerce Microservices Project

This project demonstrates a scalable microservices architecture for an e-commerce platform using Docker, Docker Compose, Traefik, and PostgreSQL. The microservices are built using Node.js and are containerized to ensure modularity, scalability, and ease of deployment.

## Overview

The **E-Commerce Microservices Project** implements an architecture that divides core services into separate modules such as:

- **Order Service**
- **Product Service**
- **User Service**
- **Web Service**
- **API Gateway with Traefik**
- **Database with PostgreSQL**

Each service is deployed as an isolated Docker container and connected through Docker Compose for seamless communication and scalability.

---

## Technologies

- **Node.js** (Backend)
- **Docker** (Containerization)
- **Docker Compose** (Orchestration)
- **Traefik** (API Gateway & Load Balancer)
- **PostgreSQL** (Database)

---

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Cloning the Repository

```bash
git clone https://github.com/seven-seas-solutions/e-commerce-microservices.git
cd e-commerce-microservices
```
## Running the Application

Build and Start Services:

```bash
sudo docker-compose up --build -d
```
## Access the Application:

Web Service: http://localhost:3000
Traefik Dashboard: http://localhost:8080

## Project Structure

```bash

e-commerce-microservices/
│
├── db-init/
│   └── init.sql (SQL scripts to initialize the database)
├── docker-compose.yml (Main Docker Compose file)
├── services/
│   ├── order/ (Order microservice)
│   │   ├── Dockerfile
│   │   ├── index.js
│   │   └── package.json
│   ├── product/ (Product microservice)
│   │   ├── Dockerfile
│   │   ├── index.js
│   │   └── package.json
│   ├── user/ (User microservice)
│   │   ├── Dockerfile
│   │   ├── index.js
│   │   └── package.json
│   └── web-service/ (Web microservice)
│       ├── Dockerfile
│       ├── index.js
│       └── package.json
└── README.md (This file)
```

## Optional Configuration: Exposing the Web Service through Traefik

To expose the web service through Traefik at http://localhost instead of http://localhost:3000, you need to configure Traefik routing.

docker-compose.yml (updated)

```yaml

version: '3.8'

services:
  api-gateway:
    image: traefik:v2.9
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - ecommerce-net
    command:
      - "--api.insecure=true"
      - "--api.dashboard=true"
      - "--entrypoints.web.address=:80"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"

  web-service:
    build: ./services/web-service
    networks:
      - ecommerce-net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.webservice.rule=Host(`localhost`)"
      - "traefik.http.services.webservice.loadbalancer.server.port=3000"
    expose:
      - "3000"

  database:
    image: postgres:13
    environment:
      POSTGRES_DB: ecommercedb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: adminpassword
    volumes:
      - db-data:/var/lib/postgresql/data
      - ./db-init:/docker-entrypoint-initdb.d
    networks:
      - ecommerce-net

volumes:
  db-data:

networks:
  ecommerce-net:
```
Once you configure the routing, you can access the web service at http://localhost directly.

## Testing

You can verify that all services are running as expected by using:

```bash

sudo docker-compose ps
```
Check logs to ensure the services are running correctly:

```bash
sudo docker logs e-commerce-microservices-web-service-1
sudo docker logs e-commerce-microservices-api-gateway-1
```
## Use Cases:
1. E-commerce Platforms: Use this architecture for building and deploying modular, scalable e-commerce platforms.
2. Learning Microservices: Ideal for developers learning microservices architecture, containerization, and orchestration.
3. DevOps Demonstration: Demonstrate DevOps best practices by deploying a multi-service architecture using Docker and Traefik.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing
Feel free to submit a pull request if you find any issues or have suggestions for improvements.

## Contact
For any inquiries or support, please contact:

Seven Seas Solutions
www.sevenseassolutions.co.uk
Email: contact@sevenseassolutions.com
