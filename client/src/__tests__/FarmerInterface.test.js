import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import FarmerInterface from '../components/FarmerInterface';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import  {FaPlus} from "react-icons/fa";

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

it("renders farmer interface without crashing", () => {
    shallow(<FarmerInterface  products={fakeProducts} userid={fakeFarmer.id}/>);
});

it("renders farmer interface with no products", () => {
    const wrapper = shallow(<FarmerInterface  products={[]} userid={fakeFarmer.id}/>);
    expect(wrapper.find('ImSad').exists()).toBeTruthy();
    expect(wrapper.find('h3').exists()).toBeTruthy();
    expect(wrapper.find('h3').at(0).text()).toEqual(' Welcome, ! ');
    expect(wrapper.find('h3').at(1).text()).toEqual('There are no products yet <ImSad />');
    expect(wrapper.find('button').at(0).prop("disabled")).toBeTruthy();
});

it("renders farmer interface components without crashing", () => {
    const wrapper = shallow(<FarmerInterface products={fakeProducts} userid={fakeFarmer.id}/>);
    expect(wrapper.find('FaCalendarAlt').exists()).toBeTruthy();
    expect(wrapper.find('Container').exists()).toBeTruthy();
    expect(wrapper.find('SideBar').exists()).toBeTruthy();
    expect(wrapper.find('FarmerProduct').exists()).toBeTruthy();
    expect(wrapper.find('ProductForm').exists()).toBeTruthy();
});


it("accepts products and userid props", () => {
    const wrapper = shallow(<FarmerInterface products={fakeProducts} userid={fakeFarmer.id}/>);
    expect(wrapper.childAt(0).props().products).toBe(fakeProducts);
    expect(wrapper.childAt(0).props().userid).toBe(fakeFarmer.id);
});

it("calls handleShow when clicking on button", () => {
    const handleShow = jest.fn()
    render( <button 
        data-testid="new-product-button"
        onClick={handleShow}>
        <FaPlus/> Add new product
        </button>);
    fireEvent.click(screen.getByText(/Add new product/i))
    expect(handleShow).toHaveBeenCalledTimes(1)
});

