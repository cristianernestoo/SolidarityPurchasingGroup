import { render, cleanup, findByText, queryByAttribute, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import React from "react";
import ListOfClients from '../components/ListOfClients'

afterEach(() => {
    cleanup();
});

it('testing search of a client',async  () => {
    const component = render(<Router><ListOfClients/></Router>);
    const search = component.container.querySelector('input');
    fireEvent.change(search, {target:{value:'Marco'}})

    //Inserted 'Marco' in the search bar ---> Laura should not be rendered but marco should
    expect(await findByText(component.container, 'Bianchi')).toBeVisible();
    expect(component.queryByTestId('Laura')).toBeNull();

    //Inserted '' in the search bar --> table should be empty
    fireEvent.change(search, {target:{value:''}});
    expect(component.queryByTestId('Laura')).toBeNull();
    expect(component.queryByTestId('Marco')).toBeNull();
})