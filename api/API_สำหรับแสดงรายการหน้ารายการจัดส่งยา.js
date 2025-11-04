import http from 'k6/http';
import { cookie2 } from './cookie.js'; // ✅ ใช้ cookie จากไฟล์ภายนอก

export function API_สำหรับแสดงรายการหน้ารายการจัดส่งยา() {
  const url = 'https://pentest-telepharma-his.one.th/api/v1/order-delivery';

  const payload = JSON.stringify({
    limit: 10,
    page: 1,
    hospital_code: ["12257"],
    keyword: "",
    order_type: "",
    start_date: "2025-10-01",
    end_date: "2025-10-31",
    status_active: "",
    regis_form: ""
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie2, // ✅ ใช้ cookie จาก cookie.js
    },
  };

  const response = http.post(url, payload, params);

  console.log('Response body:', response.body);

  return response;
}
