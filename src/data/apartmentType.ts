interface ApartmentModel {
  id: number;
  icon: string;
  title: string;
  content: string;
}

export const apartmentType: ApartmentModel[] = [
  { id: 1, icon: "flaticon-home", title: "아파트", content: "서울지역 모든 매물 확인하기!" },
  { id: 2, icon: "flaticon-corporation", title: "오피스텔", content: "22" },
  { id: 3, icon: "flaticon-network", title: "Office", content: "22" },
  // { id: 4, icon: "flaticon-garden", title: "Villa", content: "22" },
  { id: 5, icon: "flaticon-chat", title: "부동산 정보", content: "부동산 동향을 한 눈에!" },
  // { id: 6, icon: "flaticon-window", title: "Bungalow", count: 22 },
  // { id: 7, icon: "flaticon-bird-house", title: "Loft", count: 22 },
];