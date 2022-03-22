import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import SideBar from '../components/SideBar';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import {
    MenuItem
  } from 'react-pro-sidebar';

/**
* @jest-environment node
*/

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
const fakeFarmer = {id: 4, 
    role: "farmer", 
    name: "Maria", 
    surname: "Marroni", 
    birthdate: "01/01/2001", 
    email: "somemail@email.com", 
    password: "someHashedPassword", 
    isConfirmed: 1 };

it("renders sidebar for client without crashing", () => {
    shallow(<SideBar collapsed={false} width='13rem' searchCategory={() => {}} handleBasket={() => {}} userRole='client' />);
});

it("renders sidebar for shop employee without crashing", () => {
    shallow(<SideBar collapsed={false} width='13rem' searchCategory={() => {}} handleBasket={() => {}} userRole='shopemployee' />);
});

it("renders sidebar for farmer without crashing", () => {
    shallow(<SideBar collapsed={false} width='13rem' searchCategory={() => {}} handleBasket={() => {}} userRole='farmer' />);
});

it("renders sidebar for farmer with all components", () => {
    const wrapper = shallow(<SideBar  collapsed={false} width='13rem' searchCategory={() => {}} handleBasket={() => {}} userRole='farmer' />);
    expect(wrapper.find('div').at(0).text()).toEqual('Your Products');
    expect(wrapper.find('span').text()).toEqual('Go back to Home');
});

it("renders sidebar for shopemployee with all components", () => {
    const wrapper = shallow(<SideBar  collapsed={false} width='13rem' searchCategory={() => {}} handleBasket={() => {}} userRole='shopemployee' />);
    expect(wrapper.find('div').at(0).text()).toEqual('Your Basket');
    expect(wrapper.find('div').at(1).text()).toEqual('Our Categories');
    expect(wrapper.find('span').text()).toEqual('Go back to clients');
});



it("accepts products and userid props", () => {
    const searchCategory = jest.fn();
    const handleBasket = jest.fn();
    const wrapper = shallow(<SideBar collapsed={false} width='13rem' searchCategory={searchCategory} handleBasket={handleBasket} userRole='shopemployee' />);
    expect(wrapper.childAt(0).props().collapsed).toBeFalsy();
    expect(wrapper.childAt(0).props().width).toBe('13rem');
    expect(wrapper.childAt(0).props().searchCategory).toBe(searchCategory);
    expect(wrapper.childAt(0).props().handleBasket).toBe(handleBasket);
    expect(wrapper.childAt(0).props().userRole).toBe('shopemployee');
});

it("calls handleShow when clicking on button", () => {
    const searchCategory = jest.fn()
    render(<MenuItem value="All" onClick={searchCategory} icon={''}>All products</MenuItem>
    );
    fireEvent.click(screen.getByText(/All products/i))
    expect(searchCategory).toHaveBeenCalledTimes(1)
});