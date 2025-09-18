/**
 * Logging Middleware
 * Request logging và monitoring
 */

import { NextRequest, NextResponse } from "next/server";

export interface LogEntry {
  timestamp: Date;
  method: string;
  url: string;
  userAgent?: string;
  ip?: string;
  userId?: string;
  duration?: number;
  status?: number;
}

export class LoggingMiddleware {
  static async handle(request: NextRequest): Promise<NextResponse> {
    const start = Date.now();
    const logEntry: LogEntry = {
      timestamp: new Date(),
      method: request.method,
      url: request.url,
      userAgent: request.headers.get("user-agent") || undefined,
      ip: request.ip || request.headers.get("x-forwarded-for") || undefined,
      userId: request.headers.get("x-user-id") || undefined,
    };

    try {
      const response = NextResponse.next();

      // Calculate duration
      logEntry.duration = Date.now() - start;
      logEntry.status = response.status;

      // Log the request
      this.logRequest(logEntry);

      return response;
    } catch (error) {
      logEntry.duration = Date.now() - start;
      logEntry.status = 500;

      this.logError(logEntry, error);
      throw error;
    }
  }

  private static logRequest(entry: LogEntry): void {
    console.log(
      `[${entry.timestamp.toISOString()}] ${entry.method} ${entry.url} - ${
        entry.status
      } (${entry.duration}ms)`
    );

    // In production, send to logging service
    // await fetch('/api/logs', {
    //   method: 'POST',
    //   body: JSON.stringify(entry)
    // });
  }

  private static logError(entry: LogEntry, error: unknown): void {
    console.error(`[ERROR] ${entry.method} ${entry.url}:`, error);

    // Send error to monitoring service
    // await fetch('/api/errors', {
    //   method: 'POST',
    //   body: JSON.stringify({ ...entry, error })
    // });
  }
}
