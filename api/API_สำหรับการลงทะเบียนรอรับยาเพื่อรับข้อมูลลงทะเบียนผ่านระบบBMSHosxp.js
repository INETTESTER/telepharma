import http from 'k6/http';

function randomCardnum10() {
  // สร้างตัวเลขสุ่ม 10 หลัก (อนุญาตให้มีเลข 0 นำหน้า)
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  return digits;
}

// ✅ ฟังก์ชันหลัก
export function API_สำหรับการลงทะเบียนรอรับยาเพื่อรับข้อมูลลงทะเบียนผ่านระบบBMSHosxp(cid) {
  const url = 'https://pentest-telepharma-his.one.th/managements/api/his-api/v1/transactions/registers';
  const his_track_id = `${__VU}${__ITER}${cid}`;
  const generatedCardnum = randomCardnum10();
  // ✅ payload จาก curl
  const payload = JSON.stringify({
    his_track_id: "TEST2025"+his_track_id,
    hospital_appointment_slot_id: "",
    hospital_code: "12257",
    hospital_name: "โรงพยาบาลอินเทอร์เน็ตประเทศไทย",
    cid: generatedCardnum+""+cid,
    account_title_th: "เด็กหญิง",
    birth_date: "2000-09-01",
    firstname: "น้องบีม",
    lastname: "เทสระบบ",
    hn: "1209680",
    mobile: "0981545854",
    note: "",
    delived_address: {
      house_no: "47/54",
      moo: "",
      road: "",
      province: "ภูเก็ต",
      amphur: "กะทู้",
      tambon: "กมลา",
      zip_code: "83150",
    },
    medical_rigth_name: "เด็กอายุไม่เกิน 12 ปีบริบูรณ์",
    coverage_dec: "WEL",
  });

  // ✅ header (ใช้ Authorization Bearer)
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2YXRlS2V5IjoiM09BTVlMQS1aVUJVQTZBLVEyQVdPTVktR01NUVpISSIsImlhdCI6MTY2ODUzOTY4M30.6QQxFD-Z5QseHRW8N-Rs5VLzRZZ5uyJYEqtX2Y-05b4',
    },
  };

  // ✅ ส่ง request
  const response = http.post(url, payload, params);

  // ✅ log response body
  console.log('Response body:', response.body);



  // ✅ คืนค่า response
  return response;
}
