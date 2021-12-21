$(document).ready(function(){
    (function() {
      'use strict';

      // breakpoint where swiper will be destroyed
      // and switches to a dual-column layout
      const breakpoint = window.matchMedia( '(min-width: 992px)' );

      // keep track of swiper instances to destroy later
      let mySwiper;

      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////

      const breakpointChecker = function() {

        // if larger viewport and multi-row layout needed
        if ( breakpoint.matches === true ) {

          // clean up old instances and inline styles when available
          if ( mySwiper !== undefined ) mySwiper.destroy( true, true );

          // or/and do nothing
          return;

          // else if a small viewport and single column layout needed
          } else if ( breakpoint.matches === false ) {

            // fire small viewport version of swiper
            return enableSwiper();

          }

      };

      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////

      const enableSwiper = function() {

        mySwiper = new Swiper('.swiper-container--directions', {
        slidesPerView: 'auto',
        simulateTouch: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        cssMode: false,
        loop: false,
        navigation: {
            nextEl: '',
            prevEl: '',
        },
            pagination: {
            el: '',
            clickable: true,
        },
            mousewheel: {
            forceToAxis: true,
        },
            touchReleaseOnEdges: true,
            keyboard: false,
        });
        mySwiper = new Swiper('.swiper-container--portfolio-2', {
        simulateTouch: false,
        watchOverflow: true,
        watchSlidesVisibility: true,
        cssMode: false,
        loop: false,
        navigation: {
            nextEl: '',
            prevEl: '',
        },
            pagination: {
            el: '#disc-portfolio-2',
            clickable: true,
        },
            mousewheel: {
            forceToAxis: true,
        },
            touchReleaseOnEdges: true,
            keyboard: false,
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                },
                767: {
                    slidesPerView: 'auto',
                },
                991: {
                    slidesPerView: 1,
                },
                1229: {
                    slidesPerView: 3,
                },
            }
        });

      };

      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////

      // keep an eye on viewport size changes
      breakpoint.addListener(breakpointChecker);

      // kickstart
      breakpointChecker();



    })(); /* IIFE end */
    
    function create_custom_dropdowns() {
        $('select').each(function (i, select) {
            if (!$(this).next().hasClass('dropdown-select')) {
                $(this).after('<div class="dropdown-select wide ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
                var dropdown = $(this).next();
                var options = $(select).find('option');
                var selected = $(this).find('option:selected');
                dropdown.find('.current').html(selected.data('display-text') || selected.text());
                options.each(function (j, o) {
                    var display = $(o).data('display-text') || '';
                    dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
                });
            }
        });

        $('.dropdown-select ul').before('<div class="dd-search"><input id="txtSearchValue" autocomplete="off" onkeyup="filter()" class="dd-searchbox" type="text"></div>');
    }

    // Event listeners

    // Open/close
    $(document).on('click', '.dropdown-select', function (event) {
        if($(event.target).hasClass('dd-searchbox')){
            return;
        }
        $('.dropdown-select').not($(this)).removeClass('open');
        $(this).toggleClass('open');
        if ($(this).hasClass('open')) {
            $(this).find('.option').attr('tabindex', 0);
            $(this).find('.selected').focus();
        } else {
            $(this).find('.option').removeAttr('tabindex');
            $(this).focus();
        }
    });

    // Close when clicking outside
    $(document).on('click', function (event) {
        if ($(event.target).closest('.dropdown-select').length === 0) {
            $('.dropdown-select').removeClass('open');
            $('.dropdown-select .option').removeAttr('tabindex');
        }
        event.stopPropagation();
    });

    function filter(){
        var valThis = $('#txtSearchValue').val();
        $('.dropdown-select ul > li').each(function(){
         var text = $(this).text();
            (text.toLowerCase().indexOf(valThis.toLowerCase()) > -1) ? $(this).show() : $(this).hide();         
       });
    };
    // Search

    // Option click
    $(document).on('click', '.dropdown-select .option', function (event) {
        $(this).closest('.list').find('.selected').removeClass('selected');
        $(this).addClass('selected');
        var text = $(this).data('display-text') || $(this).text();
        $(this).closest('.dropdown-select').find('.current').text(text);
        $(this).closest('.dropdown-select').prev('select').val($(this).data('value')).trigger('change');
    });

    // Keyboard events
    $(document).on('keydown', '.dropdown-select', function (event) {
        var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
        // Space or Enter
        //if (event.keyCode == 32 || event.keyCode == 13) {
        if (event.keyCode == 13) {
            if ($(this).hasClass('open')) {
                focused_option.trigger('click');
            } else {
                $(this).trigger('click');
            }
            return false;
            // Down
        } else if (event.keyCode == 40) {
            if (!$(this).hasClass('open')) {
                $(this).trigger('click');
            } else {
                focused_option.next().focus();
            }
            return false;
            // Up
        } else if (event.keyCode == 38) {
            if (!$(this).hasClass('open')) {
                $(this).trigger('click');
            } else {
                var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
                focused_option.prev().focus();
            }
            return false;
            // Esc
        } else if (event.keyCode == 27) {
            if ($(this).hasClass('open')) {
                $(this).trigger('click');
            }
            return false;
        }
    });

    $(document).ready(function () {
        create_custom_dropdowns();
    });
    
    // quantity buttons
    $('.quantity__button--minus').click(function () {
		var $input = $(this).parents('.quantity').find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.quantity__button--plus').click(function () {
		var $input = $(this).parents('.quantity').find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
    });
    
    // menu responsive
    $('[data-target]').on('click', function(){
        var target = $(this).data("target");
        if($(this).hasClass('target-absolute')) {
            $(this).toggleClass('active');
            $(target).toggleClass('active');
            $(target).siblings('.overlay').addClass('active');
            if($(this).hasClass('overlay')) {
                $(this).removeClass('active');
                $('.header__icons-icon--hamburger').removeClass('active');
            }
        }
        else if($(this).hasClass('css-toggle')) {
            $(this).toggleClass('active').siblings(target).toggleClass('active');
        }
        else if($(this).hasClass('faq__button')) {
            $(this).toggleClass('active').siblings(target).slideToggle().toggleClass('active');
            $(this).parent('.faq__block').toggleClass('active');
        }
        else {
            $(this).toggleClass('active').siblings(target).slideToggle();
        }
        
    });


    // carousel
    var swiper = new Swiper('.swiper-container--intro', {
        slidesPerView: 1,
        simulateTouch: false,
        spaceBetween: 0,
        watchSlidesVisibility: true,
        effect: 'fade',
        pagination: {
            el: '#disc-intro',
            clickable: true,
        },
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
        mousewheel: {
            forceToAxis: true,
        },
        on: {
            slideChangeTransitionStart: function () {
                $('.intro__picture').hide(0);
                $('.intro__picture').removeClass('aos-init').removeClass('aos-animate');
              },
            slideChangeTransitionEnd: function () {
                $('.intro__picture').show(0);
                AOS.init();
            },
        },
        keyboard: false,
    });
    mySwiper = new Swiper('.swiper-container--team', {
        simulateTouch: false,
        watchOverflow: true,
        watchSlidesVisibility: true,
        cssMode: false,
        loop: false,
        navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
        pagination: {
        el: '#disc-team',
        clickable: true,
    },
        mousewheel: {
        forceToAxis: true,
    },
        touchReleaseOnEdges: true,
        keyboard: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 3,
            },
            991: {
                slidesPerView: 3,
            },
            1229: {
                slidesPerView: 3,
            },
        }
    });
    mySwiper = new Swiper('.swiper-container--reviews', {
        simulateTouch: false,
        watchOverflow: true,
        watchSlidesVisibility: true,
        cssMode: false,
        loop: false,
        navigation: {
        nextEl: '#next-reviews',
        prevEl: '#prev-reviews',
    },
        pagination: {
        el: '#disc-reviews',
        clickable: true,
    },
        mousewheel: {
        forceToAxis: true,
    },
        touchReleaseOnEdges: true,
        keyboard: false,
        breakpoints: {
            0: {
                slidesPerView: 'auto',
            },
            767: {
                slidesPerView: 'auto',
            },
            991: {
                slidesPerView: 1,
            },
            1229: {
                slidesPerView: 2,
            },
        }
    });
    mySwiper = new Swiper('.swiper-container--portfolio', {
        simulateTouch: false,
        watchOverflow: true,
        watchSlidesVisibility: true,
        cssMode: false,
        loop: false,
        navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
        pagination: {
        el: '#disc-portfolio',
        clickable: true,
    },
        mousewheel: {
        forceToAxis: true,
    },
        touchReleaseOnEdges: true,
        keyboard: false,
        breakpoints: {
            0: {
                slidesPerView: 'auto',
            },
            575: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 2,
            },
            1229: {
                slidesPerView: 3,
            },
        }
    });
    mySwiper = new Swiper('.swiper-container--clients', {
        simulateTouch: false,
        watchOverflow: true,
        watchSlidesVisibility: true,
        cssMode: false,
        loop: false,
        navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
        pagination: {
        el: '#disc-clients',
        clickable: true,
    },
        mousewheel: {
        forceToAxis: true,
    },
        touchReleaseOnEdges: true,
        keyboard: false,
        breakpoints: {
            0: {
                slidesPerView: 'auto',
            },
            767: {
                slidesPerView: 'auto',
            },
            991: {
                slidesPerView: 2,
            },
            1229: {
                slidesPerView: 6,
            },
        }
    });
    mySwiper = new Swiper('.swiper-container--news', {
        simulateTouch: false,
        watchOverflow: true,
        watchSlidesVisibility: true,
        cssMode: false,
        loop: false,
        navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
        pagination: {
        el: '#disc-news',
        clickable: true,
    },
        mousewheel: {
        forceToAxis: true,
    },
        touchReleaseOnEdges: true,
        keyboard: false,
        breakpoints: {
            0: {
                slidesPerView: 'auto',
            },
            767: {
                slidesPerView: 'auto',
            },
            991: {
                slidesPerView: 1,
            },
            1229: {
                slidesPerView: 3,
            },
        }
    });
    mySwiper = new Swiper('.swiper-container--product-list', {
        simulateTouch: false,
        watchOverflow: true,
        watchSlidesVisibility: true,
        cssMode: false,
        loop: false,
        navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
        pagination: {
        el: '#disc-product-list',
        clickable: true,
    },
        mousewheel: {
        forceToAxis: true,
    },
        touchReleaseOnEdges: true,
        keyboard: false,
        breakpoints: {
            0: {
                slidesPerView: 'auto',
            },
            767: {
                slidesPerView: 'auto',
            },
            991: {
                slidesPerView: 1,
            },
            1229: {
                slidesPerView: 4,
            },
        }
    });
    
    // AOS aniamte
    $(function () {
        AOS.init();
    });
    
    // Form validate
    $('form').each(function() {
        $(this).validate({
            highlight: function(element) {
                $(element).parents('.form-block__group-wrapper, .form__group').addClass('error');
            },
            unhighlight: function(element) {
                $(element).parents('.form-block__group-wrapper, .form__group').removeClass('error');
            },
            errorPlacement: function(error,element) {
                return true;
            },
            errorClass: 'form__error',
            errorElement: 'div',
            rules: {
                userName: {
                    required: true,
                },
                userTel: {
                    required: true,
                },
                userEmail: {
                    required: true,
                },
                userMsg: {
                    required: true,
                }
            },
            messages: {
                userName: {
                    required: '',
                },
                userTel: {
                    required: '',
                },
                userEmail: {
                    required: '',
                },
                userMsg: {
                    required: '',
                }
            }
        });
    });
    
    // mask
    $('input[type="tel"]').mask('+7 (999) 999-99-99');
});