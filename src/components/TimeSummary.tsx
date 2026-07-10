import type { TimeValue } from "./TimeCard";

interface TimeSummaryProps {
  startTime: TimeValue;
  endTime: TimeValue;
  onClick?: () => void;
}

function TimeSummary({ startTime, endTime, onClick }: TimeSummaryProps) {
  const startLabel = `${startTime.period} ${startTime.hour}:${String(
    startTime.minute,
  ).padStart(2, "0")}`;

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col rounded-[14px] bg-white p-4"
      style={{
        boxShadow:
          "0 3px 1px rgba(0,0,0,0.01), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F9F0]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#00CF76">
            <path d="M0 0 L10 5 L0 10 Z" />
          </svg>
        </span>

        <span className="font-['Pretendard'] text-[11px] font-bold leading-[135%] text-[#9B9B9B]">
          디톡스 시작 시간
        </span>

        <span className="font-['Pretendard'] text-[11px] font-bold leading-[135%] text-[#00CF76]">
          {startLabel}
        </span>

        <button
          type="button"
          onClick={onClick}
          className="ml-auto rounded-full bg-[#F5E9C9] px-2.5 py-1 font-['Pretendard'] text-[11px] font-bold leading-[135%] text-[#8A7431]"
        >
          수정
        </button>
      </div>

      <div className="my-3 h-px bg-[#F0F0F0]" />

      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0EAC5]">
          <span className="block h-2.5 w-2.5 rounded-[1px] bg-[#9B7A1A]" />
        </span>

        <span className="font-['Roboto'] text-[17px] font-semibold leading-[135%] text-[#929292]">
          디톡스 종료 시간
        </span>

        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-xl bg-[#F5F5F5] px-3 py-2 font-['Roboto'] text-[17px] font-semibold leading-[135%] text-[#494949]">
            {endTime.period} {String(endTime.hour).padStart(2, "0")}
          </span>

          <span className="font-['Roboto'] text-[17px] font-semibold text-[#9B9B9B]">
            :
          </span>

          <span className="rounded-xl bg-[#F5F5F5] px-3 py-2 font-['Roboto'] text-[17px] font-semibold leading-[135%] text-[#494949]">
            {String(endTime.minute).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TimeSummary;