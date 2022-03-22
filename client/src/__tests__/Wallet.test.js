/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, getByText, fireEvent, screen } from "@testing-library/react";
import Wallet from '../components/Wallet';
import { Button } from 'react-bootstrap';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });

const user = { id: '1', name: 'Mario', surname: 'Rossi', birthdate: '13-10-1999', email: 'mariorossi@gmail', amount: '3$' }

it('includes link to products', () => {

    const wrapper = shallow(<Wallet show={true} setWalletShow={false} increment={0} setIncrement={1} onHide={() => { setWalletShow(false); setIncrement(0) }} user={user} />);
    expect(wrapper.props().user).toBe(user);
});

it("renders button correctly", () => {
    const { getByTestId } = render(<Button
        data-testid="button-top-up"
        className="text-center mt-5"
        variant="success"
        disabled={0}
        onClick={() => { }}>
        Top up now
    </Button>);
    expect(getByTestId('button-top-up')).toHaveTextContent("Top up now");
});

/*
it('State done is changed when button clicked', () => {
    const user = {id:'1', name:'Mario', surname:'Rossi', birthdate:'13-10-1999', email: 'mariorossi@gmail', amount: '3$' }
    const { getByTestId } = render(  <Button 
        data-testid="button-top-up"
          className="text-center mt-5"
          variant="success"
          disabled={0}
          onClick={()=>{}}>
            Top up now
        </Button>);
    fireEvent.click(getByTestId)
   
    expect(wrapper.props().setWalletShow).toBe(false);
 })*/


test('calls onClick prop when clicked', () => {
    const updateWallet = jest.fn()
    render(<Button
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

it('change wallet value', () => {
    const setWalletShow = jest.fn();
    const setIncrement = jest.fn();
    const increment = 0;

    render(<Router><Wallet show={true} setWalletShow={setWalletShow} increment={increment} setIncrement={setIncrement} onHide={() => { setWalletShow(false); setIncrement(0) }} user={user} /></Router>)

    act(() => {
        fireEvent.change(screen.getByTestId('formControl'), {
            target: { value: '100' },
        });
    });

})