import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import NavBar from '../components/NavBar';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

/**
* @jest-environment node
*/

configure({ adapter: new Adapter() });
// Fake variables


it("renders navbar without crashing", () => {
    shallow(<NavBar loggedIn={true} doLogOut={() => jest.fn} userRole=""/>);
});
it("renders navbar client component", () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
        <MemoryRouter history={history}>
          <NavBar loggedIn={true} doLogOut={() => jest.fn} userRole="client"/>
        </MemoryRouter>
      );
    expect(screen.getByText("Our Products")).toBeTruthy();
    expect(screen.getByText("Your Orders")).toBeTruthy();

    act(()=>{
        fireEvent.click(screen.getByText("Our Products"))
    });
    expect(screen.getByText("Logout")).toBeTruthy();
});

it("renders navbar farmer component", () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
        <MemoryRouter history={history}>
          <NavBar loggedIn={true} doLogOut={() => jest.fn} userRole="farmer"/>
        </MemoryRouter>
      );
    expect(screen.getByText("My Products")).toBeTruthy();
    expect(screen.getByText("My Orders")).toBeTruthy();

    act(()=>{
        fireEvent.click(screen.getByText("My Products"))
    });
    expect(screen.getByText("Logout")).toBeTruthy();
});

it("renders navbar shopemployee component", () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
        <MemoryRouter history={history}>
          <NavBar loggedIn={true} doLogOut={() => jest.fn} userRole="shopemployee"/>
        </MemoryRouter>
      );
    expect(screen.getByText("Our Products")).toBeTruthy();
    expect(screen.getByText("Clients List")).toBeTruthy();
    expect(screen.getByText("Orders List")).toBeTruthy();

    act(()=>{
        fireEvent.click(screen.getByText("Our Products"))
    });
    expect(screen.getByText("Logout")).toBeTruthy();
});

it("renders navbar default component", () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
        <MemoryRouter history={history}>
          <NavBar loggedIn={true} doLogOut={() => jest.fn} userRole=""/>
        </MemoryRouter>
      );
    expect(screen.getByText("Join our Community")).toBeTruthy();
    expect(screen.getByText("Become our Supplier")).toBeTruthy();
    expect(screen.getByText("Deliver our Products")).toBeTruthy();

    act(()=>{
        fireEvent.click(screen.getByText("Join our Community"))
    });
    expect(screen.getByText("Logout")).toBeTruthy();
});