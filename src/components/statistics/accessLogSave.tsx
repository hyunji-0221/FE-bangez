import React, { useEffect, useState } from 'react';
import { getUserCount } from '../statistics-api/StatisticsAPI';

export function AccessCountSave() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const recordPageVisit = async () => {
            try {
                await fetch('http://localhost:8084/api/today/access-record', { method: 'POST' });
            } catch (error) {
                console.error('Error recording page visit:', error);
            }
        };

        recordPageVisit(); // 서버에 로그 기록 늘리기

    }, []);

}

export default AccessCountSave;
