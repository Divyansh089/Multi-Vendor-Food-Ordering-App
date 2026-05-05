import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";

/**
 * Use inside a route's `beforeLoad`:
 *   beforeLoad: () => requireAuth(["CUSTOMER"])
 */
export function requireAuth(roles) {
  const { user } = useAuthStore.getState();
  if (!user) throw redirect({ to: "/login" });
  if (roles && roles.length && !roles.includes(user.role)) {
    const fallback =
      user.role === "VENDOR"
        ? "/vendor/dashboard"
        : user.role === "DELIVERY"
        ? "/delivery/dashboard"
        : user.role === "ADMIN"
        ? "/admin/dashboard"
        : "/home";
    throw redirect({ to: fallback });
  }
}
