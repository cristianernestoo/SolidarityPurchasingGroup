import { Client } from './Client'
import { Order } from './Order';
import { Product } from './Product';

/*** Jest import + TEST URL (to uncomment for testing the app) ***/
//import "jest-fetch-mock"
//const BASEURL = 'http://localhost:3001/api';

/*** DEFAULT URL (to uncomment for running the app) ***/
const BASEURL = '/api';

function getAllClients(){
    return new Promise((resolve,reject) => {
      fetch(BASEURL+'/clients').then((response)=>{
        if(response.ok){
          response.json().then((json)=>{
            const clients = json.map((clientJson) => Client.from(clientJson));
            resolve(clients);
          }).catch((err)=>reject(err));
        } else reject();
      }).catch((err) => reject(err));
    });
}

async function createUser(u) {

    try {
      const response = await fetch(BASEURL + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {role: u.role, name: u.name, surname: u.surname, birthdate: u.birthdate,
            email: u.email, password: u.password, isConfirmed : u.isConfirmed }
          )
      })
      const newID = await response.json();

      if (!response.ok) {
        console.log(response);
        throw response;
      }

      return newID.id;
    }
    catch {
      return false;
    }
}

async function getAllProducts(){

    const response = await fetch(BASEURL + '/products');

    const products = await response.json();

    if (response.ok) {
        return products.map((p) => new Product(p.id, p.name, p.description, p.category, p.quantity, p.price, p.farmer_id, p.img_path, p.confirmed));
    } else {
        return undefined;
    }
}



//get ordered products by farmer
async function getOrderedProductsByFarmer(farmer_id){

  const response = await fetch(BASEURL + '/farmer/' + farmer_id);

  const products = await response.json();

  if (response.ok) {
      return products;
  } else {
      return undefined;
  }
}

//get all orders relative to a product ordered of a farmer ordered by date
async function getOrderedByFarmerByDate(product_id){

  const response = await fetch(BASEURL + '/farmer/orders/' + product_id);

  const orders = await response.json();

  if (response.ok) {
    return orders;
  } else {
    return undefined;
  }
}


async function createProduct(p) {
    try {
      const response = await fetch(BASEURL + '/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            { name: p.name, description: p.description, category: p.category, quantity: p.quantity, price: p.price ,
              farmer_id: p.farmer_id, img_path: p.img_path, confirmed: p.confirmed}
        )
      })
      const newID = await response.json();

      if (!response.ok) {
        console.log(response);
        throw response;
      }

      return newID.id;
    }
    catch {
      return false;
  }

}

async function getAllOrders() {

  const response = await fetch(BASEURL + '/orders');

  const orders = await response.json();

  if (response.ok) {
    return orders.map((o) => new Order(o.id, o.creation_date, o.client_id, o.name, o.surname, o.total, o.date, o.time, o.pick_up, o.address, o.status));
  } else {
    return undefined;
  }
}

async function createOrder(o) {
  try {
    const response = await fetch(BASEURL + '/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          creation_date: o.creation_date,
          client_id: o.client_id,
          total: o.total,
          status: 'PENDING',
          pick_up: o.pick_up,
          address: o.address,
          date: o.date,
          time: o.time
        }
      )
    })
    const newID = await response.json();

    if (!response.ok) {
      throw response;
    }

    return newID;
  }
  catch {
    return false;
  }

}

async function updateConfirmedProduct(confirmed, id) {

    const response = await fetch(BASEURL + '/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          confirmed: confirmed,
          id:id
        })
      });
    console.log(response);
    return response.ok;

}

async function changeStatus(order_id, status) {

  const response = await fetch(BASEURL + '/orders/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: order_id,
        status: status
      })
    });

    return response.ok;
}

async function changeDateTime(order_id, date, time) {

  const response = await fetch(BASEURL + '/orders/datetime', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: order_id,
        date: date,
        time: time
      })
    });

  return response.ok;

}

