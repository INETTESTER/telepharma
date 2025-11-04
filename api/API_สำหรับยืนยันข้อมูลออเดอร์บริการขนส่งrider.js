import http from 'k6/http';
import { cookie } from './cookie.js';
import { SharedArray } from 'k6/data';

// โหลด knowledge_id จากไฟล์ JSON (เช่น delete.json)
const data = new SharedArray('register_id_rider', function () {
  const json = JSON.parse(open('../file/register_id.json'));
  return json.result.map(item => ({
    register_id: item.register_id,
    patient_id: item.one_id, // หรือชื่อ key ที่จริงในไฟล์ของคุณ
  }));
});



// ✅ ฟังก์ชันหลัก (ชื่อแบบที่คุณต้องการ)
export function API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งrider(scenario) {
  const register_id = data[scenario.iterationInTest].register_id; // ดึง knowledge_id ตาม iteration
  const patient_id = data[scenario.iterationInTest].patient_id; // ดึง knowledge_id ตาม iteration
  console.log(register_id);
  // ✅ URL จาก curl
  const url = 'https://pentest-telepharma-portal.one.th/management/api/v3/transport_orders';

  // ✅ payload ตามที่ให้มา
  const payload = {
    "clinic_id": "06",
    "patient_id": "" + patient_id,
    "register_id": "" + register_id,
    "note_order": "",
    "use_medical_rights": true,
    "medical_rights_name": "UC",
    "medical_rights_name_other": "ประกันสุขภาพถ้วนหน้า UC",
    "medical_rights_code": "101",
    "staff_id": "100351734144",
    "staff_fullname": "อาริยา พงษ์ขจร",
    "order_type": "rider",
    "cooler_box": true
  };

  // ✅ header (ใช้ cookie จากไฟล์)
  const params = {
    headers: {
      'Cookie': cookie,
      'Content-Type': 'application/json',
    },
  };

  // ✅ ส่ง request
  const response = http.post(url, JSON.stringify(payload), params);

  // ✅ แสดงผลลัพธ์ใน console
  console.log('Response body:', response.body);

  // ✅ คืนค่า response ตามมาตรฐานที่คุณใช้
  return response;
}
