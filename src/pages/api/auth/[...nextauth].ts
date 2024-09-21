import NextAuth, { NextAuthOptions } from "next-auth";
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

interface WorldcoinProfile {
  sub: string;
  "https://id.worldcoin.org/v1": {
    verification_level: string;
  };
}

interface WorldcoinProvider extends OAuthConfig<WorldcoinProfile> {
  id: "worldcoin";
  name: "Worldcoin";
  type: "oauth";
  wellKnown: string;
  checks: Array<"pkce" | "state" | "nonce">; // Updated this line
  authorization: { params: { scope: string } };
  clientId: string;
  clientSecret: string;
  idToken: boolean;
  profile(profile: WorldcoinProfile): {
    id: string;
    name: string;
    verificationLevel: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.NEXT_PUBLIC_APP_ID,
      clientSecret: process.env.NEXT_PUBLIC_WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile: WorldcoinProfile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel:
            profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    } as OAuthConfig<WorldcoinProfile>,
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);