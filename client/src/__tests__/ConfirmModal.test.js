import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import ConfirmModal from '../components/ConfirmModal';
import CardRiepilogo from '../components/ConfirmModal';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import  {FaPlus} from "react-icons/fa";
import { Button, Modal,Card, Row } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';
import { OrdersList } from '../Order';




configure({ adapter: new Adapter() });

const farmerProducts = [{
    id: "1",
    name: "name1",
    description: "description1",
    category: "category1",
    quantity: 7,
    price: 3,
    farmer_id: 4,
    img_path: "some-img-path-1",
    confirmed: 1
}];

const productNW=[
{id:1, quantity:7,price:3, name: 'name1', description: "description1", category: "category1", farmer_id: 4, img_path: 'some-img-path-1', confirmed_by_farmer: 1},
{id:2,quantity:10 ,price:4, name: 'name2', description: "description2", category: "category2", farmer_id: 5, img_path: 'some-img-path-2', confirmed_by_farmer: 1},
{id:3,quantity:20,price:3, name: 'name3', description: "description3", category: "category3", farmer_id: 5, img_path: 'some-img-path-3', confirmed_by_farmer: 1}];


    describe("Render", () => {

        it('Render Page', () =>{
            const page = shallow(<ConfirmModal />);
            expect(page).toBeTruthy();
        })

        it("Check components", () => {
            const  wrapper = shallow(<ConfirmModal  />);
            expect(wrapper.find('Modal').exists()).toBeTruthy();
            expect(wrapper.find('CardRiepilogo').exists()).toBeTruthy();
            expect(wrapper.find('Button').exists()).toBeTruthy();



            
          })

          it("Check CardRiepilogo", () => {
            const  page = shallow(<ConfirmModal productNW={productNW} farmerProducts={farmerProducts}/> );
            const wrapper = page.find('CardRiepilogo').dive();
                
            
            
            expect(wrapper.find({props : 'Card'}).exists).toBeTruthy();
            expect(wrapper.find({props : 'Col'}).exists).toBeTruthy();

            


            
          })

          

    });


    describe("behaviour", () => {

        it('list Product', () =>{
            const deleteUpdateProduct = jest.fn();
            render(
                <Button data-testid='list_product' style={{ backgroundColor: '#b4e6e2', border: '0px', borderRadius: '4px', color: 'red' }} onClick={deleteUpdateProduct} >
                    List Product
                </Button>);

            fireEvent.click(screen.getByText(/List Product/i));
            expect(deleteUpdateProduct).toHaveBeenCalledTimes(1);

        })

        it('Close', () =>{
            const onHide = jest.fn();
            render(
                <Button data-testid="close" variant="secondary" onClick={onHide} >
                Close
              </Button>);

            fireEvent.click(screen.getByText(/close/i));
            expect(onHide).toHaveBeenCalledTimes(1);

        })
    });

    test('view summary', async()=>{

        
    const products = jest.fn();
    const setDirty = jest.fn();
    const setShowPopUp = jest.fn();

        
        
    render(<ConfirmModal show={true} setDirty={setDirty} setShowPopUp={setShowPopUp} productNW={productNW} products={products} userid={farmerProducts.id} farmerProducts={farmerProducts}/>);

    await act( async() =>{

        
        const closeButton = await screen.getByTestId('close1');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);


        
        const product = await screen.findByText(`Product: ${farmerProducts[0].name}`);
        expect(product).toBeInTheDocument();

        const quantity = await screen.findByText(`Quantity: ${farmerProducts[0].quantity}`);
        expect(quantity).toBeInTheDocument();

        
        const price = await screen.findByText(`Price: ${farmerProducts[0].price}`);
        expect(price).toBeInTheDocument();

        const listButton = await screen.getByTestId('list_product');
        expect(listButton).toBeInTheDocument();
        fireEvent.click(listButton);
       
       
    });


    });