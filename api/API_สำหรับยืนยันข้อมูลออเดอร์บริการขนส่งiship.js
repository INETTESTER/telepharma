import http from 'k6/http';
import { cookie } from './cookie.js';
import { SharedArray } from 'k6/data';

// ✅ โหลด register_id จากไฟล์ JSON (ตัวอย่าง ../file/register_id.json)
const data = new SharedArray('register_id_transport_iship', function () {
  const json = JSON.parse(open('../file/register_id.json'));
  // ปรับ key ให้ตรงกับโครงสร้างจริงของไฟล์ JSON
  return json.result.map(item => ({
    register_id: item.register_id,
    patient_id: item.one_id, // หรือชื่อ key ที่จริงในไฟล์ของคุณ
  }));
});

// ✅ ฟังก์ชันหลัก (ชื่อแบบมาตรฐานของคุณ)
export function API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งiship(scenario) {
  const register_id = data[scenario.iterationInTest].register_id; // ดึง knowledge_id ตาม iteration
  const patient_id = data[scenario.iterationInTest].patient_id; // ดึง knowledge_id ตาม iteration

  console.log('ใช้ register_id:', register_id);

  // ✅ URL จาก curl
  const url = 'https://pentest-telepharma-portal.one.th/management/api/v3/transport_orders/iship';

  // ✅ payload
  const payload = {
    clinic_id: '06',
    patient_id: '' + patient_id,
    register_id: '' + register_id,
    note_order: 'ทดสอบ',
    use_medical_rights: true,
    staff_id: '86016501708812019',
    staff_fullname: 'เกียรติสุรักษ์ วงศ์ชัย',
    order_type: 'iship',
    courier_code: 'FlashExpressD',
    sub_order_type: 'Flash Pro DD',
    boxsize_detail: {
      box_size: 'A',
      weight: 1000,
      width: 14,
      length: 20,
      height: 6,
      box_price: 0,
    },
    coverage_code: '101',
    coverage_desc: 'ประกันสุขภาพถ้วนหน้า',
  };

  // ✅ Header (ใช้ cookie จากไฟล์)
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie,
    },
  };

  // ✅ ส่ง request
  const response = http.post(url, JSON.stringify(payload), params);

  // ✅ log ผลลัพธ์
  console.log('Response body:', response.body);

  // ✅ คืนค่าตามมาตรฐาน
  return response;
}
