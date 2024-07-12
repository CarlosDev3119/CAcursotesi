import { AuthDatasource, AuthRepository, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";



export class AuthRepositoryImpl implements AuthRepository{
    
    constructor(
        private readonly authDatasource: AuthDatasource
    ){}

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }
    
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }

}