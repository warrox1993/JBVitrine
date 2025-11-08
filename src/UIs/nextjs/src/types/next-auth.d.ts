/**
 * NextAuth Type Declarations
 * Extends the default NextAuth types with custom fields
 */

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: "admin" | "sales" | "viewer";
      isActive: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
    role: "admin" | "sales" | "viewer";
    isActive: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    isActive: boolean;
  }
}
