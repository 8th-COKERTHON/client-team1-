import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TimeCard, { type TimeValue } from "../components/TimeCard";
import sprout from "../assets/sprout.png";
import { saveDetoxTimes } from "../lib/detoxSchedule";
import { createDetoxTime } from "../lib/detoxTimeApi";

export default function DigitalDetox() {
  const navigate = useNavigate();

  const [sleepTime, setSleepTime] = useState<TimeValue>({
    period: "오후",
    hour: 9,
    minute: 0,
  });

  const [wakeTime, setWakeTime] = useState<TimeValue>({
    period: "오전",
    hour: 9,
    minute: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    if (submitting) return;

    setSubmitting(true);
    setError(null);
    saveDetoxTimes(sleepTime, wakeTime);

    try {
      await createDetoxTime(sleepTime, wakeTime);
      navigate("/home");
    } catch {
      setError("저장에 실패했어요. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-[#F7F8FA] px-6 pt-14 pb-8">

      {/* 로고 */}
      <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#F7FBEF]">
      <img
      src={sprout}
      alt="sprout"
      className="h-[41px] w-[41px]"
      />
      </div>

      {/* 제목 */}
      <h1 className="mt-7 text-center text-[24px] font-bold leading-[135%] text-[#2E2E2E]">
        디지털 디톡스,
        <br />
        언제 시작할까요?
      </h1>

      <p className="mt-4 text-center text-[16px] leading-[170%] text-[#B7B7B7]">
      매일의 오프라인 일정을 설정하고
      <br />
      건강한 디지털 습관을 만들어보세요.
      </p>

      <div className="mt-auto flex flex-col gap-4">
        <TimeCard
          icon="lower"
          label="폰을 내려놓는 시간"
          value={sleepTime}
          onChange={setSleepTime}
        />

        <TimeCard
          icon="raise"
          label="다시 폰을 쓸 수 있는 시간"
          value={wakeTime}
          onChange={setWakeTime}
        />
      </div>

      {error && (
        <p className="mt-4 text-center text-sm text-[#FF4755]">{error}</p>
      )}

      <div className="mt-8.5">
        <Button active={!submitting} onClick={handleStart}>
          {submitting ? "저장 중..." : "디지털 디톡스 시작하기"}
        </Button>
      </div>
    </div>
  );
}
