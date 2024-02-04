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
      const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return res.json({ isLoggedIn: true });
    } catch (error) {
      return res.json({ isLoggedIn: false });
    }
  }
});

authRouter.post("/register", async (req: Request, res: Response) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    errors.push("Format d'e-mail invalide");
  }

  const passwordRegex = /^.{6,}$/;
  if (!passwordRegex.test(req.body.password)) {
    errors.push("Le mot de passe doit contenir au moins 6 caractères");
  }

  const isPasswordConfirmed = req.body.password === req.body.confirmPassword;
  if (!isPasswordConfirmed) {
    errors.push("Les mots de passe ne correspondent pas");
  }

  const [existingUsers] = await database.query<RowDataPacket[]>(
    "SELECT * FROM user WHERE email = ?",
    [req.body.email]
  );
  if (existingUsers.length > 0) {
    errors.push("Cet e-mail est déjà enregistré");
  }

  if (errors.length < 1) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const insertedUser = await database.query(
        "INSERT INTO user (email, password) VALUES (?, ?)",
        [req.body.email, hashedPassword]
      );
      return res.json({
        ok: true,
        isLoggedIn: true,
      });
    } catch (error: any) {
      return res.json({
        ok: false,
        error: error.message,
      });
    }
  } else {
    return res.json({
      ok: false,
      errors,
    });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const errors = [];
  try {
    const [users] = await database.query<RowDataPacket[]>(
      "SELECT * FROM user WHERE email = ?",
      [req.body.email]
    );
    if (users.length < 1) {
      errors.push("E-mail ou mot de passe incorrect");
    }
    const user = users[0];

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
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
    res.status(500).json({ errors });
  }
});

authRouter.post("/logout", async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    expires: new Date(0),
  });
  res.status(200).send("Déconnecté avec succès");
});

export default authRouter;
