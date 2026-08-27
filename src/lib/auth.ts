import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);

export async function signToken(payload: {
  userId: number;
  email: string;
  name: string | null;
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET, {
    clockTolerance: 60,
  });
  return payload as { userId: number; email: string; name: string };
}