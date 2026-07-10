import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const TEXT = {
  title: "참여하기",
  label: "참여코드",
  done: "완료",
  invalidCode: "초대 코드를 잘못 입력하였습니다.",
  memberFull: "참여 인원을 초과하였습니다.",
};

type JoinRoomResult = "success" | "invalid" | "full";

async function joinRoomByInviteCode(
  inviteCode: string
): Promise<JoinRoomResult> {
  console.log("join room invite code:", inviteCode);

  // TODO: Replace this stub with the backend room join API.
  return "success";
}

interface JoinRoomProps {
  onBack: () => void;
}

export default function JoinRoom({ onBack }: JoinRoomProps) {
  const [joinCode, setJoinCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isActive = joinCode.trim().length > 0;

  const handleSubmit = async () => {
    const result = await joinRoomByInviteCode(joinCode.trim());

    if (result === "invalid") {
      setErrorMessage(TEXT.invalidCode);
      return;
    }

    if (result === "full") {
      setErrorMessage(TEXT.memberFull);
      return;
    }

    onBack();
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-[#F7F8FA] text-[#494949]">
      <button
        type="button"
        onClick={onBack}
        aria-label="back"
        className="ml-4 mt-[18px] flex h-[38px] w-[38px] items-center justify-center rounded-[14px] text-[#1F1F1F]"
      >
        <ArrowLeft size={20} strokeWidth={2.4} />
      </button>

      <main className="flex flex-1 flex-col px-4 pt-[1px]">
        <h1 className="text-[28px] font-bold leading-[135%] text-[#494949]">
          {TEXT.title}
        </h1>

        <label className="mt-[32px] text-[17px] font-semibold leading-[135%] text-[#494949]">
          {TEXT.label}
        </label>

        <input
          type="text"
          value={joinCode}
          onChange={(event) => {
            setJoinCode(event.target.value);
            setErrorMessage("");
          }}
          className="mt-2 h-11 w-full rounded-xl border-0 bg-[rgba(97,97,97,0.1)] px-5 py-3 font-['Roboto'] text-[13px] font-normal leading-[150%] text-[#1F1F1F] outline-none"
        />
      </main>

      {errorMessage && (
        <div className="mx-6 mb-4 rounded-xl bg-[#494949] px-5 py-3 text-center font-['Pretendard'] text-base font-medium leading-5 text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
          {errorMessage}
        </div>
      )}

      <div className="h-[110px] bg-[#F7F8FA] px-6 pt-[11px]">
        <button
          type="button"
          disabled={!isActive || isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            await handleSubmit();
            setIsSubmitting(false);
          }}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl text-center font-['Roboto'] font-semibold ${
            isActive
              ? "bg-emerald-500 pb-5 pt-4 text-base leading-6 text-white"
              : "bg-[#B7B7B7] pb-[18.5px] pt-[16.5px] text-[17px] leading-[135%] text-[#6E6E6E]"
          }`}
        >
          {TEXT.done}
        </button>
      </div>
    </div>
  );
}