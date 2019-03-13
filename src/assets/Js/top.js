window.onscroll=function(){scrollFunction()};function scrollFunction(){if(document.body.scrollTop>20||document.documentElement.scrollTop>20){document.getElementById("myBtn").style.display="block";}else{document.getElementById("myBtn").style.display="none";}}function topFunction(){$('html, body').animate({scrollTop:0},800);}var clicks=0;function changeColorFav(id){++clicks;if(clicks%2){id.style.color='red';}else{id.style.color='gray';}}

jQuery(document).ready(function(){
    // $("#mySelect").change(function(){
    //     alert($(this).val());
    // });
  new WOW().init();
});

