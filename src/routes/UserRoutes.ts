import { Request, Response, Router} from 'express';
import { threadId } from 'node:worker_threads';

import User from '../models/User'


class UserRoute  {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async getUsers (req: Request, res: Response): Promise<void> {
        const users = await User.find();
        res.json(users);
    }

    public async getUser (req: Request, res: Response): Promise<void>{
        const user = await User.findOne({username: req.params.username}).populate('posts','title-_id')
        res.json(user)
    }

    public async createUser (req: Request, res: Response): Promise<void>{
        const newUser = new User (req.body);
        
        await newUser.save();
        
        console.log(newUser);
        res.json({data: newUser})
    }
 
    public async updateUser (req: Request, res: Response): Promise<void> {
        const {username} = req.params;
        const user = await User.findOneAndUpdate({username},req.body, {new: true});
        res.json(user)
        
        //User.findOneAndUpdate
        
    }
    
    public async deleteUser (req: Request, res: Response): Promise<void> {
        const {username} = req.params;
        const user = await User.findOneAndDelete({username});
        res.json('removed')

    }

    routes() {
        this.router.get('/', this.getUsers)
        this.router.get('/:username', this.getUser)
        this.router.post('/', this.createUser)
        this.router.put('/:username', this.updateUser)
        this.router.delete('/:username', this.deleteUser)
    }
    

}

const userRoute = new UserRoute();

export default userRoute.router;