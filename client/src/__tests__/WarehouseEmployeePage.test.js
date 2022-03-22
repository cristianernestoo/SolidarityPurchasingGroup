/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, fireEvent, screen} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import WarehouseEmployeePage from '../components/WarehouseEmployeePage';
import {OrderTable } from '../components/WarehouseEmployeePage';
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
        id: 47,
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

it('renders WarehouseEmployeePage without crashing', () => {
    shallow(<WarehouseEmployeePage orders={fakeOrders} />)
});

it("renders WarehouseEmployeePage components without crashing", () => {
    const wrapper = shallow(<WarehouseEmployeePage orders={fakeOrders}/>)

    expect(wrapper.find('Container').exists()).toBeTruthy();
    expect(wrapper.find('OrderTable').exists()).toBeTruthy();
});

it("accept props correctly", () => {
    const wrapper = shallow(<WarehouseEmployeePage orders={fakeOrders}/>)

    expect(wrapper.find('OrderTable').props().orders).toBe(fakeOrders);
});

it("render OrderTable components correctly", () =>{
    const wrapper = shallow(<OrderTable orders={fakeOrders}/>);

    //expect(wrapper.find('Table').exists()).toBeTruthy();
    expect(wrapper.find('thead').exists()).toBeTruthy();
    expect(wrapper.find('tbody').exists()).toBeTruthy();
    expect(wrapper.find('tr').exists()).toBeTruthy();
    expect(wrapper.find('td').exists()).toBeTruthy();
    expect(wrapper.find('Form.Group').exists());
    expect(wrapper.find('Form.Check').exists());
});

test('click on confirm checkbox', ()=>{
    const history = createMemoryHistory();
    history.push = jest.fn();
    render(
        <MemoryRouter history={history}>
            <WarehouseEmployeePage orders={fakeOrders}/>
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

    const close = screen.getByText('Check to confirm');
    expect(close).toBeInTheDocument();


    act(() => {
        fireEvent.click(screen.getByTestId(`check-${fakeOrders[1].id}`));
    });
    expect(screen.getByText('Confirmed'));

})
