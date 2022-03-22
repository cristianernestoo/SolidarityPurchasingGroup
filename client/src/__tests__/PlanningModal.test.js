import React, {
    useState as useStateMock
} from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import PlanningModal from '../components/PlanningModal';
import FormPlanning from '../components/PlanningModal';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render ,cleanup} from "@testing-library/react";
import { FaPlus } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';


/**
* @jest-environment node
*/

afterEach(() => {
    cleanup();
});

configure({ adapter: new Adapter() });


const farmerProduct = [{
    id: "1",
    name: "name1",
    description: "description1",
    category: "category1",
    quantity: 100,
    price: 100,
    farmer_id: 4,
    img_path: "some-img-path-1",
    confirmed: 1
}];


describe("Render", () => {

    it('Render Page', () => {
        const page = shallow(<PlanningModal />);
        expect(page).toBeTruthy();
    })

    it("Check components", () => {
        const wrapper = shallow(<PlanningModal />);
        expect(wrapper.find('Modal').exists()).toBeTruthy();
        expect(wrapper.find('FormPlanning').exists()).toBeTruthy();
    })



});

describe("Render FormPlanning", () => {

    it('Render Page', () => {
        const page = shallow(<FormPlanning />);
        expect(page).toBeTruthy();
    })

    it("Check components", () => {
        const page = shallow(<PlanningModal farmerProducts={farmerProduct} />);
        const wrapper = page.find('FormPlanning').dive();

        expect(wrapper.find('Form').exists()).toBeTruthy();
        expect(wrapper.find('Button').exists()).toBeTruthy();
        expect(wrapper.find('Row').exists()).toBeTruthy();
        expect(wrapper.find('Col').exists()).toBeTruthy();

    })



});

describe("Check  behaviors FormPlanning", () => {


    it("Check ", () => {
        const history = createMemoryHistory();
        history.push = jest.fn();
        

        render(
            <MemoryRouter history={history}>
                <FormPlanning
                    onHide={false} 
                    products={''} 
                    userid={''} 
                    id={''} 
                    update={false} 
                    updateProductNW={''} 
                    productNW={''} 
                    farmerProducts={farmerProduct}
                />
            </MemoryRouter>
        );

        /*const product = screen.getByText('Product');
        const quantity = screen.getByText('Quantity');
        const price = screen.getByLabelText('Price €');
        expect(product).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();
        expect(price).toBeInTheDocument();*/
        




    })



});