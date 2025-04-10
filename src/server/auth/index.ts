import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";
import { db } from "../db";
import { PrismaAdapter } from "@auth/prisma-adapter";

const {
  auth: uncachedAuth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  theme: {
    colorScheme: "dark",
  },
});

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
