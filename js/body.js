// getting-elements-and-values
var page_is_loading_container = document.querySelector('.flash-page-is-loading-container');
var page_is_loading = document.querySelector('.flash-page-is-loading');
var my_post_slide= document.getElementById('my_post_slide');
var my_extra_search_form = document.getElementById('flash-search-form-in-body');
var my_photo_slide = document.getElementById('my-photo-slide');
var my_under_post_slide = document.getElementById('my_under_post_slide');
var my_over_posts_slide = document.getElementById('my_over_posts_slide');
var my_first_type_slide = document.getElementById('my-first-type-slide');


// using-functions
flash_post_slide(my_post_slide, true, "normal", true, true);
flash_extra_search_form(my_extra_search_form);
flash_first_type_slide(my_first_type_slide, true);

// flash_slide_images(my_photo_slide, {
// 	show_type: "slide",
// 	time: "very-slow",
// 	autoplay: true,
// 	link_buttons: true,
// 	control_bar: true,
// 	full_screen: true,
// 	prev_next: true,
// 	numbers: true,
// 	circles: false
// });
flash_simple_slide(my_under_post_slide, true, "very-slow", true);
flash_post_slide(my_over_posts_slide, true, "slow", true);
body_rightside_container();
flash_main_user_comments();
// the-end-of-using-functions


// informations - with-scroll-animation
var informations_parent = document.querySelector('.informations-about-us-list');
var informations_text = informations_parent.querySelectorAll('.informations-about-us-list-text');
var informations_number = informations_parent.querySelectorAll('.informations-about-us-list-number');

const flash_element_is_in_view = (el, percentageScroll = 100) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <= 
    ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
  );
};

var first_information_is_scrolled = false;
var second_information_is_scrolled = false;
var third_information_is_scrolled = false;
var fourth_information_is_scrolled = false;

const flash_handle_scroll_of_first_information = () => {

	if (!first_information_is_scrolled && flash_element_is_in_view(informations_text[0], 100)) {

	  flash_write_text(informations_text[0], "", true); 
	  flash_increase_count(informations_number[0], "get-from-target", 0, 3);
	  first_information_is_scrolled = true; 

	}  

}

const flash_handle_scroll_of_second_information = () => {

	if (!second_information_is_scrolled && flash_element_is_in_view(informations_text[1], 100)) {

	  flash_write_text(informations_text[1], "", true); 
	  flash_increase_count(informations_number[1], "get-from-target", 0, 3);
	  second_information_is_scrolled = true; 

	}  

}

const flash_handle_scroll_of_third_information = () => {

	if (!third_information_is_scrolled && flash_element_is_in_view(informations_text[2], 100)) {

	  flash_write_text(informations_text[2], "", true); 
	  flash_increase_count(informations_number[2], "get-from-target", 0, 3);
	  third_information_is_scrolled = true; 

	}  

}

const flash_handle_scroll_of_fourth_information = () => {

	if (!fourth_information_is_scrolled && flash_element_is_in_view(informations_text[3], 100)) {

	  flash_write_text(informations_text[3], "", true); 
	  flash_increase_count(informations_number[3], "get-from-target", 0, 3);
	  fourth_information_is_scrolled = true; 

	}  

}

window.addEventListener('scroll', flash_handle_scroll_of_first_information);
window.addEventListener('scroll', flash_handle_scroll_of_second_information);
window.addEventListener('scroll', flash_handle_scroll_of_third_information);
window.addEventListener('scroll', flash_handle_scroll_of_fourth_information);
window.addEventListener('load', flash_handle_scroll_of_first_information);
window.addEventListener('load', flash_handle_scroll_of_second_information);
window.addEventListener('load', flash_handle_scroll_of_third_information);
window.addEventListener('load', flash_handle_scroll_of_fourth_information);

// the-end-of-informations - with-scroll-animation


function body_rightside_container() {

	var con = document.querySelector('.body-rightside-buttons-container');
	var buttons = con.querySelectorAll('.body-rightside-buttons-link');
	var extra_button = con.querySelector('.body-rightside-buttons-extra-link');

	buttons[0].onmouseover = function() { extra_button.innerHTML = "Onlayn dərslər"; }
	buttons[1].onmouseover = function() { extra_button.innerHTML = "Video dərslər"; }
	buttons[2].onmouseover = function() { extra_button.innerHTML = "İmtahana hazırlıq"; }
}


