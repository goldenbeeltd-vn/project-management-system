/**
 * Analytics Functions
 * Analytics tracking và data analysis
 */

export interface AnalyticsEvent {
  name: string;
  category: string;
  properties?: Record<string, unknown>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

export interface PageView {
  page: string;
  title: string;
  referrer?: string;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

export interface UserProperties {
  userId: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}

class Analytics {
  private isEnabled: boolean = false;
  private sessionId: string = "";
  private userId: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.sessionId = this.generateSessionId();
      this.isEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
    }
  }

  // Initialize analytics
  init(config: { userId?: string; apiKey?: string } = {}): void {
    if (!this.isEnabled) return;

    this.userId = config.userId || null;

    // Initialize analytics service (Google Analytics, Mixpanel, etc.)
    console.log("Analytics initialized:", {
      sessionId: this.sessionId,
      userId: this.userId,
    });
  }

  // Track page views
  trackPageView(
    pageView: Omit<PageView, "timestamp" | "userId" | "sessionId">
  ): void {
    if (!this.isEnabled) return;

    const event: PageView = {
      ...pageView,
      timestamp: new Date(),
      userId: this.userId || undefined,
      sessionId: this.sessionId,
    };

    this.sendEvent("page_view", event);
  }

  // Track custom events
  trackEvent(
    event: Omit<AnalyticsEvent, "timestamp" | "userId" | "sessionId">
  ): void {
    if (!this.isEnabled) return;

    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date(),
      userId: this.userId || undefined,
      sessionId: this.sessionId,
    };

    this.sendEvent("custom_event", fullEvent);
  }

  // Track user actions
  trackUserAction(
    action: string,
    category: string,
    properties?: Record<string, unknown>
  ): void {
    this.trackEvent({
      name: action,
      category,
      properties,
    });
  }

  // Track business events
  trackProjectCreated(projectId: string, projectName: string): void {
    this.trackEvent({
      name: "project_created",
      category: "project",
      properties: {
        project_id: projectId,
        project_name: projectName,
      },
    });
  }

  trackProjectCompleted(projectId: string, duration: number): void {
    this.trackEvent({
      name: "project_completed",
      category: "project",
      properties: {
        project_id: projectId,
        duration_days: duration,
      },
    });
  }

  trackUserLogin(method: string): void {
    this.trackEvent({
      name: "user_login",
      category: "auth",
      properties: {
        method,
      },
    });
  }

  trackUserRegistration(method: string): void {
    this.trackEvent({
      name: "user_registration",
      category: "auth",
      properties: {
        method,
      },
    });
  }

  trackFileUpload(fileType: string, fileSize: number): void {
    this.trackEvent({
      name: "file_upload",
      category: "file",
      properties: {
        file_type: fileType,
        file_size: fileSize,
      },
    });
  }

  trackError(error: Error, context?: Record<string, unknown>): void {
    this.trackEvent({
      name: "error",
      category: "error",
      properties: {
        error_message: error.message,
        error_stack: error.stack,
        ...context,
      },
    });
  }

  // Set user properties
  setUserProperties(properties: UserProperties): void {
    if (!this.isEnabled) return;

    this.userId = properties.userId;
    console.log("User properties set:", properties);

    // Send to analytics service
    this.sendEvent("user_properties", properties);
  }

  // Performance tracking
  trackPageLoadTime(page: string, loadTime: number): void {
    this.trackEvent({
      name: "page_load_time",
      category: "performance",
      properties: {
        page,
        load_time_ms: loadTime,
      },
    });
  }

  trackApiCall(
    endpoint: string,
    method: string,
    duration: number,
    status: number
  ): void {
    this.trackEvent({
      name: "api_call",
      category: "performance",
      properties: {
        endpoint,
        method,
        duration_ms: duration,
        status_code: status,
      },
    });
  }

  // Conversion tracking
  trackConversion(event: string, value?: number): void {
    this.trackEvent({
      name: "conversion",
      category: "conversion",
      properties: {
        conversion_event: event,
        value,
      },
    });
  }

  // A/B Testing
  trackExperiment(experimentName: string, variant: string): void {
    this.trackEvent({
      name: "experiment_view",
      category: "experiment",
      properties: {
        experiment_name: experimentName,
        variant,
      },
    });
  }

  // Utility methods
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private sendEvent(type: string, data: unknown): void {
    // In a real implementation, this would send to your analytics service
    console.log(`Analytics Event [${type}]:`, data);

    // Example: Send to Google Analytics
    // gtag('event', type, data);

    // Example: Send to custom analytics API
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ type, data })
    // });
  }

  // Enable/disable analytics
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  // Get session info
  getSessionInfo(): { sessionId: string; userId: string | null } {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
    };
  }
}

export const analytics = new Analytics();
export default analytics;
