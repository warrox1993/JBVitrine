/**
 * NextAuth API Route Handler (v4)
 * Handles all authentication requests (/api/auth/*)
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
