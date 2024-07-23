'use client';

import { API } from "@/app/api/common/API";
import { LoginTypes } from "@/types/LoginData";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const SignIn = () => {

  const googleClinetId = process.env.GOOGLE_CLIENT_ID;

  const handleGoogleLogin = () => {
    const googleAuthUrl = `http://localhost:8000/oauth2/authorization/google`;
    window.location.href = googleAuthUrl;
  };

  const {
    register,
    handleSubmit,
    reset
  } = useForm<LoginTypes>();

  const onSubmit: SubmitHandler<LoginTypes> = async (data) => {
    console.log('onSubmit', data)
    fetch('http://localhost:8000/auth/login/local', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      credentials: 'include',
    }).then(res => {
      console.log('res', res)
      console.log(res.json())
    }).catch(error => {
      console.log('error', error)
    })
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-style1">
      <div className="mb25">
        <label className="form-label fw600 dark-color">이메일</label>
        <input
          {...register("email", { required: true })}
          type="text"
          className="form-control"
          placeholder="이메일"
          required
        />
      </div>
      {/* End email */}

      <div className="mb15">
        <label className="form-label fw600 dark-color">비밀번호</label>
        <input
          {...register("password", { required: true })}
          type="text"
          className="form-control"
          placeholder="비밀번호"
          required
        />
      </div>
      {/* End Password */}

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        {/* <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked={true} />
          <span className="checkmark" />
        </label> */}
        <a className="fz14 ff-heading" href="#">
          비밀번호를 잊으셨나요?
        </a>
      </div>
      {/* End  Lost your password? */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          로그인 <i className="fal fa-arrow-right-long" />
        </button>
      </div>
      {/* End submit */}

      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <button onClick={handleGoogleLogin} className="ud-btn btn-white" type="button">
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
      <p className="dark-color text-center mb0 mt10" data-bs-dismiss="modal" >
        계정이 없으신가요?{" "}
        <Link className="dark-color fw600" href="/register">
          계정 생성
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
