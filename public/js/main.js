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

// Responsive Menu
var headerTrigger3 = $('.header-trigger-3');
headerTrigger3.on('click', function(){
    $('.sidebar, .header-trigger-3').toggleClass('active')
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

$('.plan__details__btn').on('click', function() {
  $('#plan__details__form').addClass('active')
  $('.overlay').addClass('active')

  $(this).attr('data-plan').split(",").forEach(i => {
    const [key, val] = i.split(":")
    $(`#plan__details__form input[name='${key}']`).val(val)
  })
})

$('.user__details__btn').click(function() {
  $('#user__details__form').addClass('active')
  $('.overlay').addClass('active')

  $(this).attr('data-user').split(",").forEach(i => {
    const [key, val] = i.split("::")
    console.log(key, val)
    $(`#user__details__form input[name='${key}']`).val(val)

    if(key === "kyc_docs" && val){
      $(`#user__details__form .view-docs`).removeClass("d-none")
      $(`#user__details__form .view-docs`).attr("href",val)
    }
    if(key === "kyc_docs" && val){
      $(`#user__details__form .view-docs`).removeClass("d-none")
      $(`#user__details__form .view-docs`).attr("href",val)
    }
    if(key === "role"){
      console.log(key, val)
      $(`#user__details__form input[name='role']`).attr("checked", val === "admin")
    }
  })

  
});

$('.tx__details__btn').click(function() {
  $('#tx__details__form').addClass('active')
  $('.overlay').addClass('active')

  $(this).attr('data-tx').split(",").forEach(i => {
    const [key, val] = i.split(":")
    $(`#tx__details__form input[name='${key}']`).val(val)
    $(`#tx__details__form select[name='${key}']`).val(val)
  })
  
});

$('.inv__details__btn').click(function() {
  $('#inv__details__form').addClass('active')
  $('.overlay').addClass('active')

  $(this).attr('data-inv').split(",").forEach(i => {
    const [key, val] = i.split(":")
    $(`#inv__details__form input[name='${key}']`).val(val)
    $(`#inv__details__form select[name='${key}']`).val(val)
  })
  
});


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
  "ethereum": "0x157678029acbF2f308D0F521e99359a8eafFdb04",
  "bitcoin": "bc1q2ggnqnxppdkat25fhcu8g3lfwj4ychqkp49092",
  "usdt.erc20": "0x157678029acbF2f308D0F521e99359a8eafFdb04",
  "usdt.bep20": "0x157678029acbF2f308D0F521e99359a8eafFdb04",
  "usdt.trc20": "TZ5i12ak6YJKhTre1cuY5X5z8PGPKmFjQT"
}

// Event listener for the button
$('#deposit #currency').change(function(e) {
  console.log("on change", e.target.value);
  const currency = e.target.value.toLowerCase();
  const address = addresses[currency] || "0x157678029acbF2f308D0F521e99359a8eafFdb04"
  $("input[name='address']").val(address)

  generateQRCode(address)
});

function stringToObject(str){
  const raw = str.split(",")
  const obj = {}
  raw.forEach(p => {
    const [key, value] = p.split(":")
    obj[key] = value;
  })

  return obj
}

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
  $("#login #loader").toggleClass("d-none")
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
    $("#login #loader").toggleClass("d-none")
    $("#login button").prop('disabled', false)
  }
})

$("#profit_calculator input[name='capital']").change(e => {
  const plan = stringToObject($("#profit_calculator select[name='rate']").val())
  let capital = e.target.value;
  capital = capital > Number(plan?.max_price) ? Number(plan?.max_price) : capital;
  const profit = Number(plan?.rate) * 0.01 * capital;

  $("#profit_calculator input[name='profit']").val(profit)
})

$("#profit_calculator select[name='rate']").change(e => {
  const capitalEle = $("#profit_calculator input[name='capital']")
  const plan = stringToObject(e.target.value)

  let capital = capitalEle.val()
  capital = capital > Number(plan?.max_price) ? Number(plan?.max_price) : capital;

  const profit = capital * 0.01 * Number(plan?.rate);
  
  $("#profit_calculator input[name='profit']").val(profit)
})

//registration
$("#register").submit(async function(e) {
  e.preventDefault()
  $("#register #loader").toggleClass("d-none")
  $("#register button").prop('disabled', true)

  const payload = {
    email: e.target.email.value,
    password: e.target.password.value,
    first_name: e.target.first_name.value,
    last_name: e.target.last_name.value,
    phone_number: e.target.phone_number.value,
    referral_code: e.target.referral_code.value,
  };

  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    notify(data?.message, response.ok ? "success" : "error")
    if(response.ok){
      location.assign("/")
    }
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#register #loader").toggleClass("d-none")
    $("#register button").prop('disabled', false)
  }
})

//forget password
$("#forget-password").submit(async function(e) {
  e.preventDefault()
  $("#forget-password #loader").toggleClass("d-none")
  $("#forget-password button").prop('disabled', true)

  try {
    const response = await fetch("/auth/send-otp", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: e.target.email.value })
    })
    const data = await response.json()
    notify(data?.message, response.ok ? "success" : "error")
    if(response.ok){
      $("#forget-password p").text(data?.message)
    }
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#forget-password #loader").toggleClass("d-none")
    $("#forget-password button").prop('disabled', false)
  }
})

