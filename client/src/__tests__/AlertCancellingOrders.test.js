/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, fireEvent, screen} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import AlertCancellingOrders from '../components/AlertCancellingOrders';
import { Button} from 'react-bootstrap';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Client } from '../Client';


afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });


it("renders button correctly", () => {
    const { getByTestId } = render(  <Button data-testid="button-close" variant="danger" onClick={()=>{}}>Close</Button>);
    expect(getByTestId('button-close')).toHaveTextContent("Close");
});

 test('calls handleClose prop when clicked', () => {
    const handleClose = jest.fn()
    render( <Button data-testid="button-close" variant="danger" onClick={handleClose}>
                Close
            </Button>);
    fireEvent.click(screen.getByText(/Close/i))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
;

test('close alert', ()=>{
    const history = createMemoryHistory();
    history.push = jest.fn();
    const show = jest.fn();
    const setNotificationFlag = jest.fn();
    const currentClient = new Client(5,'Luca','Neri','2012-10-24','lucaneri@gmail.com',1,0);
    const cancelOrders = [ {id: 1, creation_date: '2021-11-22', client_id: 5, total: 8, wallet: 4}]
    render(
      <MemoryRouter history={history}>
          <AlertCancellingOrders show={show} currentClient={currentClient} cancelOrders={cancelOrders} setNotificationFlag={setNotificationFlag}/>
      </MemoryRouter>
    );
    const close = screen.getByText('Close');
    expect(close).toBeInTheDocument();


    act(() => {
        fireEvent.click(screen.getByText('Close'));
      });
    expect(screen.getByText('Status of orders: CANCELLING!'));
    
})