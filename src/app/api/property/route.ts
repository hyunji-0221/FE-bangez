import axios from 'axios';
import { Property } from '@/module/property/Property';
import { API } from '@/app/api/common/API';

const fetchPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const apartmentResponse = await axios.get(`${API.LANDSERVER}/apartments/${id}`);
    if (apartmentResponse.data) {
      return { ...apartmentResponse.data, rletTpNm: '아파트' };
    }
  } catch (error) {
    console.error('Failed to fetch apartment data', error);
  }

  try {
    const officetelResponse = await axios.get(`${API.LANDSERVER}/officetels/${id}`);
    if (officetelResponse.data) {
      return { ...officetelResponse.data, rletTpNm: '오피스텔' };
    }
  } catch (error) {
    console.error('Failed to fetch officetel data', error);
  }

  return null;
};

export default fetchPropertyById;