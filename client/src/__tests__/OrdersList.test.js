/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, fireEvent, screen} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import OrdersList from '../components/OrdersList';
import {OrderTable, TableDropdown} from '../components/OrdersList';
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
        date: '2021-11-30',
        time: '10:00',
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
        date: '',
        time: '',
        pick_up: 0,
        address: 'Via dei Test, 0',
        status: 'ACCEPTED'
    }
];

it('renders OrdersList without crashing', () => {
    shallow(<OrdersList orders={fakeOrders} setOrders={''} loggedIn={true} dirty={true} setDirty={''} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>) 
});

it("renders OrdersList components without crashing", () => {  
    const wrapper = shallow(<OrdersList orders={fakeOrders} setOrders={''} loggedIn={true} dirty={true} setDirty={''} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>) 
    
    expect(wrapper.find('Container').exists()).toBeTruthy();
    expect(wrapper.find('OrderTable').exists()).toBeTruthy();
});

it("accept props correctly", () => {
    const wrapper = shallow(<OrdersList orders={fakeOrders} setOrders={''} loggedIn={true} dirty={true} setDirty={''} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>) 
    
    expect(wrapper.find('OrderTable').props().orders).toBe(fakeOrders);
});

it("render OrderTable components correctly", () =>{
    const changeStatus = jest.fn();
    const wrapper = shallow(<OrderTable orders={fakeOrders} changeStatus={changeStatus} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>); 
    
    //expect(wrapper.find('Table').exists()).toBeTruthy();
    expect(wrapper.find('thead').exists()).toBeTruthy();
    expect(wrapper.find('tbody').exists()).toBeTruthy();
    expect(wrapper.find('tr').exists()).toBeTruthy();
    expect(wrapper.find('td').exists()).toBeTruthy();
    expect(wrapper.find('TableDropdown').exists()).toBeTruthy();
});

it("render TableDropdown components correctly", () =>{
    const changeStatus = jest.fn();
    const wrapper = shallow(<TableDropdown changeStatus={changeStatus} id={fakeOrders[0].id} status={fakeOrders[0].status}/>); 

    expect(wrapper.find('Dropdown').exists()).toBeTruthy();
});

it("render TableDropdown props correctly", () =>{
    const changeStatus = jest.fn();
    const wrapper = shallow(<OrderTable orders={fakeOrders} changeStatus={changeStatus} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>); 
    
    expect(wrapper.find('TableDropdown').at(0).props().status).toBe(fakeOrders[0].status);
    expect(wrapper.find('TableDropdown').at(1).props().status).toBe(fakeOrders[1].status);
});

test('select an order from the list', async()=>{
    const history = createMemoryHistory();
    history.push = jest.fn();
    const setSelectedOrder = jest.fn();
    const setDirty = jest.fn();
    const setDate = jest.fn();
    const setTime = jest.fn();
    const setOrders = jest.fn();
    const setModalShow = jest.fn();

    render(
        <MemoryRouter history={history}>
            <OrdersList orders={fakeOrders} setOrders={setOrders} loggedIn={true} dirty={true} setDirty={setDirty} setSelectedOrder={setSelectedOrder} setModalShow={setModalShow} setDate={setDate} setTime={setTime}/>
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
   
    act(() => {
        fireEvent.click(screen.getByTestId(`tr-${fakeOrders[0].id}`));
    });

    //click on order details (to open orderModal)
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

    //open dropdown
    await act( async() =>{

        const statusDropdown = await screen.findByText('PENDING');
        fireEvent.click(statusDropdown);

        //find all status and click on them(even if they are disabled) 
        expect(await screen.findByTestId('ACCEPTED')).toBeInTheDocument();
/*         const accepted = await screen.findByTestId('ACCEPTED');
        fireEvent.click(accepted); */

        expect(await screen.findByTestId('CANCELLING')).toBeInTheDocument();
/*         const cancelling = await screen.findByTestId('CANCELLING');
        fireEvent.click(cancelling); */

        expect(await screen.findByTestId('FAILED')).toBeInTheDocument();
/*         const failed = await screen.findByTestId('FAILED');
        fireEvent.click(failed); */

        expect(await screen.findByTestId('READY')).toBeInTheDocument();
/*         const ready = await screen.findByTestId('READY');
        fireEvent.click(ready); */
        
        //select pending status
        const pending = await screen.findByTestId('PENDING');
        fireEvent.click(pending);

        //open dropdown again
        fireEvent.click(statusDropdown);

        //change order status selecting delivered status
        const delivered = await screen.findByTestId('DELIVERED');
        fireEvent.click(delivered);
    });

});