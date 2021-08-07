import * as crypto from 'crypto';

export class Hasher {
  public static hash(password) {
    return crypto.createHash('sha256')
      .update(password)
      .digest('hex');
  }

  public static compare(password, hash) {
    return hash === Hasher.hash(password);
  }
}
