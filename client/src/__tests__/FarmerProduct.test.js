import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import{ Container} from "react-bootstrap";
import { act } from 'react-dom/test-utils';

import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FarmerProduct from '../components/FarmerProduct';
import { render, cleanup, findByTestId, getByTestId, fireEvent, getByText, screen } from "@testing-library/react";
import Adapter from 'enzyme-adapter-react-16';
import FarmerCard from '../components/FarmerCard/FarmerCard';
/**
* @jest-environment node
*/
afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });

const fakeProduct = {id: "1", 
    name: "name1", 
    description: "description1", 
    category: "category1", 
    quantity: 100, 
    price: 100, 
    farmer_id: 4, 
    img_path: "some-img-path-1", 
    confirmed: 1};
const fakeProductNotConfirmed = {id: "22", 
    name: "name2", 
    description: "description2", 
    category: "category2", 
    quantity: 100, 
    price: 100, 
    farmer_id: 4, 
    img_path: "some-img-path-2", 
    confirmed: 0};
    

it("renders product without crashing", () => {
    shallow(<FarmerProduct product={fakeProduct} />);
});

it("renders product not confirmed crashing", () => {
    shallow(<FarmerProduct product={fakeProductNotConfirmed} />);
});
it("renders farmer product components without crashing", () => {
    const wrappedProduct = shallow(<FarmerProduct product={fakeProduct}/>);
    expect(wrappedProduct.find('Container').exists()).toBeTruthy();
    expect(wrappedProduct.find('FarmerCard').exists()).toBeTruthy();
    expect(wrappedProduct.find('Modal').exists()).toBeTruthy();
    expect(wrappedProduct.find('Form').exists()).toBeTruthy();
    expect(wrappedProduct.find('Alert').exists()).toBeTruthy();
    expect(wrappedProduct.find('Button').exists()).toBeTruthy();
    expect(wrappedProduct.find('input').exists()).toBeTruthy();
    expect(wrappedProduct.find('p').exists()).toBeTruthy();
});


it("accepts props", () => {
    const wrappedProduct = shallow(<FarmerProduct product={fakeProduct}/>);
    expect(wrappedProduct.childAt(0).props().product).toBe(fakeProduct);
});

it("clicking container works", () => {
    const wrappedProduct = shallow(<FarmerProduct product={fakeProduct}/>);
    expect(wrappedProduct.childAt(0).props().product).toBe(fakeProduct);
    const handleShow = jest.fn()
    render( <Container  
            data-testid="product-container"
            onClick={handleShow}>
            <FarmerCard confirmed={true} img={''} title={'This is a title'} body={'This is a body'} subinfo={0.00}/>
        </Container>);
    fireEvent.click(screen.getByTestId('product-container'));
    expect(handleShow).toHaveBeenCalledTimes(1);
});

it('change to empty data', async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    render(
      <MemoryRouter history={history}>
        <FarmerProduct product={fakeProduct}/>
      </MemoryRouter>
    );
  
    act(() => {
        fireEvent.click(screen.getByTestId('container-form'));
       
      });
    const name = screen.getByTestId('nameofproduct');
    const price = screen.getByTestId('price');
    const description = screen.getByTestId('description');
    const category = screen.getByTestId('category');
    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    // expect(name).toBeDisabled();
    // expect(price).toBeDisabled();
    // expect(description).toBeDisabled();
    // expect(category).toBeDisabled();
    
  
    act(() => {
      fireEvent.change(screen.getByTestId('nameofproduct'), {
        target: { value: 'newname' },
      });
     
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('price'), {
        target: { value: "200" },
      });
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('description'), {
        target: { value: 'new description of product' },
      });
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('category'), {
        target: { value: 'Fruit' },
      });
    });
  
   await act(async() => {
        const submit = screen.getByTestId('edit-product');
        expect(submit).toBeInTheDocument();
        fireEvent.click(submit);

    });
    await act(async() => {
        const delButton = screen.getByTestId('delete-product');
        expect(delButton).toBeInTheDocument();
        fireEvent.click(delButton);

    });

    act(() => {
        const delConfrim = screen.getByTestId('delete-confirmed');
        expect(delConfrim).toBeInTheDocument();
        fireEvent.click(delConfrim);
      });
        
  
  });
// it("product renders  with empty basket", () => {
//     const wrappedProduct = shallow(<FarmerProduct product={fakeProduct} />);
//     expect(wrappedProduct.childAt(0).props().basket).toEqual([]);
//     expect(wrappedProduct.childAt(0).props().basket).toHaveLength(0);
// });


// it(`after click it will increase the quantity of product`, () => {
//     const wrappedProduct = shallow(<FarmerProduct product={fakeProduct}/>);
//     expect(wrappedProduct.find("input").props().value).toEqual(1);
//     wrappedProduct.find(`button`).find(`[data-test="increment"]`).simulate(`click`);
//     expect(wrappedProduct.find("input").props().value).toEqual(2);
//   });

// it(`after click it will decrease the quantity of product`, () => {
//     const wrappedProduct = shallow(<FarmerProduct product={fakeProduct} basket={[]}/>);
//     expect(wrappedProduct.find("input").props().value).toEqual(1);
//     wrappedProduct.find(`button`).find(`[data-test="decrement"]`).simulate(`click`);
//     expect(wrappedProduct.find("input").props().value).toEqual(0);
//   });
