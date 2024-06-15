import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const bcrypt = require("bcrypt");

let accessToken;
const generateRandomPassword = () => {
  const randomBytes = crypto.randomBytes(5);
  return parseInt(randomBytes.toString("hex"), 16).toString().padStart(10, "0");
};
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
      profile(profile) {
        console.log("Apple OAuth Profile:", profile);
        const email = profile?.email || "";
        const name = profile?.name || "";
        const image = profile?.picture || "";
        console.log("Email:", email);
        console.log("Name:", name);
        console.log("Image URL:", image);
        return {
          id: profile?.sub || "",
          email,
          name,
          image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email, name, image } = user;
      const [firstName, ...lastNameParts] = name.split(" ");
      const lastName = lastNameParts.join(" ");
      const today = new Date();
      const password = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        await connectMongoDB();
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
          const newUser = new User({
            email,
            firstName,
            password: hashedPassword,
            lastName,
            image,
            dob: today,
            oncologistsHospital: "Mercurial-AI",
            joyrideCompleted: false,
          });
          newUser.entries = [];
          existingUser = await newUser.save();
        } else {
          await User.updateOne({ email }, { $set: { image, firstName } });
        }
        accessToken = jwt.sign(
          { sub: existingUser._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "48hr",
          }
        );
        return user;
      } catch (error) {
        console.error("Error during sign in: ", error);
        throw error;
      }
    },
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id;
        token.image = profile.avatar_url || profile.picture;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session?.user && accessToken) {
        session.user.customToken = String(accessToken);
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
