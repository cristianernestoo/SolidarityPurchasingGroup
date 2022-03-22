# Documentation

## React Client Application Routes

- Route `/`: the main page that shows the aim of the application, and the possibility to see the list of products, to join the community and to register to the system as a client, shop employee, farmer or delivery person.
- Route `/login`: login page for all the roles of the system 
- Route `/registerform`: registration page for all the roles of the system
- Route `/products`: page that shows the list of available products for the current week and the cart, allowing the user to add some products to the cart and to complete an order.
- Route `/orders`: this page shows the amount of all the orders and its details to the shop employee and the amount of his orders and its details to the client.
- Route `/clientlist`: this page shows the list of clients registered to the system and allows the shop employee to top up the user's wallet and complete an order for the user.
- Route `/farmer`: this page shows the homepage of a farmer. This page is composed by: the list of the products that he has already added, 2 buttons that allows him to plan the products for the next week and to add new products.
- Route `/farmerPlanning`: this page shows the list of products available for the next week and allows the farmer to add, delete or modify some products.
- Route `/farmerOrders`: this page shows the list of products ordered of the logged Farmer and allow they to modify and confirm the quantity of that product.
- Route `/clientOrders`: 
- Route `/client`: this page shows the list of orders of the logged client. They are divided by state and the client can modify a "pending" order.
- Route `/warehouseEmployee`: this page allows the warehouse employee to confirm the preparation of the bags of confirmed order.
- Route `/clock`: allow the professor to use the virtual clock
- Route `/warehousemanager`: this page allows the warehouse manager to see the confirmation of the preparation of the bags of confirmed order.
- Route `/manager`: this page allows the manager to see the reports
- Route `/weeklyReports`: this page shows the weekly reports 
- Route `/monthlyReports`: this page shows the monthly reports

## API Server

- POST `/api/sessions`
    - Description: authenticate the user who is trying to login
    - request body content: credentials of the user who is trying to login
      {
      "email": "mariorossi@gmail.com",
      "password": "mariorossi"
      }
    - response body content: authenticated user
      {
      "id": 1,
      "username": "mariorossi@gmail.com",
      "name": "Mario"
      }
    - Response: 200 OK (success)
    - Error responses:
      500 Internal Server Error (generic error),
      401 Unauthorized User (login failed)

- POST `/api/sessions/current`
    - Description: check if current user is logged in and get his data
    - request body content: None
    - response body content: authenticated user
      `{
      id: 1,
      "username": "mariorossi@gmail.com",
      "name": "Mario"
      }`
    - Response: 200 OK (success)
    - Error responses:
      500 Internal Server Error (generic error),
      401 Unauthorized User (user is not logged in)

- POST `/api/sessions/current`
    - Description: logout current user
    - request body content: None
    - response body content: None
    - Response: 200 OK (success)
    - Error responses:
      500 Internal Server Error (generic error),
      401 Unauthorized User (user is not logged in)

