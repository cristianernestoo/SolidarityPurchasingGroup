import API from "./API";

/**
 * Client object
 * 
 * Params to pass to the constructor of the object:
 * @param {number} id - id of the client
 * @param {string} name - name of the client
 * @param {string} surname - surname of the client
 * @param {string} birthdate - birthdate of the client
 * @param {string} email - email of the client
 * @param {number} isConfirmed - client to be confirmed
 * 
 * Methods:
 * 
 * @function getId - return the ID of the client
 * @function updateWallet - update the wallet of the client
 */
class Client{
    constructor(id, name, surname, birthdate, email, isConfirmed, amount){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
        this.email = email;
        this.isConfirmed = isConfirmed;
        this.amount = amount;
    }

    static from(json) {
        const client = new Client();
        Object.assign(client, json);
        return client;
      }

    updateWallet(amount){
        return API.updateWallet(amount, this.id);
    }

}

/**
 * ClientList object -- used to manage clients of the shop 
 * WARNING: object must be initialized with initialize() method
 * after being created
 * 
 * Methods of the class:
 * 
 * @param {Function} initialize - load data from the DB
 * @param {Function} getClients - returns an array of Clients objects
 * @param {Function} getClientFromId - returns a Client object matching the specified id
 * @param {Function} addClient - add a new client
 */
class ClientsList{

    constructor(){
        this.init = false;
        this.clientsList = [];
    }

    /**
     * Retreive data from the database
     * 
     * @return {boolean} return true if the clientsList is correctly initialized with DB data, false otherwise
     */
    async initialize(){
        this.clientsList = await API.getAllClients();

        if(this.clientsList === undefined){
            return false;
        }

        this.init = true;
        return true;
    }

    /**
     * Retreive all clients
     * 
     * @return {Array} array with Clients type objects, returns undefined if the object as not correctly initialized
     */
    getClients(){

        if(!this.init){
            return undefined;
        }

        return this.clientsList;
    }

    /**
     * Get a client with a specific ID
     * 
     * @param {number} id - id of the client
     * @return {Client} return Client object with the specified id, undefined in case of non initialized object, [] in case of client not found
     */
    getClientFromId(id){

        if(!this.init){
            return undefined;
        }
        return this.clientsList.filter((c) => c.id === id);

    }

    /**
     * Add a new client
     * 
     * @param {string} name - name of the client
     * @param {string} surname - surname of the client
     * @param {string} role - role of the client
     * @param {string} birthdate - date in format dd/mm/aaaa
     * @param {string} email - email of the client
     * @param {string} password - hash of the password of the client
     * 
     * @return {boolean} return true if the client was correctly inserted in the DB, false otherwise
     */
    async addClient(name, surname, birthdate, email, password, isConfirmed){

        if(!this.init){
            return undefined;
        }

        const result = await API.createUser({role: 'client', name: name, surname: surname, birthdate: birthdate, email: email, password: password, isConfirmed: isConfirmed});

        if(result !== false){
            this.clientsList.push(new Client(result,name,surname,birthdate,email,isConfirmed))
        }

        return true;
    }
}

export {Client, ClientsList}