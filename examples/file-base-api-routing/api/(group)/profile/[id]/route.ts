import type { BurgerRequest } from 'burger-api';

export function GET(req: BurgerRequest) {
    const query = new URL(req.url).searchParams;

    return Response.json({
        id: req?.params?.id,
        query: Object.fromEntries(query),
        name: 'John Doe',
    });
}