function flash_main_user_comments() {

	// getting-elements-and-values
	var con = document.querySelector('.flash-body-comments-main-container');

	var first_item = 
	con.querySelector('.flash-body-comments-big-screen-list').querySelector('.flash-body-comments-item');

	var first_small_screen_item = 
	con.querySelector('.flash-body-comments-small-screen-list').querySelector('.flash-body-comments-item');

	var circles_parent = con.querySelector('.flash-body-comments-big-screen-circles');
	var circles = circles_parent.querySelectorAll('.flash-body-comments-circle');

	var small_screen_circles_parent = con.querySelector('.flash-body-comments-small-screen-circles');
	var small_screen_circles = small_screen_circles_parent.querySelectorAll('.flash-body-comments-circle');

	var my_function;
	var my_ss_function;
	var i = 2;
	var i_ss = 2;

	// adding-functions
	circles[0].addEventListener('click', show_first_container);
	circles[1].addEventListener('click', show_second_container);

	small_screen_circles[0].addEventListener('click', show_first_ss_container);
	small_screen_circles[1].addEventListener('click', show_second_ss_container);
	small_screen_circles[2].addEventListener('click', show_third_ss_container);
	small_screen_circles[3].addEventListener('click', show_fourth_ss_container);

	// functions
	function play() {

		my_function = setInterval( function() {

			if (i == 1) {

				first_item.style.marginLeft = "0";
				i = 2;
				active_first_circle();
				
			}

			else if (i == 2) {

				first_item.style.marginLeft = "-100%";
				i = 1;
				active_second_circle();

			}	

		}, 5000);

	}

	function play_ss() {

		my_ss_function = setInterval( function() {

			if (i_ss == 1) {

				first_small_screen_item.style.marginLeft = "0";
				i_ss = 2;
				active_first_ss_circle();
				
			}

			else if (i_ss == 2) {

				first_small_screen_item.style.marginLeft = "-100%";
				i_ss = 3;
				active_second_ss_circle();

			}

			else if (i_ss == 3) {

				first_small_screen_item.style.marginLeft = "-200%";
				i_ss = 4;
				active_third_ss_circle();

			}

			else if (i_ss == 4) {

				first_small_screen_item.style.marginLeft = "-300%";
				i_ss = 1;
				active_fourth_ss_circle();

			}	

		}, 5000);

	}

	function stop() { clearInterval(my_function); }

	function stop_ss() { clearInterval(my_ss_function); }

	function show_first_container() {

		first_item.style.marginLeft = "0";
		i = 2;
		active_first_circle();
		stop();
		play();


	}

	function show_second_container() {

		first_item.style.marginLeft = "-100%";
		i = 1;
		active_second_circle();
		stop();
		play();

	}

	function show_first_ss_container() {

		first_small_screen_item.style.marginLeft = "0";
		i_ss = 2;
		active_first_ss_circle();
		stop_ss();
		play_ss();


	}

	function show_second_ss_container() {

		first_small_screen_item.style.marginLeft = "-100%";
		i_ss = 3;
		active_second_ss_circle();
		stop_ss();
		play_ss();


	}


	function show_third_ss_container() {

		first_small_screen_item.style.marginLeft = "-200%";
		i_ss = 4;
		active_third_ss_circle();
		stop_ss();
		play_ss();


	}

	function show_fourth_ss_container() {

		first_small_screen_item.style.marginLeft = "-300%";
		i_ss = 1;
		active_fourth_ss_circle();
		stop_ss();
		play_ss();


	}

	function active_first_circle() {

		circles[0].classList.add('active');
		circles[1].classList.remove('active');

	}

	function active_second_circle() {

		circles[0].classList.remove('active');
		circles[1].classList.add('active');

	}

	function active_first_ss_circle() {

		small_screen_circles[0].classList.add('active');
		small_screen_circles[1].classList.remove('active');
		small_screen_circles[2].classList.remove('active');
		small_screen_circles[3].classList.remove('active');

	}

	function active_second_ss_circle() {

		small_screen_circles[0].classList.remove('active');
		small_screen_circles[1].classList.add('active');
		small_screen_circles[2].classList.remove('active');
		small_screen_circles[3].classList.remove('active');

	}

	function active_third_ss_circle() {

		small_screen_circles[0].classList.remove('active');
		small_screen_circles[1].classList.remove('active');
		small_screen_circles[2].classList.add('active');
		small_screen_circles[3].classList.remove('active');

	}

	function active_fourth_ss_circle() {

		small_screen_circles[0].classList.remove('active');
		small_screen_circles[1].classList.remove('active');
		small_screen_circles[2].classList.remove('active');
		small_screen_circles[3].classList.add('active');

	}

	// using-functions
	play();
	play_ss();

}

