import { SessionProvider } from "next-auth/react";
import "../styles/globals.css"; // optional if you have global CSS

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
