import jwt, { JwtPayload } from 'jsonwebtoken'

interface SignOption {
  expiresIn: string | number
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: '1d',
}

export function signJwt(payload: JwtPayload, option: SignOption = DEFAULT_SIGN_OPTION) {
  const secretKey = process.env.JWT_USER_ID_SECRET!
  return jwt.sign(payload, secretKey)
}

export function verifyJwt(token: string): any {
  try {
    const secretKey = process.env.JWT_USER_ID_SECRET!
    return jwt.verify(token, secretKey)
  } catch (e) {
    console.log(e)
    return null
  }
}
