import type { BurgerNext, BurgerRequest, Middleware } from 'burger-api';

// Route-specific middleware
export const middleware: Middleware[] = [
    (req: BurgerRequest): BurgerNext => {
        console.log(
            'Product Detail Route-specific middleware executed for request:',
            req.url
        );
        return undefined;
    },
];

export function GET(req: BurgerRequest) {
    return Response.json({
        message: 'Product Detail',
    });
}
