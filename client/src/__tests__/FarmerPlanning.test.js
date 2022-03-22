import React, {
  useState as useStateMock
} from 'react';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import { act } from 'react-dom/test-utils';
import FarmerPlanning from '../components/FarmerPlanning';
import FormTable from '../components/FarmerPlanning';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import { FaPlus } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { MdSecurityUpdate } from 'react-icons/md';
import { BsFillPlusCircleFill, BsTrash, BsPencilSquare, BsFillInfoCircleFill } from "react-icons/bs";
const clockObject = require('../Clock');

let clock = new clockObject.Clock();

/*
 * Next functions test if the object is correctly initialized
 * and if ALL the events are set as passed if they are so
 */

//Setting a Monday at 20:51 --> all events should be set as passed
clock.time = new Date("22 November 2021 20:51")





configure({ adapter: new Adapter() });

const fakeFarmer = [{
  id: 4,
  role: "farmer",
  name: "Maria",
  surname: "Marroni",
  birthdate: "01/01/2001",
  email: "somemail@email.com",
  password: "someHashedPassword",
  isConfirmed: 1
}];

const farmerProduct = [{
  id: 1,
  name: "name1",
  description: "description1",
  category: "category1",
  quantity: 100,
  price: 100,
  farmer_id: 4,
  img_path: "some-img-path-1",
  confirmed: 1
}];

const productNW = [{
  id:1,
  quantity: 100,
  price: 100,
  name: 'name1',
  description: "description1",
  category: "category1",
  farmer_id: 4,
  img_path: 'some-img-path-1',
  confirmed_by_farmer: 0
}];

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





describe("Render", () => {

  it('Render Page', () => {
    const page = shallow(<FarmerPlanning />);
    expect(page).toBeTruthy();
  })

  it("Check components", () => {
    const wrapper = shallow(<FarmerPlanning />);
    expect(wrapper.find('Container').exists()).toBeTruthy();
    expect(wrapper.find('FormTable').exists()).toBeTruthy();
    expect(wrapper.find('BsFillPlusCircleFill').exists()).toBeTruthy();

  })

  it("Check  FormTable", () => {
    const page = shallow(<FormTable farmerProduct={farmerProduct} productNW={productNW}/>);
    const wrapper = page.find('FormTable').dive();
    expect(wrapper.find('BsFillInfoCircleFill').exists()).toBeTruthy();
    expect(wrapper.find('Button').exists()).toBeTruthy();
    expect(wrapper.find('ConfirmModal').exists()).toBeTruthy();
    expect(wrapper.find('thead').exists()).toBeTruthy();
    expect(wrapper.find('tbody').exists()).toBeTruthy();
    expect(wrapper.find('tr').exists()).toBeTruthy();
    expect(wrapper.find('thead').children().find('tr').children().find('th').exists()).toBeTruthy();
    expect(wrapper.find('Row').children().find('Col').exists()).toBeTruthy();

    

  })

});

describe("changeInput", () => {

  it('Button back', () => {
    let onButtonClickMock = jest.fn();
    render(<Button
      size="lg"
      data-testid="back-Button"
      className="mt-5"
      style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}>
      Back</Button>

    );
    
    fireEvent.click(screen.getByTestId('back-Button'));
    expect(onButtonClickMock).toHaveBeenCalledTimes(0);

  });


  
});



it('includes  product', () => {
  const page = shallow(<FarmerPlanning />);
  const prova = page.find('PlanningModal').children();

  const wrapper = shallow(<prova
    show={true}
    onHide={() => { setModalShow(false); setUpdate(false); }}
    products={""}
    farmerProducts={farmerProduct}
    userid={1}
    update={""}
    setUpdate={""}
    setDirty={false}
    id={productNW.id}
    productNW={productNW}
  />);
  
  expect(wrapper.props().farmerProducts).toBe(farmerProduct);
  expect(wrapper.props().productNW).toBe(productNW);

});

it('delete BsTrash', () => {
  const  deleteTask= jest.fn();
  render(
    <Button data-testid='BsTrash' variant="light"  onClick={deleteTask}>
      <BsTrash  size={30} className= 'pointer' fill="red" /></Button>);

  
  
    fireEvent.click(screen.getByTestId(/BsTrash/i));
    expect(deleteTask).toHaveBeenCalledTimes(1);

});

it('update pencil', () => {
  const  setModalShow= jest.fn();
  

  render(
    <Button data-testid='BsPencilSquare' variant="light"  onClick={setModalShow}>
      <BsPencilSquare  className= 'pointer' />
       </Button>);
  
    fireEvent.click(screen.getByTestId(/BsPencilSquare/i));
    expect(setModalShow).toHaveBeenCalledTimes(1);
    

});


describe("View", () => {
 /* const useStateSpy = jest.spyOn(React, 'useState');
  const setView = jest.fn();
  let view = true;
  const setModalShow = jest.fn();
  let modalShow = false;
  useStateSpy.mockImplementation(() => [modalShow, setModalShow]);
  useStateSpy.mockImplementation(() => [view, setView]); */

  it('try', () => {
    const { queryByTestId } = render(<MemoryRouter><FormTable farmerProduct={farmerProduct} productNW={productNW} disable={false} view={'view'} userid={4} clock={clock}/></MemoryRouter>);


    const submitButton = queryByTestId("BsTrash");
    expect(submitButton).not.toBeInTheDocument();

    const img = queryByTestId("img");
    expect(img).not.toBeInTheDocument();

    

  })


});


it('add a next week product correctly', async() => {
    
  const setShowPopUp = jest.fn();
  const deleteTask = jest.fn();
  const setModalShow = jest.fn();
  const setDirty = jest.fn();
  const setId = jest.fn();
  const setUpdate = jest.fn();

  render(<MemoryRouter><FormTable disable={false} clock={clock} setShowPopUp={setShowPopUp} farmerProducts={farmerProduct} userid={fakeFarmer.id} productNW={productNW} products={fakeProducts} deleteTask={deleteTask} setModalShow={setModalShow} setUpdate={setUpdate} setId={setId} setDirty={setDirty} /></MemoryRouter>);
   

  await act( async()=>{
    const plus = await screen.findByTestId("BsFillPlusCircleFill");
    fireEvent.click(plus);
  });

  act(() => {
    fireEvent.change(screen.getByTestId('formControl'), {
      target: { value: 'name1' },
    });
  });


  act(() => {
    fireEvent.change(screen.getByPlaceholderText('0.0'), {
      target: { value: '10' },
    });
  });

  await act( async()=>{
    const submit = await screen.findByText('submit');
    fireEvent.click(submit);
  });
  
})

it('test search bar and estimation button', async() => {
    
  const setShowPopUp = jest.fn();
  const deleteTask = jest.fn();
  const setModalShow = jest.fn();
  const setDirty = jest.fn();
  const setId = jest.fn();
  const setUpdate = jest.fn();

  render(<MemoryRouter><FormTable disable={false} clock={clock} setShowPopUp={setShowPopUp} farmerProducts={farmerProduct} userid={fakeFarmer.id} productNW={productNW} products={fakeProducts} deleteTask={deleteTask} setModalShow={setModalShow} setUpdate={setUpdate} setId={setId} setDirty={setDirty} /></MemoryRouter>);
  

  act(() => {
    fireEvent.change(screen.getByTestId('searchBar'), {
      target: { value: 'name1' },
    });

    fireEvent.change(screen.getByTestId('searchBar'), {
      target: { value: '' },
    });
  });

  await act( async()=>{
    const estimationButton =  await screen.findByTestId("estimation");
    fireEvent.click(estimationButton);
  });

})
