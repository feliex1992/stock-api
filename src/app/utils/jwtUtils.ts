import jwt from 'jsonwebtoken';

class JWTUtils {
  // Generate a new JWT for the user
  public generateToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
  }

  // Verify if the token is valid
  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      console.error('JWT verification error:', error);
      return null;
    }
  }
}

export default JWTUtils;