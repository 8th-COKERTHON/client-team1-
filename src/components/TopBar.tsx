import { Plus } from "lucide-react";
import sprout from "../assets/sprout.png";

interface TopBarProps {
  onCreateRoom?: () => void;
  teamName?: string;
  memberCount?: number;
}

export default function TopBar({
  onCreateRoom,
  teamName = "팀1",
  memberCount = 4,
}: TopBarProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-[#EAF8E8] px-3 py-1.5">
          <span className="text-sm font-semibold text-[#62C46A]">
            {teamName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full bg-[#F3F3F3] px-3 py-1.5 text-sm font-medium">
            {memberCount}명
          </button>

          <button
            type="button"
            onClick={onCreateRoom}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#494949]"
          >
            <Plus size={20} color="white" />
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <img src={sprout} alt="sprout" className="h-7 w-7" />

          <h1 className="text-[28px] font-bold leading-[135%] text-[#494949]">
            디적
          </h1>
        </div>

        <p className="ml-9 mt-1 text-[13px] font-medium text-[#8A8A8A]">
          디지털 디톡스 챌린지
        </p>
      </div>
    </div>
  );
}