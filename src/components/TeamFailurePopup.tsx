import Button from './Button'

interface TeamFailurePopupProps {
  failedMemberNames: string[]
  onClose: () => void
}

function TeamFailurePopup({ failedMemberNames, onClose }: TeamFailurePopupProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(31, 31, 31, 0.60)' }}
    >
      <div className="flex w-full max-w-80 flex-col items-center gap-4 rounded-3xl bg-white p-6">
        <h2 className="text-center font-['Pretendard'] text-lg font-bold leading-[135%] text-[#1F1F1F]">
          미션에 실패한 팀원이 있어요
        </h2>

        <p className="text-center font-['Pretendard'] text-sm font-medium leading-[150%] text-[#616161]">
          {failedMemberNames.join(', ')}
        </p>

        <Button active onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  )
}

export default TeamFailurePopup
