import {  Response, Request } from "express"
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser } from "../../domain"
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { RenewUser } from "../../domain/use-cases/renew.use-case";




export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository
    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({
                error: error.message
            });
        }

        return res.status(500).json({error: 'Internal Server Error'})
    }


    loginUser = (req: Request, res: Response) => {

        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if( error ) return res.status(400).json({ error: error});


        new LoginUser( this.authRepository )
            .execute( loginUserDto! )
            .then( data => res.json(data) )
            .catch( error => this.handleError(error, res));

    }

    registerUser = (req: Request, res: Response) => {
        
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error: error});

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res));
        
    }


    renew = (req: Request, res: Response) => {
        
        const user = req.body.user;

        new RenewUser()
            .execute(user)
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res));
    }


    



}