'use client'

import { SignUpTypes } from "@/types/SignUpData";
import { error } from "console";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

const SignUp = () => {

  const {
    register,
    handleSubmit,
    reset
  } = useForm<SignUpTypes>();

  const onSubmit: SubmitHandler<SignUpTypes> = async (data) => {
    console.log('onSubmit 내용', data)
    fetch('http://localhost:8000/users/add' , {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: data.userName,
        password: data.password,
        passwordConfirm : data.passwordConfirm,
        name: data.name,
        email: data.email
      }),
      credentials: 'include',
    }).then(res => {
      console.log('res',res)
      console.log(res.json())
    }).catch(error => {
      console.log('error', error)
    })
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-style1">
      <div className="mb10">
        <label className="form-label fw600 dark-color">ID</label>
        <input
          {...register("userName", { required: true })}
          type="text"
          className="form-control"
          placeholder="아이디"
          required
        />
      </div>
      {/* End userName */}

      <div className="mb10">
        <label className="form-label fw600 dark-color">비밀번호</label>
        <input
          {...register("password", { required: true})}
          type="password"
          className="form-control"
          placeholder="비밀번호"
        />
      </div>
      {/* End Password */}

      <div className="mb10">
        <label className="form-label fw600 dark-color">비밀번호 확인</label>
        <input
          {...register("passwordConfirm", {required: true})}
          type="password"
          className="form-control"
          placeholder="비밀번호 확인"
        />
      </div>
      {/* End PassCheck */}

      <div className="mb20">
        <label className="form-label fw600 dark-color">이메일</label>
        <input
          {...register("email", {required: true})}
          type="email"
          className="form-control"
          placeholder="이메일"
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