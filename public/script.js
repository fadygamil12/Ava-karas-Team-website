
var post = document.querySelector(".post"),
title = document.getElementById("title12"),
    star = document.querySelector(".star"),
   
    input= document.querySelector(".input1515"),
    message1 = document.querySelector(".contact-col2"),
 navlinks = document.getElementById("navlinks"),
 loading = document.getElementById("loading"),
    togglebtn = document.getElementById("botn"),
    loginfo = document.getElementById("login55"),
    signupfo = document.getElementById("signup55");

function showmenu() {
    navlinks.style.display="block";
    navlinks.style.right="0";
 
}
function closemenu() {
    navlinks.style.right="-200px";
    navlinks.style.display="none";
}