/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, findByText, getByText, fireEvent, screen} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import OrdersList from '../components/OrdersList';
import DeleteModal from '../components/ClientOrders/DeleteModal';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });

const fakeOrders = [
    {
        id: 28,
        creation_date: '2021-11-16',
        client_id: 2, 
        client_name: 'Marco',
        client_surname: 'Bianchi',
        total: 0.75,
        date: '',
        time: '',
        pick_up: 1,
        address: 'Corso Duca degli Abruzzi, 24',
        status: 'PENDING'
    },
    {
        id: 24,
        creation_date: '2021-11-26',
        client_id: 3, 
        client_name: 'Luca',
        client_surname: 'Neri',
        total: 3.40,
        date: '2021-11-30',
        time: '10:00',
        pick_up: 1,
        address: 'Corso Duca degli Abruzzi, 24',
        status: 'ACCEPTED'
    }
];

const fakeBasket = {
    id: 1,
    name: test,
    price: 1,
    img_path: '',
    quantity: 1
}

it('renders DeleteModal without crashing', () => {

    const setModalShow = jest.fn();
    const onHide = jest.fn();

    shallow(
        <DeleteModal
            show={true}
            setModalShow={setModalShow}
            clientOrders={fakeOrders}
            order_id={fakeOrders[0].id}
            basket={fakeBasket}
            onHide={onHide}
        />
    );  
});

it("renders DeleteModal components without crashing", () => {  
    const setModalShow = jest.fn();
    const onHide = jest.fn();

    const wrapper = shallow(
        <DeleteModal
            show={true}
            setModalShow={setModalShow}
            clientOrders={fakeOrders}
            order_id={fakeOrders[0].id}
            basket={fakeBasket}
            onHide={onHide}
        />
    );  

    expect(wrapper.find('Modal').exists()).toBeTruthy();
    expect(wrapper.find('ModalHeader').exists()).toBeTruthy();
    expect(wrapper.find('ModalTitle').exists()).toBeTruthy();
    expect(wrapper.find('ModalFooter').exists()).toBeTruthy();
});

it('Modal e2e testing', async  () => {
    
    const setModalShow = jest.fn();
    const onHide = jest.fn();

    const component = render(
        <Router>
            <DeleteModal
                show={true}
                setModalShow={setModalShow}
                clientOrders={fakeOrders}
                order_id={fakeOrders[0].id}
                basket={fakeBasket}
                onHide={onHide}
            />
        </Router>
    );

    expect(screen.getByText(`By confirming you are going to cancel this order.`)).toBeInTheDocument();
    expect(screen.getByText(`Are you sure?`)).toBeInTheDocument();
    expect(screen.getByText(`Undo`)).toBeInTheDocument();
    expect(screen.getByText(`Confirm`)).toBeInTheDocument();


    //Click on Undo Button
    act(() => {
        fireEvent.click(screen.getByTestId(`undoButton`));
    });

    //Click on Confirm Button
    act(() => {
        fireEvent.click(screen.getByTestId(`confirmButton`));
    });

    //expect(await component.container.querySelector('#succesModal')).toBeVisible();
/*     expect(await findByText(component.container, 'Order Cancelled!')).toBeVisible();
    expect(await findByText(component.container, 'Your Order has been successfully cancelled.')).toBeVisible(); */
/*     expect(await screen.getByText(`Order Cancelled!`)).toBeInTheDocument();
    expect(await screen.getByText(`Your Order has been successfully cancelled.`)).toBeInTheDocument(); */
});