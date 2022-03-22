/**
* @jest-environment node
*/
import API from '../API';
import {Order} from '../Order';
const client = require('../Client');
const product = require('../Product');
const order = require('../Order');

let clientObject = new client.ClientsList();
let productObject = new product.ProductsList();
let orders = new order.OrdersList();


afterAll(async () => {
    const order_id = orders.getOrderFromId(orders.ordersList[0].id)[0].id;
    const product_id = productObject.getProducts()[productObject.getProducts().length-1].id;
    const client_id1 = clientObject.getClients()[clientObject.getClients().length-1].id;
    await API.deleteOrder(order_id).then(()=>console.log('test order deleted'));
    await API.deleteProduct(product_id).then(()=>console.log('test product deleted'));
    await API.deleteClient(client_id1).then(()=>console.log('test client ' + client_id1 + ' deleted'));
});

/* -------------- CLIENT -------------- */

/* Testing when object is not initialized */
test('c- addClient', async () => {
    const result = await clientObject.addClient();
    expect(result).toEqual(undefined)
})

test('c- getCLients', () => {
    expect(clientObject.getClients()).toEqual(undefined)
})

test('c- getClientFromId', () => {
    expect(clientObject.getClientFromId()).toEqual(undefined)
})
/* -------------------------------------- */

test('c-getClients', () => {
    //for now only 5 clients present in DB. Modify the toEqual if more clients are stored
    return clientObject.initialize().then(() => expect(clientObject.getClients().length).toEqual(5));
});

//adding one more client -> testing the createUser API
test('c-addClient', () => {
    clientObject.addClient('Andrea', 'Di Mauro', '11/03/1998', 'andrea@email.com', 'pass',1).then(() =>
    expect(clientObject.getClients().length).toEqual(6));
})

//testing the getFromId
test('c-getFromId', () => {
    expect(clientObject.getClientFromId(2)[0].name).toEqual('Marco');
})

test('c-Client.updateWallet', async () => {
    const response = await clientObject.getClientFromId(2)[0].updateWallet(20);
    expect(response).toEqual(true);
})

/* ---------------------------------- */

/* ---------- PRODUCTS ---------- */

/* Testing when object is not initialized */
test('p-getProducts', () => {
    expect(productObject.getProducts()).toEqual(undefined);
})

test('p-addProduct', async () => {
    const result = await productObject.addProduct();
    expect(result).toEqual(undefined);
})

test('p-getProductsFromCategory', () => {
    expect(productObject.getProductsFromCategory("Fruits")).toEqual(undefined);
})

test('p-updateConfirmed', async () =>{
    const result = await productObject.updateConfirm();
    expect(result).toEqual(undefined);
})
/*---------------------------------------- */

test('p-getProducts', () => {
    //WARNING: for now only 20 clients present in DB. Modify the toEqual if more products are stored
    return productObject.initialize().then(() => expect(productObject.getProducts().length).toEqual(28))
})

//adding one more product -> testing the createUser API
test('p-addProduct', () => {
    return productObject.addProduct("boh", "boh", 0.78, "Fruits", 0,12,"boh", 4).then(() =>
    expect(productObject.getProducts().length).toEqual(29));
})

test('p-getProductsFromCategory', () => {
    return expect(productObject.getProductsFromCategory("Fruits").length).toEqual(9);
})

//updating confirmed status test
test('p-updateConfirmed', () =>{
    return productObject.updateConfirm(21,1).then(() => productObject.initialize().then(() => expect(productObject.getProductsFromId(21)[0].confirmed).toEqual(1)))
})

/* ---------------------------------- */

/* ---------- ORDER ---------- */

//Testing functions when object is not initialized
test('', async () => {
    
    expect(orders.getOrders()).toEqual(undefined);
    expect(await orders.addOrder()).toEqual(undefined);
    expect(orders.getOrderFromId()).toEqual(undefined);
    expect(orders.getDeliverOrders()).toEqual(undefined);
    expect(orders.getPickUpOrders()).toEqual(undefined);
    expect(orders.getClientOrders()).toEqual(undefined);

})

test('o-getAllOrders',()=>{
    API.logIn("mariorossi@gmail.com","mariorossi");
    return orders.initialize().then(()=>{expect(orders.getOrders().length).toEqual(11)})
});

test('o-createOrder', async ()=>{
    const fakeOrder = new Order(38,'21/01/2021',2, 'testName', 'testSurname',10,'23/01/2021','16:00', 0, 'Via dei Test, 0, Test, 00000', 'PENDING');
    const result = await orders.addOrder(fakeOrder.creation_date, fakeOrder.client_id, fakeOrder.total,fakeOrder.pick_up, fakeOrder.address, fakeOrder.date, fakeOrder.time);
    expect(result).toBeTruthy();
});

test('o-changeStatusTrue', async ()=>{
    const fakeStatus = 'ACCEPTED';
    const order_id = orders.getOrderFromId(orders.ordersList[orders.getOrders().length-1].id)[0].id;
    const result = await orders.changeStatus(order_id, fakeStatus);
    expect(result).toBeTruthy();
});

test('o-getDeliverOrders', () => {
    expect(orders.getDeliverOrders().length > 0).toEqual(true);
})

test('o-getPickUpOrders', () => {
    expect(orders.getPickUpOrders().length > 0).toEqual(true);
})

test('o-getClientOrders', () => {
    expect(orders.getClientOrders(2).length > 0).toEqual(true);
})

test('o-changeDateTimeTrue',()=>{
    const fakeDate = '30/01/2021';
    const fakeTime = '17:00';

    return orders.initialize().then(()=>{
        const order_id = orders.getOrderFromId(orders.ordersList[orders.getOrders().length-1].id)[0].id;
        expect((API.changeDateTime(order_id,fakeDate,fakeTime))).toBeTruthy();
    });
});

test('f-getOrderedProducts', ()=>{
    const id=4;
    expect(API.getOrderedProductsByFarmer(id)).toBeTruthy();
})