async function changeQuantity(product_id, order_quantity){
  const response = await fetch(BASEURL + '/products/quantity', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: product_id,
        order_quantity: order_quantity
  })
});
console.log(response.ok);
return response.ok;
}

async function updateWallet(amount, clientID){
  const response = await fetch(BASEURL + '/wallets', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: amount,
      id: clientID
    })
  });
  return response.ok;
}

function logIn(username, password, history) {
  let userRole;
  return new Promise((resolve, reject) => {
    fetch(BASEURL+'/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          resolve([user.role,user.name,user.id])
          userRole = user.role;
        }).finally(()=>{
          if(userRole){
            console.log(userRole);
            switch(userRole){
              case 'shopemployee':
                history.push({pathname: '/clientlist'});
                break;
              case 'client':
                history.push('/products');
                break;
              case 'farmer':
                history.push('/farmer');
                break;
              case 'manager':
                history.push('/manager');
                break;
            case 'warehousemanager':
                history.push('/warehousemanager');
                break;
              case 'warehouseemployee':
                history.push('/warehouseEmployee');
                break;
              default:
                history.push('/');
              break;
            }
          }
        }).catch((err) => reject(err));
      } else {
        reject();
      }
    }).catch((err) => reject(err));
  });
}

async function logOut() {
  await fetch(BASEURL + '/sessions/current', { method: 'DELETE' });
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    fetch(BASEURL+'/sessions/current')
      .then((response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            resolve(userInfo);
          }).catch((err) => reject(err));
        } else {
          reject();
        }
      }).catch((err) => reject(err));
  })
}

async function createBasket(b) {
  try {
    const response = await fetch(BASEURL + '/basket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          order_id: b.order_id,
          product_id: b.product_id,
          quantity: b.quantity,
          updated: b.updated,
        }
      )
    })
    const inserted = await response.json();

    if (!response.ok) {
      throw response;
    }

    return inserted;
  }
  catch {
    return false;
  }

}

async function getBasket(order_id) {

  const response = await fetch(BASEURL + '/basket/' + order_id);

  const products = await response.json();

  if (response.ok) {
    return products/* .map((p) =>{new Product(p.id, p.name,'' ,'' ,p.quantity, p.price,'','','')}) */;
  } else {
    return undefined;
  }
}

async function getReportBasket(order_id) {

    const response = await fetch(BASEURL + '/report/basket/' + order_id);

    const products = await response.json();

    if (response.ok) {
        return products/* .map((p) =>{new Product(p.id, p.name,'' ,'' ,p.quantity, p.price,'','','')}) */;
    } else {
        return undefined;
    }
}

async function getClientById(client_id) {

  const response = await fetch(BASEURL + '/clients/' + client_id);

  const client = await response.json();

  if (response.ok) {
    return client;
  } else {
    return undefined;
  }
}

async function getNotifications(client_id){
  const response = await fetch(BASEURL + '/notifications/' + client_id);
  return  response.json();
}

async function postNotification(client_id, description){
  try {
    const response = await fetch(BASEURL + '/notifications/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          client_id: client_id,
          description: description
        }
      )
    })
    const inserted = await response.json();

    if (!response.ok) {
      throw response;
    }

    return inserted;
  }
  catch {
    return false;
  }

}


async function deleteNotification(client_id){
  const response = await fetch(BASEURL + '/notifications/' + client_id, { method: 'DELETE' });

  await response.json();

  return true;
}

async function getCancellingOrdersByClientId(client_id) {

  const response = await fetch(BASEURL + '/orders/' + client_id);

  const orders = await response.json();

  if (response.ok) {
    return orders;
  } else {
    return undefined;
  }
}
async function getProductsByFarmer(farmer_id){

  const response = await fetch(BASEURL + `/farmer/${farmer_id}/products`);

  const products = await response.json();

  if (response.ok) {
      return products.map((p) => new Product(p.id, p.name, p.description, p.category, p.quantity, p.price, p.farmer_id, p.img_path, p.confirmed));
  } else {
      return undefined;
  }
}

