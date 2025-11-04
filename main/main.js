//=============================== import API =================================
import { sleep } from 'k6';
import { error_check } from '../check/check.js';
import { scenario } from 'k6/execution';

import { API_สำหรับแสดงรายการหน้าลงทะเบียนรอรับยา } from '../api/API_สำหรับแสดงรายการหน้าลงทะเบียนรอรับยา.js';
import { API_สำหรับแสดงรายการหน้ารอรับยา } from '../api/API_สำหรับแสดงรายการหน้ารอรับยา.js';
import { API_สำหรับลงทะเบียนรอรับยาในหน้าลงทะเบียนรอรับยา } from '../api/API_สำหรับลงทะเบียนรอรับยาในหน้าลงทะเบียนรอรับยา.js';
import { API_สำหรับการลงทะเบียนรอรับยาเพื่อให้โรงพยาบาลใช้ในการส่งข้อมูลผ่านAPI } from '../api/API_สำหรับการลงทะเบียนรอรับยาเพื่อให้โรงพยาบาลใช้ในการส่งข้อมูลผ่านAPI.js';
import { API_สำหรับยืนยันข้อมูลที่ได้รับมาจากAPI_vhv_transport_center_register_formDrug } from '../api/API_สำหรับยืนยันข้อมูลที่ได้รับมาจากAPI_vhv_transport_center_register_formDrug.js';
import { API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งrider } from '../api/API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งrider.js';
import { API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งflash } from '../api/API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งflash.js';
import { API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งไปรษณีย์ไทย } from '../api/API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งไปรษณีย์ไทย.js';
import { API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งiship } from '../api/API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งiship.js';
import { API_สำหรับแสดงรายการหน้ารายการจัดส่งยา } from '../api/API_สำหรับแสดงรายการหน้ารายการจัดส่งยา.js';
import { API_สำหรับการลงทะเบียนรอรับยาเพื่อรับข้อมูลลงทะเบียนผ่านระบบBMSHosxp } from '../api/API_สำหรับการลงทะเบียนรอรับยาเพื่อรับข้อมูลลงทะเบียนผ่านระบบBMSHosxp.js';
import { API_สำหรับติดตามสถานะการจัดส่งยา } from '../api/API_สำหรับติดตามสถานะการจัดส่งยา.js';
import { API_สำหรับยกเลิกการลงทะเบียนรอรับยา } from '../api/API_สำหรับยกเลิกการลงทะเบียนรอรับยา.js';


//============================================================================

export default function () {    //เรียกใช้ API ใน export default function
  //======================= Portal =================================
  //response = API_สำหรับแสดงรายการหน้าลงทะเบียนรอรับยา()
  //response = API_สำหรับแสดงรายการหน้ารอรับยา()
  //response = API_สำหรับลงทะเบียนรอรับยาในหน้าลงทะเบียนรอรับยา()
  //response = API_สำหรับการลงทะเบียนรอรับยาเพื่อให้โรงพยาบาลใช้ในการส่งข้อมูลผ่านAPI(cid)
  //response = API_สำหรับยืนยันข้อมูลที่ได้รับมาจากAPI_vhv_transport_center_register_formDrug(scenario, cid)
  //response = API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งrider(scenario)
  //response = API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งflash(scenario)
  //response = API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งไปรษณีย์ไทย(scenario)
  //response = API_สำหรับยืนยันข้อมูลออเดอร์บริการขนส่งiship(scenario)

  //============================== HIS =========================
  //response = API_สำหรับแสดงรายการหน้ารายการจัดส่งยา()
  //response = API_สำหรับการลงทะเบียนรอรับยาเพื่อรับข้อมูลลงทะเบียนผ่านระบบBMSHosxp(cid)
  //response = API_สำหรับติดตามสถานะการจัดส่งยา()
  //response = API_สำหรับยกเลิกการลงทะเบียนรอรับยา(scenario)


  error_check(response);
  sleep(1)
}



















































































const cid = __ENV.cid || "1";
const id = __ENV.id || "1";
const projectname = __ENV.projectname || "1";
const user = __ENV.user || "1";
const durationx = __ENV.durationx || "1";
let response;
const scenariox = __ENV.scenariox || "1";
let options;
const vusx = Math.ceil(user / durationx);
if (scenariox == 1) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
        gracefulStop: '120s',
      },
    },
  };
}
else if (scenariox == 2) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    vus: user,
    duration: durationx + 's',
    gracefulStop: '120s',
  };
}
else if (scenariox == 3) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    scenarios: {
      example_scenario: {
        executor: 'constant-arrival-rate',
        // rate: user,
        // timeUnit: durationx+'s',
        rate: vusx,
        timeUnit: '1s',
        preAllocatedVUs: user,
        duration: durationx + 's', // ระบุระยะเวลาที่ต้องการให้ทดสอบ
        gracefulStop: '120s',
      },
    },
  };
}
else {
  options = {
    insecureSkipTLSVerify: true,
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
      },
    },
  };
}
export { options };