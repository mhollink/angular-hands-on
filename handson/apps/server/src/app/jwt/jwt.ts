import * as expressJwt from 'express-jwt'
import userService from '../users/user.service';

export const secret = 'ssshh! keep it secret!';
export const issuer = 'express server';

export const excludedRoutes = ['/api/users/authenticate', '/api/users/register']

const jwt = () => {
  return expressJwt({secret, algorithms: ['HS256']})
    .unless({
      path: excludedRoutes.map(route => ({url: route}))
    })
}



export default jwt;
