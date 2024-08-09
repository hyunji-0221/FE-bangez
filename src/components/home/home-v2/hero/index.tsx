import AdvanceFilterModal from "@/components/common/advance-filter";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <>
      <div className="inner-banner-style2 text-center position-relative">
        {/* <HeroContent /> */}
        <h2 className="hero-title" data-aos="fade-up" data-aos-delay="150">
          원하는 집을 찾아보세요!
        </h2>
        <p className="hero-text fz15" data-aos="fade-up" data-aos-delay="250">
          원하는 조건을 선택하여 집을 찾거나 게시판에서 집을 구해보세요<br />
          집 주변에 있는 편의시설을 확인하고, 집의 위치를 확인해볼 수 있습니다
        </p>
      </div>
      {/* End Hero content */}

      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>
  );
};

export default Hero;
