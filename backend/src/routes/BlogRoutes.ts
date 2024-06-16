import { Hono } from 'hono';
import { UserSignup , UserValidation } from '../../types';
 
export const BlogRouter = new Hono<{
    Bindings : Bindingsts
}>();

type Bindingsts = {
    DATABASE_URL :string,
    PRIVATE_KEY : string
}

BlogRouter.post('/create' , async(c) => {
    
});


BlogRouter.get('/getall' , async(c) => {

})