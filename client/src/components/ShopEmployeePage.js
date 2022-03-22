import ListOfClients from "./ListOfClients";
import { useState } from 'react';
import Wallet from './Wallet';

function ShopEmployeePage(){
    const [walletShow, setWalletShow] = useState(false);
    const [increment, setIncrement] = useState(0); //how much to top up
    const [user, setUser] = useState([]); //current user selected for top up
    const [amountCancellingOrders, setAmountCancellingOrders] = useState(0);  //total euro of cancelling orders


    return(
        <>
            <ListOfClients setWalletShow={setWalletShow} setUser={setUser} setAmountCancellingOrders={setAmountCancellingOrders}/>
            <Wallet show={walletShow} setWalletShow={setWalletShow} increment={increment} setIncrement={setIncrement} onHide={() => {setWalletShow(false); setIncrement(0)}} user={user} amountCancellingOrders={amountCancellingOrders}/>
        </>
    );
}

export default ShopEmployeePage;