/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup,  findByText, getByText, fireEvent, screen} from "@testing-library/react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Card from '../components/Card/Card';

import ClientPage from '../components/ClientOrders/ClientPage';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });

it('renders card model correctly',async  () => {
    const component = render(<Router><Card title={"butter"} body={"description"} img={"..."} subinfo={2}/></Router>);

    //Click on 'Accepted' tab
    const button = screen.getByText('Add to cart');
    expect(button).toBeInTheDocument();
})