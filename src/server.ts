import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compressions from 'compression';
import cors from 'cors';


import indexRoutes from './routes/indexRoutes'
import postRoute from './routes/PostRoutes'
import userRoute from './routes/UserRoutes'

class Server {
    public app: express.Application;

    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }

    config () {
        const MONGO_URI = process.env.MONGO_KEY
        mongoose.set('useFindAndModify', true)
        mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useCreateIndex: true
        }).then(db => console.log ('db is connected'));
        //main settings
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(compressions());
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes); // es como blueprints
        this.app.use('/posts',postRoute); // es como blueprints
        this.app.use('/user',userRoute); // es como blueprints
    }

    start() {
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();

server.start();