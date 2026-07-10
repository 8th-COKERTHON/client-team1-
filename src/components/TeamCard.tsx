interface Member {
  name: string;
  status: "done" | "progress" | "waiting";
}

interface TeamCardProps {
  members: Member[];
}

export default function TeamCard({ members }: TeamCardProps) {
  const statusStyle = {
    done: {
      border: "border-[#6BD27E]",
      bg: "bg-[#F4FFF7]",
      dot: "bg-[#6BD27E]",
      label: "완료",
      labelColor: "text-[#6BD27E]",
      nameColor: "text-[#494949]",
    },
    progress: {
      border: "border-[#EF5B5B]",
      bg: "bg-[#FFF4F4]",
      dot: "bg-[#EF5B5B]",
      label: "진행중",
      labelColor: "text-[#EF5B5B]",
      nameColor: "text-[#494949]",
    },
    waiting: {
      border: "border-[#E5E5E5]",
      bg: "bg-[#F3F3F3]",
      dot: "bg-[#6D6D6D]",
      label: "대기",
      labelColor: "text-[#C8C8C8]",
      nameColor: "text-[#C8C8C8]",
    },
  };

  return (
    <section className="mt-6 rounded-[28px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <h2 className="text-center font-['Roboto'] text-[17px] font-semibold leading-[135%] text-[#494949]">
        우리 팀 미션 현황
      </h2>

      <div className="mt-6 inline-flex w-full justify-center items-center gap-8">
        {members.map((member, index) => {
          const style = statusStyle[member.status];

          return (
            <div
              key={index}
              className="inline-flex flex-col items-center gap-[6px]"
            >
              {/* 카드 */}
              <div className="relative h-12 w-12">
                <div
                  className={`h-12 w-12 rounded-2xl border ${style.border} ${style.bg}`}
                />

                {/* 이름 */}
                <span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold font-['Pretendard'] ${style.nameColor}`}
                >
                  {member.name}
                </span>

                {/* 상태 점 */}
                <div
                  className={`absolute right-0 bottom-0 h-3 w-3 rounded-md border-2 border-white ${style.dot}`}
                />
              </div>

              {/* 상태 */}
              <span
                className={`text-xs font-bold font-['Pretendard'] ${style.labelColor}`}
              >
                {style.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 고양이 */}

      {/* 진행바 */}
    </section>
  );
}