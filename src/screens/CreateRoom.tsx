import { ArrowLeft, Copy, Send } from "lucide-react";
import { useState } from "react";
import { createTeam, updateActiveTeam } from "../lib/teamApi";

const TEXT = {
  title: "방만들기",
  label: "방 이름",
  placeholder: "방 이름을 입력하세요.",
  confirm: "확인",
  done: "완료",
  completeTitle: "방이 만들어졌어요!",
  completeLine1: "같이 디지털 디톡스를",
  completeLine2: "시작할 팀원에게 보내보세요!",
};

interface CreateRoomProps {
  onBack: () => void;
}

export default function CreateRoom({ onBack }: CreateRoomProps) {
  const [roomName, setRoomName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const isActive = roomName.trim().length > 0;

  const handleCreate = async () => {
    try {
      const res = await createTeam(roomName);

      console.log("응답:", res);

      const team = res.data;

      await updateActiveTeam(team.teamId);

      setInviteCode(team.inviteCode);
      setIsComplete(true);
    } catch (err) {
      console.error(err);
      alert("방 생성에 실패했습니다.");
    }
  };

  if (isComplete) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-[#F7F8FA] text-[#252525]">
        <button
          type="button"
          onClick={onBack}
          className="ml-4 mt-[18px] flex h-[38px] w-[38px] items-center justify-center rounded-[14px]"
        >
          <ArrowLeft size={20} />
        </button>

        <main className="flex flex-1 flex-col items-center px-4">
          <div className="mt-[130px] flex flex-col items-center gap-4">
            <Send size={90} className="-rotate-[8deg] text-[#00CF76]" />

            <h1 className="text-center text-[28px] font-bold">
              {TEXT.completeTitle}
            </h1>

            <p className="text-center text-[13px] text-[#494949]">
              {TEXT.completeLine1}
              <br />
              {TEXT.completeLine2}
            </p>
          </div>

          <div className="mt-[66px] flex h-[70px] w-full items-center justify-between rounded-xl bg-[#F9F7E8] p-4">
            <span className="text-[17px] font-medium">
              {inviteCode}
            </span>

            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(inviteCode)}
            >
              <Copy size={20} />
            </button>
          </div>
        </main>

        <div className="px-6 pb-8">
          <button
            onClick={onBack}
            className="w-full rounded-xl bg-[#00CF76] py-4 font-semibold text-white"
          >
            {TEXT.done}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-[#F7F8FA] text-[#494949]">
      <button
        type="button"
        onClick={onBack}
        className="ml-4 mt-[18px] flex h-[38px] w-[38px] items-center justify-center rounded-[14px]"
      >
        <ArrowLeft size={20} />
      </button>

      <main className="flex flex-1 flex-col px-4">
        <h1 className="text-[28px] font-bold">{TEXT.title}</h1>

        <label className="mt-8 text-[17px] font-semibold">
          {TEXT.label}
        </label>

        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder={TEXT.placeholder}
          className="mt-2 h-11 rounded-xl bg-gray-100 px-5 outline-none"
        />
      </main>

      <div className="px-6 pb-8">
        <button
          disabled={!isActive}
          onClick={handleCreate}
          className={`w-full rounded-xl py-4 font-semibold ${
            isActive
              ? "bg-[#00CF76] text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          {TEXT.confirm}
        </button>
      </div>
    </div>
  );
}