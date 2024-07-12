import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { userData } from "../../data/data";
import { prisma } from "../../data/postgresql/config";
import { AuthDatasource, CustomError, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction    = (password: string) => string;
type CompareFunction = (password: string, hashed: string)=> boolean;

export class AuthDBDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ){}


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const {name_user, email, role, password} = registerUserDto;
        try{
            const existUser = await prisma.user.findFirst( { 
                where: {
                    email: email
                }
            });
            
            if(existUser) throw CustomError.badRequest('Email already exist');
    
            const newUser = {
                name_user,
                email,
                role,
                password: this.hashPassword(password)
            }
            // guardar usuario
          
            const resp = await prisma.$queryRaw`
                CALL register_user(${name_user}, ${email}, ${role}, ${this.hashPassword(password)}, true);
            ` as { result: false }[];

            if(!resp[0].result)throw CustomError.badRequest('An error occurred while user-created');
            
            
            return UserMapper.userEntityFromObject(newUser);

        }catch(error){
            console.log(error)
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
     
    }

    
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        
        const {email, password} = loginUserDto;
       
        const user = userData.find( user => user.email === email && user.password === password );
        
        if (!user) throw CustomError.badRequest('User does not exists');

        return UserMapper.userEntityFromObject(user);
    }


    
} 