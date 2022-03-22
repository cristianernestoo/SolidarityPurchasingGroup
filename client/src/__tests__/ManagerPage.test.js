import React, {
    useState as useStateMock
} from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import ManagerPage from '../components/ManagerPage';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import {Button} from "react-bootstrap";
import Homepage from "../components/Homepage";
import {Link} from "react-router-dom";

/**
 * @jest-environment node
 */

configure({ adapter: new Adapter() });
// Fake variables
const fakeManager = {
    id: 10,
    role: "manager",
    name: "Francesco",
    surname: "Nero",
    birthdate: "01/01/1990",
    email: "somemail@email.com",
    password: "someHashedPassword",
    isConfirmed: 1 };

it("renders manager pagr without crashing", () => {
    shallow(<ManagerPage userid={fakeManager.id}/>);
});

it("renders farmer interface with no products", () => {
    const wrapper = shallow(<ManagerPage userid={fakeManager.id}/>);
    expect(wrapper.find('h3').exists()).toBeTruthy();
    expect(wrapper.find('h3').at(0).text()).toEqual(' Welcome, ! ');
});

it("renders manager page container components", () => {
    const wrapper = shallow(<ManagerPage userid={fakeManager.id}/>);
    expect(wrapper.find('Container').exists()).toBeTruthy();
});


it("renders weekly button correctly", () => {
    const { getByTestId } = render(<button data-testid="button_weekly_reports">
        Get weekly reports
    </button>);
    expect(getByTestId('button_weekly_reports')).toHaveTextContent("Get weekly reports");
});


it("renders monthly button correctly", () => {
    const { getByTestId } = render(<button data-testid="button_monthly_reports">
        Get monthly reports
    </button>);
    expect(getByTestId('button_monthly_reports')).toHaveTextContent("Get monthly reports");
});

it('includes link to weekly reports', () => {
    const wrapper = shallow(<ManagerPage userid={fakeManager.id}/>);
    expect(wrapper.find(Link).at(0).props().to).toStrictEqual({ pathname: '/weeklyReports' });
});
it('includes link to monthly reports', () => {
    const wrapper = shallow(<ManagerPage userid={fakeManager.id}/>);
    expect(wrapper.find(Link).at(1).props().to).toStrictEqual({ pathname: '/monthlyReports' });
});

