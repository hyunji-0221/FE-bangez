import Link from "next/link";

const SignUp = () => {
  return (
    <form className="form-style1">
      <div className="mb25">
        <label className="form-label fw600 dark-color">이메일</label>
        <input
          type="email"
          className="form-control"
          placeholder="이메일"
          required
        />
      </div>
      {/* End Email */}

      <div className="mb20">
        <label className="form-label fw600 dark-color">비밀번호</label>
        <input
          type="text"
          className="form-control"
          placeholder="비밀번호"
          required
        />
      </div>
      {/* End Password */}

      <div className="mb25">
        <label className="form-label fw600 dark-color">비밀번호 확인</label>
        <input
          type="email"
          className="form-control"
          placeholder="비밀번호 확인"
          required
        />
      </div>
      {/* End PassCheck */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          계정 생성하기 <i className="fal fa-arrow-right-long" />
        </button>
      </div>
      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> 구글계정으로 로그인하기
        </button>
      </div>
      {/* <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div> */}
      <p className="dark-color text-center mb0 mt10" data-bs-dismiss="modal">
        이미 계정이 있으신가요?{" "}
        <Link className="dark-color fw600" href="/login">
          로그인
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
