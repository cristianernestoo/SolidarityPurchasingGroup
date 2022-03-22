import { useState, useEffect } from "react";
import{ Container, Table, Modal, Button, Alert} from "react-bootstrap";
import {BsClockHistory} from "react-icons/bs";
import API from '../API';

function FarmerOrders(props){
    const {orderedProducts, clock } = props;
    const sendQuantities = orderedProducts.map((p) => ({id: p.id, quantity: p.amount}));
    const passedTime = clock.checkWalletsOkMilestone();
    // Do here the fetch between products and return of new query

    return (
        <Container fluid className="page width-100 below-nav table" {...props}>
            {passedTime ? 
            <Alert show={passedTime} variant="warning">
                <Alert.Heading className="mt-2">
                <BsClockHistory size={25} className="mr-3"/>
                    Confirmation not available
                </Alert.Heading>
                <p>
                Confirmation time has passed, you have to wait until next Monday. 
                </p>
            </Alert> : 
            ''  
            }
            <FarmerOrderTable products={orderedProducts} quantities={sendQuantities} passedTime={passedTime}/>
        </Container>

    );

}

function FarmerOrderTable(props){
    const {products, quantities, passedTime} = props;
    const [confirmedProducts, setConfirmedProducts] = useState([]);
    const [tempOrders, setTempOrders] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [actualIndex, setActualIndex] = useState(0);

    useEffect(() => {
        setConfirmedProducts(quantities);
    }, []);


    const onHide = () => {setShowConfirmation(false)}
    const handleConfirmAlert = (index) => {setActualIndex(index); setShowConfirmation(true)};
    

    useEffect(() => {
        let tO = [];
        function fetchOrdersByFarmer() {
            quantities.forEach(async (product, index) => {
                const tempOrder =  await API.getOrderedByFarmerByDate(product.id);
                tO[index] = tempOrder;
                setTempOrders(tO);
            })
            }
         fetchOrdersByFarmer();
    },[quantities]);
    
     const updateConfirmation = async (index) => {
       let confirmed = confirmedProducts[index].quantity;
       console.log('temp', tempOrders);
       console.log('confirm:', confirmedProducts);
       for(let i=0;i<tempOrders[index].length; i++){
            if(confirmed - tempOrders[index][i].quantity >=0){
                    confirmed -= tempOrders[index][i].quantity;
                    await  API.updateQuantityBasket(tempOrders[index][i].id,confirmedProducts[index].id, tempOrders[index][i].quantity, 1);
                    
            } else{
                    let difference = (tempOrders[index][i].quantity - confirmed)*products[index].price;
                    await  API.updateQuantityBasket(tempOrders[index][i].id,confirmedProducts[index].id, confirmed, 1).then(API.updateTotalInOrders(tempOrders[index][i].id, difference));
                    confirmed = 0;
            }
            const changeStatus = await checkClientAmount(tempOrders[index][i].client_id, tempOrders[index][i].total);
            if (changeStatus) {
                API.changeStatus(tempOrders[index][i].id, 'CANCELLING');
            }
       }
       setShowConfirmation(false);
       document.getElementById(`button-${index}`).disabled = true;
       document.getElementById(`input-${index}`).disabled = true;
    }
    const updateFieldChanged = index => e => {
        let newArr = [...confirmedProducts];
        const newNumber = Number(e.target.value);
        if (newNumber > products[index].amount){ // if quantity inserted is higher than maximum, insert maximum
            newArr[index]['quantity'] = products[index].amount;
        } else {
            newArr[index]['quantity'] = Number(e.target.value); // replace e.target.value with whatever you want to change it to
        }
        setConfirmedProducts(newArr);

      }

    const checkClientAmount = async (client_id, total) =>{
        
        const client = await API.getClientById(client_id);
        return (client.amount < total);
        
    }

    return (
        <>
        <Table striped bordered hover responsive {...props} >
            <thead>
                <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Name of product</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Estimated</th>
                    <th className="text-center">Ordered</th>
                    <th className="text-center">Confirmed</th>
                    <th className="text-center">Confirmation</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((p, index) => (
                        <tr key={`tr-${p.id}`} data-testid = {`tr-${p.id}`}>
                            <td className="text-center">{p.id}</td>
                            <td className="text-center">{p.name}</td>
                            <td className="text-center"><strong>€ {p.price.toFixed(2)}</strong></td>
                            <td className="text-center"><strong >{p.estimated}</strong></td>
                            <td className="text-center"><strong >{p.amount}</strong></td>
                            <td className="text-center"><strong>
                                <input id={`input-${index}`}type='number' name='quantity' disabled={(p.updated || passedTime) ? true: false} value={confirmedProducts.length > 0 ? confirmedProducts[index].quantity : ''} className = "display-amount" max={p.amount} min={0} onChange={updateFieldChanged(index)}/>  </strong></td>
                            <td className="text-center"><button data-testid="confirm_button" id={`button-${index}`} disabled={(p.updated || passedTime) ? true: false} className="dropdown dropdown-btn" onClick={() => handleConfirmAlert(index)}> Confirm orders </button></td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        <Modal
            centered
            show={showConfirmation}
            onHide={onHide}
            size='sm'
        >
						<Modal.Header closeButton />

						<Modal.Body style={{backgroundColor: "#fff3cd"}}>
						<Alert variant="warning">
								<Alert.Heading className="mt-2">
									Confirmation
								</Alert.Heading>
								<p>
									Are you sure you want to confirm this quantity?
								</p>
						</Alert>
					</Modal.Body>
					<Modal.Footer>
						<Button style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"left"}} onClick={onHide}>
							Close
                        </Button>
                        <Button data-testid="last_confirm" style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"right"}} onClick={()=>updateConfirmation(actualIndex)}>
                            Confirm
						</Button>
					</Modal.Footer>



				</Modal>
        </>
    );
}

export {FarmerOrders, FarmerOrderTable};