import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import indexRoutes from './routes/indexRoutes';
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';
import userhistoryRoutes from './routes/userhistoryRoutes';
import ticketRoutes from './routes/ticketRoutes';
import companyRoutes from './routes/companyRoutes';
class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        this.app.use(cors({origin: true, credentials: true}));
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser())
    }
    routes(): void{

        this.app.use('/',indexRoutes)
        this.app.use('/api/project', projectRoutes);
        this.app.use('/api/user', userRoutes);
        this.app.use('/api/userhistory', userhistoryRoutes);
        this.app.use('/api/ticket', ticketRoutes);
        this.app.use('/api/company', companyRoutes);

    }
    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
