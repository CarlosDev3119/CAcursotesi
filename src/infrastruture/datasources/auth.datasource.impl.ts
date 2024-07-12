import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { userData } from "../../data/data";
import { AuthDatasource, CustomError, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction    = (password: string) => string;
type CompareFunction = (password: string, hashed: string)=> boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ){}


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name_user, email, role, password} = registerUserDto;
        
        const existUser = userData.find( user => user.email === email);
        if(existUser) throw CustomError.badRequest('Email already exist');

        const newUser = {
            id_user: new Date().getTime(),
            name_user,
            email,
            role,
            password: this.hashPassword(password)
        }
        // guardar usuario
        userData.push(newUser);
        
        return UserMapper.userEntityFromObject(newUser);
    }

    
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        
        const {email, password} = loginUserDto;
       
        const user = userData.find( user => user.email === email && user.password === password );
        
        if (!user) throw CustomError.badRequest('User does not exists');

        return UserMapper.userEntityFromObject(user);
    }


    
} 