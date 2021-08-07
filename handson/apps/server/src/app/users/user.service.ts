import * as jwt from 'jsonwebtoken'
import {issuer, secret} from "../jwt/jwt";
import {filter, first, last} from 'lodash'
import {Hasher} from "../utils/hasher";

type User = {
  id: number;
  username: string;
  password: string;
}

class UserService {
  // In memory 'database'
  private users: Record<number, User> = {};

  public async authenticate({username, password}) {
    const user = first(filter(this.users, user => user.username === username))
    if (!user) return null;

    const passwordCorrect = Hasher.compare(password, user.password);
    if (!passwordCorrect) return null;

    const token = jwt.sign({sub: user.id}, secret, {issuer, expiresIn: '1d'});

    return {token}
  }

  public async create({username, password}) {
    const user = first(filter(this.users, user => user.username === username))
    if (user) return false;

    const id = this.generateUserId();

    this.users[id] = {
      id,
      username,
      password: Hasher.hash(password)
    }

    return true
  }

  private generateUserId() {
    const lastUserId: number = parseInt(last(Object.keys(this.users)) || '0');
    return lastUserId + Math.floor(Math.random() * 10);
  }

  public async getById(id) {
    const user = this.users[id];
    if (!user) return null;

    return {username: user.username};
  }
}

const userService = new UserService();

export default userService;
