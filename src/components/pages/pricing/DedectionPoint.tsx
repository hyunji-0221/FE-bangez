import { API } from "@/app/api/common/API";

export default async function DeductionPointFetch(userId: any) {
    try {
        const response = await fetch(`${API.TXSERVER}/point/deduction/${userId}`, {
            method: "PUT"
        });
        const data = await response.json();
        if (data.message === "SUCCESS") {
            console.log("포인트 차감 성공");
            return "SUCCESS";
        } else {
            console.log("포인트 차감 실패");
            return "FAILURE";
        }
    } catch (error) {
        console.error("Error creating property:", error);
        return "ERROR";
    }
}