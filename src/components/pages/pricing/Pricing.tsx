"use client";
import { API } from "@/app/api/common/API";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from "@/types/ChatData";
import { useUserStore } from "@/stores/useUserStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { PointData } from "@/types/PointData";
import { Link } from "@mui/material";

declare global {
  interface Window {
    IMP: any;
  }
}

const Pricing = ({ filterFunctions }: any) => {
  const pricingPackages = [
    {
      price: "충전하기",
      // priceIcon: "images/icon/payment_icon.svg",
      features: [
        "1000원 10포인트",
      ],
    },
  ];

  const loadScript = (src: any) => {
    return new Promise((resolve: any, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset
  } = useForm<PointData>();

  const [point, setPoint] = useState(0)
  const user = useUserStore((state) => state.user);
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setAccessToken(token);
      console.log("포인트 페이지 token", token);
      const decodedToken:CustomJwtPayload = jwtDecode(token as string);
      console.log("포인트 페이지 decodedToken", decodedToken);

      fetch(`${API.TXSERVER}/point/detail/${decodedToken.id}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('포인트 조회 결과', data);
          if (typeof data === 'number') {
            setPoint(data);
          } else {
            console.error('포인트 데이터가 올바르지 않습니다:', data);
          }
        })
        .catch((error) => {
          console.error('포인트 조회 실패:', error);
        });
    }
  }, [accessToken]);

  const handlePayment: SubmitHandler<PointData> = async (data) => {
    console.log('handel submit function 내부', data.amount);
    await loadScript('https://code.jquery.com/jquery-1.12.4.min.js');
    await loadScript('https://cdn.iamport.kr/js/iamport.payment-1.1.7.js');
    const { IMP } = window;
    IMP.init('imp05080136');
    const merchant_uid = new Date().getTime();

    const decodedToken: CustomJwtPayload = jwtDecode(accessToken as string);

    IMP.request_pay(
      {
        pg: 'kakaopay',
        merchant_uid: `mid-${merchant_uid}`,
        name: `BangEZ 포인트 충전`,
        amount: `${data.amount}`,
        customer_uid: `cuid-${merchant_uid}`,
        buyer_email: user?.email,
        buyer_name: user?.name,
        buyer_tel: user?.phone,
      },
      async (rsp: any) => {
        console.log('결제 후 rsp', rsp);
        if (rsp.success) {
          alert('결제 성공');
          await fetch(`${API.TXSERVER}/add/${rsp.imp_uid}/${decodedToken.id}`, {
            method: "POST",
          }).then(res => res.json())
            .then(res => {
              console.log(res.response.amount);
              if (rsp.paid_amount === res.response.amount) {
                alert('결제 성공');
                setPoint(prev => prev + (res.response.amount / 1000) * 10); // 포인트 업데이트
              } else {
                alert('결제 실패: 금액 불일치');
              }
            }).catch(error => {
              console.error("결제 검증 실패 : ", error);
            });
        } else {
          alert(`결제 실패: ${rsp.error_msg}`);
        }
      });
    reset({
      amount: 0
    });
  };

  const validateAmount = (value: number) => {
    if (value < 1000) {
      alert('1000원 이상의 금액을 입력해주세요.');
      return false;
    } else if (value % 1000 !== 0) {
      alert('1000원 단위로 입력해주세요.');
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="row" data-aos="fade-up" data-aos-delay="300">
        {pricingPackages.map((item, index) => (
          <div className="" key={index}>
            {accessToken ?
              <div className="pricing_packages">
                <div className="heading mb60">
                  <h1 className="text2">
                    잔액 : {point} 포인트 
                  </h1>
                  <Image
                    width={70}
                    height={70}
                    className="price-icon"
                    src="/images/icon/payment_icon.svg"
                    alt="icon"
                  />
                </div>
                <div className="details">
                  <p className="text mb35">
                    {item.features[0]}
                  </p>

                  <form onSubmit={handleSubmit(handlePayment)}>
                    <div className="position-relative mb20">
                      <input
                        {...register("amount", { required: true, validate: validateAmount })}
                        type="number"
                        className="my-form-control my-pay_btn"
                        placeholder="금액 입력"
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value % 1000 === 0) {
                            clearErrors('amount');
                          } else {
                            setError('amount', {
                              type: 'manual',
                              message: '1000원 단위로 입력해야 합니다.',
                            });
                          }
                        }}
                      /> 원
                      {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="ud-btn btn-thm-border text-thm">
                        충전하기
                        <i className="fal fa-arrow-right-long" />
                      </button>
                    </div>
                  </form>

                </div>
              </div>
              :
              <div>
                <h4>로그인이 필요한 서비스입니다.</h4>
                <Link href="/login">
                  로그인하기
                </Link>
              </div>
            }

          </div>
        ))}
      </div>
    </>
  );
};

export default Pricing;

