var highlight;

function pageWeb(){
    if (highlight) {
        highlight.style.borderBottomColor = "rgba(210, 215, 217, 0.75)";
    }
    highlight = document.getElementById("project1");

    document.getElementById("document").src = "document/web.html";
    var project1 = document.getElementById("project1");
    project1.style.borderBottomColor = "#F56A6A";
}

function pageOs(){
    if (highlight) {
        highlight.style.borderBottomColor = "rgba(210, 215, 217, 0.75)";
    }
    highlight = document.getElementById("project2");

    document.getElementById("document").src = "document/os.html"
    var project2 = document.getElementById("project2");
    project2.style.borderBottomColor = "#F56A6A";
}

function pageTemplate(){
    if (highlight) {
        highlight.style.borderBottomColor = "rgba(210, 215, 217, 0.75)";
    }
    highlight = document.getElementById("project3");

    document.getElementById("document").src = "document/template.html"
    var project3 = document.getElementById("project3");
    project3.style.borderBottomColor = "#F56A6A";
}
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


function showDate(){
    window.alert("ASdf");
    var date = new Date();
    var time = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    date = date.getDate();
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();
    day = "최근 수정 시각: " + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    document.getElementById("date").innerHTML = day;
}

// function toLink(){
//     // document.getElementById("document").src = "document/Web2.html";
//     document.getElementById("123").innerHTML = Date();
// }