async function deleteProduct(product_id){
  const response = await fetch(BASEURL + '/products/' + product_id, { method: 'DELETE' });
  await response.json();

  return response.ok;
}

async function deleteOrder(order_id){
  const response = await fetch(BASEURL + '/orders/' + order_id, { method: 'DELETE' });
  await response.json();
  return response.ok;
}

async function deleteClient(client_id){
  const response = await fetch(BASEURL + '/clients/' + client_id, { method: 'DELETE' });
  await response.json();
  return response.ok;
}

async function getProductNW(farmer_id) {

  const response = await fetch(BASEURL + '/productsNW/' + farmer_id);

  const products = await response.json();

  if (response.ok) {
    return products.map((p) =>{return {
      id:p.id,
      quantity: p.quantity,
      price: p.price,
      name:p.name,
      description:p.description,
      category:p.category,
      farmer_id:p.farmer_id,
      img_path:p.img_path,
      confirmed_by_farmer:p.confirmed_by_farmer
    }}) ;
  } else {
    return undefined;
  }
}

//insert Product for Next Week
async function createProductNW(p) {
  console.log(p);
  try {
    const response = await fetch(BASEURL + '/productNW', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          id: p.id,
          quantity: p.quantity,
          price: p.price,
          name: p.name,
          description: p.description,
          category: p.category,
          farmer_id: p.farmer_id,
          img_path: p.img_path,
          confirmed_by_farmer: p.confirmed_by_farmer
        }
      )
    })
    const inserted = await response.json();

    if (!response.ok) {
      throw response;
    }

    return inserted;
  }
  catch {
    return false;
  }

}

async function changeProductNW(id, quantity){
  const response = await fetch(BASEURL + '/productsNW/quantity', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        quantity: quantity
  })
});
return response.ok;
}

async function changeProductNWConfirm(farmer_id){
  const response = await fetch(BASEURL + '/productsNW/confirm', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmer_id: farmer_id
  })
});
return response.ok;
}
async function changeProduct(b){
  const response = await fetch(BASEURL + '/product/quantity', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmer_id: b.farmer_id,
        name: b.name,
        quantity: b.quantity
  })
});
return response.ok;
}

function deleteProductNW(id) {
  return new Promise((resolve, reject) => {
      fetch(BASEURL + '/productsNW/' + id, {
          method: 'DELETE',
      }).then((response) => {
          if (response.ok) {
              resolve(true);
          } else {
              response.json()
                  .then((obj) => { reject(obj); }) // error msg in the response body
                  .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) });
          }
      }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
  });
}

function deleteAllProductNWNotConfirmed() {
  return new Promise((resolve, reject) => {
      fetch(BASEURL + '/productsNWNotConfirmed', {
          method: 'DELETE',
      }).then((response) => {
          if (response.ok) {
            resolve(true);
          } else {
              response.json()
                  .then((obj) => { reject(obj); }) // error msg in the response body
                  .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
          }
      }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
  });
}

function deleteAllProductNW() {
  return new Promise((resolve, reject) => {
      fetch(BASEURL + '/allProductsNW', {
          method: 'DELETE',
      }).then((response) => {
          if (response.ok) {
              console.log('delete done');
              resolve(true);
          } else {
              response.json()
                  .then((obj) => { reject(obj); }) // error msg in the response body
                  .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
          }
      }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
  });
}

async function getClientPendingOrders(client_id) {

  const response = await fetch(BASEURL + '/pending/' + client_id);

  const orders = await response.json();

  if (response.ok) {
    return orders.map((o) => new Order(o.id, o.creation_date, o.client_id, o.name, o.surname, o.total, o.date, o.time, o.pick_up, o.address, o.status));
  } else {
    return undefined;
  }
}

async function getClientAcceptedOrders(client_id) {

  const response = await fetch(BASEURL + '/accepted/' + client_id);

  const orders = await response.json();

  if (response.ok) {
    return orders.map((o) => new Order(o.id, o.creation_date, o.client_id, o.name, o.surname, o.total, o.date, o.time, o.pick_up, o.address, o.status));
  } else {
    return undefined;
  }
}

async function updateQuantityBasket(order_id, product_id, quantity, updated){
  const response = await fetch(BASEURL + '/basket/order/' + order_id + '/product/' + product_id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantity: quantity,
        updated: updated
  })
});
console.log(response.ok);
return response.ok;
}

