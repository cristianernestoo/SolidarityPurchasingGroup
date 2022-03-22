import React from 'react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import WarehouseManagerPage from '../components/WarehouseManagerPage';

import { OrderModal, OrderTable } from '../components/WarehouseManagerPage';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render, cleanup } from "@testing-library/react";
import { act } from 'react-dom/test-utils';

import { Button, Col, Form } from 'react-bootstrap';


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
        date: '2021-11-30',
        time: '10:00',
        pick_up: 1,
        address: 'Corso Duca degli Abruzzi, 24',
        status: 'ACCEPTED'
    },
    {
        id: 24,
        creation_date: '2021-11-26',
        client_id: 3, 
        client_name: 'Luca',
        client_surname: 'Neri',
        total: 3.40,
        date: '',
        time: '',
        pick_up: 0,
        address: 'Via dei Test, 0',
        status: 'PENDING'
    }
];

describe("Render", () => {

    it('Render Page', () => {
        const page = shallow(<WarehouseManagerPage />);
        expect(page).toBeTruthy();
    })

    it("Check components", () => {
        const wrapper = shallow(<WarehouseManagerPage />);
        expect(wrapper.find('Container').exists()).toBeTruthy();
        expect(wrapper.find('OrderTable').exists()).toBeTruthy();
        expect(wrapper.find('OrderModal').exists()).toBeTruthy();

    })

    it("renders button correctly", () => {
        const { getByTestId } = render(
            <Button data-testid="button-close" variant="danger" onClick={() => { }}>
                Close
            </Button>);
        expect(getByTestId('button-close')).toHaveTextContent("Close");
    });



});


describe("Render OrderTable", () => {

    it('Render Table', () => {
        const page = shallow(<OrderTable orders={fakeOrders}/>);
        expect(page).toBeTruthy();


    })

    it("Check components", () => {
        const wrapper = shallow(<OrderTable orders={fakeOrders} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''} />);
        expect(wrapper.find('thead').exists()).toBeTruthy();
        expect(wrapper.find('tbody').exists()).toBeTruthy();
        expect(wrapper.find('tr').exists()).toBeTruthy();
        expect(wrapper.find('td').exists()).toBeTruthy();


    })

    test('select an order from the list', ()=>{
        const history = createMemoryHistory();
        history.push = jest.fn();
        const setSelectedOrder = jest.fn();
        const setDirty = jest.fn();
        const setDate = jest.fn();
        const setTime = jest.fn();

        render(
            <MemoryRouter history={history}>
                <OrderTable orders={fakeOrders} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>
            </MemoryRouter>
        );
        const thID = screen.getByText(`ID`);
        const thCD = screen.getByText(`Creation Date`);
        const thCID = screen.getByText(`Client ID`);
        const thCN = screen.getByText(`Client Name`);
        const thCS = screen.getByText(`Client Surname`);
        const thTot = screen.getByText(`Total`);
        const thDT = screen.getByText(`Deliver Type`);
        const thA = screen.getByText(`Address`);
        const thD = screen.getByText(`Date`);
        const thT = screen.getByText(`Time`);
        const thS= screen.getByText(`Status`);
        expect(thID).toBeInTheDocument();
        expect(thCD).toBeInTheDocument();
        expect(thCID).toBeInTheDocument();
        expect(thCN).toBeInTheDocument();
        expect(thCS).toBeInTheDocument();
        expect(thTot).toBeInTheDocument();
        expect(thDT).toBeInTheDocument();
        expect(thA).toBeInTheDocument();
        expect(thD).toBeInTheDocument();
        expect(thT).toBeInTheDocument();
        expect(thS).toBeInTheDocument();

       



    });

    it("renders button correctly", () => {
        const { getByTestId } = render(
            <Button data-testid="button-close" variant="danger" onClick={() => { }}>
                Close
            </Button>);
        expect(getByTestId('button-close')).toHaveTextContent("Close");
    });



});

