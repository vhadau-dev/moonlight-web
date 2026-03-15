import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  // Prevent SSR crash
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
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("https://files.catbox.moe/4r5y6w.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "20px", textShadow: "2px 2px 10px #000" }}>
        🌙 Moonlight Haven
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px", textShadow: "1px 1px 5px #000" }}>
        Welcome to your dashboard! Manage your balance, inventory, and pets here.
      </p>

      {!session ? (
        <button
          onClick={() => signIn("discord")}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            cursor: "pointer",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
          }}
        >
          Login with Discord
        </button>
      ) : (
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
            Welcome, {session.user.name}!
          </h2>

          {loading ? (
            <p>Loading your data...</p>
          ) : (
            <>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                💰 Balance: {userData?.balance ?? "N/A"}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                🎒 Inventory:{" "}
                {userData?.inventory?.length
                  ? userData.inventory.join(", ")
                  : "No items"}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                🐾 Pets:{" "}
                {userData?.pets?.length ? userData.pets.join(", ") : "No pets"}
              </p>
            </>
          )}

          <button
            onClick={() => signOut()}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              cursor: "pointer",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg, #fc5c7d 0%, #6a82fb 100%)",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.4)",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
              }
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
