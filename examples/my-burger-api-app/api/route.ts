import type { BurgerRequest } from 'burger-api';

export async function GET(req: BurgerRequest) {
    return Response.json({ message: 'Hello world' });
    // return new Response('Hello world');
}
