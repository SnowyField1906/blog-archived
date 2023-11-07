---
title: HCMUS GPA Calculator
date: '2023-07-31'
tags: ['Script', 'Tool', 'HCMUS']
draft: false
summary: Script calculates total accumulated GPA in University of Science.
images: []
layout: NoteView
---

## Guide

- Open [Rate Academic Results](https://portal1.hcmus.edu.vn/SinhVien.aspx?pid=211) in HCMUS Portal
- Choose the academic year and semester you want to calculate grades for (or select "All" for all semesters).
- Open DevChrome (F12)
- Paste the code snippet to Console and press Enter
- View the process in console

**Node**: Citizenship Education, English, Physical Education, Informatics and subjects in which you have failed (final score < `5`) or have not received a grade will not be included.

## Code snippet

```js
const tinchi = document.querySelectorAll('td:nth-child(3)')
const monhoc = document.querySelectorAll('td:nth-child(2)')
const diem = document.querySelectorAll('td:nth-child(6)')
const [diemtren, diemduoi] = [0, 0]

for (let i = 1; i < tinchi.length; i++) {
  if (
    monhoc[i].innerText.includes('Thể dục') ||
    monhoc[i].innerText.includes('Anh văn') ||
    monhoc[i].innerText.includes('Giáo dục') ||
    monhoc[i].innerText.includes('Tin học') ||
    Number(diem[i].innerText) < 5
  ) {
    continue
  }
  diemtren += Number(tinchi[i].innerText) * Number(diem[i].innerText)
  diemduoi += Number(tinchi[i].innerText)
}

console.log('Tong tin chi : ' + diemduoi)
console.log('Diem trung binh : ' + diemtren / diemduoi)
```
