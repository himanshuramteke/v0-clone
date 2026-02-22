import Navbar from "@/modules/home/components/navbar";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <UserButton />
      <Navbar />
    </div>
  );
}
