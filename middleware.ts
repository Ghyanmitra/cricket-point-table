import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.startsWith("/manage")) {
        return token?.role === "admin";
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/manage/:path*"],
};