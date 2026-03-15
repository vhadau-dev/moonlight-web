import dynamic from "next/dynamic";

// Disable SSR for homepage
const Homepage = dynamic(() => import("../components/Homepage"), { ssr: false });

export default function Home() {
  return <Homepage />;
    }
