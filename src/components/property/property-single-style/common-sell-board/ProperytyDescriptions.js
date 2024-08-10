import React from "react";

const ProperytyDescriptions = () => {
  return (
    <>
      <p className="text mb10">
      해당 아파트는 강남의 중심부에 위치한 고급 아파트로, 
      뛰어난 생활 편의성과 우수한 주거 환경을 자랑합니다. 
      이 아파트는 현대적인 인테리어와 넓고 탁 트인 실내 공간을 제공하며, 
      모든 생활 공간이 세심하게 설계되었습니다.
      </p>
      <div className="agent-single-accordion">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
              style={{}}
            >
              <div className="accordion-body p-0">
                <p className="text">
                이 매물에 관심이 있으신 분은 언제든지 연락 주세요. 
                친절하게 안내해드리겠습니다. 지금 바로 예약하시고, 
                우리 아파트의 고급스러움을 직접 체험해 보세요!
                </p>
              </div>
            </div>
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button p-0 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                더보기
              </button>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProperytyDescriptions;
