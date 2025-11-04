import http from 'k6/http';
// นำค่า cookie จากไฟล์แยก (ไฟล์: ./cookie.js)
import { cookie } from './cookie.js';


function randomCardnum10() {
  // สร้างตัวเลขสุ่ม 10 หลัก (อนุญาตให้มีเลข 0 นำหน้า)
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  return digits;
}

// ฟังก์ชันตั้งชื่อเป็นภาษาไทยตาม path API
export function API_สำหรับการลงทะเบียนรอรับยาเพื่อให้โรงพยาบาลใช้ในการส่งข้อมูลผ่านAPI(cid) {
  const url = 'https://pentest-telepharma-portal.one.th/management/api/vhv_transport_center/register_formDrug';


  const generatedCardnum = randomCardnum10();

  const payload = {
    "address": "26 หมู่ 3 ต. ดงชน อ. เมืองสกลนคร จ.สกลนคร 47000",
    "cardnum": generatedCardnum+""+cid,
    "cardHN": "2404",
    "VN": "2404",
    "account_title_th": "นาย",
    "firstname": "พลอยพลอยสี่",
    "lastname": "พลอยพลอยสี่จ้า",
    "birth_date": "1962-02-20",
    "gender": "ชาย",
    "mobile": "0948756461",
    "mobile_other": "",
    "email": "",
    "note": "",
    "house_no": "26",
    "moo": "3",
    "road": "",
    "province": "สกลนคร",
    "tambon": "ดงชน",
    "amphur": "เมืองสกลนคร",
    "postal_code": "47000",
    "landmark": "",
    "lat": "",
    "lng": "",
    "coverageCode": "101",
    "coverageDesc": "ประกันสุขภาพถ้วนหน้า UC",
    "callback_url": "",
    "search_value": ""
  };

  const params = {
    headers: {
      'hospitalKey': 'M62X6HY-5X2EIFY-UVQS3AY-MJMWWBA',
      'Cookie': cookie,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, JSON.stringify(payload), params);

  // log response body ตามคำขอ
  //console.log('Response body:', response.body);

  // คืนค่า response ตามรูปแบบ
  return response;
}
