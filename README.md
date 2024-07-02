
# ZeroStore - Backend

E-commerce backend

![Badge](https://img.shields.io/static/v1?label=react&message=FrontEnd&color=blue&style=for-the-badge&logo=REACT)
![Badge](https://img.shields.io/static/v1?label=NESTJS&message=Backend&color=red&style=for-the-badge&logo=NESTJS)
![Badge](https://img.shields.io/static/v1?label=Chakra-UI&message=library&color=green&style=for-the-badge)
![Badge](https://img.shields.io/static/v1?label=Storefront-UI&message=library&color=green&style=for-the-badge)

[zerostore.io](https://github.com/renanbotasse/zerostore-backend/tree/develop)


### Description

Backend de um e-commerce, com foco em venda de jogos. 


## Features
- User:

  - User Registration: Allows new users to register on the platform.
User Information Update: Enables users to update their personal data.
  - Address Management: Allows users to add, update, and remove addresses.

- Cart:

  - Add to Cart: Allows users to add products to their cart.
Update Cart: Enables users to update the quantity of products in the cart.
  - Clear Cart: Allows users to remove all products from the cart.

- Auth:

  - Registration and Login: Enables users to register and log in using JWT authentication.
  - Route Protection: Ensures that only authenticated users can access certain routes.

- Products:

  - Product Listing: Allows users to view all available products.
  - Product Details: Enables users to view specific details of a product.

- Order:

  - Order Creation: Allows users to place orders based on the products in their cart.
  - Order Viewing: Enables users to view their order history.

## DEMO

[![ZeroStore](https://img.youtube.com/vi/5sMN0LkMXhc/0.jpg)](https://youtu.be/eMd2wrUbmI8)


## COMMANDS

Clone the repository:: `https://github.com/renanbotasse/zerostore-backend.git`

Install the dependencies: `npm install`

### CONFIG

Postman Collection

```
postman/ZeroStore.postman_collection.json
```

[PostgreSQL - DockerHub](https://hub.docker.com/_/postgres)

```
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

```
.env.local.postgres

```
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=
DB_PORT=5432
DB_DATABASE=users

JWT_SECRET=
JWT_EXPIRES_IN=7d
```

.env.products.db
```
MONGODB_USER=''
MONGODB_PASSWORD=''
```

### START

Start the development server: `npm run start:dev`

Swagger: http://localhost:3000/api#/

## Tech Stack

| Tool | Purpose  |
| ----------- | ------ |
| NestJS | Backend framework for building scalable and efficient server-side applications.  |
| TypeORM   | ORM (Object-Relational Mapping) for managing database interactions in a more abstract and convenient way.  |
| PostgreSQL      | Primary relational database used for storing user data.  |
| MongoDB  | NoSQL database used for storing product data, providing flexibility in data structure.|
| AWS S3      | Storage service for hosting product information, images, and other static assets.  |
| JWT      | JSON Web Tokens for secure authentication and authorization.  |
| Jest      | Testing framework for unit and integration tests, ensuring code reliability.  |
| Docker      | Containerization platform used to create, deploy, and run applications in isolated environments.  |
| pgAdmin4      | Web-based management tool for PostgreSQL, allowing for database administration and querying.  |
| Postman      | API client for testing and debugging RESTful APIs through HTTP requests.  |

## Documentation

- [Trello](https://trello.com/b/YnkmksQ4/zero-store)
- [Confluence](https://renanbotasse.atlassian.net/wiki/spaces/~63d42dd3d73cd1e44e22cc37/pages/98391/Zero+Store)
- [Dbdiagram.io](https://dbdiagram.io/d/zeroStore-65cbc28fac844320ae123457)
- [Miro](https://miro.com/app/board/uXjVNg2EAf4=/)


## Directory Structure (Domain-Based Structure)
```
├── address
│   ├── address.controller.ts
│   ├── address.module.ts
│   ├── address.service.ts
│   └── dtos
│       ├── createAddress.dto.ts
│       └── returnAddress.dto.ts
├── app.module.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── login.dto.ts
│   ├── loginPayload.dto.ts
│   └── returnLogin.dto.ts
├── cache
│   ├── cache.module.ts
│   └── cache.service.ts
├── cart
│   └── cart.controller.ts
├── decorators
│   ├── roles.decorator.ts
│   └── user-id.decorator.ts
├── guards
│   └── roles.guard.ts
├── infrastructure
│   ├── config
│   │   ├── mongoose.config.ts
│   │   ├── swagger.config.ts
│   │   └── typeorm.config.ts
│   ├── mongodb
│   │   ├── entities
│   │   │   └── product.mongodb-entity.ts
│   │   └── repositories
│   │       └── product.mongodb-repository.ts
│   └── orm
│       ├── entities
│       │   ├── address.entity.ts
│       │   ├── cart.entity.ts
│       │   └── users.entity.ts
│       ├── migration
│       │   ├── 1718973625959-create_table_user.ts
│       │   ├── 1719130700982-create_table_address.ts
│       │   ├── 1719173451120-alter-table-user.ts
│       │   ├── 1719322268293-create_table_status.ts
│       │   ├── 1719323156828-create_table_payment.ts
│       │   ├── 1719324530695-create_table_orders.ts
│       │   ├── 1719325567987-create_table_order_product.ts
│       │   ├── 1719334262749-insert-status.ts
│       │   └── 1719334275148-alter-table-payment.ts
│       └── repositories
│           └── users.repositories.ts
├── main.ts
├── order
│   ├── dtos
│   │   ├── create-order-payment.dto.ts
│   │   └── create-order.dto.ts
│   ├── entities
│   │   └── order.entity.ts
│   ├── order.controller.ts
│   ├── order.module.ts
│   └── order.service.ts
├── order-products
│   ├── entities
│   │   └── order-product.entity.ts
│   ├── order-products.module.ts
│   └── order-products.service.ts
├── payment
│   ├── entities
│   │   └── payment.entity.ts
│   ├── payment.module.ts
│   └── payment.service.ts
├── payment-status
│   ├── entities
│   │   └── payment-status.entity.ts
│   ├── enum
│   │   └── payment-type.enum.ts
│   ├── payment-status.module.ts
│   └── payment-status.service.ts
├── product
│   ├── dtos
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   ├── product.controller.ts
│   ├── product.entity.ts
│   ├── product.module.ts
│   ├── product.repository.ts
│   └── use-cases
│       ├── create-product.use-case.ts
│       ├── delete-product.use-case.ts
│       ├── read-product.use-case.ts
│       └── update-product.use-case.ts
├── user
│   ├── dtos
│   │   ├── create-user.dto.ts
│   │   ├── returnCreate-user.dto.ts
│   │   ├── update-cart.dto.ts
│   │   ├── update-password.dto.ts
│   │   ├── update-user-info.dto.ts
│   │   └── user-cart.dto.ts
│   ├── entities
│   │   ├── user.address.entity.ts
│   │   ├── user.cart-item.entity.ts
│   │   └── user.entity.ts
│   ├── enum
│   │   └── user-type.enum.ts
│   ├── user.controller.ts
│   ├── user.module.ts
│   ├── user.repository.ts
│   └── user.service.ts
└── utils
    ├── base-64-converter.ts
    └── password.ts
```

## Pull Requests
I welcome and encourage all pull requests. 

1 - Fork the repository.

2 - Create a new branch for your feature or bug fix:

`git checkout -b feature-name`

3 - Make your changes and commit them with descriptive messages.

4 - Push your changes to your forked repository:

`git push origin feature-name`

5 - Create a pull request to merge your changes into the main repository.

## Created & Maintained by Renan Botasse
- [Linkedin](https://www.linkedin.com/in/renanbotasse/)
- [Github](https://github.com/renanbotasse)
- [HackNoon](https://hackernoon.com/u/renanb)

# License
This project is licensed under the MIT License.