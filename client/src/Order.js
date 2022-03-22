import API from "./API";


/**
 * Order object
 *
 * Params to pass to build the object:
 * @param {number} id - id of the order
 * @param {string} creation_date - creation date of the order
 * @param {number} client_id - id of the client linked to the order
 * @param {string} client_name - name of the client linked to the order
 * @param {string} client_surname - surname of the client linked to the order
 * @param {number} total - total cost of the order
 * @param {string} status - status of the order (pending, accepted, cancelling, failed, ready, delivered)
 * @param {boolean} pick_up - type of delivery (pick_up = 1 / home delivery = 0)
 * @param {string} address - pick up/delivery address
 * @param {string} date - date of pick up/delivery
 * @param {string} time - time of pick up/delivery
 *
 */

class Order {
    constructor(id, creation_date, client_id, client_name, client_surname, total, date, time, pick_up, address, status='PENDING') {
        this.id = id;
        this.creation_date = creation_date;
        this.client_id = client_id;
        this.client_name = client_name;
        this.client_surname = client_surname;
        this.total = total;
        this.date = date;
        this.time = time;
        this.pick_up = pick_up;
        this.address = address;
        this.status = status;
    }
}

/**
 * OrdersList object -- used to manage orders of the shop
 * WARNING: object must be initialized with initialize() method
 * after being created
 *
 * Methods of the class:
 *
 * @param {Function} initialize - load data from DB
 * @param {Function} getOrders - return an array of Order objects
 * @param {Function} addOrder - add a new Order in the DB
 * @param {Function} getOrderFromId - return an array with the Order object with the specified id
 * @param {Function} getDeliverOrders - return an array of Order objects with type of delivery = delivery (pick_up = 0)
 * @param {Function} getPickUpOrders - return an array of Order objects with type of delivery = pick up (pick_up = 1)
 * @param {Function} getClientOrders - update the confirmed status of the product
 */
class OrdersList {

    constructor() {
        this.init = false;
        this.ordersList = [];
    }

    /**
     * Retreive data from the database
     *
     * @return {boolean} return true if the ordersList is correctly initialized with DB data, false otherwise
     */
    async initialize() {

        this.ordersList = await API.getAllOrders();

        if (this.ordersList === undefined) {
            return false;
        }
        this.init = true;
        return true;
    }

    /**
     * Retreive all orders
     *
     * @return {Array} array with Order type objects, returns undefined if the object as not correctly initialized
     */
    getOrders() {

        if (!this.init) {
            return undefined;
        }

        return this.ordersList;
    }

    /**
     * Add a new order
     *
     * @param {number} id - id of the order
     * @param {string} creation_date - creation date of the order
     * @param {number} client_id - id of the client linked to the order
     * @param {number} total - total cost of the order
     * @param {string} status - status of the order (pending, accepted, cancelling, failed, ready, delivered)
     * @param {boolean} pick_up - type of delivery (pick_up = 1 / home delivery = 0)
     * @param {string} address - pick up/delivery address
     * @param {string} date - date of pick up/delivery
     * @param {string} time - time of pick up/delivery
     *
     * @return {boolean} return true if the order was added correctly in the DB, false otherwise
     */
    async addOrder(creation_date, client_id, total, pick_up, address, date, time) {

        if (!this.init) {
            return undefined;
        }

        const status = 'PENDING';

        return API.createOrder({ creation_date: creation_date, client_id: client_id, total: total, status: status, pick_up: pick_up, address: address, date: date, time: time });
    }

    /**
     * Update the status of the choosen order
     *
     * @param {number} order_id - id of the order to update
     * @param {string} status - new status of the order
     *
     * @return {boolean} return true if the status was correctly updated, false otherwise
     */
    async changeStatus(order_id, status) {

        console.log(this.init);
        return API.changeStatus(order_id, status);
    }

    /**
     * Get am order with a specific ID
     *
     * @param {number} id - id of the order
     * @return {Array} return an array with the Order object with the specified id, undefined in case of non initialized object
     */
    getOrderFromId(id) {

        if (!this.init) {
            return undefined;
        }

        return this.ordersList.filter((o) => o.id === id);

    }

    /**
     * Get orders with type of delivery = delivery (pick_up = 0)
     *
     * @return {Array} return an array with the Order objects with the specified type of delivery, undefined in case of non initialized object
     */
    getDeliverOrders() {

        if (!this.init) {
            return undefined;
        }

        return this.ordersList.filter((o) => o.pick_up === 0);
    }

    /**
     * Get orders with type of delivery = pick_up (pick_up = 1)
     *
     * @return {Array} return an array of Order objects with the specified type of delivery, undefined in case of non initialized object
     */
    getPickUpOrders() {

        if (!this.init) {
            return undefined;
        }

        return this.ordersList.filter((o) => o.pick_up === 1);
    }

    /**
     * Get all orders related to a specific client
     *
     * @param {number} client_id - id of the client
     *
     * @return {Array} return an array of Order objects related to a specific client, undefined in case of non initialized object
     */
    getClientOrders(client_id) {

        if (!this.init) {
            return undefined;
        }

        return this.ordersList.filter((o) => o.client_id === client_id);
    }

}

export { Order, OrdersList }