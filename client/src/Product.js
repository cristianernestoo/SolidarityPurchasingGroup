import API from "./API";

/**
 * Product object
 *
 * Params to pass to build the object:
 * @param {number} id - id of the product
 * @param {string} name - name of the product
 * @param {string} description - description of the product
 * @param {string} category - category of the prodct
 * @param {number} quantity - number of units of products present
 * @param {string} expire - expiration date if present in string "dd/mm/aaaa"
 * @param {number} farmer_id - id of the farmer who sells the product
 * @param {string} img_path - path of the image relative to the product
 *
 */
class Product{
    constructor(id, name, description, category, quantity, price, farmer_id, img_path, confirmed){
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.farmer_id = farmer_id;
        this.img_path = img_path;
        this.confirmed = confirmed;
    }
}

/**
 * ProductsList object -- used to manage products of the shop
 * WARNING: object must be initialized with initialize() method
 * after being created
 *
 * Methods of the class:
 *
 * @param {Function} initialize - load data from DB
 * @param {Function} getProducts - return an array of Product objects
 * @param {Function} getProductsFromId - return an array with the Product object with the specified id
 * @param {Function} getProductsFromCategory - return an array of Product objects with the specified category
 * @param {Function} addProduct - add a new Product in the DB
 * @param {Function} updateConfirm - update the confirmed status of the product
 */
class ProductsList{

    constructor(){
        this.init = false;
        this.productsList = [];
    }

    /**
     * Retreive data from the database
     *
     * @return {boolean} return true if the productsList is correctly initialized with DB data, false otherwise
     */
    async initialize(){

        this.productsList = await API.getAllProducts();

        if(this.productsList === undefined){
            return false;
        }

        this.init = true;
        return true;
    }

    /**
     * Retreive all products
     *
     * @return {Array} array with Product type objects, returns undefined if the object as not correctly initialized
     */
    getProducts(){

        if(!this.init){
            return undefined;
        }

        return this.productsList;
    }

    /**
     * Get a product with a specific ID
     *
     * @param {number} id - id of the product
     * @return {Array} return an array with the Product object with the specified id, undefined in case of non initialized object
     */
    getProductsFromId(id){

        if(!this.init){
            return undefined;
        }

        return this.productsList.filter((p) => p.id === id);

    }

    /**
     * Get products belonging to the specified category
     *
     * @param {number} category - id of the product
     * @return {Array} return an array with the Products objects with the specified id, undefined in case of non initialized object
     */
    getProductsFromCategory(category){

        if(!this.init){
            return undefined;
        }

        return this.productsList.filter((p) => p.category === category);
    }

    /**
     * Add a new product
     *
     * @param {string} name - name of the product
     * @param {string} description - description of the product
     * @param {number} price - price of the product
     * @param {string} category - category of the product
     * @param {number} confirmed - 0 if the product id not confirmed, 1 otherwise
     * @param {number} quantity - quantity of the product
     * @param {string} img_path - path of the image to show in the UI
     * @param {number} farmer_id - id of the farmer who sells the product
     *
     * @return {boolean} return true if the product was added correctly in the DB, false otherwise
     */
    async addProduct(name, description, price, category, confirmed, quantity, img_path, farmer_id){

        if(!this.init){
            return undefined;
        }

        const result = await API.createProduct({name:name, description: description, price:price, category: category, confirmed: confirmed, quantity: quantity, img_path: img_path, farmer_id: farmer_id});
        if(result !== false){
            this.productsList.push(new Product(result,name,description,category,quantity,price,farmer_id,img_path,confirmed));
        }

        return result;
    }

    /**
     * Update the confirmed field of the product specified
     *
     * @param {number} id - id of the product to update
     * @param {number} confirm_value - 0 if the product is not confirmed, 1 otherwise
     *
     * @return {boolean} return true if the product was correctly updated, false otherwise
     */
    async updateConfirm(id, confirm_value){

        if(!this.init){
            return undefined;
        }

        return API.updateConfirmedProduct(confirm_value, id);
    }

}

export {Product, ProductsList}