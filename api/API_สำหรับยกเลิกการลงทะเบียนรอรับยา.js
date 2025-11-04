import http from 'k6/http';
import { cookie2 } from './cookie.js'; // ✅ ใช้ cookie จากไฟล์ภายนอก
import { SharedArray } from 'k6/data';

// โหลด register_id จากไฟล์ JSON (เช่น ../file/register_id.json)
const data = new SharedArray('his_track_id', function () {
    const json = JSON.parse(open('../file/his_track_id.json'));
    // ปรับ key ให้ตรงกับโครงสร้างไฟล์ของคุณ (ตัวอย่างใช้ json.result)
    return json.result.map(item => ({
        his_track_id: item.his_track_id,
        cid: item.cid, // หรือชื่อ key ที่จริงในไฟล์ของคุณ
    }));
});


export function API_สำหรับยกเลิกการลงทะเบียนรอรับยา(scenario) {
    const url = 'https://pentest-telepharma-his.one.th/managements/api/his-api/v1/transactions/cancel';
    const his_track_id = data[scenario.iterationInTest].his_track_id; // ดึง knowledge_id ตาม iteration
    const cid = data[scenario.iterationInTest].cid; // ดึง knowledge_id ตาม iteration
    const payload = JSON.stringify({
        his_track_id: his_track_id,
        hospital_code: '12257',
        cid: cid,
        note: 'ยกเลิกจากทีม Dev เนื่องจากหน้างานแจ้งให้ยกเลิกลงทะเบียน และจะทำการลงทะเบียนใหม่อีกครั้งครับ'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie2, // ✅ ใช้ cookie2
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2YXRlS2V5IjoiM09BTVlMQS1aVUJVQTZBLVEyQVdPTVktR01NUVpISSIsImlhdCI6MTY2ODUzOTY4M30.6QQxFD-Z5QseHRW8N-Rs5VLzRZZ5uyJYEqtX2Y-05b4', // ✅ ใช้ token จาก env.js
        },
    };

    const response = http.post(url, payload, params);

    console.log('Response body:', response.body);

    return response;
}
