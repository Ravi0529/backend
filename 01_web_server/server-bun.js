// can't start the server using node or nodemon, use "bun filename"
import { serve } from 'bun';

serve({
    fetch(request) {
        const url = new URL(request.url);
        if(url.pathname === '/') {
            return new Response("Welcome to BUN!", {status: 200});
        }
        else if(url.pathname === '/login') {
            return new Response("Login to your ID!", {status: 200});
        }
        else {
            return new Response("404 Not Found!", {status: 404});
        }
    },

    port: 3000,
    hostname: '127.0.0.1'
})