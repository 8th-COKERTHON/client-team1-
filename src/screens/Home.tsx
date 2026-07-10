
import TopBar from "../components/TopBar";
import TeamCard from "../components/TeamCard";
import HomeButton from "../components/HomeButton";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-[393px] flex-col bg-[#F8F8F8]">
      <main className="flex-1 overflow-y-auto px-4">
        <TopBar />

        <TeamCard
          members={[
            { name: "민지", status: "done" as const },
            { name: "수빈", status: "progress" as const },
            { name: "지은", status: "waiting" as const },
            { name: "예린", status: "waiting" as const },
          ]}
        />
      </main>

      <HomeButton />
    </div>
  );
}
