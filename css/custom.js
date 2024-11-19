(function($){
    $(function() {
    // Owl Carousel
    var owl = $(".slide-home");
    owl.owlCarousel({
      items: 1,
      margin: 0,
      loop: true,
      nav: false,
      dots: false,
      autoplay:true
    });
  });
  
  
    $(function() {
    // Owl Carousel
    var owl = $(".product-slide");
    owl.owlCarousel({
      items: 4,
      margin: 20,
      loop: true,
      nav: true,
      dots: false,
      autoplay:false,
      responsive: {
        0: {
            items: 2,
            nav: false,
        },
        768: {
            items: 4
        },
        991: {
            items: 4
        },
        1000: {
            items: 4
        }
    }
    });
  });
   
  
  })(jQuery); // End of use strict

 
  $(document).ready(function(){
    $(".navigation li").hover(
      function() {
        $(this).addClass("show-submenu").siblings().removeClass("show-submenu");
      },
      function() {
        $(this).removeClass("show-submenu");
      }
    );


    $(".mobile-navigation").click(function(e){
      e.preventDefault();
        $(this).next().slideToggle();
    });
  });
  
  $(document).ready(function(){
    $(window).scroll(function(){
      var header = $("header");
      header.toggleClass("stick", $(window).scrollTop() > 0 );
    });
  });
  


  // Open form search
  $(document).on('click','.icon-search .icon',function(){
    $('#form-search').toggle();
    $('#form-search').find('input[type="text"]').focus();
    $('.main-header .logo,.main-header .main-menu, .main-header .mini-cart').css('opacity','0');
})

/* Close form search */
$(document).on('click','*',function(e){
    var container = $("#form-search");
    var icon = $('.icon-search .icon');
    if (!container.is(e.target) && container.has(e.target).length === 0 && !icon.is(e.target) && icon.has(e.target).length === 0 ){
        container.hide();
        $('.main-header .logo,.main-header .main-menu, .main-header .mini-cart').css('opacity','1');
    }
})



// $('.client-logo').owlCarousel({
//     loop: true,
//     margin: 0,
//     dots: false,
//     nav: false,
//     autoplay: true,
//     navText: ["<i class='icofont icofont-thin-left'></i>", "<i class='icofont icofont-thin-right'></i>"],
//     responsive: {
//         0: {
//             items: 2
//         },
//         300: {
//             items: 2
//         },
//         600: {
//             items: 3
//         },
//         1000: {
//             items: 6
//         }
//     }
// })

$('.testi.owl-carousel').owlCarousel({
  loop: true,
  items: 2,
  margin:10,
  lazyLoad: true,
  dots:true,
  autoPlay: true,
  autoPlayTimeout: 3000,
  responsive:{
    0:{
      items:1,
    },
    600:{
      items:2,
    },
    1000:{
      items:2,
    }
  }
});


// Select single product
$(document).on('click','.single-product-thumbnails span',function(){
  $(this).closest('.single-product-thumbnails').find('span').each(function(){
      $(this).removeClass('selected');
  });
  $(this).addClass('selected');
  var image_full = $(this).data('image_full');
  $(this).closest('.single-images').find('.main-image').attr('src',image_full);
  $(this).closest('.single-images').find('.popup-image').attr('href',image_full);
  
  return false;
})
// popup image
if($('.popup-image').length >0 ){
  $('.popup-image').magnificPopup({type:'image'});
}


// single product slider 

