import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTrip } from "../data/trips";
import { WfNote } from "../components/wf/Wf";

type Step = 1 | 2 | 3;

export function BookingPage() {
  const { id } = useParams();
  const trip = id ? getTrip(id) : undefined;
  const [step, setStep] = useState<Step>(1);
  const [agreed, setAgreed] = useState(false);

  if (!trip || trip.status !== "open") {
    return (
      <div className="p-8 text-center">
        <p>예약 가능한 트립이 아닙니다.</p>
        <Link to="/test" className="underline">홈으로 →</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-6">
      {/* 스텝 인디케이터 */}
      <ol className="mb-6 flex gap-2 text-xs">
        {(["신청 정보", "결제", "완료"] as const).map((label, i) => (
          <li
            key={label}
            className={`flex-1 border-b-4 pb-1 text-center ${
              step >= i + 1 ? "border-neutral-800 font-bold" : "border-neutral-200 text-neutral-400"
            }`}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          className="space-y-4"
        >
          <h1 className="text-xl font-bold">{trip.name} 신청</h1>
          {[
            ["이름", "text", true],
            ["연락처 (카카오톡 ID 또는 전화번호)", "text", true],
            ["인스타그램 핸들 (선택)", "text", false],
          ].map(([label, type, required]) => (
            <label key={label as string} className="block text-sm">
              <span className="font-bold">{label as string}</span>
              <input
                type={type as string}
                required={required as boolean}
                className="mt-1 w-full border border-neutral-300 p-2"
              />
            </label>
          ))}
          <fieldset className="text-sm">
            <legend className="font-bold">테니스는 어느 정도 치세요?</legend>
            {["이제 시작 (6개월 미만)", "랠리는 주고받아요", "게임이 가능해요"].map((o) => (
              <label key={o} className="mt-1 block">
                <input type="radio" name="level" required className="mr-2" />
                {o}
              </label>
            ))}
          </fieldset>
          <fieldset className="text-sm">
            <legend className="font-bold">누구와 함께 오시나요?</legend>
            {["혼자요", "친구랑 둘이서"].map((o) => (
              <label key={o} className="mt-1 block">
                <input type="radio" name="party" required className="mr-2" />
                {o}
              </label>
            ))}
          </fieldset>
          <WfNote>Phase 2에서 이 폼 제출을 Tally로 수집 연결</WfNote>
          <button type="submit" className="w-full border border-neutral-800 bg-neutral-100 py-3 font-bold">
            다음 — 결제로 →
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold">계약금 결제</h1>
          <div className="border border-neutral-300 p-4 text-sm">
            <p className="font-bold">{trip.name}</p>
            <p className="text-neutral-600">
              {trip.destination} · {trip.duration} · {trip.dates}
            </p>
            <hr className="my-2 border-neutral-200" />
            <p className="flex justify-between">
              <span>계약금</span>
              <span className="font-bold">{trip.deposit}</span>
            </p>
            <p className="flex justify-between text-neutral-500">
              <span>총액 (잔금은 일정 확정 후)</span>
              <span>{trip.totalPrice}</span>
            </p>
          </div>
          <label className="block text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mr-2"
            />
            환불 규정 및 이용 약관에 동의합니다
          </label>
          <button
            disabled
            className="w-full cursor-not-allowed border border-neutral-300 py-3 text-neutral-400"
          >
            카드로 결제하기 (PG 연동 예정)
          </button>
          <button
            disabled={!agreed}
            onClick={() => setStep(3)}
            className="w-full border border-neutral-800 bg-neutral-100 py-3 font-bold disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400"
          >
            카카오톡으로 결제 안내 받기 →
          </button>
          <WfNote>PG 연동 시 "카드로 결제하기" 활성화, 카카오 버튼은 백업으로 유지 여부 결정</WfNote>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 py-8 text-center">
          <h1 className="text-xl font-bold">신청 완료!</h1>
          <p className="text-sm text-neutral-600">
            계약금 결제 안내를 카카오톡으로 보내드릴게요.
            <br />
            자리는 결제 순으로 확정됩니다.
          </p>
          <p className="text-sm">
            [인스타그램 팔로우 유도 — @love_court.kr]
          </p>
          <Link to="/test" className="inline-block border border-neutral-400 px-6 py-2 text-sm">
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
