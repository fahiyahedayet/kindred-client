import { createAuthClient } from "better-auth/react";
import {
  jwtClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000",
  plugins: [
    jwtClient(),
    inferAdditionalFields({
      user: {
        location: {
          type: "string",
        },
        bio: {
          type: "string",
        },
      },
    }),
  ],
  fetchOptions: {
    credentials: "include",
  },
});