import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import TeamCard from "../components/TeamCard";
import HomeButton from "../components/HomeButton";
import TimeSummary from "../components/TimeSummary";
import EditDetoxTimesModal from "../components/EditDetoxTimesModal";
import { loadDetoxTimes, saveDetoxTimes } from "../lib/detoxSchedule";
import {
  fromApiTime,
  getDetoxTime,
  updateDetoxTime,
} from "../lib/detoxTimeApi";
import type { TimeValue } from "../components/TimeCard";

const DEFAULT_SLEEP_TIME: TimeValue = { period: "오후", hour: 9, minute: 0 };
const DEFAULT_WAKE_TIME: TimeValue = { period: "오전", hour: 9, minute: 0 };

export default function Home() {
  const [sleepTime, setSleepTime] = useState<TimeValue>(DEFAULT_SLEEP_TIME);
  const [wakeTime, setWakeTime] = useState<TimeValue>(DEFAULT_WAKE_TIME);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let cancelled = false

    getDetoxTime()
      .then((res) => {
        if (cancelled) return;
        setSleepTime(fromApiTime(res.data.startTime));
        setWakeTime(fromApiTime(res.data.endTime));
      })
      .catch(() => {
        // 서버 조회 실패 시 로컬에 저장해둔 값을 대신 사용
        if (cancelled) return;
        const stored = loadDetoxTimes();
        if (stored) {
          setSleepTime(stored.sleepTime);
          setWakeTime(stored.wakeTime);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDone = async () => {
    saveDetoxTimes(sleepTime, wakeTime);
    try {
      await updateDetoxTime(sleepTime, wakeTime);
    } catch {
      // 서버 업데이트 실패해도 로컬엔 반영됐으니 모달은 닫음
    }
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
