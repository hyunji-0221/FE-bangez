interface ApartmentModel {
  id: number;
  icon: string;
  title: string;
  content: string;
  link: string;
}

export const apartmentType: ApartmentModel[] = [
  { id: 1, icon: "flaticon-home", title: "아파트", content: "아파트 매물 확인하기!", link: "/map-v4" },
  { id: 2, icon: "flaticon-corporation", title: "오피스텔", content: "오피스텔 매물 확인하기!", link: "/map-v4" },
  { id: 3, icon: "flaticon-network", title: "방 구해요", content: "바라는 조건의 매물을 구해보세요!", link: "/buy-board" },
  { id: 4, icon: "flaticon-chat", title: "부동산 정보", content: "부동산 주변 시설을 한 눈에!", link: "/statistics-board" },
];