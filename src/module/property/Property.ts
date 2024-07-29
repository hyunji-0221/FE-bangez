// export interface Property {
//     id: string;
//     atclNo: number; //네이버 번호(사용x)
//     atclNm: string; //아파트/상가 명
//     rletTpNm: string; //상가 구분
//     tradTpNm: string; //매매/전세/월세 구분
//     flrInfo: string; //층수(물건층/전체층)
//     prc: number; //가격
//     rentPrc: number; //월세
//     hanPrc: string; //보증금
//     spc1: number; //계약면적(m2)
//     spc2: number; //전용면적(m2)
//     direction: string; //집 방향
//     atclCfmYmd: string; //등록 날짜
//     lat: string; //위도
//     lng: string; //경도
//     atclFetrDesc: string; //설명
//     tagList: string[]; //[기타 정보]
//     bildNm: string; //동수 ex) 101동
//     town: string; //동 이름
//     roadAddress: string; //도로명 주소
//     address: string; //지번 주소
//     forRent: boolean;
//     img : string;
//   }

export interface Property {
    id: string;
    atclNo: number;
    atclNm: string;
    rletTpNm: string;
    tradTpNm: string;
    flrInfo: string;
    prc: number;
    rentPrc: number;
    hanPrc: string;
    spc1: number;
    spc2: number;
    direction: string;
    atclCfmYmd: string;
    lat: string;
    lng: string;
    atclFetrDesc: string;
    tagList: string[];
    bildNm: string;
    town: string;
    roadAddress: string | null;
    address: string;
    forRent: boolean;
    image?: string;
  }
export interface exampleProperty {
    id: '1',
    atclNo: 123456,
    atclNm: 'Beautiful Apartment',
    rletTpNm: 'Apartment',
    tradTpNm: 'Sale',
    flrInfo: '5th Floor',
    prc: 500000,
    rentPrc: 2000,
    hanPrc: '5000',
    spc1: 85,
    spc2: 90,
    direction: 'South',
    atclCfmYmd: '2023-07-01',
    lat: '40.712776',
    lng: '-74.005974',
    atclFetrDesc: 'Spacious, modern, and in a great location',
    tagList: ['Modern', 'Spacious', 'Convenient'],
    bildNm: 'Skyline Apartments',
    town: 'Downtown',
    roadAddress: '123 Main St',
    address: '123 Main St, New York, NY 10001',
    forRent: false,
    image: 'https://example.com/image.jpg',
  };
  