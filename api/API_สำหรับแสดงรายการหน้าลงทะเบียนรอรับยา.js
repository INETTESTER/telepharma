import http from 'k6/http';
// นำค่า cookie จากไฟล์แยก (ตัวอย่างไฟล์: ./cookies.js)
import { cookie } from './cookie.js';


// ชื่อฟังก์ชันตั้งจาก path หลังสุด: get-all-register -> camelCase -> getAllRegister
export function API_สำหรับแสดงรายการหน้าลงทะเบียนรอรับยา() {
  const url = 'https://pentest-telepharma-portal.one.th/management/api/transaction/get-all-register?start_date=&end_date=&keyword=&status=&limit=10&page=1&check_oneid_status=';

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


  return response;
}

