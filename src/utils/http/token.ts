export function parseJwt(jwt: string) {
  const token = jwt.split("Bearer ")[1];
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export function getUserIDFromJWT(jwt: string): string {
  const tokenBody = parseJwt(jwt);
  return tokenBody.sub;
}

export function getUserTypeFromJWT(jwt: string): string {
  const tokenBody = parseJwt(jwt);
  return tokenBody["cognito:groups"][0];
}
