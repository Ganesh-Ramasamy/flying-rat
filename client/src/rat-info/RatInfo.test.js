
import { render, screen, waitFor } from '@testing-library/react';
import RatInfo from './RatInfo';
import {setupServer} from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
  rest.get(`http://localhost:7421/rat/catherine`, (req, res, ctx) => {
    return res(ctx.json({"name": "catherine", "width":23, "height":18}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should load component and display rat information', async () => {
server.use(
    rest.get(`http://localhost:7421/rat/dervin`, (req, res, ctx) => {
        return res(ctx.json({ "name": "dervin", "width":21, "height":18, "nickname":"La King" }));
    }),
    )
    const {rerender} = render(<RatInfo name={"catherine"}  />);
    rerender(<RatInfo name={"dervin"} />);
    
    await waitFor(() => {
        expect(screen.getByPlaceholderText('nickname')).toHaveTextContent('Nickname: La King');
        expect(screen.getByPlaceholderText('width')).toHaveTextContent(21);
        expect(screen.getByPlaceholderText('height')).toHaveTextContent(18);
    });
});

test('should display Uncool Rat with no Nickname when there is no nickname', async () => {
    server.use(
        rest.get(`http://localhost:7421/rat/dervin`, (req, res, ctx) => {
            return res(ctx.json({ "name": "dervin", "width":21, "height":18 }));
        }),
        )
        const {rerender} = render(<RatInfo name={"catherine"}  />);
        rerender(<RatInfo name={"dervin"} />);        
        await waitFor(() => {
            expect(screen.getByPlaceholderText('nickname')).toHaveTextContent('Nickname: Uncool Rat with no Nickname');
        });
    });


