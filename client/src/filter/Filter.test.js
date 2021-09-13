
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filter from './Filter';
import {setupServer} from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
  rest.get('http://localhost:7421/rat-names', (req, res, ctx) => {
    return res(ctx.json(["dervin"]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should load component and displays default value', () => {
  render(<Filter />)
  const ratNameElement = screen.getByText(/No Rat/i);
  expect(ratNameElement).toBeInTheDocument();
});