async function updateTotalInOrders(order_id,difference){
  const response = await fetch(BASEURL + '/orders/' + order_id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        difference: difference,
  })
});
console.log(response.ok);
return response.ok;
}

async function updateOrder(order){
  const response = await fetch(BASEURL + '/orders/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: order.id,
      total: order.total,
      pick_up: order.pick_up,
      address: order.address,
      date: order.date,
      time: order.time,
    }),
});
console.log(response.ok);
return response.ok;
}

async function getPendingOrCancellingOrders(){
  const response = await fetch(BASEURL + '/pendingorcancelling');

  const orders = await response.json();

  if (response.ok) {
    return orders.map((o) => new Order(o.id, o.creation_date, o.client_id, o.name, o.surname, o.total, o.date, o.time, o.pick_up, o.address, o.status));
  } else {
    return undefined;
  }
}

async function getWallets(){
  const response = await fetch(BASEURL + '/wallets');

  const wallets = await response.json();

  if (response.ok) {
    return wallets.map((w) =>{return {
      id:w.id,
      amount:w.amount,
      client_id:w.client_id}}) ;
  } else {
    return undefined;
  }
}
async function getAllTelegramUsers(){
  const response = await fetch(BASEURL + '/telegramUsers');

  const users = await response.json();

  if (response.ok) {
    return users.map((u) =>{return {
      id:u.id,
      first_name:u.first_name}}) ;
  } else {
    return undefined;
  }
}
async function sendTelegramMessage(chat_id, text){
  try {
    const response = await fetch(BASEURL + '/telegramMsg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          chat_id: chat_id,
          text: text
        }
      )
    })
    const inserted = await response.json();

    if (!response.ok) {
      throw response;
    }

    return inserted;
  }
  catch {
    return false;
  }

}

async function getWeekProducts(){

  const response = await fetch(BASEURL + '/products/week');

  const products = await response.json();

  if (response.ok) {
      return products.map((p) => new Product(p.id, p.name, p.description, p.category, p.quantity, p.price, p.farmer_id, p.img_path, p.confirmed_by_farmer));
  } else {
      return undefined;
  }
}


const API = {
  getNotifications,
  postNotification,
  deleteNotification,
  getCancellingOrdersByClientId,
  getAllClients,
  getAllProducts,
  updateConfirmedProduct,
  createUser,
  createProduct,
  getAllOrders,
  createOrder,
  changeStatus,
  changeDateTime,
  logIn,
  logOut,
  getUserInfo,
  updateWallet,
  createBasket,
  getBasket,
  changeQuantity,
  getClientById,
  getProductsByFarmer,
  deleteProduct,
  deleteOrder,
  deleteClient,
  getProductNW,
  createProductNW,
  changeProductNW,
  deleteProductNW,
  changeProductNWConfirm,
  deleteAllProductNW,
  changeProduct,
  getClientPendingOrders,
  getClientAcceptedOrders,
  getOrderedProductsByFarmer,
  getOrderedByFarmerByDate,
  updateQuantityBasket,
  updateOrder,
  updateTotalInOrders,
  getPendingOrCancellingOrders,
  getWallets,
  getAllTelegramUsers,
  sendTelegramMessage,
  getWeekProducts,
  deleteAllProductNWNotConfirmed,
  getReportBasket
}

export default API;