- GET `/api/clients`
    - Description: get all the clients registered to the system
    - request parameters: None
    - response body content: list of the clients.
      `[
      {id: 1,
      name: 'Mario',
      surname: 'Rossi'
      birthdate: '1980-02-01',
      email: 'mariorossi@gmail.com',
      isConfirmed: 1,
      amount: 20
      },
      {id: 2,
      name: 'Isabella',
      surname: 'Verdi'
      birthdate: '1972-02-01',
      email: 'isabellaverdi@gmail.com',
      isConfirmed: 1,
      amount: 5
      }
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error

- POST `/api/users`
    - Description: Add a new user to the system
    - request body content: description of the user to add
      `{
      role: 'farmer',
      name: 'Maria',
      surname: 'Marroni',
      birthdate: '2021-11-11'
      email: 'mariamarroni@gmail.com'
      password: 'mariamarroni',
      isConfirmed: 0}`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- GET `/api/products`
    - Description: get all the products registered to the system
    - request parameters: None
    - response body content: list of the products.
      `[
      {id: 1,
      name: 'banana',
      description: 'description of the product'
      category: 'fruit',
      quantity: '10',
      price: 1.50,
      farmer_id: 2
      img_path: 'url'
      confirmed: 1
      },
      {id: 1,
      name: 'apple',
      description: 'description of the product'
      category: 'fruit',
      quantity: '11',
      price: 2.50,
      farmer_id: 1
      img_path: 'url'
      confirmed: 1
      },
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error

- POST `/api/products`
    - Description: Add a new product to the system
    - request body content: description of the product to add
      `{name: 'apple',
      description: 'description of the product'
      category: 'fruit',
      quantity: '11',
      price: 2.50,
      farmer_id: 1
      img_path: 'url'
      confirmed: 0
      }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- GET `/api/orders`
    - Description: get all the orders registered to the system
    - request parameters: None
    - response body content: list of the orders.
      `[
      {id: 1,
      creation_date: '2021-12-02',
      client_id: '1',
      name: 'Mario',
      surname: 'Rossi',
      total: 40,
      date: '2021-12-05',
      time: '10:10',
      pick_up: 1,
      address: 'Corso Duca degli Abruzzi, 24, Torino, 10129', 
      status: 'PENDING'
      },
      {id: 2,
      creation_date: '2021-12-02',
      client_id: '1',
      name: 'Mario',
      surname: 'Rossi',
      total: 40,
      date: '2021-12-06',
      time: '10:15',
      pick_up: 0,
      address: 'Via Miglietti, 9, Torino, 10144',
      status: 'PENDING'
      }
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error

- POST `/api/orders`
    - Description: Add a new orders to the system
    - request body content: description of the order to add
      `{ creation_date: '2021-12-02',
      client_id: '1',
      total: 40,
      date: '2021-12-06',
      time: '10:15',
      pick_up: 0,
      address: 'Via Miglietti, 9, Torino, 10144',
      status: 'PENDING'
      }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- PUT `/api/products`
    - Description: modify the status of a product
    - request body content: new status of the product
      `{ confirmed: 'confirmed',
      id: '1', }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error


- PUT `/api/orders`
    - Description: modify the status of an order
    - request body content: new status of the order
      `{ status: 'cancelling',
      order_id: '1', }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- PUT `/api/orders/datetime`
    - Description: modify the time to pick up products of an order
    - request body content: new date and time for the order identified by order_id
      `{ order_id: '1', 
         date: '2021-12-01',
         time: '10:45'}`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- PUT `/api/products/quantity`
    - Description: modify the available quantity of a products
    - request body content: new available quantity for the product identified by  product_id
      `{ product_id: '1',
      quantity: 10 }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- PUT `/api/wallets`
    - Description: modify the amount of money of a user's wallet
    - request body content: new amount of money for the client identified by id
      `{ amoun: '10,
      id: 1}`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- POST `/api/basket`
    - Description: Add a product of an order with is quantity to the basket table 
    - request body content:
      `{order_id: 1,
      product_id: 1,
      quantity: 10
      }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- GET `/api/orders`
    - Description: get all the orders registered to the system
    - request parameters: None
    - response body content: list of the orders.
      `[
      {id: 1,
      creation_date: '2021-12-02',
      client_id: '1',
      name: 'Mario',
      surname: 'Rossi',
      total: 40,
      date: '2021-12-05',
      time: '10:10',
      pick_up: 1,
      address: 'Corso Duca degli Abruzzi, 24, Torino, 10129',
      status: 'PENDING'
      },
      {id: 2,
      creation_date: '2021-12-02',
      client_id: '1',
      name: 'Mario',
      surname: 'Rossi',
      total: 40,
      date: '2021-12-06',
      time: '10:15',
      pick_up: 0,
      address: 'Via Miglietti, 9, Torino, 10144',
      status: 'PENDING'
      }
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error

- GET `/api/basket/:order_id`
    - Description: get all the products associated to an order
    - request parameters: id of the order
    - response body content: list of the products
      `[
      {id: 1,
      name: 'banana',
      quantity: 5,
      price: 2.00,
      id: 2
      },
      {name: 'apple',
      quantity: 1,
      price: 2.50,
      }
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error

- GET `/api/clients/:id`
    - Description: get the client identified by its id
    - request parameters: id of the client
    - response body content: data of the client.
      `[
      {id: 1,
      name: 'Mario',
      surname: 'Rossi'
      birthdate: '1980-02-01',
      email: 'mariorossi@gmail.com',
      isConfirmed: 1,
      amount: 20
      }
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error

- GET `/api/notifications/:id`
    - Description: get the notifications about cancelling orders related to a client identified by its id
    - request parameters: id of the client
    - response body content:
      `[
      {id: 1,
      description: 'description of the notification',
      client_id: 2
      }
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error

- POST `/api/notifications`
    - Description: Add a notification for a client 
    - request body content:
      `{client_id: 1,
      description: 'cancelling order'
      }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- DELETE `/api/notifications/:id`
    - Description: Delete a notification for a client
    - request parameters: id of the client
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- GET `/api/orders/:id`
    - Description: get all the cancelling orders of a client
    - request parameters: id of the client
    - response body content: list of the cancelling orders
      `[
      {id: 1,
      creation_date: '2021-12-02',
      client_id: '1',
      name: 'Mario',
      surname: 'Rossi',
      total: 40,
      date: '2021-12-05',
      time: '10:10',
      pick_up: 1,
      address: 'Corso Duca degli Abruzzi, 24, Torino, 10129',
      status: 'CANCELLING'
      },
      {id: 2,
      creation_date: '2021-12-02',
      client_id: '1',
      name: 'Mario',
      surname: 'Rossi',
      total: 40,
      date: '2021-12-06',
      time: '10:15',
      pick_up: 0,
      address: 'Via Miglietti, 9, Torino, 10144',
      status: 'CANCELLING'
      }
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error

- GET `/api/farmer/:id/products`
    - Description: get all the products provided by a specific farmer identified by its id
    - request parameters: id of the farmer
    - response body content: list of the products
      `[
      {id: 1,
      name: 'banana',
      description: 'description of the product'
      category: 'fruit',
      quantity: '10',
      price: 1.50,
      farmer_id: 2
      img_path: 'url'
      confirmed: 1
      },
      {id: 1,
      name: 'apple',
      description: 'description of the product'
      category: 'fruit',
      quantity: '11',
      price: 2.50,
      farmer_id: 2
      img_path: 'url'
      confirmed: 1
      },
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error
- GET `/api/farmer/orders/:id`
    - Description: get all orders that contains a specific product ordered by date acquisition
    - request parameters: id of the product
    - response body content: list of orders ordered by date. Example with id = 3:
      `[
          {
            "id": 32,
            "quantity": 4
          },
          {
            "id": 33,
            "quantity": 2
          },
          {
            "id": 36,
            "quantity": 1
          },
          {
            "id": 37,
            "quantity": 1
          },
          {
            "id": 38,
            "quantity": 1
          }
        ]`

- DELETE `/api/products/:id`
    - Description: Delete a product identified by its id
    - request parameters: id of the product
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- DELETE `/api/orders/:id`
    - Description: Delete an order identified by its id
    - request parameters: id of the order
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- DELETE `/api/client/:id`
    - Description: Delete a client identified by its id
    - request parameters: id of the client
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- GET `/api/productsNW/:id`
    - Description: get all the products provided for the next week associated to a farmer
    - request parameters: id of the farmer
    - response body content: list of the products
      `[
      {id: 1,
      name: 'banana',
      description: 'description of the product'
      category: 'fruit',
      quantity: '10',
      price: 1.50,
      farmer_id: 2
      img_path: 'url'
      confirmed: 1
      },
      {id: 1,
      name: 'apple',
      description: 'description of the product'
      category: 'fruit',
      quantity: '11',
      price: 2.50,
      farmer_id: 2
      img_path: 'url'
      confirmed: 1
      },
      ]`

- POST `/api/productNW`
    - Description: Add a new product in the planning of the next week
    - request body content: description of the product to add
      `{id_user: 1,
      id_product: 2
      quantity: '11',
      price: 2.50
      }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- PUT `/api/productNW/quantity`
    - Description: modify the quantity of a product in the planning of the next week
    - request body content: quantity of the product to modify
      `{id: 1,
      quantity: '11'
      }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- PUT `/api/product/quantity`
    - Description: modify the quantity of a product related to a specific farmer
    - request body content: quantity of the product to modify
      `{farmer_id: 1,
        name: 'banana',
      quantity: '11'
      }`
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- DELETE `/api/productsNW/:id`
    - Description: Delete a product from the planning of the next week associated to a farmer
    - request parameters: id of the product
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- DELETE `/api/allproductsNW/:id`
    - Description: Delete all product from the planning of the next week associated to a farmer
    - request parameters: id of the farmer
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- DELETE `/api/allproductsNW`
    - Description: Delete all product from the planning of the next week associated to all the farmer
    - request parameters: None
    - response body content: last id
    - Response: 200 OK (success)
    - Error responses: generic error

- PUT `/api/orders/update`
    - Description: Update an order information
    - request parameters: None
    - response body content: None
    - Response: 201 OK (success)
    - Error responses: generic error
- GET `/api/telegramUsers`
    - Description: get all users that pressed /start in the telegram bot.
    - response body content: list of telegram users. 
      `[
          {
            "id": 11111111,
            "first_name": Cristian
          },
          {
            "id": 22222222,
            "first_name": Andrea
          }
        ]`
- GET `/api/report/basket/:order_id`
    - Description: get all the products associated to an order
    - request parameters: id of the order
    - response body content: list of the products
      `[
      {id: 1,
      name: 'banana',
      quantity: 5,
      price: 2.00,
      id: 2
      },
      {name: 'apple',
      quantity: 1,
      price: 2.50,
      }
      ]`
    - Response: 200 OK (success)
    - Error responses: generic error

- POST `/api/telegramMsg`
    - Description: Send at 9:00 am on Friday a message that informs the user that they can see all avaiable products.
    - request body content: description of message
      `{chat_id: 11111111,
       text: "Hi Cristian! We are happy to announce that our market is ready to get orders. Please check our products at http://localhost:3000/products 😍"
      }`
    - Response: 201 OK (success)
    - Error responses: 500 generic error
    
## Database Tables

- Table `USERS` (contains the data of all the user in the system: client, shop employee, farmer, delivery person, warehouse manager, warehouse employee):
* "id" INTEGER NOT NULL
* "email" TEXT NOT NULL
* "role" TEXT NOT NULL
* "name" TEXT NOT NULL
* "surname" TEXT NOT NUL
* "birthdate" TEXT
* "email" TEXT NOT NULL
* "password" TEXT NOT NULL
* "isConfirmed" INTEGER NOT NULL
  PRIMARY KEY("id")

- Table `PRODUCTS`(contains the data of the products):
    * "id" INTEGER NOT NULL
    * "name" TEXT NOT NULL
    * "description" TEXT NOT NULL
    * "category" TEXT NOT NULL
    * "quantity" INTEGER NOT NULL
    * "price" INTEGER NOT NULL
    * "farmer_id" INTEGER NOT NULL
    * "img_path" TEXT
    * "confirmed" BOOLEAN
      FOREIGN KEY("farmed_id") REFERENCES "users"("id")
      PRIMARY KEY("id")

- Table `PRODUCTS_NEXT_WEEK`(contains the data of the products available for next week):
    * "id" INTEGER NOT NULL
    * "id_user" INTEGER NOT NULL
    * "id_product" INTEGER NOT NULL
    * "description" TEXT NOT NULL
    * "category" TEXT NOT NULL
    * "quantity" INTEGER NOT NULL
    * "price" INTEGER NOT NULL
      FOREIGN KEY("user_id") REFERENCES "users"("id")
      PRIMARY KEY("id")

- Table `WALLETS`(contains the amount of the wallet for each client):
    * "id" INTEGER NOT NULL
    * "amount" NUMERIC NOT NULL
    * "client_id" INTEGER NOT NULL
      FOREIGN KEY("client_id") REFERENCES "users"("id")
      PRIMARY KEY("id")

- Table `ORDERS`(contains the data of the orders):
    * "id" INTEGER NOT NULL
    * "creation_date" TEXT NOT NULL
    * "client_id" TEXT NOT NULL
    * "total" INTEGER NOT NULL
    * "status" TEXT NOT NULL 
    * "pick_up" INTEGER NOT NULL
    * "address" TEXT
    * "date" TEXT
    * "time" TEXT
      FOREIGN KEY("client_id") REFERENCES "users"("id")
      PRIMARY KEY("id")

- Table `BASKETS`(contains the data about the products in the orders):
    * "order_id" INTEGER NOT NULL
    * "product_id" INTEGER NOT NULL
    * "quantity" INTEGER NOT NULL
      FOREIGN KEY("order_id") REFERENCES "ORDERS"("id")
      FOREIGN KEY("product_id") REFERENCES "PRODUCTS"("id")
      PRIMARY KEY("order_id", "product_id")

- Table `NOTIFICATIONS`(contains the data about the notification of cancelling orders):
    * "id" INTEGER NOT NULL
    * "description" TEXT
    * "client_id" INTEGER NOT NULL
      FOREIGN KEY("client_id") REFERENCES "USERS"("id")
      PRIMARY KEY("id")

- Table `DELIVERIES`(contains the data about the assignment of a delivery order to a delivery person):
    * "id" INTEGER NOT NULL
    * "order_id" INTEGER NOT NULL
    * "delivery_person_id" INTEGER NOT NULL
    * "isNear" INTEGER
      FOREIGN KEY("delivery_person_id") REFERENCES "USERS"("id")
      FOREIGN KEY("order_id") REFERENCES "ORDERS"("id")
      PRIMARY KEY("id")
- Table `TELEGRAM_USERS_BOT`(contains the data about the telegram bot users):
    * "id" INTEGER NOT NULL
    * "first_name" Text NOT NULL
      PRIMARY KEY("id")


## Main React Components

- `Homepage` (in `Homepage.js`): component that shows the homepage of the application.
- `Market` (in `Market.js`): component that show the list of available products.
  It uses the component `Product` to show the detail of each product.
- `Basket` (in `Basket.js`): component that shows the cart of the client and the list of products with the quantity added in the cart.
- `ListOfClients` (in `ListOfClients.js`): component that shows the list of clients and a button to top up the user's wallet and allow the shup employee to make an order for the user.
- `Wallet` (in `Wallet.js`): component that allow the shop employee top up a user's wallet
- `OrderPage` (in `OrderPage.js`): component that shows the list of all the orders
  It uses the component `OrderList` and `OrderModal`.
- `FarmerInterface` (in `FarmerInterface.js`): component that shows the homepage of a farmer.
    It uses:
  * the component `FarmerProduct` (in `FarmerProduct.js`) to shows the list of products of the specific farmer
  * the component `FarmerPlanning` (in `FarmerPlanning.js`) to allow the farmer to add some products available for the next week
  * the component `ProductForm` (in `ProductForm.js`) to allow the farmer to insert a new product
- `RegisterInterface` (in `RegisterInterface.js`):component that allow a user to log in.
- `NavBar` (in `NavBar.js`):component that represents the navbar of the application. It shows the name of the application some buttons that allow each user to sign in and login to the system and see the products.
- `VirtualClock` (in `VirtualClock.js`): component that simulate the clock in the app.

## Credentials
#### farmer:
- email: mariamarroni@gmail.com
- password: mariamarroni

#### shop employee:
- email: mariorossi@gmail.com
- password: mariorossi

#### client:
- email: isabellaverdi@gmail.com
- password: isabellaverdi

#### warehouse manager:
- email: giusepperossi@gmail.com
- password: giusepperossi

#### warehouse employee:
- email: paolobianchi@gmail.com
- password: paolobianchi

#### manager:
- email: francesconero@gmail.com
- password: francesconero