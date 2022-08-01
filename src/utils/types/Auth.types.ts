import { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  id: number,
}

export default TokenPayload;
