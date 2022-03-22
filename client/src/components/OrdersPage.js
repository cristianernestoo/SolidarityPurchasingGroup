import OrdersList from "./OrdersList";
import OrderModal from "./OrderModal";
import { useState } from 'react';

function OrdersPage(props){
    const {orders, setOrders, loggedIn} = props;
    const [modalShow, setModalShow] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(''); //current order selected for top up
    const [dirty, setDirty] = useState(false);  
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    return(
        <>
            <OrdersList
                orders={orders} 
                setOrders={setOrders} 
                loggedIn={loggedIn} 
                dirty={dirty}
                setDirty={setDirty} 
                setSelectedOrder={setSelectedOrder} 
                setModalShow={setModalShow}
                setDate={setDate}
                setTime={setTime}
            />
            <OrderModal 
                show={modalShow} 
                setModalShow={setModalShow} 
                setDirty={setDirty} 
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                onHide={() => {setModalShow(false); setDate(''); setTime('')}} 
                selectedOrder={selectedOrder}
            />
        </>
    );
}

export default OrdersPage;