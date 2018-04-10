// var highlight;

// function pageWeb(){
//     if (highlight) {
//         highlight.style.borderBottomColor = "rgba(210, 215, 217, 0.75)";
//     }
//     highlight = document.getElementById("project1");

// //    document.getElementById('web').submit();
//     var project1 = document.getElementById("project1");
//     project1.style.borderBottomColor = "#F56A6A";
// }

// function pageOs(){
//     if (highlight) {
//         highlight.style.borderBottomColor = "rgba(210, 215, 217, 0.75)";
//     }
//     highlight = document.getElementById("project2");

//     document.getElementById('os').submit();
//     var project2 = document.getElementById("project2");
//     project2.style.borderBottomColor = "#F56A6A";
// }

// function pageTemplate(){
//     if (highlight) {
//         highlight.style.borderBottomColor = "rgba(210, 215, 217, 0.75)";
//     }
//     highlight = document.getElementById("project3");

//     document.getElementById('template').submit();
//     var project3 = document.getElementById("project3");
//     project3.style.borderBottomColor = "#F56A6A";
// }
// window.alert("A");
// var rawFile = new XMLHttpRequest();
// rawFile.open("GET","/home/taeyoung/web/myHOME/database.txt",true);
// // window.alert(rawFile.readyState);
// var allText = rawFile.responseText;
// // window.alert(allText);
// document.getElementById("date").innerHTML = "a";
// window.alert(allText);
// // if (rawFile.readyState === 4){
//     var allText = rawFile.responseText;
//     document.getElementById("date").innerHTML = allText;
// }
// rawFile.onreadystatechange = function(){
//     if (this.readyState === 4){
//         if(this.status === 200 || this.status == 0){
//             var allText = this.responseText;
//             // window.alert(this.responseText);
//             document.getElementById("date2").innerHTML = "ASdf";
//         }
//     }
// }
// rawFile.open("GET","file:///home/taeyoung/web/myHOME/database.txt",true);
// rawFile.send();
// // // document.getElementById("date").innerHTML = rawFile.open("GET","/home/taeyoung/web/myHOME/database.txt",true);
// // window.alert(rawFile.open("GET","/home/taeyoung/web/myHOME/database.txt",true));
// asdf="asdf";
// parent.document.getElementById("date2").innerHTML = asdf;
// window.alert(document.body.clientHeight);

// window.alert(window.frameElement);
// window.alert(window.document.getElementById("project1"));
// function iframeheight(){
//     // window.alert(document.body.clientHeight);
//     parent.getElementById("project1").innerHTML = "adf";
// }


// function showDate(time){
//     var date1 = time;
//     var date2 = time;
//     year = date1.getFullYear();
//     month = date1.getMonth();
//     date = date1.getDate();
//     hours = date2.getHours();
//     minutes = date2.getMinutes();
//     seconds = date2.getSeconds();
//     day = "최근 수정 시각: " + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
//     document.getElementById("date").innerHTML = day;
// }

// function toLink(){
//     // document.getElementById("document").src = "document/Web2.html";
//     document.getElementById("123").innerHTML = Date();
// }

// module.exports = {showDate:showDate()};
exports.saveTime = function(time){
    // var date1 = time;
    // var date2 = time;
    // year = date1.getFullYear();
    // month = date1.getMonth();
    // date = date1.getDate();
    // hours = date2.getHours();
    // minutes = date2.getMinutes();
    // seconds = date2.getSeconds();
    // day = "최근 수정 시각: " + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    // document.getElementById("date").innerHTML = day;
    var savetime='';
    for (var i=0; i < time.length-4; i++) {
        savetime += time[i];
    }
    return "최근 수정 시각: " + savetime;
}