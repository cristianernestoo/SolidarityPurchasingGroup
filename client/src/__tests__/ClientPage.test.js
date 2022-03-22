/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, findByText, getByText, fireEvent, screen} from "@testing-library/react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {PendingList, AcceptedList} from '../components/ClientOrders/ClientOrders'
import {pickUpIcon, deliveryIcon, arrowRightIcon, arrowLeftIcon, iconDelete, iconEdit, iconCross, iconConfirm} from "../components/Icons";
import ClientPage from '../components/ClientOrders/ClientPage';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import DeleteModal from '../components/ClientOrders/DeleteModal';
import dayjs from 'dayjs';

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
        time: '14:00',
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
        status: 'PENDING'
    }
];

const fakeAccepted = [
    {
        id: 29,
        creation_date: '2021-11-23',
        client_id: 3, 
        client_name: 'Isabella',
        client_surname: 'Verdi',
        total: 0.80,
        date: '2021-12-01',
        time: '12:00',
        pick_up: 1,
        address: 'Corso Duca degli Abruzzi, 25',
        status: 'ACCEPTED'
    }
];


it('client page aaaaaq',async  () => {
    const component = render(<Router><ClientPage clientOrders={fakeOrders} clientAcceptedOrders={fakeAccepted}/></Router>);

    //Default view --> order 28 and 24 should be visible
    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Pending')).toHaveClass('tab-pane active');
    expect(await findByText(component.container, 'Order #28')).toBeVisible();
    expect(await findByText(component.container, 'Order #24')).toBeVisible();
    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Accepted')).toHaveClass('tab-pane');

    //Click on detail button of Order #28
    act(() => {
        const selectButton = component.container.querySelector("#selectButton:first-child");
        fireEvent.click(selectButton);
    });   

    expect(await findByText(component.container, 'Order #28')).toBeVisible();
    expect(await findByText(component.container, '€ 0.00')).toBeVisible();
    expect(await findByText(component.container, 'Corso Duca degli Abruzzi, 24')).toBeVisible();
    expect(await findByText(component.container, '2021-11-30')).toBeVisible();
    expect(await findByText(component.container, '14:00')).toBeVisible();

    expect(component.container.querySelector('#basketList')).toHaveClass('mb-3 list-group');

    //click on edit button
    act(() => {
        const editButton = component.container.querySelector('#editButton');
        fireEvent.click(editButton);
    });

    expect(component.container.querySelector('#editForm')).toBeVisible();

    //click on undo button
    act(() => {
        const undoButton = component.container.querySelector('#undoButton');
        fireEvent.click(undoButton);
    });


    //show delete order modal
    act(() => {
        const deleteButton = component.container.querySelector('#deleteButton');
        fireEvent.click(deleteButton);
    });

    //Return to the Pending Orders list
    act(() => {
        const backPendingList = component.container.querySelector('#backPendingList')
        fireEvent.click(backPendingList);
    });   

    //Click on 'Accepted' tab
    act(() => {
        const button1 = screen.getByText('Accepted');
        fireEvent.click(button1);
    });   

    //Accepted view --> only order 29 should be visible
    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Pending')).toHaveClass('tab-pane');
    expect(await findByText(component.container, 'Order #29')).toBeVisible();
    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Accepted')).toHaveClass('tab-pane active');

    //Testing button for order details
    act(() => {
        const button2 = component.container.querySelector("#detailsButton");
        fireEvent.click(button2);
    });   
    
    expect(await findByText(component.container, 'Back')).toBeVisible();

    act(() => {
        const button3 = screen.getByText('Back');
        fireEvent.click(button3);
    }); 

    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Accepted')).toHaveClass('tab-pane active');


    //Click on 'Pending' tab
    act(() => {
        const button4 = screen.getByText('Pending');
        fireEvent.click(button4);
    })

    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Pending')).toHaveClass('tab-pane active');
    
    act(() => {
        fireEvent.click(component.container.querySelector("#selectButton"));
    })

    //click on edit button
    act(() => {
        const editButton = component.container.querySelector('#editButton');
        fireEvent.click(editButton);
    });


    expect(component.container.querySelector('#editForm')).toBeVisible();

    //Fill out Form Fields
    act(() => {
        const pickUpRadio = component.container.querySelector('#inline-radio-1');
        fireEvent.click(pickUpRadio);
    })

    act(() =>{
        const deliveryRadio = component.container.querySelector('#inline-radio-2');
        fireEvent.click(deliveryRadio);
    })

    act(() => {
        fireEvent.change(screen.getByPlaceholderText('1234 Main St'), {
            target: { value: 'Via dei Test 0' },
        });
    });

    act(() => {
        fireEvent.change(screen.getByPlaceholderText('City'), {
            target: { value: 'Testopoli' },
        });
    });

    act(() => {
        fireEvent.change(screen.getByPlaceholderText('ZIP'), {
            target: { value: '01001' },
        });
    });

    act(() => {
        fireEvent.change(screen.getByPlaceholderText('date'), {
            target: { value: dayjs().add(1, "w").day(4).format("YYYY-MM-DD") },
        });
    });

    act(() => {
        fireEvent.change(screen.getByPlaceholderText('time'), {
            target: { value: '10:00' },
        });
    });

    expect(await findByText(component.container, 'Confirm')).toBeVisible();

    //click on confirm button
    act(() => {
        const confirm = component.container.querySelector('#confirmButton');
        fireEvent.click(confirm);
    })

})