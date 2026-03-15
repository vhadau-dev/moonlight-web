import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  if (typeof window === "undefined") return null; // Prevent SSR crash

  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (session) {
      axios
        .get(`https://moonlight-api-4s9a.onrender.com/user/${session.user.id}`)
        .then((res) => setUserData(res.data))
        .catch(console.log);
    }
  }, [session]);

  return (
    <div style={{ padding: "50px", fontFamily: "Arial" }}>
      <h1>🌙 Moonlight Dashboard</h1>
      {!session ? (
        <button onClick={() => signIn("discord")}>Login with Discord</button>
      ) : (
        <div>
          <p>Welcome, {session.user.name}</p>
          <p>Balance: {userData?.balance ?? "Loading..."}</p>
          <p>Inventory: {userData?.inventory?.join(", ") ?? "Loading..."}</p>
          <p>Pets: {userData?.pets?.join(", ") ?? "Loading..."}</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      )}
    </div>
  );
}
