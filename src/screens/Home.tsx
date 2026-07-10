import { useState } from "react";
import TopBar from "../components/TopBar";
import TeamCard from "../components/TeamCard";
import HomeButton from "../components/HomeButton";
import TimeSummary from "../components/TimeSummary";
import EditDetoxTimesModal from "../components/EditDetoxTimesModal";
import { loadDetoxTimes, saveDetoxTimes } from "../lib/detoxSchedule";
import type { TimeValue } from "../components/TimeCard";

const DEFAULT_SLEEP_TIME: TimeValue = { period: "오후", hour: 9, minute: 0 };
const DEFAULT_WAKE_TIME: TimeValue = { period: "오전", hour: 9, minute: 0 };

export default function Home() {
  const stored = loadDetoxTimes();
  const [sleepTime, setSleepTime] = useState(
    stored?.sleepTime ?? DEFAULT_SLEEP_TIME,
  );
  const [wakeTime, setWakeTime] = useState(
    stored?.wakeTime ?? DEFAULT_WAKE_TIME,
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleDone = () => {
    saveDetoxTimes(sleepTime, wakeTime);
    setIsEditing(false);
  };

  return (
    <div className="mx-auto flex min-h-screen w-[393px] flex-col bg-[#F8F8F8]">
      <main className="flex flex-1 flex-col overflow-y-auto px-4">
        <TopBar />

         <TeamCard
          members={[
            { name: "민지", status: "done" as const },
            { name: "수빈", status: "progress" as const },
            { name: "지은", status: "waiting" as const },
            { name: "예린", status: "waiting" as const },
          ]}
        />

        <div className="mb-5.75 mt-auto">
          <TimeSummary
            startTime={sleepTime}
            endTime={wakeTime}
            onClick={() => setIsEditing(true)}
          />
        </div>
      </main>

      <HomeButton />

      {isEditing && (
        <EditDetoxTimesModal
          sleepTime={sleepTime}
          wakeTime={wakeTime}
          onChangeSleepTime={setSleepTime}
          onChangeWakeTime={setWakeTime}
          onClose={handleDone}
        />
      )}
    </div>
  );
}
