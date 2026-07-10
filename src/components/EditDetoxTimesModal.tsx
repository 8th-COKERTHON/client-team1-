import Button from "./Button";
import TimeCard, { type TimeValue } from "./TimeCard";

interface EditDetoxTimesModalProps {
  sleepTime: TimeValue;
  wakeTime: TimeValue;
  onChangeSleepTime: (value: TimeValue) => void;
  onChangeWakeTime: (value: TimeValue) => void;
  onClose: () => void;
}

function EditDetoxTimesModal({
  sleepTime,
  wakeTime,
  onChangeSleepTime,
  onChangeWakeTime,
  onClose,
}: EditDetoxTimesModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(31, 31, 31, 0.60)" }}
    >
      <div className="w-full max-w-[390px] rounded-t-3xl bg-white px-4 pb-8 pt-3">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E5E5E5]" />

        <div className="flex flex-col gap-4">
          <TimeCard
            icon="lower"
            label="디톡스 시작 시간"
            value={sleepTime}
            onChange={onChangeSleepTime}
          />

          <TimeCard
            icon="raise"
            label="디톡스 종료 시간"
            value={wakeTime}
            onChange={onChangeWakeTime}
          />
        </div>

        <div className="mt-5">
          <Button active onClick={onClose}>
            수정 완료
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditDetoxTimesModal;