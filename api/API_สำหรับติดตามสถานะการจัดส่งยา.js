import http from 'k6/http';

// ✅ ฟังก์ชันหลัก
export function API_สำหรับติดตามสถานะการจัดส่งยา() {
  const url = 'https://pentest-telepharma-his.one.th/managements/api/his-api/v1/transactions/trackings?tracking=TPOST12257251031HJ5VT';


  // ✅ ส่ง request แบบ GET
  const response = http.get(url);

  // ✅ log response body
  console.log('Response body:', response.body);

  // ✅ คืนค่า response ตามมาตรฐานที่คุณใช้
  return response;
}
