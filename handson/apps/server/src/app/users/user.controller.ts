import {Router} from 'express';
import userService from './user.service';

const userRouter = Router();
export default userRouter;

// routes
userRouter.post('/authenticate', authenticate);
userRouter.post('/register', register);
userRouter.get('/current', getCurrent);

function sendError(res, code: number, message: string) {
  return res.status(code).json({message});
}

function authenticate(req, res) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : sendError(res, 400, 'Username or password is incorrect'))
    .catch(err => sendError(res, 500, err.message));
}

function register(req, res) {
  userService.create(req.body)
    .then((created) => created ? res.status(201).json({}) : sendError(res, 409, 'username already taken'))
    .catch(err => sendError(res, 500, err.message));
}

function getCurrent(req, res) {
  userService.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => sendError(res, 500, err.message));
}

