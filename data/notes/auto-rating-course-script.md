---
title: Auto Rating Courses Script
date: '2023-07-31'
tags: ['Script', 'Tool', 'HCMUS']
draft: false
summary: Script automatically rates to all courses in University of Science.
images: []
layout: NoteView
---

## Guide

- Open Course Evaluation in HCMUS Portal
- Choose a specific course
- Open DevChrome (F12)
- Paste the code snippet to Console and press Enter
- View the process in console

## Code snippet

### Rate 5-star for all items

```js
$("[id$='72057594046734038']").click()
for (let i = 0; i < 8; i++) {
  $('#b2D0nDIrtztwrwn30qo4G').trigger('click')
}
$('#btnSave').trigger('click')
```

### Rate 4-star for all items

```js
$("[id$='72057594046734037']").click()
for (let i = 0; i < 8; i++) {
  $('#b2D0nDIrtztwrwn30qo4G').trigger('click')
}
$('#btnSave').trigger('click')
```

### Rate 3-star for all items

```js
$("[id$='72057594046734036']").click()
for (let i = 0; i < 8; i++) {
  $('#b2D0nDIrtztwrwn30qo4G').trigger('click')
}
$('#btnSave').trigger('click')
```

### Rate 2-star for all items

```js
$("[id$='72057594046734035']").click()
for (let i = 0; i < 8; i++) {
  $('#b2D0nDIrtztwrwn30qo4G').trigger('click')
}
$('#btnSave').trigger('click')
```

### Rate 1-star for all items

```js
$("[id$='72057594046734034']").click()
for (let i = 0; i < 8; i++) {
  $('#b2D0nDIrtztwrwn30qo4G').trigger('click')
}
$('#btnSave').trigger('click')
```
