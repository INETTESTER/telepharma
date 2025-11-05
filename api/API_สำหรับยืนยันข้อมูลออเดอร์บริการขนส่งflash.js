import http from 'k6/http';
import { cookie } from './cookie.js';
import { SharedArray } from 'k6/data';

// ✅ โหลด register_id จากไฟล์ JSON (เช่น ../file/register_id.json)
const data = new SharedArray('register_id_flash', function () {
  const json = JSON.parse(open('../file/register_id.json'));
  return json.result.map(item => ({
    register_id: item.register_id,
    patient_id: item.one_id, // หรือชื่อ key ที่จริงในไฟล์ของคุณ
  }));
});

// ✅ ฟังก์ชันหลัก
export function API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งflash(scenario) {
  const register_id = data[scenario.iterationInTest].register_id; // ดึง knowledge_id ตาม iteration
  const patient_id = data[scenario.iterationInTest].patient_id; // ดึง knowledge_id ตาม iteration
  //console.log('ใช้ register_id:', register_id);

  // ✅ URL จาก curl
  const url = 'https://pentest-telepharma-portal.one.th/management/api/transport/mobilyst/create-order-flash';

  // ✅ payload ตาม curl ที่ให้มา
  const payload = {
    "clinic_id": "06",
    "patient_id": "" + patient_id,
    "register_id": "" + register_id,
    "note_order": "",
    "use_medical_rights": true,
    "staff_id": "86016501708812019",
    "staff_fullname": "เกียรติสุรักษ์ วงศ์ชัย",
    "order_type": "flash",
    "boxsize_detail": {
      "box_size": "B",
      "weight": 1000,
      "width": 17,
      "length": 25,
      "height": 9,
      "box_price": 0
    },
    "coverage_code": "101",
    "coverage_desc": "ประกันสุขภาพถ้วนหน้า"
  };

  // ✅ headers (ใช้ cookie จากไฟล์)
  const params = {
    headers: {
      'Cookie': cookie,
      'Content-Type': 'application/json',
    },
  };

  // ✅ ส่ง request
  const response = http.post(url, JSON.stringify(payload), params);

  // ✅ log response body
  //console.log('Response body:', response.body);

  // ✅ คืนค่า response
  return response;
}
