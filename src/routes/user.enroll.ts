import { isValidEmail, isValidName } from "../utils/validation";

export const userEnroll = async (request: Request, env: Env, createResponse: (data: any, status?: number) => Response) => {
	try{
        const { pathname } = new URL(request.url);
        if(pathname === '/api/v1/enroll'){

            //parse and validate request body
            let body: any;
            try{
                body = await request.json();
                if(!isValidEmail(body.email) && !isValidName(body.name)){
                    return createResponse({
                        success: false,
                        error: 'Invalid email or name'
                    }, 400)
                }
            }catch(error){
                return createResponse({
                    success: false,
                    error: 'Invalid request body'
                }, 400)
            }
            const { email, name } = body;
            
            //check if user already requested a badge
            const existingUsers = await env.DB.prepare(
                `SELECT * FROM users WHERE email = ? LIMIT 1`
            ).
            bind(email).
            all();
            if(existingUsers.results.length > 0){
                return createResponse({
                    success: false,
                    error: 'You have already requested a tour badge. Cannot request twice'
                }, 409)
            }

            //Insert new user
            const result = await env.DB.prepare(
                `INSERT INTO users (email, name) VALUES (?, ?)`
            ).
            bind(email, name).
            run();

            if(!result.success){
                return createResponse({
                    success: false,
                    error: 'Failed to insert user'
                }, 500)
            }
            return createResponse({
                success: true,
                message: "Your request has been received succesfully"
            }, 200)
        }
        else{
            return createResponse({
                success: false,
                error: 'Invalid request method'
            }, 405)
        }
    }catch(error){
        console.log(error);
        return createResponse({
            success: false,
            error: 'Internal server error. Please try again later'
        }, 500)
    }
};