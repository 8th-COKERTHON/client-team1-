import { useState } from "react";
import sprout from "../../assets/sprout.png";

function TimeCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 px-4 py-4">
      <div className="text-sm text-gray-500">{label}</div>

      <input
        type="time"
        value={value}
        className="mt-2 w-full text-center text-2xl font-semibold outline-none"
        readOnly
      />
    </div>
  );
}

export default function OnboardingTime() {
  const [sleepTime] = useState("09:00");
  const [wakeTime] = useState("09:00");

  return (
    <div className="flex min-h-screen flex-col px-5 pt-12 pb-8">
      <img
        src={sprout}
        alt="sprout"
        className="mx-auto mb-6 h-14 w-14"
      />

      <h1 className="text-center text-2xl font-bold">
        디지털 디톡스,
        <br />
        언제 시작할까요?
      </h1>

      <p className="mt-3 text-center text-gray-400">
        매일의 오프라인 일정을 설정하고
        <br />
        건강한 디지털 습관을 만들어보세요.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <TimeCard
          label="폰을 내려놓는 시간"
          value={sleepTime}
        />

        <TimeCard
          label="다시 폰을 쓸 수 있는 시간"
          value={wakeTime}
        />
      </div>

      <button className="mt-auto rounded-full bg-emerald-500 py-4 text-white">
        디지털 디톡스 시작하기
      </button>
    </div>
  );
}