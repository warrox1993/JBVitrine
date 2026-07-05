import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

/**
 * Garde d'authz réutilisable pour les route handlers.
 * Retourne une réponse d'erreur à renvoyer, ou null si l'accès est autorisé.
 */
export async function guardRoute(
  role: string = "viewer",
): Promise<NextResponse | null> {
  try {
    await requireAuth(role);
    return null;
  } catch (error) {
    const message = (error as Error).message || "Unauthorized";
    const status = message.startsWith("Forbidden") ? 403 : 401;
    return NextResponse.json({ error: message }, { status });
  }
}
