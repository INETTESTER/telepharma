import http from 'k6/http';

export function ran() {
    const url = "https://www.youtube.comasd";
    const res = http.get(url);



    //console.log(res.body); // แสดง path ที่ดึงออกมา

    return res
}