$(document).ready(function(){
  var mainCarousel = $(".main-carousel");
  var navCarousel = $(".nav-carousel");

  // Initialize Main Carousel with multiple items
  mainCarousel.owlCarousel({
    items: 1, // Number of items to display in main carousel
    slideSpeed: 300,
    pagination: false,
    dots: false,   // Disable dots
    nav: false,    // Disable nav arrows
    afterAction: syncPosition // Keep sync function
  });

  // Initialize Navigation Carousel (thumbnails)
  navCarousel.owlCarousel({
    items: 4, // Number of thumbnails to show
    pagination: false,
    margin:15,
    dots: false,  // Disable dots
    nav: true,   // Disable nav arrows
    responsiveRefreshRate: 100,
    afterInit: function(el){
      el.find(".owl-item").eq(0).addClass("current");
    },
    responsive:{
      0:{
        items:1,
      },
      400:{
        items:2,
      },
      600:{
        items:3,
      },
      800:{
        items:3,
      },
      1000:{
        items:4,
      }
    }
  });

  // Sync position function (used when mainCarousel moves)
  function syncPosition(el){
    var current = this.currentItem;
    $(".nav-carousel")
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    
    if($(".nav-carousel").data("owlCarousel") !== undefined){
      center(current);
    }
  }

  // Clicking on navigation item updates the main carousel
  $(".nav-carousel").on("click", ".owl-item", function(e){
    e.preventDefault();
    var index = $(this).index();
    mainCarousel.trigger('to.owl.carousel', [index, 300]); // Updated method
  });

  // Centering function for navigation carousel
  function center(index){
    var navVisibleItems = navCarousel.data("owlCarousel").owl.visibleItems;
    var num = index;
    var found = false;

    // Check if the number is already in the visible items
    for(var i in navVisibleItems){
      if(num === navVisibleItems[i]){
        found = true;
      }
    }

    // If the item is not visible, scroll the nav carousel
    if(found === false){
      if(num > navVisibleItems[navVisibleItems.length - 1]){
        navCarousel.trigger('to.owl.carousel', [num - navVisibleItems.length + 2, 300]);
      } else {
        if(num - 1 === -1){
          num = 0;
        }
        navCarousel.trigger('to.owl.carousel', [num, 300]);
      }
    } else if(num === navVisibleItems[navVisibleItems.length - 1]){
      navCarousel.trigger('to.owl.carousel', [navVisibleItems[1], 300]);
    } else if(num === navVisibleItems[0]){
      navCarousel.trigger('to.owl.carousel', [num - 1, 300]);
    }
  }
});


let quntPlus = document.querySelector(".quantity-plus")
let quntMinus = document.querySelector(".quantity-minus")
let quantity = document.querySelector("#quantity")

if (quntPlus && quntMinus && quantity) {
 quntPlus.addEventListener("click", function(e) {
   e.preventDefault();
   quantity.value++;
 });

 quntMinus.addEventListener("click", function(e) {
   e.preventDefault();
   if (quantity.value > 0) {
     quantity.value--;
   }
 });
}

$(document).ready(function(){
  $(".product-categories .cat-parent > a").click(function(e){
    e.preventDefault();
    $(this).siblings(".children").slideToggle();
  });
});


// const optField = document.querySelector('.opt-field');
// const prevBtn = document.querySelector('.prev-btn');
// const nextBtn = document.querySelector('.next-btn');
// const scrollAmount = 150; // Amount to scroll on each button click

// prevBtn.addEventListener('click', () => {
//     optField.scrollBy({
//         left: -scrollAmount,
//         behavior: 'smooth'
//     });
// });

// nextBtn.addEventListener('click', () => {
//     optField.scrollBy({
//         left: scrollAmount,
//         behavior: 'smooth'
//     });
// });


$(document).ready(function() {
  const $optField = $('.opt-field');
  const $prevBtn = $('.prev-btn');
  const $nextBtn = $('.next-btn');
  const scrollAmount = 150; // Amount to scroll on each button click

  // Scroll left on prev button click
  $prevBtn.on('click', function() {
      $(this).next(".opt-field").animate({
          scrollLeft: $optField.scrollLeft() - scrollAmount
      }, 300); // Smooth scroll with 300ms duration
  });

  // Scroll right on next button click
  $nextBtn.on('click', function() {
    $(this).prev(".opt-field").animate({
          scrollLeft: $optField.scrollLeft() + scrollAmount
      }, 300); // Smooth scroll with 300ms duration
  });
});








function toggleDropdown($dropdown) {
  const $options = $dropdown.find('.select-options');
  $options.toggle();
}

function selectOption(event) {
  const $target = $(event.target);
  const selectedValue = $target.data('value');
  const selectedText = $target.text();
  
  const $dropdown = $target.closest('.custom-select-container');
  $dropdown.find('.select-label').text(selectedText);
  $dropdown.find('.selected-value').val(selectedValue); // Assuming there's a hidden input for the selected value
  
  // Close the dropdown after selection
  toggleDropdown($dropdown);
}

// Add event listeners to each option within a dropdown
$('.custom-select-container').each(function() {
  const $dropdown = $(this);
  
  $dropdown.find('.select-label').on('click', function() {
    toggleDropdown($dropdown);
  });
  
  $dropdown.find('.select-options li').on('click', selectOption);
});

// Close any open dropdown if clicked outside
$(document).on('click', (e) => {
  if (!$(e.target).closest('.custom-select-container').length) {
    $('.select-options').hide();
  }
});


// filter toggle 

$(document).ready(function(){
$(".filter-title").click(function(){
  $(this).next().slideToggle();
});
});