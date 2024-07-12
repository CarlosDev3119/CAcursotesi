import { Response, Request, NextFunction} from 'express';
import { JWTAdapter } from '../../config/jwt.adapter';
import { userData } from '../../data/data';
import { UserMapper } from '../../infrastruture/mappers/user.mapper';

export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction){
        const authorization = req.header('Authorization');

        if(!authorization) return res.status(401).json({error: 'No token provided'});

        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid Bearer token'});

        const token = authorization.split(' ').at(1) || '';

        try{
            const payload = await JWTAdapter.validateToken<{email: string}>(token);
            if(!payload) return res.status(401).json({error: 'Invalid token'});

            const user = userData.find( user => user.email === payload.email);
            
            if(!user) return res.status(401).json({error: 'Invalid token - user'});

            req.body.user = UserMapper.userEntityFromObject(user);

            next();

        }catch(error){
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'})
        }



    }

}