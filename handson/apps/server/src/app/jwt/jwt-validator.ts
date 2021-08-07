import {excludedRoutes, issuer} from "./jwt";
import userService from "../users/user.service";

export const validateJwt = async (jwt) => {
  const {iss, exp, sub} = jwt;

  const isIssuedByServer = iss === issuer;
  const isExpired = exp > Date.now()

  if (!isIssuedByServer || isExpired) {
    console.error(`request with invalid jwt for ${sub}. iss: ${iss}, exp: ${isExpired}`)
    return null;
  }

  const user = await userService.getById(sub);
  if (!user) {
    console.error(`request for unknown user ${sub}.`)
    return null;
  }

  return user;
}

const jwtValidator = () => async (req, res, next) => {
  if (excludedRoutes.includes(req.originalUrl)) return next();

  const jwt = req.user;

  if(!jwt) {
    console.error(`request to ${req.originalUrl} without authorization.`)
    res.sendStatus(401);
    return;
  }

  const user = await validateJwt(jwt);
  if (!user) {
    res.status(401).json({})
    return;
  }

  next();
}

export default jwtValidator;
