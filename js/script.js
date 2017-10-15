// MENU

$(".arrow-white").click(function() {
  $(".arrow-white").css({"display": "none"});
  $(".arrow-black").css({"display": "inline-block"});
});

$(".hamburger-menu-container").click(function() {
   $(".menu").slideToggle();
   $(".hamburger-menu-container").css({"display": "none"});
   $(".x").css({"display": "inline-block"});
   $("body").css({"overflow": "hidden"});
});

$(".x").click(function() {
   $(".menu").slideToggle();
   $(".hamburger-menu-container").css({"display": "flex"});
   $(".x").css({"display": "none"});
   $("body").css({"overflow": "visible"});
});


// BUTTON COLOR CHANGE

$(".round-button").click(function() {
   $(".round-button").css({"background-color": "#80be78", "color": "#fff"});
});

$(".menu .round-button").click(function() {
   $(".menu .round-button").css({"background-color": "#fff", "color": "#80be78"});
});
