'user strict';

// Preloader
$(window).on('load', function () {
    $('.preloader').fadeOut(1000);
});


//Menu Dropdown
$("ul>li>.sub-menu").parent("li").addClass("has-sub-menu");

$('.menu li a').on('click', function () {
  var element = $(this).parent('li');
  if (element.hasClass('open')) {
    element.removeClass('open');
    element.find('li').removeClass('open');
    element.find('ul').slideUp(300, "swing");
  } else {
    element.addClass('open');
    element.children('ul').slideDown(300, "swing");
    element.siblings('li').children('ul').slideUp(300, "swing");
    element.siblings('li').removeClass('open');
    element.siblings('li').find('li').removeClass('open');
    element.siblings('li').find('ul').slideUp(300, "swing");
  }
});

// Responsive Menu
var headerTrigger = $('.header-trigger');
headerTrigger.on('click', function(){
    $('.menu, .header-trigger').toggleClass('active')
    $('.overlay').toggleClass('active')
});

var headerTrigger2 = $('.top-bar-trigger');
headerTrigger2.on('click', function(){
    $('.header-top').toggleClass('active')
    $('.overlay').addClass('active')
    $('.overlay').removeClass('active')
});

// Overlay Event
var over = $('.overlay');
over.on('click', function() {
  $('.overlay').removeClass('overlay-color')
  $('.overlay').removeClass('active')
  $('.menu, .header-trigger').removeClass('active')
  $('.header-top').removeClass('active')
  $('.dashboard__sidebar').removeClass('active')
})


// // Sticky Menu
// window.addEventListener('scroll', function(){
//   var header = document.querySelector('.header-bottom');
//   header.classList.toggle('sticky', window.scrollY > 0);
// });

// Nice Select
$('.nice-select').niceSelect();

// Scroll To Top 
var scrollTop = $(".scrollToTop");
$(window).on('scroll', function () {
  if ($(this).scrollTop() < 500) {
    scrollTop.removeClass("active");
  } else {
    scrollTop.addClass("active");
  }
});

//Click event to scroll to top
$('.scrollToTop').on('click', function () {
  $('html, body').animate({
    scrollTop: 0
  }, 300);
  return false;
});


$('.header-top-trigger').on('click', function() {
  var e = $('.header-top')
  if(e.hasClass('active')) {
    $('.header-top').removeClass('active')
    $('.overlay').removeClass('active')
  }else {
    $('.header-top').addClass('active')
    $('.overlay').addClass('active')
  }
})


$('.testimonial__content__slider').slick({
  fade: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  centerMode: false,
  dots: true,
  asNavFor: '.testimonial__img__slider',
  arrows: true,
  nextArrow: '<i class="las la-arrow-right arrow-right"></i>',
  prevArrow: '<i class="las la-arrow-left arrow-left"></i> ',
 
});

$('.testimonial__img__slider').slick({
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  centerMode: false,
  dots: false,
  asNavFor: '.testimonial__content__slider',
  arrows: false,
});


$('.feature__slider').slick({
  fade: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  centerMode: false,
  dots: false,
  arrows: true,
  nextArrow: '<i class="las la-arrow-right arrow-right"></i>',
  prevArrow: '<i class="las la-arrow-left arrow-left"></i> ',
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      }
    },

  ]
});
$('.plan__slider').slick({
  fade: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  centerMode: false,
  dots: false,
  arrows: true,
  nextArrow: '<i class="las la-arrow-right arrow-right"></i>',
  prevArrow: '<i class="las la-arrow-left arrow-left"></i> ',
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      }
    },

  ]
});

$('.brand__slider').slick({
  fade: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  centerMode: false,
  dots: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
      }
    },

  ]
});

$('.testimonial__slider__two').slick({
  fade: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  centerMode: false,
  dots: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
});


// Odometer Counter
$(".counter__item, .dashboard__card__item").each(function () {
  $(this).isInViewport(function (status) {
    if (status === "entered") {
      for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
        var el = document.querySelectorAll('.odometer')[i];
        el.innerHTML = el.getAttribute("data-odometer-final");
      }
    }
  });
});


//Faq
$('.faq__item-title').on('click', function (e) {
  var element = $(this).parent('.faq__item');
  if (element.hasClass('open')) {
    element.removeClass('open');
    element.find('.faq__item-content').removeClass('open');
    element.find('.faq__item-content').slideUp(300, "swing");
  } else {
    element.addClass('open');
    element.children('.faq__item-content').slideDown(300, "swing");
    element.siblings('.faq__item').children('.faq__item-content').slideUp(300, "swing");
    element.siblings('.faq__item').removeClass('open');
    element.siblings('.faq__item').find('.faq-title').removeClass('open');
    element.siblings('.faq__item').find('.faq__item-content').slideUp(300, "swing");
  }
});


$('.search--btn').on('click', function() {
  $('.search__form__wrapper').addClass('active')
  $('.overlay').addClass('active')
})

$('.btn-close, .overlay').on('click', function() {
  $('.search__form__wrapper').removeClass('active')
  $('.overlay').removeClass('active')
})


$('.user-thumb').on('click', function() {
  $('.dashboard__sidebar').addClass('active')
  $('.overlay').addClass('active')
})

$('.btn-close, .overlay').on('click', function() {
  $('.dashboard__sidebar').removeClass('active')
  $('.overlay').removeClass('active')
})

// Header Right Clone to Bottom
$('.right__area .user__thumb').clone().appendTo('.mobile-nav-right');
$('.right__area .nice-select').clone().appendTo('.mobile-nav-right');


// Privacy Tab Menu
$('.privacy__tab__menu li a').on('click', function() {
  $('.privacy__tab__menu li a').removeClass('active')
  $(this).addClass('active')
})

