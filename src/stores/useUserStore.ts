// stores/useUserStore.ts
import { create } from 'zustand';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from '@/module/login/Login';
import { API } from '@/app/api/common/API';
import { CustomJwtPayload } from '@/types/ChatData';

interface UserStore {
  user: UserInterface | null;
  fetchUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  fetchUser: async () => {
    if (Cookies.get("accessToken")) {
      const accessToken = Cookies.get("accessToken"); // 액세스 토큰을 가져오는 함수
      const decodedToken: CustomJwtPayload = jwtDecode(accessToken as string); // 토큰 디코딩 함수
      const userId = decodedToken.id;

      const response = await fetch(`${API.USERSERVER}/detail/${userId}`);
      const data = await response.json();

      set({
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          phone: data.phone,
          profile: data.profile,
        }
      });
    }
  },
}));
