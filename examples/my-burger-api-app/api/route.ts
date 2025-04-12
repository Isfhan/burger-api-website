import type { BurgerRequest } from '@burgerTypes';

export async function GET() {
    return Response.json({ message: 'Hello world' });
    // return new Response('Hello world');
}
