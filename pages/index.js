// pages/index.js
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  // Prevent server-side rendering crash
  if (typeof window === "undefined") return null;

  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;

    setLoading(true);
    axios
      .get(`https://moonlight-api-4s9a.onrender.com/user/${session.user.id}`)
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
        } else {
          setUserData({ balance: "N/A", inventory: [], pets: [] });
        }
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setUserData({ balance: "N/A", inventory: [], pets: [] });
      })
      .finally(() => setLoading(false));
  }, [session]);

  return (
    <div style={{ padding: "50px", fontFamily: "Arial" }}>
      <h1>🌙 Moonlight Dashboard</h1>

      {!session ? (
        <button
          onClick={() => signIn("discord")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Login with Discord
        </button>
      ) : (
        <div>
          <p>
            Welcome, <strong>{session.user.name}</strong>
          </p>

          {loading ? (
            <p>Loading your data...</p>
          ) : (
            <>
              <p>Balance: {userData?.balance ?? "N/A"}</p>
              <p>
                Inventory:{" "}
                {userData?.inventory?.length
                  ? userData.inventory.join(", ")
                  : "No items"}
              </p>
              <p>
                Pets:{" "}
                {userData?.pets?.length ? userData.pets.join(", ") : "No pets"}
              </p>
            </>
          )}

          <button
            onClick={() => signOut()}
            style={{
              marginTop: "20px",
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
            }
