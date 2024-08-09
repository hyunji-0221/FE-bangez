import { API } from "@/app/api/common/API";

export async function avgCost(tradeType:string) {
    console.log("tradeType", tradeType)
    const url = `${API.ANALYSERVER}/api/${tradeType}/statistics?select=1`
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data", data)
        return data;
    } catch (error){
        console.error("평균가격 fetch 실패 :", error);
    }
}



export async function tradeCountRaiseTop5ForMonth() {
    const url = `${API.ANALYSERVER}/api/apt_trade/statistics?select=7`
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error){
        console.error("fetch select 7 실패 :", error);
    }
}

export async function SalesCountByRegionForMonth(date:string, propertyType:string, region:string) {
    const url = `${API.ANALYSERVER}/api/${propertyType}/statistics?select=3&date=${date}&region=${region}`
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error){
        console.error("fetch select 3 실패 :", error);
    }
}

export async function GetBarChart() {
    const url = `${API.ANALYSERVER}/api/apt_trade/boxplot`
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error){
        console.error("fetch BarChart 실패 :", error);
    }
}

export async function getUserCount() {
    const url = `${API.ANALYSERVER}/api/today/access-count`
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("ddddd", data)
        return data;
    } catch (error){
        console.error("fetchCount 실패 :", error);
    }
}



export async function getSchool() {
    const url = `${API.ANALYSERVER}/api/school/statistics`
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(JSON.stringify(data))
        return data;
    } catch (error){
        console.error("fetchCount 실패 :", error);
    }
}


export async function getPark() {
    const url = `${API.ANALYSERVER}/api/city-park/statistics`
    console.log('url', url)
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("ddddd", data)
        return data;
    } catch (error){
        console.error("fetchCount 실패 :", error);
    }
}
