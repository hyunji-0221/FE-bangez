export interface Property {
  id: string;
  atclNo: number; //네이버 번호(사용x)
  atclNm: string; //아파트/상가 명
  rletTpNm: string; //상가 구분
  tradTpNm: string; //매매/전세/월세 구분
  flrInfo: string; //층수(물건층/전체층)
  prc: number; //가격
  rentPrc: number; //월세
  hanPrc: string; //보증금
  spc1: number; //계약면적(m2)
  spc2: number; //전용면적(m2)
  direction: string; //집 방향
  atclCfmYmd: string; //등록 날짜
  lat: string; //위도
  lng: string; //경도
  atclFetrDesc: string; //설명
  tagList: string[]; //[기타 정보]
  bildNm: string; //동수 ex) 101동
  town: string; //동 이름
  roadAddress: string | null; //도로명 주소
  address: string | null; //지번 주소
  forRent: boolean; //삭제예정
  image? : string;
  imageUrl:string;
  imageTwoUrl:string;
  imageTwo?:string;
}


