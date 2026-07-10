import sprout from "../../assets/sprout.png";

export default function OnboardingInfo() {
  return (
    <div className="flex min-h-screen flex-col px-5 pt-12">
      <img
        src={sprout}
        alt="sprout"
        className="mx-auto mb-6 h-14 w-14"
      />

      <h1 className="text-center text-2xl font-bold">
        디지털 디톡스,
        <br />
        언제 시작할까요?
      </h1>

      <p className="mt-3 text-center text-gray-400">
        매일의 오프라인 일정을 설정하고
        <br />
        건강한 디지털 습관을 만들어보세요.
      </p>
    </div>
  );
}