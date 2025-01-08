// var data1 = Vue.createApp({
//     data() {
//         return {
//             freshman: [], // 初始化 video 為空陣列
//         };
//     },
//     mounted() {
//         // 使用 jQuery 的 $.ajax 發送請求
//         $.ajax({
//             url: "/freshman", // API 路徑
//             method: "GET",    // HTTP 方法
//             dataType: "json", // 資料格式
//             success: (results) => {
//                 this.freshman = results; // 將回傳的資料綁定到 Vue 的 freshman
//             },
//             error: (xhr, status, error) => {
//                 console.error("Error fetching data:", status, error);
//             },
//         });
//     },
// });
// // 掛載 Vue 應用程式到指定的 DOM 元素
// data1.mount("#freshman");




// var data2 = Vue.createApp({
//     data() {
//         return {
//             sophomore: [], // 初始化 sophomore 為空陣列
//         };
//     },
//     mounted() {
//         // 使用 jQuery 的 $.ajax 發送請求
//         $.ajax({
//             url: "/sophomore", // API 路徑
//             method: "GET",    // HTTP 方法
//             dataType: "json", // 資料格式
//             success: (results) => {
//                 this.sophomore = results; // 將回傳的資料綁定到 Vue 的 sophomore
//             },
//             error: (xhr, status, error) => {
//                 console.error("Error fetching data:", status, error);
//             },
//         });
//     },
// });
// // 掛載 Vue 應用程式到指定的 DOM 元素
// data2.mount("#sophomore");




// var data3 = Vue.createApp({
//     data() {
//         return {
//             junior: [], // 初始化 junior 為空陣列
//         };
//     },
//     mounted() {
//         // 使用 jQuery 的 $.ajax 發送請求
//         $.ajax({
//             url: "/junior", // API 路徑
//             method: "GET",    // HTTP 方法
//             dataType: "json", // 資料格式
//             success: (results) => {
//                 this.junior = results; // 將回傳的資料綁定到 Vue 的 junior
//             },
//             error: (xhr, status, error) => {
//                 console.error("Error fetching data:", status, error);
//             },
//         });
//     },
// });
// // 掛載 Vue 應用程式到指定的 DOM 元素
// data3.mount("#junior");