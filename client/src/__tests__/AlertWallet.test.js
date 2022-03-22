/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, fireEvent, screen} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import AlertWallet from '../components/AlertWallet';
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
    const { getByTestId } = render(  <Button 
        data-testid="button-top-up"
          className="text-center mt-5"
          variant="success"
          disabled={0}
          onClick={() => {}}>
            Top up now
        </Button>);
    expect(getByTestId('button-top-up')).toHaveTextContent("Top up now");
});

 test('calls onClick prop when clicked', () => {
    const updateWallet = jest.fn()
    render( <Button 
        data-testid="button-top-up"
          className="text-center mt-5"
          variant="success"
          disabled={0}
          onClick={updateWallet}>
            Top up now
        </Button>);
    fireEvent.click(screen.getByText(/Top up now/i))
    expect(updateWallet).toHaveBeenCalledTimes(1)
  })
;

test('top up alert', ()=>{
    const history = createMemoryHistory();
    history.push = jest.fn();
    const alertWalletShow = jest.fn();
    const setAlertWalletShow = jest.fn();
    const setTopUp = jest.fn();
    const client = new Client(5,'Luca','Neri','2012-10-24','lucaneri@gmail.com',1,0);
    const currentClient = new Client(5,'Luca','Neri','2012-10-24','lucaneri@gmail.com',1,0);
    
    render(
      <MemoryRouter history={history}>
        <AlertWallet show={alertWalletShow} setAlertWalletShow={setAlertWalletShow} topUp={200} setTopUp={setTopUp} onHide={() => {setAlertWalletShow(false); setTopUp(0)}} user={client} currentClient={currentClient} userRole={"shopemployee"} />
      </MemoryRouter>
    );
    const topUpLater = screen.getByText('Top up later');
    const boxAmount = screen.getByTestId('boxTopUp');
    const topUpNow = screen.getByText('Top up now');
    expect(topUpLater).toBeInTheDocument();
    expect(boxAmount).toBeInTheDocument();
    expect(topUpNow).toBeInTheDocument();

    act(() => {
        fireEvent.click(screen.getByText('Top up later'));
      });
    expect(screen.getByText('Order Issued!'));

    act(() => {
        fireEvent.click(screen.getByText('Close'));
    });
    act(() => {
        fireEvent.change(screen.getByTestId('boxTopUp'), {
          target: { value: 200 },
        });
      });
    act(() => {
        fireEvent.click(screen.getByText('Top up now'));
    });
      jest.useFakeTimers();
      jest.runAllTimers();
      const setDone = jest.fn();
      setTimeout(() => {
        expect(screen.getByText('Top Up Success')).toBeTruthy();
      }, 3000);
})