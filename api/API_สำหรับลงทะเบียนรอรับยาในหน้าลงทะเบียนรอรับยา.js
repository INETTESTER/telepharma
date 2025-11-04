import http from 'k6/http';
// นำค่า cookie จากไฟล์แยก (ไฟล์: ./cookie.js)
import { cookie } from './cookie.js';

// ฟังก์ชันตั้งชื่อเป็นภาษาไทยขึ้นต้นด้วย API_ ตามที่คุณต้องการ
export function API_สำหรับลงทะเบียนรอรับยาในหน้าลงทะเบียนรอรับยา() {
  const url = 'https://pentest-telepharma-portal.one.th/management/api/register/create-formdrug-v-radius';

  const payload = {
    "account_title_th": "นาย",
    "first_name_th": "กรีฑา",
    "last_name_th": "เจริญวัฒนา",
    "account_title_eng": "Mr",
    "first_name_eng": "",
    "last_name_eng": "",
    "VN": "",
    "email": "",
    "cardHN": "LOADTEST01",
    "house_no": "11",
    "moo": "4",
    "road": "",
    "province": "เชียงใหม่",
    "amphur": "เมืองเชียงใหม่",
    "tambon": "สุเทพ",
    "postal_code": "50200",
    "lat": 16.5494,
    "lng": 103.978,
    "landmark": "",
    "transport_key": false,
    "mobile": "0867493307",
    "mobile_other": "",
    "cardnum": "7104497557118",
    "id_card_type": "ID_CARD",
    "biz_id": "324265892276395",
    "address": "บ้านเลขที่ 11 หมู่ที่ 4 ตำบล/แขวงแจนแลน อำเภอ/เมืองเชียงใหม่ จังหวัดเชียงใหม่ รหัสไปรษณีย์ 50200",
    "hospital_name": "โรงพยาบาลอินเทอร์เน็ตประเทศไทย",
    "manual_type": "new register",
    "desc_remark": "ห้องยา 4",
    "desc_no": "122",
    "clinic_location_detail": [
      {
        "id": 1,
        "cinicLocationId": "as1",
        "cinicLocationDesc": "1111"
      }
    ],
    "use_coverage": true,
    "coveragedesc": "ประกันสุขภาพถ้วนหน้า UC",
    "coveragecode": "101"
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
  //console.log('Response body:', response.body);

  // คืนค่า response ตามรูปแบบที่ต้องการ
  return response;
}
