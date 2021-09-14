
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filter from './Filter';
import {setupServer} from 'msw/node'
import { rest } from 'msw'
import configData from "../config.json";

const url = `${configData.SERVER_URL}/rat-names`;
const server = setupServer(
  rest.get(url, (req, res, ctx) => {
    return res(ctx.json(["dervin"]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders without crashing", () => {
  render(<Filter />);
});

test('should load component and displays default value', () => {
  
  render(<Filter />)
  const ratNameElement = screen.getByText(/No Rat/i);
  expect(ratNameElement).toBeInTheDocument();
});




