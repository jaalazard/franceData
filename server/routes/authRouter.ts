// authRouter.ts
import express, { Router, Request, Response } from "express";
import database from "../database";
import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { RowDataPacket } from "mysql2";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const SECRET = process.env.JWT_SECRET;

const authRouter: Router = express.Router();

authRouter.get("/check", async (req: Request, res: Response) => {
  const jwt = req.cookies.token;
  if (jwt === undefined) {
    return res.json({ isLoggedIn: false });
  } else {
    try {
      const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
      return res.json({ isLoggedIn: true });
    } catch (error) {
      return res.json({ isLoggedIn: false });
    }
  }
});

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const insertedUser = await database.query(
      "INSERT INTO user (email, password) VALUES (?, ?)",
      [req.body.email, hashedPassword]
    );
    return res.json({
      ok: true,
    });
  } catch (error: any) {
    return res.json({
      ok: false,
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const [users] = await database.query<RowDataPacket[]>("SELECT * FROM user WHERE email = ?", [req.body.email]);    console.log(users);
    
    const user = users[0];
console.log(user);

    const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
    const jwt = await new SignJWT({ sub: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("http://localhost")
      .setAudience("http://localhost")
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(SECRET));

    res.cookie("token", jwt, {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Success",
      token: jwt,
      ok: true,
      isLoggedIn: isCorrectPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/logout", async (res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    expires: new Date(0),
  });
  res.status(200).send('Déconnecté avec succès');
});

export default authRouter;
