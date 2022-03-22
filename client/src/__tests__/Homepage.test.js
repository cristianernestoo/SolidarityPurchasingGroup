import { render, cleanup, findByTestId } from "@testing-library/react";
import React from "react";
import Homepage from "../components/Homepage";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Card, Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
/**
* @jest-environment node
*/

afterEach(() => {
    cleanup();
});

configure({ adapter: new Adapter() });

it("renders button correctly", () => {
    const { getByTestId } = render(<Button size="lg" href="/products" variant="success" data-testid="button_products" style={{ backgroundColor: "#247D37", marginTop: "7vh" }} >
        Discover our products
    </Button>);
    expect(getByTestId('button_products')).toHaveTextContent("Discover our products");
});

it('includes link to products', () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.find(Link).at(0).props().to).toStrictEqual({ pathname: '/products' });
});
it('includes link to registerform', () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.find(Link).at(1).props().to).toStrictEqual({ pathname: '/registerform' });
});

//TODO ROUTE SUPPLIER AND DELIVERY


it("renders container of the page correctly", () => {
    const { getByTestId } = render(<Card data-testid="cardimgproducts_test">
        <Card.Img variant="top" src="https://st3.depositphotos.com/5958522/32531/i/600/depositphotos_325318570-stock-photo-counter-with-fresh-vegetables-and.jpg" />
    </Card>);
    expect(getByTestId('cardimgproducts_test')).toBeInTheDocument();
});

it("renders video correctly", () => {
    const inlineVideo = findByTestId('vidMyVideo');
    expect(inlineVideo).toBeTruthy();
})