import PixelCastle from "./PixelCastle";
import TeamProgressBar from "./TeamProgressBar";
import defaultAvatar from "../assets/image.jpg";

interface Member {
  name: string;
  status: "done" | "progress" | "waiting";
  imageUrl?: string | null;
}

interface TeamCardProps {
  members: Member[];
  current?: number;
  total?: number;
}

export default function TeamCard({
  members,
  current = 124,
  total = 150,
}: TeamCardProps) {
  const statusStyle = {
    done: {
      border: "border-[#6BD27E]",
      bg: "bg-[#F4FFF7]",
      dot: "bg-[#6BD27E]",
      label: "\uC644\uB8CC",
      labelColor: "text-[#6BD27E]",
      nameColor: "text-[#494949]",
    },
    progress: {
      border: "border-[#EF5B5B]",
      bg: "bg-[#FFF4F4]",
      dot: "bg-[#EF5B5B]",
      label: "\uC9C4\uD589\uC911",
      labelColor: "text-[#EF5B5B]",
      nameColor: "text-[#494949]",
    },
    waiting: {
      border: "border-[#E5E5E5]",
      bg: "bg-[#F3F3F3]",
      dot: "bg-[#6D6D6D]",
      label: "\uB300\uAE30",
      labelColor: "text-[#C8C8C8]",
      nameColor: "text-[#C8C8C8]",
    },
  };

  return (
    <section className="mt-6 rounded-[28px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <h2 className="text-center font-['Roboto'] text-[17px] font-semibold leading-[135%] text-[#494949]">
        {"\uC6B0\uB9AC \uD300 \uBBF8\uC158 \uD604\uD669"}
      </h2>

      <div className="mt-6 inline-flex w-full items-center justify-center gap-8">
        {members.map((member, index) => {
          const style = statusStyle[member.status];

          return (
            <div
              key={`${member.name}-${index}`}
              className="inline-flex flex-col items-center gap-[6px]"
            >
              <div className="relative h-12 w-12">
                <div
                  className={`h-12 w-12 overflow-hidden rounded-2xl border ${style.border} ${style.bg}`}
                >
                  <img
                    src={member.imageUrl || defaultAvatar}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-md border-2 border-white ${style.dot}`}
                />
              </div>

              <span
                className={`font-['Pretendard'] text-xs font-bold ${style.nameColor}`}
              >
                {member.name}
              </span>

              <span
                className={`font-['Pretendard'] text-xs font-bold ${style.labelColor}`}
              >
                {style.label}
              </span>
            </div>
          );
        })}
      </div>


      <div className="mt-6 flex justify-center">
        <PixelCastle current={current} total={total} />
      </div>

      <div className="mt-2">
        <TeamProgressBar current={current} total={total} />
      </div>
    </section>
  );
}
