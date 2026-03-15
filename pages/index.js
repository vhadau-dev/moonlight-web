import dynamic from "next/dynamic";

// Load Homepage component only on client side to avoid SSR issues
const Homepage = dynamic(() => import("../components/Homepage"), { ssr: false });

export default function Home() {
  return <Homepage />;
    }
