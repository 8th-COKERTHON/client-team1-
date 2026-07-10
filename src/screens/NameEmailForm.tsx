import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import sprout from "../assets/sprout.png";

interface Props {
  onNext: () => void;
}

function NameEmailForm({ onNext }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const active = name.trim() !== "" && email.trim() !== "";

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

      {/* 설명 */}
      <p className="mt-4 text-center text-[16px] leading-[170%] text-[#B7B7B7]">
        매일의 오프라인 일정을 설정하고
        <br />
        건강한 디지털 습관을 만들어보세요.
      </p>

      {/* 입력 영역 */}
      <div className="mt-auto flex flex-col gap-6">
        <InputField
          label="이름"
          name="name"
          value={name}
          onChange={setName}
          placeholder="이름을 입력해주세요"
        />

        <InputField
          label="이메일"
          name="email"
          value={email}
          onChange={setEmail}
          placeholder="ex)123456@"
        />

        <Button
          active={active}
          onClick={onNext}
        >
          다음
        </Button>
      </div>

    </div>
  );
}

export default NameEmailForm;