import React from 'react';
import { render, cleanup, findByTestId, getByTestId, fireEvent, getByText, screen } from "@testing-library/react";
import { shallow, configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RegisterInterface from "../components/RegisterInterface";
import Adapter from 'enzyme-adapter-react-16';
import { useLocation, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';



const fakeClient = {
  name: 'Lucio',
  surname: "Inglese",
  birthdate: "06/09/96",
  email: "email@gmail.com",
  password: "passwordprova"

}

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/registerform"
  })
}));




afterEach(() => {
  cleanup();
});

configure({ adapter: new Adapter() });
const fakeUserRole = "";


//avviene il render della pag?

describe("Render", () => {

  it("Check registerpageRender", () => {
    const page = shallow(<RegisterInterface userRole={fakeUserRole} />);
    expect(page).toBeTruthy();
  });



  it("Check all components", () => {
    const wrapper = shallow(<RegisterInterface userRole={fakeUserRole} />);
    expect(wrapper.find('Container').exists()).toBeTruthy();
    expect(wrapper.find('Form').exists()).toBeTruthy();
    expect(wrapper.find('Button')).toHaveLength(2);

  })



  it("check button submit ", () => {
    const wrapper = shallow(<RegisterInterface />)
    const btn = <Button
      className="mt-5"
      data-testid="submit-Button"
      variant="success"
      type="submit"
      style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}
    >
      submit
    </Button>;
    expect(wrapper.contains(btn)).toEqual(true);

  });

  it("check button back ", () => {
    const wrapper = shallow(<RegisterInterface />)
    const btn = <Button
      className="mt-5"
      data-testid="back-Button"
      style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }} onClick={() => {

      }}>
      back
    </Button>
    expect(wrapper.contains(btn)).toEqual(false);

  });

});


describe("changeInput", () => {
  //Click bottone
  it('Button submit', () => {
    const onButtonClickMock = jest.fn();
    render(
      <Button
        className="mt-5"
        data-testid="submit-Button"
        variant="success"
        type="submit"
        style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}
        onSubmit={onButtonClickMock}
      >
        submit
      </Button>
    );


    fireEvent.submit(screen.getByTestId('submit-Button'));
    expect(onButtonClickMock).toHaveBeenCalledTimes(1);

  });


  it('Button back', () => {
    let onButtonClickMock = jest.fn();
    render(
      <Button className="mt-5"
        data-testid="back-Button"
        style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}
        onClick={() => onButtonClickMock}>back</Button>

    );

    fireEvent.click(screen.getByTestId('back-Button'));
    expect(onButtonClickMock).toHaveBeenCalledTimes(0);

  });


});

it('change data input', async () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  render(
    <MemoryRouter history={history}>
      <RegisterInterface />
    </MemoryRouter>
  );


  const name = screen.getByText('First name');
  const surname = screen.getByText('Last name');
  const birthday = screen.getByText('Birthday');
  const email = screen.getByText('Email');
  const password = screen.getByText('Password');
  expect(name).toBeInTheDocument();
  expect(surname).toBeInTheDocument();
  expect(birthday).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();

  act(() => {
    fireEvent.change(screen.getByTestId('firstname'), {
      target: { value: fakeClient.name },
    });
   
  });

  act(() => {
    fireEvent.change(screen.getByTestId('lastName'), {
      target: { value: fakeClient.surname },
    });
  });

  act(() => {
    fireEvent.change(screen.getByTestId('Birthday'), {
      target: { value: fakeClient.birthdate },
    });
  });

  act(() => {
    fireEvent.change(screen.getByTestId('Email'), {
      target: { value: fakeClient.email },
    });
  });

  act(() => {
    fireEvent.change(screen.getByTestId('Password'), {
      target: { value: fakeClient.password },
    });
  });

 await act(async() => {
    const closeButton = await screen.getByText('back');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);

        const submit = await screen.getByText('submit');
        expect(submit).toBeInTheDocument();
        fireEvent.click(submit);
  });

});