//reset password
$("#reset-password").submit(async function(e) {
  e.preventDefault()
  $("#reset-password #loader").toggleClass("d-none")
  $("#reset-password button").prop('disabled', true)

  const payload = {
    token: e.target.token.value,
    password: e.target.password.value,
    cpassword: e.target.cpassword.value,
  };

  if(payload.cpassword !== payload.password){
    $("#reset-password #loader").toggleClass("d-none")
    $("#reset-password button").prop('disabled', false)
    return notify("Confirm password", "error")
  }

  try {
    const response = await fetch("/auth/reset-password", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    notify(data?.message, response.ok ? "success" : "error")
    if(response.ok){
      location.assign("/login")
    }
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#reset-password #loader").toggleClass("d-none")
    $("#reset-password button").prop('disabled', false)
  }
})

//deposit
$("#deposit").submit(async function(e) {
  e.preventDefault()
  $("#deposit #loader").toggleClass("d-none")
  $("#deposit button").prop('disabled', true)

  const payload = {
    amount: e.target.amount.value,
    address: e.target.address.value,
    hash: e.target.hash.value,
    network: e.target.currency.value
  };

  try {
    const response = await fetch("/user/deposit", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    notify(data?.message, response.ok ? "success" : "error")
    if(response.ok){
      location.assign("/dashboard")
    }
    return 
  }
  finally{
    $("#deposit #loader").toggleClass("d-none")
    $("#deposit button").prop('disabled', false)
  }
})

//withdraw
$("#withdraw").submit(async function(e) {
  e.preventDefault()
  $("#withdraw #loader").toggleClass("d-none")
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
    return notify(data?.message, response.ok ? "success" : "error")
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#withdraw #loader").toggleClass("d-none")
    $("#withdraw button").prop('disabled', false)
  }
})

//referral withdraw
$("#referral__withdrawal").click(async function(e) {
  $("#referral__withdrawal #loader").toggleClass("d-none")
  $("#referral__withdrawal").prop('disabled', true)

  try {
    const response = await fetch("/user/referral/withdraw", {method: "POST"})
    const data = await response.json()
    return notify(data?.message, response.ok ? "success" : "error")
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#referral__withdrawal #loader").toggleClass("d-none")
    $("#referral__withdrawal").prop('disabled', false)
  }
})

//investment withdrawal
$(".inv__withdrawal").click(async function(e) {
  $(".inv__withdrawal #loader").toggleClass("d-none")
  $(".inv__withdrawal").prop('disabled', true)

  console.log($(this).attr('data-inv'))
  try {
    const response = await fetch("/investment/withdraw", {
      method: "POST",
      body: JSON.stringify({ id: $(this).attr('data-inv')}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    return notify(data?.message, response.ok ? "success" : "error")
  }
  catch(error){
    console.log(error)
  }
  finally{
    $(".inv__withdrawal #loader").toggleClass("d-none")
    $(".inv__withdrawal").prop('disabled', false)
  }
})

//logout
$("#logout").click(async function(e) {
  $("#logout #loader").toggleClass("d-none")
  $("#logout").prop('disabled', true)

  try {
    const response = await fetch("/auth/logout", {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    if(response.ok) location.replace('/')
    return notify(data?.message, response.ok ? "success" : "error")
  }
  finally{
    $("#logout #loader").toggleClass("d-none")
    $("#logout").prop('disabled', false)
  }
})

//update profile
$("#profile").submit(async function(e) {
  e.preventDefault()
  $("#profile #loader").toggleClass("d-none")
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
  $("#password #loader").toggleClass("d-none")
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

$("#copy__addr").click(function(e){
  navigator.clipboard.writeText($("input[name='address']").val())
    .then(fulfilled => {
      $("#copy__addr").text("Copied")
      setTimeout(() => $("#copy__addr").text("Copy"), 3000)
    })
    .catch(console.log)
})

function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  return amount.toLocaleString(locale, { style: 'currency', currency});
}

$("#plan select").change(function(e){
  const plan = stringToObject(e.target.value)

  $("#plan input[type='number']").attr("min", plan?.min_price)
  $("#plan input[type='number']").attr("max", plan?.max_price)

  $("#plan_details h2").text(plan?.rate + "%")
  $("#plan_details #min").text(formatCurrency(plan?.min_price) + " USD")
  $("#plan_details #max").text(formatCurrency(plan?.max_price) + " USD")
  $("#plan_details .plan__item-footer p").text(plan?.name)
})

//create investment
$("#plan").submit(async function(e) {
  e.preventDefault()
  $("#plan #loader").toggleClass("d-none")
  $("#plan button").prop('disabled', true)

  const raw = e.target.plan_id.value.split(",")
  const plan = {}
  raw.forEach(p => {
    const [key, value] = p.split(":")
    plan[key] = value;
  })

  const payload = {
    plan_id: plan.id,
    amount: e.target.amount.value
  };
  try {
    const response = await fetch("/investment", {
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
    $("#plan #loader").toggleClass("d-none")
    $("#plan button").prop('disabled', false)
  }
})

//edit user
$("#user__details__form").submit(async function(e) {
  e.preventDefault()
  $("#user__details__form #loader").toggleClass("d-none")
  $("#user__details__form button").prop('disabled', true)
  
  const payload = {
    first_name: e.target.first_name.value,
    last_name: e.target.last_name.value,
    _id: e.target._id.value,
    balance: e.target.balance.value,
    earnings: e.target.earnings.value,
    total_withdrawal: e.target.total_withdrawal.value,
    total_deposit: e.target.total_deposit.value,
    verified: $("#verify-kyc").is(":checked"),
    role: $("#role").is(":checked") ? "admin" : "user",
    reset: $("#reset").is(":checked"),
    password: e.target.password.value
  };
  try {
    const response = await fetch("/admin/users", {
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
    $("#user__details__form #loader").toggleClass("d-none")
    $("#user__details__form button").prop('disabled', false)
  }
})

$("#plan__details__form").submit(async function(e) {
  e.preventDefault()
  $("#plan__details__form #loader").toggleClass("d-none")
  $("#plan__details__form button").prop('disabled', true)

  const payload = {
    name: e.target.name.value,
    _id: e.target._id.value,
    rate: e.target.rate.value,
    max_price: e.target.max_price.value,
    min_price: e.target.min_price.value
  };
  try {
    const response = await fetch("/admin/plans", {
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
    $("#plan__details__form #loader").toggleClass("d-none")
    $("#plan__details__form button").prop('disabled', false)
  }
})

$("#tx__details__form").submit(async function(e) {
  e.preventDefault()
  $("#tx__details__form #loader").toggleClass("d-none")
  $("#tx__details__form button").prop('disabled', true)

  const payload = {
    type: e.target.type.value,
    _id: e.target._id.value,
    amount: e.target.amount.value,
    currency: e.target.currency.value,
    status: e.target.status.value,
    description: e.target?.description?.value
  };
  try {
    const response = await fetch("/admin/transactions", {
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
    $("#tx__details__form #loader").toggleClass("d-none")
    $("#tx__details__form button").prop('disabled', false)
  }
})

$("#inv__details__form").submit(async function(e) {
  e.preventDefault()
  $("#inv__details__form #loader").toggleClass("d-none")
  $("#inv__details__form button").prop('disabled', true)

  const payload = {
    _id: e.target._id.value,
    capital: e.target.capital.value,
    profit: e.target.profit.value,
    status: e.target.status.value,
  };
  try {
    const response = await fetch("/admin/investments", {
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
    $("#inv__details__form #loader").toggleClass("d-none")
    $("#inv__details__form button").prop('disabled', false)
  }
})

//registration
$("#send_mail").submit(async function(e) {
  e.preventDefault()

  $("#send_mail_loader").toggleClass("d-none")
  $("button").prop('disabled', true)

  const payload = {
    to: e.target.to.value,
    subject: e.target.subject.value,
    message: e.target.message.value
  };

  try {
    const response = await fetch("/admin/sendmail", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    notify(data?.message, response.ok ? "success" : "error")
  }
  catch(error){
    console.log(error)
  }
  finally{
    $("#send_mail_loader").toggleClass("d-none")
    $("#send-mail button").prop('disabled', false)
  }
})

$("#kyc").submit(async function(e) {
  e.preventDefault()

  const reader = new FileReader();
  reader.onload = async function(e) {
    await upload(e.target.result)
  };
  reader.readAsDataURL(e.target.docs.files[0]);

  async function upload(image){
    $("#kyc #loader").toggleClass("d-none")
    $("#kyc button").prop('disabled', true)
    try {
      const response = await fetch("/user/kyc", {
        method: "POST",
        body: JSON.stringify({ image }),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      console.log(
        data,
        response.ok
      )
      return notify(data?.message, response.ok ? "success" : "error")
    }
    catch(error){
      console.log(error)
    }
    finally{
      $("#kyc #loader").toggleClass("d-none")
      $("#kyc button").prop('disabled', false)
    }
  }
})

$("#contact").submit(async function(e) {
  e.preventDefault()
  $("#contact #loader").toggleClass("d-none")
  $("#contact button").prop('disabled', true)

  const payload = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  };
  try {
    const response = await fetch("/user/contact", {
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
    $("#contact #loader").toggleClass("d-none")
    $("#contact button").prop('disabled', false)
  }
})
function togggelPassword(selector){
  const field = $(`${selector} input`)
  const btn = $(`${selector} span.eye-icon`)
  const icon = $(`${selector} span.eye-icon i`)

  btn.on("click", function(){
    const type = field.attr('type');
    if(type === "password"){
      field.attr("type", "text")

      icon.removeClass("la-eye")
      icon.addClass("la-eye-slash")
    } else {
      field.attr("type", "password")

      icon.addClass("la-eye")
      icon.removeClass("la-eye-slash")
    }
  })
}

togggelPassword(".password-intput")