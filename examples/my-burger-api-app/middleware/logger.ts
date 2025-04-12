import type { Middleware, BurgerNext, BurgerRequest } from 'burger-api';

// Global middleware example: a simple logger.
export const globalLogger: Middleware = (
    request: BurgerRequest
): BurgerNext => {
    // console.log(`[Global Logger] ${request.method} ${request.url}`);
    // let a = 2 + 2;
    // return new Response(a.toString());
    // console.log(a);
    // console.log('Time:', Date.now());
    return undefined;
};
