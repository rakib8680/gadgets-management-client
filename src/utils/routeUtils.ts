/**
 * Determines the appropriate dashboard path based on the user's role.
 * @param role - The role of the user (e.g., 'admin', 'seller').
 * @returns The dashboard path string.
 */
export const getDashboardPath = (role: string | undefined): string => {
  if (role === "admin") {
    return "/dashboard/analytics";
  }
  if (role === "seller") {
    return "/dashboard/my-gadgets";
  }
  return "/dashboard"; // Default for other users or if role is undefined
};
