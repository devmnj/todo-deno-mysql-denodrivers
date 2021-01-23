import { Application } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { config } from "https://deno.land/x/dotenv/mod.ts";
import router from './routes/routes.ts'

const env =  config()
const app = new Application();
const PORT = +env.PORT || 3000 //+convert it number 
const HOST = env.APP_HOST  
app.use(router.routes())
app.use( ()=>{'NotFound'});
app.listen({ port:PORT });
console.log(`Server running ${HOST} on port ${PORT}`);
