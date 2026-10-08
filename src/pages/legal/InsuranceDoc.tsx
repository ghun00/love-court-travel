import { COMPANY, GUARANTEES, type Guarantee } from "../../data/company";
import { Article, Table, Val } from "./parts";

/**
 * 보증보험 가입 안내 — 관광진흥법 제9조 (클투 /legal/travel-plan-insurance, /travel-business-insurance)
 * 기획여행은 영업보증과 별도로 기획여행 보증이 필요 → 두 가지를 나눠 표시
 */
function GuaranteeTable({ g }: { g: Guarantee }) {
  return (
    <>
      <Table
        head={["항목", "내용"]}
        rows={[
          ["보험사(공제기관)", <Val v={g.insurer} label="보험사명" />],
          ["증권번호", <Val v={g.policyNo} label="증권번호" />],
          ["보증금액", <Val v={g.amount} label="보증금액" />],
          ["보험기간", <Val v={g.period} label="보험기간" />],
          ["피보험자", g.insured],
        ]}
      />
      {g.pdf && (
        <>
          <object className="lg-cert" data={g.pdf} type="application/pdf" aria-label="보증보험 증권 사본">
            <p className="lg-note">이 브라우저에서는 증권을 바로 보여줄 수 없어요. 아래 링크로 열어 주세요.</p>
          </object>
          <a className="lg-link lg-cert__link" href={g.pdf} target="_blank" rel="noopener noreferrer">
            증권 사본 보기 (PDF)
          </a>
        </>
      )}
    </>
  );
}

export function InsuranceDoc() {
  return (
    <>
      <p className="lg-lead">
        {COMPANY.name}는 「관광진흥법」 제9조에 따라 여행자의 손해를 보상하기 위한 보증보험에 가입했습니다. 회사의
        고의 또는 과실로 여행자에게 손해가 생기거나 회사가 계약을 이행하지 못하는 경우, 여행자는 피보험자인
        (사)경기도관광협회를 통해 보상을 받을 수 있습니다.
      </p>

      <Article n={1} title="기획여행 보증보험">
        <p>러브코트 트립과 같이 회사가 일정·요금을 미리 정해 모집하는 기획여행에 대한 보증입니다.</p>
        <GuaranteeTable g={GUARANTEES.planned} />
      </Article>

      <Article n={2} title="여행업 영업보증보험">
        <p>여행업 등록에 따라 가입한 영업보증입니다.</p>
        <GuaranteeTable g={GUARANTEES.business} />
      </Article>

      <Article n={3} title="보험금 청구 방법">
        <p>
          보상이 필요하면 먼저 {COMPANY.email} 또는 {COMPANY.phone}로 연락해 주세요. 회사가 연락이 되지 않거나
          손해를 배상하지 않는 경우, 여행계약서와 결제 내역을 갖추어 (사)경기도관광협회에 보상을 청구할 수 있습니다.
        </p>
      </Article>
    </>
  );
}
