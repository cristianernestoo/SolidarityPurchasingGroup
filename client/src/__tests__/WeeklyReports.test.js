/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, cleanup, fireEvent, screen} from "@testing-library/react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import WeeklyReports from "../components/WeeklyReports";
import {OrderTable} from "../components/OrdersList";
import ManagerPage from "../components/ManagerPage";

afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });
// Fake variables
const fakeProducts = [{id: "0",
    name: "name1",
    description: "description1",
    category: "category1",
    quantity: 100,
    price: 100,
    farmer_id: 4,
    img_path: "some-img-path-1",
    confirmed: 1},
    {id: "2",
        name: "name2",
        description: "description2",
        category: "category2",
        quantity: 100,
        price: 100,
        farmer_id: 4,
        img_path: "some-img-path-2",
        confirmed: 1},
    {id: "3",
        name: "name3",
        description: "description3",
        category: "category3",
        quantity: 100,
        price: 100,
        farmer_id: 4,
        img_path: "some-img-path-3",
        confirmed: 1}];

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

const fakeClock = "Mon Jan 10 2022 11:40:44 GMT+0100 (Ora standard dell’Europa centrale)";

it('renders WeeklyReports without crashing', () => {
    const page = shallow(<WeeklyReports orders={fakeOrders} clock={fakeClock} />);
    expect(page).toBeTruthy();
});

it("renders WeeklyReports components without crashing", () => {
    const wrapper = shallow(<WeeklyReports orders={fakeOrders} clock={fakeClock} />)

    expect(wrapper.find('div').exists()).toBeTruthy();
});

it("renders button correctly", () => {
    const { getByTestId } = render(
        <Button data-testid="button-back" size="md" className="mb-5 ml-5">Back</Button>
    );
    expect(getByTestId('button-back')).toHaveTextContent("Back");
});

it("renders button correctly", () => {
    const setData = jest.fn();
    const { getByTestId } = render(
        <Button data-testid="button-prev" size="lg" className="mt-1 mb-5" onClick={setData}>Go to the previous week</Button>
    );
    expect(getByTestId('button-prev')).toHaveTextContent("Go to the previous week");
    fireEvent.click(screen.getByText("Go to the previous week"));
    expect(setData).toHaveBeenCalledTimes(1);
});

it("renders button correctly", () => {
    const setData = jest.fn();
    const { getByTestId } = render(
        <Button data-testid="button-next" size="lg" className="mt-1 mb-5" onClick={setData}>Go to the next week</Button>
    );
    expect(getByTestId('button-next')).toHaveTextContent("Go to the next week");
    fireEvent.click(screen.getByText("Go to the next week"));
    expect(setData).toHaveBeenCalledTimes(1);
});

test('calls setData when Prev Button is clicked', () => {
    const setData = jest.fn();
    render(
        <Button data-testid="button-prev" size="lg" className="mt-1 mb-5" onClick={setData}>
            Go to the previous week
        </Button>);
    fireEvent.click(screen.getByText(/Go to the previous week/i));
    expect(setData).toHaveBeenCalledTimes(1);
});

test('calls setData when Next Button is clicked', () => {
    const setData = jest.fn();
    render(
        <Button data-testid="button-next" size="lg" className="mt-1 mb-5" onClick={setData}>
            Go to the next week
        </Button>);
    fireEvent.click(screen.getByText(/Go to the next week/i));
    expect(setData).toHaveBeenCalledTimes(1);
});


it('includes link to monthly reports', () => {
    const wrapper = shallow(<WeeklyReports orders={fakeOrders} clock={fakeClock} />);
    expect(wrapper.find(Link).at(0).props().to).toStrictEqual({ pathname: '/manager' });
});


it('renders MDBContainer without crashing', () => {
    const page = shallow(<MDBContainer  />);
    expect(page).toBeTruthy();
});

it('renders Nar without crashing', () => {
    const page = shallow(<Bar  />);
    expect(page).toBeTruthy();
});