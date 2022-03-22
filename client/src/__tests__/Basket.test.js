import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import Basket from '../components/Basket';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import API from '../API';
/**
* @jest-environment node
*/
configure({ adapter: new Adapter() });
// Fake variables
var s = false;
const fakeHandleBasket = () => { s = !s };

const fakeBasket = [
    {
        id: "0",
        name: "name0",
        price: 100,
        img: "some-img-path-0",
        quantity: 10,
        total: 10 * 100
    },
    {
        id: "1",
        name: "name1",
        price: 200,
        img: "some-img-path-1",
        quantity: 20,
        total: 20 * 200
    },
    {
        id: "2",
        name: "name2",
        price: 300,
        img: "some-img-path-2",
        quantity: 30,
        total: 30 * 300

    }
];

const fakeClient = {
    id: "0",
    role: "Client",
    name: "John",
    surname: "Doe",
    birthdate: "01/01/2001",
    email: "somemail@email.com",
    password: "someHashedPassword",
    isConfirmed: 1
};

const fakeCurrentClient = {
    id: "5",
    name: "Luca",
    surname: "Neri",
    birthdate: "01/01/2001",
    email: "somemail@email.com",
    isConfirmed: 1,
    amount: 500000

};

it("renders basket without crashing", () => {
    shallow(<Basket basket={fakeBasket} client={fakeClient} isOpen={s} onRequestClose={fakeHandleBasket} />);
});

it("renders basket components without crashing", () => {
    const wrapperBasket = shallow(<Basket basket={fakeBasket} client={fakeClient} isOpen={s} onRequestClose={fakeHandleBasket} />);
    expect(wrapperBasket.find('ReactSlidingPane').exists()).toBeTruthy();
    expect(wrapperBasket.find('Container').exists()).toBeTruthy();
    expect(wrapperBasket.find('button').exists()).toBeTruthy();
    expect(wrapperBasket.find('Form').exists()).toBeTruthy();
    expect(wrapperBasket.find('Button').exists()).toBeTruthy();
    expect(wrapperBasket.find('Row').exists()).toBeTruthy();
    expect(wrapperBasket.find('Col').exists()).toBeTruthy();
    expect(wrapperBasket.find('div').exists()).toBeTruthy();
    expect(wrapperBasket.find('h6').exists()).toBeTruthy();
    expect(wrapperBasket.find('small').exists()).toBeTruthy();
});


it("accepts props", () => {
    const wrapperBasket = shallow(<Basket basket={fakeBasket} client={fakeClient} isOpen={s} onRequestClose={fakeHandleBasket} />);
    expect(wrapperBasket.childAt(0).props().basket).toBe(fakeBasket);
    expect(wrapperBasket.childAt(0).props().client).toBe(fakeClient);
    expect(wrapperBasket.childAt(0).props().isOpen).toBe(s);
    expect(wrapperBasket.childAt(0).props().onRequestClose).toBe(fakeHandleBasket);
});

it("basket works with empty basket", () => {
    const wrapperBasket = shallow(<Basket basket={[]} client={fakeClient} isOpen={s} onRequestClose={fakeHandleBasket} />);
    expect(wrapperBasket.childAt(0).props().basket).toEqual([]);
    expect(wrapperBasket.childAt(0).props().basket).toHaveLength(0);
});

it("state of open basket changes when calling onRequestChange prop", () => {
    const wrapperBasket = shallow(<Basket basket={[]} client={fakeClient} isOpen={s} onRequestClose={fakeHandleBasket} />);
    expect(wrapperBasket.childAt(0).props().isOpen).toBeFalsy();
    expect(s).toBeFalsy();
    wrapperBasket.childAt(0).props().onRequestClose();
    expect(s).toBeTruthy();
});

it("if basket is empty button shop now and form should not appear", () => {
    const wrapperBasket = shallow(<Basket basket={[]} client={fakeClient} isOpen={s} onRequestClose={fakeHandleBasket} />);
    expect(wrapperBasket.find('button').exists()).toBeFalsy();
    expect(wrapperBasket.find('Form').exists()).toBeFalsy();
    expect(wrapperBasket.find('h6').exists()).toBeFalsy();
    expect(wrapperBasket.find('Button').exists()).toBeFalsy();

});
test('Select pick up modality and date correctly', async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    API.logIn("lucaneri@gmail.com","lucaneri");
    render(
        <MemoryRouter history={history}>
            <Basket basket={fakeBasket} client={fakeClient} isOpen={s} onRequestClose={fakeHandleBasket} currentClient={fakeCurrentClient} />
        </MemoryRouter>);
    act(() => {
        fireEvent.click(screen.getByText('Pick-Up'));
      });
    act(() => {
        fireEvent.click(screen.getByTestId('calendar'));
      });
    act(() => {
        fireEvent.change(screen.getByTestId('calendar'),{
            target: {value: '2021-12-08'}
        });
    });
    act(() => {
        fireEvent.change(screen.getByTestId('time'),{
            target: {value: '20:00'}
        });
    });
    expect(screen.getByText('Shop now')).toBeTruthy();
})

