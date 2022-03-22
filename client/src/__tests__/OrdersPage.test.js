/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, getByText, fireEvent, screen} from "@testing-library/react";
import ReactDOM from 'react-dom';

import OrdersPage from '../components/OrdersPage';
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

it('renders OrderPage component without crashing', () => {
    shallow(<OrdersPage orders={fakeOrders}/>);
});

it("renders OrdersPage components without crashing", () => { 
    const wrapper = shallow(<OrdersPage orders={fakeOrders}/>);
    expect(wrapper.find('OrdersList').exists()).toBeTruthy();
    expect(wrapper.find('OrderModal').exists()).toBeTruthy();
});

it("accept props correctly", () => {
    const wrapper = shallow(<OrdersPage orders={fakeOrders}/>);
    expect(wrapper.find('OrdersList').props().orders).toBe(fakeOrders);
});