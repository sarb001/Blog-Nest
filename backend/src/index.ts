
import { Hono } from "hono";
import { userRouter } from "./routes/UserRoute";
import { BlogRouter } from "./routes/BlogRoutes";
import { cors } from "hono/cors";

type Bindingsts = {
	DATABASE_URL :string,
	PRIVATE_KEY : string
}

const app = new Hono<{Bindings : Bindingsts}>();

app.use('/*' , cors());

app.route('/api/v1/user',userRouter);

app.route('/api/v1/blog',BlogRouter);


export  default app;
