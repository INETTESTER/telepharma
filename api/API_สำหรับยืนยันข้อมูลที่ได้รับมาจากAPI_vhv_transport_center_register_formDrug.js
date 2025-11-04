import http from 'k6/http';
// นำค่า cookie จากไฟล์แยก (ไฟล์: ./cookie.js)
import { cookie } from './cookie.js';
import { SharedArray } from 'k6/data';

// โหลด knowledge_id จากไฟล์ JSON (เช่น delete.json)
const data = new SharedArray('register_id', function () {
  const json = JSON.parse(open('../file/register_id.json'));
  return json.result.map(item => item.register_id); // ปรับตาม key ใน JSON ของคุณ
});


// ฟังก์ชันหลักตามรูปแบบที่คุณต้องการ
export function API_สำหรับยืนยันข้อมูลที่ได้รับมาจากAPI_vhv_transport_center_register_formDrug(scenario,cid) {
  // ใส่ query params ตาม curl ที่ส่งมา
  const register_id = data[scenario.iterationInTest]; // ดึง knowledge_id ตาม iteration
  console.log(register_id);
  const search_value = `${__VU}${__ITER}${cid}`;
  //const url = 'https://pentest-telepharma-portal.one.th/management/api/vhv/v2/update_draft_regis?register_id=${register_id}&lng=104.2241313&lat=17.10949646';
  // register_id มาจากตัวแปรของคุณ
  const url = `https://pentest-telepharma-portal.one.th/management/api/vhv/v2/update_draft_regis?register_id=${register_id}&lng=104.2241313&lat=17.10949646`;

  // payload ต้นฉบับจาก curl
  const payload = {
    //"search_value": ""+search_value,
    "search_value": "",
    "VN": "2404",
    "fristname": "พลอยพลอยสี่",
    "lastname": "พลอยพลอยสี่จ้า",
    "mobile": "0948756461",
    "mobile_other": "",
    "address": " บ้านเลขที่ 26 หมู่ที่ 3 ตำบล ดงชน อำเภอ เมืองสกลนคร จังหวัด สกลนคร รหัสไปรษณีย์ 47000",
    "house_no": "26",
    "moo": "3",
    "road": "",
    "province": "สกลนคร",
    "amphur": "เมืองสกลนคร",
    "tambon": "ดงชน",
    "zip_code": "47000",
    "landmark": "",
    "transport_key": false,
    "cardnum": "" // ถ้าว่าง จะสร้างแบบสุ่มอัตโนมัติด้านล่าง
  };


  const params = {
    headers: {
      'Cookie': cookie,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, JSON.stringify(payload), params);

  // log response body ตามคำขอ
  console.log('Response body:', response.body);

  // คืนค่า response ตามรูปแบบ
  return response;
}
