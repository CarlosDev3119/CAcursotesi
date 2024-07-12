import { JWTAdapter } from "../../config/jwt.adapter";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../errors/custom.errors";
import { AuthRepository } from "../repositories/auth.repository";

interface UserToken {
    token: string,
    user: UserEntity
}

interface LoginUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: string) => Promise<string|null>

export class LoginUser implements LoginUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JWTAdapter.generateToken
        //pendiente token
    ){}

    
    
    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        
        
        const user = await this.authRepository.login(loginUserDto) 
        const token = await this.signToken({email: user.email})
        if(!token) throw CustomError.internalServer('Error generating token')

        return {
            token: token,
            user: user
        }
    
    }

}


//async y el await solo sirven dentro de metodos o funciones






