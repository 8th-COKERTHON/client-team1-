interface Member {
  name: string
  status: string
}

interface DetoxTeamCardProps {
  members: Member[]
}

function DetoxTeamCard({ members }: DetoxTeamCardProps) {
  return (
    <div
      className="mx-4 flex flex-col items-center justify-center gap-2.5 rounded-[14px] bg-white p-4"
      style={{
        boxShadow:
          '0 16px 4px rgba(0,0,0,0), 0 10px 4px rgba(0,0,0,0.01), 0 6px 3px rgba(0,0,0,0.05), 0 3px 3px rgba(0,0,0,0.09), 0 1px 1px rgba(0,0,0,0.10)',
      }}
    >
      <span className="rounded-xl bg-[#FFDADD] px-13.5 py-1 text-center font-['Pretendard'] text-[11px] font-bold leading-[135%] text-[#FF4755]">
        팀원들과 함께 디톡스 중
      </span>

      <div className="flex items-start gap-9.75">
        {members.map((member) => (
          <div key={member.name} className="flex flex-col items-center gap-1.5">
            <div className="relative flex h-20 w-24 items-center justify-center rounded-2xl border border-[#FFDADD] bg-[#FFF5F5]">
              <span className="font-['Pretendard'] text-[11px] font-bold leading-[135%] text-[#494949]">
                {member.name}
              </span>
              <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-[#FF4755]" />
            </div>
            <span className="font-['Pretendard'] text-[11px] font-bold leading-[135%] text-[#FF4755]">
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetoxTeamCard
