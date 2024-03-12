"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useState } from "react";

export default function UserInfo() {
  const session = useSession();

  return (
    <SessionProvider >
    <div className="mb-8">
      <h2 className="text-xl font-bold">Server Side Session</h2>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
      <a href="/api/auth/signout">SignOut</a> |{" "}
      <a href="/api/auth/signin">SignIn</a>
    </div>
    </SessionProvider>
  );
}
