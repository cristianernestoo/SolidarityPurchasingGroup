import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import DetailProduct from '../components/DetailProduct';
import { act } from 'react-dom/test-utils';

/**
* @jest-environment node
*/

configure({ adapter: new Adapter() });
// Fake variables
const product = {
    name: "n1",
    description: "d1"
}

it("renders detail products without crashing", () => {
    shallow(<DetailProduct product={product} isOpen={true}></DetailProduct>);
});

it("renders detail products component", () => {
    render(<DetailProduct product={product} isOpen={true}/>);
    expect(screen.getByTestId("btnclose")).toBeTruthy();
    expect(screen.getByTestId("btnSave")).toBeTruthy();
    const modalTitle = screen.getByTestId("modalTitle");
    const modalDescription = screen.getByTestId("modalDescription");
    expect(modalTitle).toBeInTheDocument();
    expect(modalDescription).toBeInTheDocument();

    act(()=>{
        fireEvent.click(screen.getByTestId("btnclose"))
    });
    expect(screen.getByText("d1")).toBeTruthy();
    act(()=>{
        fireEvent.click(screen.getByTestId("btnSave"))
    });
    expect(screen.getByText("n1")).toBeTruthy();
});



