import jwt from "jsonwebtoken";

export const createToken = (
  data: { id: string; name: string; email: string },
  expiresIn: string | number
) => {
  const { id, name, email } = data;

  return jwt.sign(
    { id, name, email },
    process.env.ACCESS_SECRET_KEY as string,
    {
      expiresIn,
    }
  );
};

export const decode = (token: string) =>
  jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);
