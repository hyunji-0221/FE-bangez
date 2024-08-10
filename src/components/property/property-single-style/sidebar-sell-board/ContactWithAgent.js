import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactWithAgent = () => {
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <Image
            width={90}
            height={90}
            className="w90"
            src="/images/defaultUserImage.png"
            alt="avatar"
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">정우석</h6>
          <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-call pe-1" />
              010-2105-7671
            </a>
          </div>
          <Link
            href="/agent-single/3"
            className="text-decoration-underline fw600"
          >
            판매자 정보 더보기
          </Link>
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid">
        <Link href="/agent-single/3" className="ud-btn btn-white2">
          채팅하기
          <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    </>
  );
};

export default ContactWithAgent;
