import { Router } from "express";
import { AuthRoutes } from "./auth/routes";



export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        // agregr rutas 
        router.use('/api/v1/auth', AuthRoutes.routes);
  


        return router;
    }
}