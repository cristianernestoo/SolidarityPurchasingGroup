import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import Product from '../components/Product';
import Adapter from 'enzyme-adapter-react-16';
/**
* @jest-environment node
*/
configure({ adapter: new Adapter() });
// Fake variables
var s = false;
const fakeHandleBasket = () =>{ s = !s};

const fakeProduct = {id: "1", 
    name: "name1", 
    description: "description1", 
    category: "category1", 
    quantity: 100, 
    price: 100, 
    farmer_id: 4, 
    img_path: "some-img-path-1", 
    confirmed: 1}
    
const fakeBasket = [
    {
        id: "0", 
        name:"name0", 
        price:100, 
        img: "some-img-path-0", 
        quantity: 10, 
        total: 10*100
    }
];

it("renders product without crashing", () => {
    shallow(<Product product={fakeProduct} basket={fakeBasket} setBasket={fakeHandleBasket}/>);
});

it("renders market components without crashing", () => {
    const wrappedProduct = shallow(<Product product={fakeProduct} basket={fakeBasket} setBasket={fakeHandleBasket}/>);
    expect(wrappedProduct.find('Container').exists()).toBeTruthy();
    expect(wrappedProduct.find('Card').exists()).toBeTruthy();
    expect(wrappedProduct.find('Modal').exists()).toBeTruthy();
    expect(wrappedProduct.find('Alert').exists()).toBeTruthy();
    expect(wrappedProduct.find('button').exists()).toBeTruthy();
    expect(wrappedProduct.find('input').exists()).toBeTruthy();
    expect(wrappedProduct.find('p').exists()).toBeTruthy();
    expect(wrappedProduct.find('span').exists()).toBeTruthy();
});


it("accepts props", () => {
    const wrappedProduct = shallow(<Product product={fakeProduct} basket={fakeBasket} />);
    expect(wrappedProduct.childAt(0).props().product).toBe(fakeProduct);
    expect(wrappedProduct.childAt(0).props().basket).toBe(fakeBasket);
});

it("product renders  with empty basket", () => {
    const wrappedProduct = shallow(<Product product={fakeProduct} basket={[]}/>);
    expect(wrappedProduct.childAt(0).props().basket).toEqual([]);
    expect(wrappedProduct.childAt(0).props().basket).toHaveLength(0);
});


it(`after click it will increase the quantity of product`, () => {
    const wrappedProduct = shallow(<Product product={fakeProduct} basket={[]}/>);
    expect(wrappedProduct.find("input").props().value).toEqual(1);
    wrappedProduct.find(`button`).find(`[data-test="increment"]`).simulate(`click`);
    expect(wrappedProduct.find("input").props().value).toEqual(2);
  });

it(`after click it will decrease the quantity of product`, () => {
    const wrappedProduct = shallow(<Product product={fakeProduct} basket={[]}/>);
    expect(wrappedProduct.find("input").props().value).toEqual(1);
    wrappedProduct.find(`button`).find(`[data-test="decrement"]`).simulate(`click`);
    expect(wrappedProduct.find("input").props().value).toEqual(0);
  });
