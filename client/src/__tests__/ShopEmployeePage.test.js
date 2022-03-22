import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ShopEmployeePage from '../components/ShopEmployeePage';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Test ShopEmployeePage', () => {
  test('Test shopemployee', async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    render(
      <MemoryRouter history={history}>
        <ShopEmployeePage/>
      </MemoryRouter>
    );
  });
});