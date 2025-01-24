import { googleOAuthClient } from "@/lib/googleOauth";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    // Retrieve state and codeVerifier from cookies
    const cookieStore = await cookies();
    const storedState = cookieStore.get("state")?.value;
    const codeVerifier = cookieStore.get("codeVerifier")?.value;

    if (state !== storedState || !codeVerifier) {
      return new Response("Invalid or expired state/code verifier", { status: 400 });
    }

    // Validate authorization code with the codeVerifier
    const token = await googleOAuthClient.validateAuthorizationCode(code, codeVerifier);
    console.log("Access Token:", token.accessToken());

    // Fetch user info from Google UserInfo API
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${token.accessToken()}`, // Ensure you call the method to get the token string
        },
      }
    );
    if (!userInfoResponse.ok) {
      throw new Error("Failed to fetch user info");
    }
    // const userInfo = await userInfoResponse.json();
    const userInfo = (await userInfoResponse.json()) as {
      id: string;
      email: string;
      name: string;
      picture: string;
    };

    let userId: string = "";
  // if the email exists in our record, we can create a cookie for them and sign them in
  // if the email doesn't exist, we create a new user, then craete cookie to sign them in

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userInfo.email,
    },
  });
  if (existingUser) {
    userId = existingUser.id;
  } else {
    const user = await prisma.user.create({
      data: {
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      },
    });
    userId = user.id;
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return new Response(null, {
    status: 307,
    headers: {
      Location: "/newUser",
    },
  });
  } catch (error) {
    console.error("OAuth error:", error);
    return new Response("OAuth error", { status: 500 });
  }
}
