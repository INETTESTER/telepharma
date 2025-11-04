import http from 'k6/http';
import { cookie } from './cookie.js';
import { SharedArray } from 'k6/data';

// โหลด register_id จากไฟล์ JSON (เช่น ../file/register_id.json)
const data = new SharedArray('register_id_transport_thai_post', function () {
    const json = JSON.parse(open('../file/register_id.json'));
    // ปรับ key ให้ตรงกับโครงสร้างไฟล์ของคุณ (ตัวอย่างใช้ json.result)
    return json.result.map(item => ({
        register_id: item.register_id,
        patient_id: item.one_id, // หรือชื่อ key ที่จริงในไฟล์ของคุณ
    }));
});

// ✅ ฟังก์ชันหลัก (ชื่อแบบที่คุณต้องการ)
export function API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งไปรษณีย์ไทย(scenario) {
    const register_id = data[scenario.iterationInTest].register_id; // ดึง knowledge_id ตาม iteration
    const patient_id = data[scenario.iterationInTest].patient_id; // ดึง knowledge_id ตาม iteration

    console.log('ใช้ register_id:', register_id);

    const url = 'https://pentest-telepharma-portal.one.th/management/api/v3/transport_orders/thai_post';

    const payload = {
        clinic_id: '06',
        patient_id: '' + patient_id,
        register_id: '' + register_id,
        note_order: '',
        use_medical_rights: true,
        staff_id: '86016501708812019',
        staff_fullname: 'เกียรติสุรักษ์ วงศ์ชัย',
        order_type: 'thai_post',
        boxsize_detail: {
            box_size: '00',
            weight: 1000,
            width: 10,
            length: 14,
            height: 6,
            box_price: 0,
        },
        coverage_code: '101',
        coverage_desc: 'ประกันสุขภาพถ้วนหน้า',
    };

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie,
        },
    };

    const response = http.post(url, JSON.stringify(payload), params);

    console.log('Response body:', response.body);

    return response;
}
