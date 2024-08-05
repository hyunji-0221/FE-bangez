import Cookies from 'js-cookie';
import { headers } from 'next/headers';

export const getAuthHeader = () => {
    const accessToken = Cookies.get('accessToken');
    return {
        'Authorization': `Bearer ${accessToken}`,
    };
}

export const getHader = () => {
    return {
        'Content-Type': 'application/json'
    }
}