describe("OrderModal", () => {
    it('includes link to orders', () => {
        const order = { id: 28, creation_date: '2021-11-16', client_id: 2, client_name: 'Marco', client_surname: 'Bianchi', total: 0.75, pick_up: 1, address: 'Corso Duca degli Abruzzi, 24', date: '', time: '' }
        const basket = { id: 28, name: "nome", quantity: 10, price: 5 };
        const page = shallow(<WarehouseManagerPage />)
        const wrapper = page.find('OrderModal').children();
        const prova = shallow(<wrapper
            show={true}
            setModalShow={false}
            date={order.date}
            time={order.time}
            onHide={() => { setModalShow(false); setDate(''); setTime('') }}
            selectedOrder={order}
            basket=""
        />);
        expect(prova.props().selectedOrder).toBe(order);
    });

    it("renders OrderModal components without crashing", () => {
        const order = { id: '28', creation_date: '2021-11-16', client_id: 2, client_name: 'Marco', client_surname: 'Bianchi', total: 0.75, pick_up: 1, address: 'Corso Duca degli Abruzzi, 24', date: '', time: '' }
        const basket = [{ id: 28, name: "nome", quantity: 10, price: 5 }];

        const wrapper = shallow(<OrderModal
            show={true}
            setModalShow={false}
            date={order.date}
            time={order.time}
            onHide={() => { setModalShow(false); setDate(''); setTime('') }}
            selectedOrder={order}
            basket={basket} />)

        expect(wrapper.find('Row').exists()).toBeTruthy();
        expect(wrapper.find('Modal').exists()).toBeTruthy();
        expect(wrapper.find('Col').exists()).toBeTruthy();


    });


    test('calls onHide when Close Button is clicked', () => {
        const onHide = jest.fn();
        render(
            <Button data-testid="button-close" variant='danger' onClick={onHide}>
                Close
            </Button>);
        fireEvent.click(screen.getByText(/Close/i));
        expect(onHide).toHaveBeenCalledTimes(1);
    });

});


it("renders OrderModal components without crashing", () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    const order = { id: '28', creation_date: '2021-11-16', client_id: 2, client_name: 'Marco', client_surname: 'Bianchi', total: 0.75, pick_up: 1, address: 'Corso Duca degli Abruzzi, 24', date: '', time: '' }
    const basket = [{ id: 28, name: "nome", quantity: 10, price: 5 }];


    render(
        <MemoryRouter history={history}>
            <OrderModal
                show={true}
                setModalShow={false}
                date={order.date}
                time={order.time}
                onHide={() => { setModalShow(false); setDate(''); setTime('') }}
                selectedOrder={order}
                basket={basket} />
        </MemoryRouter> 
    );

    const title = screen.getByText(`Order ${order.id} - ${order.client_name} ${order.client_surname}`);
    const products = screen.getByText('Product:');
    const datePicker = screen.getByText('Pick-up date');
    const timePicker = screen.getByText('Pick-up time');
    expect(title).toBeInTheDocument();
    expect(products).toBeInTheDocument();
    expect(datePicker).toBeInTheDocument();
    expect(timePicker).toBeInTheDocument();

})



    it('try click', async() => {
        const setModalShow = jest.fn();
        const setDate = jest.fn();
        const setTime = jest.fn();
        const setSelectedOrder = jest.fn();
        
    render(<OrderTable orders={fakeOrders} setSelectedOrder={setSelectedOrder} setModalShow={setModalShow} setDate={setDate} setTime={setTime}/>);


    act(() => {
        fireEvent.click(screen.getByTestId(`tr-${fakeOrders[0].id}`));
    });

    await act( async() =>{
        const orderId = await screen.findByText('28');
        fireEvent.click(orderId);
        
        const creation = await screen.findByText('2021-11-16');
        fireEvent.click(creation);
        
        const clientId = await screen.findByText('2');
        fireEvent.click(clientId);
       
        const name = await screen.findByText('Marco');
        fireEvent.click(name);
       
        const surname = await screen.findByText('Bianchi');
        fireEvent.click(surname);
       
        const price = await screen.findByText('€ 0.75');
        fireEvent.click(price);
        
        const delivery = await screen.findByText('Pick-Up');
        fireEvent.click(delivery);
        
        const address = await screen.findByText('Corso Duca degli Abruzzi, 24');
        fireEvent.click(address);
        
        const date = await screen.findByText('2021-11-30');
        fireEvent.click(date);
        
        const time = await screen.findByText('10:00');
        fireEvent.click(time);
    });




});