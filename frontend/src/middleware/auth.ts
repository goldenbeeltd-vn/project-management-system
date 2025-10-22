/**
 * Authentication Middleware
 * Kiểm tra authentication và authorization
 */

import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";

export interface AuthMiddlewareOptions {
  requireAuth?: boolean;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  redirectTo?: string;
}

export class AuthMiddleware {
  static async handle(
    request: NextRequest,
    options: AuthMiddlewareOptions = {}
  ): Promise<NextResponse | null> {
    const {
      requireAuth = true,
      requiredRoles = [],
      requiredPermissions = [],
      redirectTo = ROUTES.LOGIN,
    } = options;

    // Get token from header or cookie
    const token = this.getTokenFromRequest(request);

    if (requireAuth && !token) {
      return this.redirectToLogin(request, redirectTo);
    }

    if (token) {
      try {
        const isValid = this.validateToken(token);
        if (!isValid) {
          return this.redirectToLogin(request, redirectTo);
        }

        const payload = this.decodeToken(token);
        if (!payload) {
          return this.redirectToLogin(request, redirectTo);
        }

        // Check role requirements
        if (requiredRoles.length > 0 && !requiredRoles.includes(payload.role)) {
          return NextResponse.redirect(new URL("/unauthorized", request.url));
        }

        // Check permission requirements
        if (requiredPermissions.length > 0) {
          const userPermissions = payload.permissions || [];
          const hasPermission = requiredPermissions.some((permission) =>
            userPermissions.includes(permission)
          );

          if (!hasPermission) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
          }
        }

        // Add user info to request headers for downstream consumption
        const response = NextResponse.next();
        response.headers.set("x-user-id", payload.userId);
        response.headers.set("x-user-role", payload.role);
        return response;
      } catch (error) {
        console.error("Auth middleware error:", error);
        return this.redirectToLogin(request, redirectTo);
      }
    }

    return null; // Continue to next middleware
  }

  private static getTokenFromRequest(request: NextRequest): string | null {
    // Try Authorization header first
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }

    // Try cookie
    const tokenCookie = request.cookies.get("auth_token");
    if (tokenCookie) {
      return tokenCookie.value;
    }

    return null;
  }

  private static validateToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch {
      return false;
    }
  }

  private static decodeToken(token: string): Record<string, unknown> | null {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }

  private static redirectToLogin(
    request: NextRequest,
    redirectTo: string
  ): NextResponse {
    const loginUrl = new URL(redirectTo, request.url);
    loginUrl.searchParams.set("redirect", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Middleware presets for common use cases
export const requireAuth =
  (options?: Omit<AuthMiddlewareOptions, "requireAuth">) =>
  (request: NextRequest) =>
    AuthMiddleware.handle(request, { requireAuth: true, ...options });

export const requireAdmin = (request: NextRequest) =>
  AuthMiddleware.handle(request, {
    requireAuth: true,
    requiredRoles: ["admin"],
  });

export const requireManager = (request: NextRequest) =>
  AuthMiddleware.handle(request, {
    requireAuth: true,
    requiredRoles: ["admin", "manager"],
  });

export const optionalAuth = (request: NextRequest) =>
  AuthMiddleware.handle(request, { requireAuth: false });
