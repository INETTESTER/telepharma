import http from 'k6/http';
// นำค่า cookie จากไฟล์แยก (ไฟล์: ./cookie.js)
import { cookie } from './cookie.js';

// ฟังก์ชันตั้งชื่อเป็นภาษาไทยขึ้นต้นด้วย API_ ตามที่คุณต้องการ
export function API_สำหรับแสดงรายการหน้ารอรับยา() {
  const url = 'https://pentest-telepharma-portal.one.th/management/api/transaction/get-all-transport?start_date=&end_date=&state=&limit=10&page=1&patient_id=&status_text=&keyword=&check_oneid_status=&order_type=&conference_state=';

  const params = {
    headers: {
      'Cookie': cookie,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = http.get(url, params);

  // log response body ตามคำขอ
  //console.log('Response body:', response.body);

  // คืนค่า response ตามรูปแบบ
  return response;
}
