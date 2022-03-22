import React from 'react';
import { render, cleanup, findByTestId, getByTestId, fireEvent, getByText, screen } from "@testing-library/react";
import { shallow, configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ProductForm from '../components/ProductForm';
import Adapter from 'enzyme-adapter-react-16';
import { useLocation, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
/**
* @jest-environment node
*/
afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });

it("renders product form without crashing", () => {
    const handleShow = jest.fn();
    const handlePopUpShow = jest.fn();
    shallow(<ProductForm userid={1} show={true} handleShow={handleShow} handlePopUpShow={handlePopUpShow}/>);

});

it("renders product form components without crashing", () => {
    const handleShow = jest.fn();
    const handlePopUpShow = jest.fn();
    const wrappedProduct = shallow(<ProductForm userid={1} show={true} handleShow={handleShow} handlePopUpShow={handlePopUpShow} />);
    expect(wrappedProduct.find('Modal').exists()).toBeTruthy();
    expect(wrappedProduct.find('Form').exists()).toBeTruthy();
    expect(wrappedProduct.find('Container').exists()).toBeTruthy();
    expect(wrappedProduct.find('Row').exists()).toBeTruthy();
    expect(wrappedProduct.find('Col').exists()).toBeTruthy();
    expect(wrappedProduct.find('div').exists()).toBeTruthy();
    expect(wrappedProduct.find('button').exists()).toBeTruthy();
    expect(wrappedProduct.find('Alert').exists()).toBeFalsy();
});


it("accepts props", () => {
    const handleShow = jest.fn();
    const handlePopUpShow= jest.fn(); 
    const wrappedProduct = shallow(<ProductForm userid={1} show={true} handleShow={handleShow} handlePopUpShow={handlePopUpShow}/>);
    expect(wrappedProduct.childAt(0).props().userid).toBe(1);
    expect(wrappedProduct.childAt(0).props().show).toBeTruthy();
    expect(wrappedProduct.childAt(0).props().handleShow).toBe(handleShow);

    
});

// describe("Testing form of product form", () => {
//     it("renders name of product", () => {
//         const setName = jest.fn();
//         render(<Form.Control
//             required
//             data-testid="nameofproduct"
//             type="text"
//             placeholder="Product"
//             value=""
//             onChange={(event) => setName(event.target.value)}
//         />)

//     })

// })

// it("renders button of form correctly", () => {
//   const button = findByTestId('add-new-product');
//   expect(button).toBeTruthy();
// })


it('Change data input', async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    const handleShow = jest.fn();
    const handlePopUpShow= jest.fn(); 
    render(
      <MemoryRouter history={history}>
        <ProductForm userid={1} show={true} handleShow={handleShow} handlePopUpShow={handlePopUpShow}/>
      </MemoryRouter>
    );
  
  
    const name = screen.getByText('Name of product');
    const price = screen.getByText('Price of product');
    const description = screen.getByText('Description of product');
    const qty = screen.getByText('Initial quantity');
    const category = screen.getByText('Category');
    const img = screen.getByText('Image Path of Product');
    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(qty).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  
    act(() => {
      fireEvent.change(screen.getByTestId('nameofproduct'), {
        target: { value: 'Watermelon' },
      });
     
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('priceofproduct'), {
        target: { value: 10 },
      });
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('descriptionofproduct'), {
        target: { value: "Juicy watermelon" },
      });
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('quantityofproduct'), {
        target: { value: 100 },
      });
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('categoryofproduct'), {
        target: { value: "Fruit" },
      });
    });
    act(() => {
        fireEvent.change(screen.getByTestId('imgofproduct'), {
          target: { value: "somelink" },
        });
      });
  
   await act(async() => {
        const submit = screen.getByTestId('add-new-product');
        expect(submit).toBeInTheDocument();
        fireEvent.click(submit);
    });
  
  });

  it('change to empty data', async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    const handleShow = jest.fn();
    const handlePopUpShow= jest.fn(); 
    render(
      <MemoryRouter history={history}>
        <ProductForm userid={1} show={true} handleShow={handleShow} handlePopUpShow={handlePopUpShow}/>
      </MemoryRouter>
    );
  
  
    const name = screen.getByText('Name of product');
    const price = screen.getByText('Price of product');
    const description = screen.getByText('Description of product');
    const qty = screen.getByText('Initial quantity');
    const category = screen.getByText('Category');
    const img = screen.getByText('Image Path of Product');
    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(qty).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  
    act(() => {
      fireEvent.change(screen.getByTestId('nameofproduct'), {
        target: { value: '' },
      });
     
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('priceofproduct'), {
        target: { value: 'sss' },
      });
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('descriptionofproduct'), {
        target: { value: '' },
      });
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('quantityofproduct'), {
        target: { value: 'sss' },
      });
    });
  
    act(() => {
      fireEvent.change(screen.getByTestId('categoryofproduct'), {
        target: { value: 'anything' },
      });
    });
    act(() => {
        fireEvent.change(screen.getByTestId('imgofproduct'), {
          target: { value: '' },
        });
      });
  
   await act(async() => {
        const submit = screen.getByTestId('add-new-product');
        expect(submit).toBeInTheDocument();
        fireEvent.click(submit);
    });
  
  });