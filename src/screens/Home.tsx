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
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";

const DEFAULT_SLEEP_TIME: TimeValue = {
  period: "\uC624\uD6C4" as TimeValue["period"],
  hour: 9,
  minute: 0,
};

const DEFAULT_WAKE_TIME: TimeValue = {
  period: "\uC624\uC804" as TimeValue["period"],
  hour: 9,
  minute: 0,
};

const members = [
  { name: "\uBBFC\uC9C0", status: "done" as const },
  { name: "\uC218\uBE48", status: "progress" as const },
  { name: "\uC9C0\uC740", status: "waiting" as const },
  { name: "\uC608\uB9B0", status: "waiting" as const },
];

export default function Home() {
  const [sleepTime, setSleepTime] = useState<TimeValue>(DEFAULT_SLEEP_TIME);
  const [wakeTime, setWakeTime] = useState<TimeValue>(DEFAULT_WAKE_TIME);

  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [isRoomMenuOpen, setIsRoomMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let cancelled = false;

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

  if (isCreatingRoom) {
    return <CreateRoom onBack={() => setIsCreatingRoom(false)} />;
  }

  if (isJoiningRoom) {
    return <JoinRoom onBack={() => setIsJoiningRoom(false)} />;
  }

  return (
    <div className="relative mx-auto flex min-h-screen w-[393px] flex-col bg-[#F8F8F8]">
      <main className="flex flex-1 flex-col overflow-y-auto px-4">
        <TopBar onCreateRoom={() => setIsRoomMenuOpen((prev) => !prev)} />

        {isRoomMenuOpen && (
          <div className="absolute right-4 top-[72px] z-20 flex w-[96px] flex-col overflow-hidden rounded-[2px] bg-white shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
            <button
              type="button"
              onClick={() => {
                setIsRoomMenuOpen(false);
                setIsCreatingRoom(true);
              }}
              className="inline-flex w-full items-center justify-start gap-2.5 bg-white px-2 py-2.5 text-left font-['Roboto'] text-xs font-semibold leading-4 text-[#00CF76]"
            >
              {"\uBC29\uB9CC\uB4E4\uAE30"}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRoomMenuOpen(false);
                setIsJoiningRoom(true);
              }}
              className="inline-flex w-full items-center justify-start gap-2.5 bg-white px-2 py-2.5 text-left font-['Roboto'] text-xs font-semibold leading-4 text-[#992B33]"
            >
              {"\uCC38\uC5EC\uD558\uAE30"}
            </button>
          </div>
        )}

        <TeamCard members={members} />

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