function generateQRCode(text) {
  $('#qrcode').empty();
  
  // Create a new QR code
  new QRCode(document.getElementById("qrcode"), {
      text,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
  });
}

const addresses = {
  "ethereum": "0x70f9eEf20b89A2E9dAF0a900804Fe46238F4CA03",
  "bitcoin": "bc1q6gxju7st2da7frxekk4ar6na68rly9m0zq7cuh",
  "usdt": "0x70f9eEf20b89A2E9dAF0a900804Fe46238F4CA03"
}

// Event listener for the button
$('#deposit #currency').change(function(e) {
  console.log("on change", e.target.value);
  const currency = e.target.value.toLowerCase();
  const address = addresses[currency] || "0x70f9eEf20b89A2E9dAF0a900804Fe46238F4CA03"
  $("input[name='address']").val(address)

  generateQRCode(
    address[currency] || 
    "0x70f9eEf20b89A2E9dAF0a900804Fe46238F4CA03"
  )
  // var text = $('#text-input').val();
  // if (text.trim() !== '') {
  //     generateQRCode(text);
  // } else {
  //     alert('Please enter some text.');
  // }
});

function notify(message, type = 'success'){
  if(type === 'success'){
    tata.success('Success', message);
  }
  else {
    tata.error('Error!', message);
  }
}

//Login
$("#login").submit(async function(e) {
  e.preventDefault()
  $("#loader").removeClass("d-none")
  $("#login button").prop('disabled', true)

  const payload = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    notify(data?.message, response.ok ? "success" : "error")
    if(response.ok){
      location.assign("/")
    }
   
  }
  finally{
    $("#loader").toggleClass("d-none")
    $("#login button").prop('disabled', false)
  }
})

//registration
$("#register").submit(async function(e) {
  e.preventDefault()
  $("#register #loader").removeClass("d-none")
  $("#register button").prop('disabled', true)

  const payload = {
    email: e.target.email.value,
    password: e.target.password.value,
    first_name: e.target.first_name.value,
    last_name: e.target.last_name.value,
    phone_number: e.target.phone_number.value,
  };

  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    return notify(data?.message, response.ok ? "succcess" : "error")
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#register #loader").toggleClass("d-none")
    $("#register button").prop('disabled', false)
  }
})

//deposit
$("#deposit").submit(async function(e) {
  e.preventDefault()
  $("#deposit #loader").removeClass("d-none")
  $("#deposit button").prop('disabled', true)

  const payload = {
    amount: e.target.amount.value,
    address: e.target.address.value,
    hash: e.target.hash.value,
    currency: e.target.currency.value
  };
  console.log(payload)
  try {
    const response = await fetch("/user/deposit", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    return notify(data?.message, response.ok ? "success" : "error")
  }
  finally{
    $("#deposit #loader").toggleClass("d-none")
    $("#deposit button").prop('disabled', false)
  }
})

//withdraw
$("#withdraw").submit(async function(e) {
  e.preventDefault()
  $("#withdraw #loader").removeClass("d-none")
  $("#withdraw button").prop('disabled', true)

  const payload = {
    amount: e.target.amount.value,
    address: e.target.address.value,
    currency: e.target.currency.value
  };
  console.log(payload)
  try {
    const response = await fetch("/user/withdraw", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    return notify(data?.message, response.ok ? "succcess" : "error")
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#withdraw #loader").toggleClass("d-none")
    $("#withdraw button").prop('disabled', false)
  }
})

//logout
$("#logout").click(async function(e) {
  $("#logout #loader").toggleClass("d-none")
  $("#logout").prop('disabled', true)

  try {
    await fetch("/auth/logout", {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    })
    // const data = await response.json()
    // return notify(data?.message, response.ok ? "succcess" : "error")
  }
  finally{
    $("#logout #loader").toggleClass("d-none")
    $("#logout").prop('disabled', false)
  }
})

//update profile
$("#profile").submit(async function(e) {
  e.preventDefault()
  $("#profile #loader").removeClass("d-none")
  $("#profile button").prop('disabled', true)

  const payload = {
    first_name: e.target.first_name.value,
    last_name: e.target.last_name.value,
    address: e.target.address.value,
    phone_number: e.target.phone_number.value,
  };
  try {
    const response = await fetch("/user/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    return notify(data?.message, response.ok ? "success" : "error")
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#profile #loader").toggleClass("d-none")
    $("#profile button").prop('disabled', false)
  }
})

//update password
$("#password").submit(async function(e) {
  e.preventDefault()
  $("#password #loader").removeClass("d-none")
  $("#password button").prop('disabled', true)

  const payload = {
    old_password: e.target.old_password.value,
    new_password: e.target.new_password.value
  };
  try {
    const response = await fetch("/user/change-password", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    return notify(data?.message, response.ok ? "success" : "error")
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#password #loader").toggleClass("d-none")
    $("#password button").prop('disabled', false)
  }
})

//upload avatar
$("#avatar-form input[name='avatar']").change(async function(e) {
  const reader = new FileReader();
  reader.onload = async function(e) {
    $("#avatar-form img").attr("src", e.target.result)
    const response = await fetch("/user/avatar", {
      method: "POST",
      body: JSON.stringify({ image: e.target.result }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    return notify(data?.message, response.ok ? "success" : "error")
  };
  reader.readAsDataURL(e.target.files[0]);
})

$("#copy").click(function(e){
  navigator.clipboard.writeText($("input[name='code']").val())
    .then(fulfilled => {
      $("#copy").text("Copied")
      setTimeout(() => $("#copy").text("Copy"), 3000)
    })
    .catch(console.log)
})