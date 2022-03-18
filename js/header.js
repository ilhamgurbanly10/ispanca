// using-functions
flash_dropdown_menu();
flash_dropdown_mobile_menu();
flash_search_form();
flash_modal_user_form_warnings();
flash_mobile_menu();
// flash_modal_user_form();

// from-flash
flash_toggle_password();
flash_modal_container();
flash_expand();
// the-end-of-using-functions

// flash-dropdown-menu
function flash_dropdown_menu() {

	var toggler = document.querySelectorAll('.flash-has-dropdown-menu');
	var drop_down_menus = document.querySelectorAll('.flash-dropdown-menu');
	var has_hover =  false;

	// adding-functions-for-dropdown-menu
	for (var i = 0, show_type = [], show_wenn = []; i < toggler.length; i++) {

		show_type[i] = toggler[i].getAttribute('show-type');
		show_wenn[i] = toggler[i].getAttribute('show-wenn');

		if (show_wenn[i] == "hover") 
			add_hover_functions(show_type[i],toggler[i]);
		else if (show_wenn[i] == "click") 
			add_click_functions(show_type[i],toggler[i]);

		toggler[i].addEventListener('mouseover', add_hover);
		toggler[i].addEventListener('mouseout', remove_hover);
       
	}

	// functions

	// showing-and-hiding-dropdown-menu
	// hover-functions
	function show() {
		this.querySelector('.flash-dropdown-menu').classList.add('show');
	}

	function hide() {
		this.querySelector('.flash-dropdown-menu').classList.remove('show');
	}

	// fading-dropdown-menu
	function fade_in() {
		this.querySelector('.flash-dropdown-menu').classList.add('fade-in');
	}

	function fade_out() {
		this.querySelector('.flash-dropdown-menu').classList.remove('fade-in');
	}

	// sliding-dropdown-menu
	function slide_down() {
		this.querySelector('.flash-dropdown-menu').classList.add('slide-down');
	}

	function slide_up() {
		this.querySelector('.flash-dropdown-menu').classList.remove('slide-down');
	}


	// click-functions
	function toggle() {
		this.querySelector('.flash-dropdown-menu').classList.toggle('show');	
	}

	function fade() {
		this.querySelector('.flash-dropdown-menu').classList.toggle('fade-in');
	}

	function slide() {
		this.querySelector('.flash-dropdown-menu').classList.toggle('slide-down');
	}

	function add_hiding_clicking_body() {	
		document.body.addEventListener('click', hide_clicking_body);
	}
	
	// adding-functions
	function add_hover_functions(show_type, toggler) {

		if (show_type == "show") {
			toggler.addEventListener('mouseover', show);
			toggler.addEventListener('mouseout', hide);
		}	else if (show_type == "fade") {
			toggler.addEventListener('mouseover', fade_in);
			toggler.addEventListener('mouseout', fade_out);
		} else if (show_type == "slide") {
			toggler.addEventListener('mouseover', slide_down);
			toggler.addEventListener('mouseout', slide_up);
		}

	}

	function add_click_functions(show_type, toggler) {

		toggler.addEventListener('click', add_hiding_clicking_body);
		toggler.addEventListener('click', hide_others);

		if (show_type == "show") {
			toggler.addEventListener('click', toggle);
		}	else if (show_type == "fade") {
			toggler.addEventListener('click', fade);
		} else if (show_type == "slide") {
			toggler.addEventListener('click', slide);
		}

	}	

	function add_hover() { 
		return has_hover = true; 
	}

	function remove_hover() { 
		return has_hover = false;  
	}

	function hide_clicking_body() {

		if (!has_hover) {

			for (var i = 0; i < drop_down_menus.length; i++) {

				drop_down_menus[i].classList.remove('show');
				drop_down_menus[i].classList.remove('fade-in');
				drop_down_menus[i].classList.remove('slide-down');

			}	

			document.body.removeEventListener('click', hide_clicking_body);

		}

	}

	function hide_others() {
 
			for (var i = 0; i < drop_down_menus.length; i++) {

				if (this === drop_down_menus[i]) continue;

				drop_down_menus[i].classList.remove('show');
				drop_down_menus[i].classList.remove('fade-in');
				drop_down_menus[i].classList.remove('slide-down');

			}	

	}

}
// the-end-of-flash-dropdown-menu



// flash-dropdown-mobile-menu
function flash_dropdown_mobile_menu() {

	var toggler = document.querySelectorAll('.flash-dropdown-mobile-menu-toggler');

	// adding-functions-for-dropdown-menu
	for (var i = 0, show_type = []; i < toggler.length; i++) {
      
		show_type[i] = toggler[i].getAttribute('show-type');
        
        if (show_type[i] == "show") {
			toggler[i].addEventListener('click', toggle);
		} else if (show_type[i] == "fade") {
			toggler[i].addEventListener('click', fade);
		} else if (show_type[i] == "slide") {
			toggler[i].addEventListener('click', slide);
		}
		
	}

	// functions
	function toggle() {

		var id = this.getAttribute('target');

		var icon = this.querySelector('i');
		toggle_icon(icon);

		var target = document.getElementById(''+id+'');
		target.classList.toggle('show');
		
	}

	function fade() {

		var id = this.getAttribute('target');

		var icon = this.querySelector('i');
		toggle_icon(icon);

		var target = document.getElementById(''+id+'');
		target.classList.toggle('fade-in');
		
	}

	function slide() {

		var id = this.getAttribute('target');

		var icon = this.querySelector('i');
		toggle_icon(icon);

		var target = document.getElementById(''+id+'');
		target.classList.toggle('slide-down');
		
	}

	function toggle_icon(icon) {
		if (icon != undefined) icon.classList.toggle('fa-angle-down');
	}

}

// the-end-of-flash-dropdown-mobile-menu


// flash-search-form
function flash_search_form() {

	// getting-elements-and-values
	var container = document.querySelector('.flash-search-form-parent');

	// avoiding-errors
	if (flash_is_undefined(container)) return;

	var form = container.querySelector('.flash-search-form');
	var input = form.querySelector('.flash-search-form-search');
	var show_results = form.getAttribute('show-results');
	var results = container.querySelector('.flash-results-of-search');
	var submit = form.querySelector('.flash-search-form-submit');
	var reset = form.querySelector('.flash-search-form-reset');
	var is_searching_text = 
	results.querySelector('.flash-results-of-search-is-searching-text');
	var stop_is_searching_button = 
	results.querySelector('.flash-stop-is-searching');
	var now_is_searching = false;
	var is_searching_parent = 
	results.querySelector('.flash-results-of-search-is-searching');
	var toggler = document.querySelector('.flash-search-form-toggler');
	var icon = toggler.querySelector('.fa');
	var elements_is_hover = false;

	// adding-functions
	if (show_results == "true") { 

		input.addEventListener('keyup', toggle);
		input.addEventListener('focusin', show);
		input.addEventListener('focusout', hide);

	} else {

		input.addEventListener('keyup', enable_and_disable_buttons);
		
	}

	reset.addEventListener('click', disable_buttons);
	toggler.addEventListener('click', toggle_container);
	toggler.addEventListener('mouseover', is_hover);
	toggler.addEventListener('mouseout', is_not_hover);
	container.addEventListener('mouseover', is_hover);
	container.addEventListener('mouseout', is_not_hover);
	results.addEventListener('mouseover', is_hover);
	results.addEventListener('mouseout', is_not_hover);
	
	// functions
	function toggle_container() {

		if (!flash_has_class(container,"show"))
		document.body.addEventListener('click', close_container);

		container.classList.toggle('show');
		toggle_icon();

	}

	function close_container() {

		if (!elements_is_hover) {

			container.classList.remove('show');
			document.body.removeEventListener('click', close_container);

			if (icon == undefined) return;

			icon.classList.add('fa-search');
			icon.classList.remove('fa-times');

		}	

	}

	function toggle_icon() {

		icon.classList.toggle('fa-search');
		icon.classList.toggle('fa-times');

	}

	function is_hover() { elements_is_hover = true; }

	function is_not_hover() { elements_is_hover = false; }

	function toggle() {

		if (this.value != "") {
			results.classList.add('show');
			enable_submit();
			enable_reset();
		}	
		else { 
			hide();
			disable_submit();
			disable_reset();

		}	

	}

	function show() {

		if (this.value != "") { 
			results.classList.add('show');
			enable_submit();
			enable_reset();
		}	


	}

	function hide() {

		results.classList.remove('show');

	}

	function enable_submit() {

		submit.removeAttribute('disabled');

	}

	function disable_submit() {

		submit.setAttribute('disabled','');

	}

	function enable_reset() {

		reset.removeAttribute('disabled');

	}

	function disable_reset() {

		reset.setAttribute('disabled','');
		
	}

	function disable_buttons() {

		submit.setAttribute('disabled','');
		reset.setAttribute('disabled','');
		input.value = "";

	}

	function enable_and_disable_buttons() {

		if (this.value != "") {
			enable_submit();
			enable_reset();
		}	
		else { 
			disable_submit();
			disable_reset();
		}
	}

	function is_searching() {

		if (!now_is_searching) {
			flash_three_points(is_searching_text, stop_is_searching_button, "fast");
			is_searching_parent.classList.remove('hide');
			now_is_searching = true;
		}	

	}

	function is_not_searching() {

		stop_is_searching_button.click();
		is_searching_parent.classList.add('hide');
		now_is_searching = false;

	}

}
// the-end-of-flash-search-form

// flash-modal-user-form
function flash_modal_user_form() {

	// getting elements
	var sign_in_button = document.querySelector('.flash-modal-user-form-sign-in-button');
	var sign_up_button = document.querySelector('.flash-modal-user-form-sign-up-button');
	var modal_form = document.querySelector('.flash-user-modal-form');
	var modal_sign_in_form = document.querySelector('.flash-modal-sign-in-form');
	var modal_sign_up_form = document.querySelector('.flash-modal-sign-up-form');
	var has_hover = false;

	// adding-functions
	sign_in_button.addEventListener('click', show_sign_in);
	sign_up_button.addEventListener('click', show_sign_up);
	modal_form.addEventListener('click', close_modal_form);
	modal_sign_in_form.addEventListener('mouseover', add_hover);
	modal_sign_in_form.addEventListener('mouseout', remove_hover);
	modal_sign_up_form.addEventListener('mouseover', add_hover);
	modal_sign_up_form.addEventListener('mouseout', remove_hover);

	// functions 
	function show_sign_in() {
		modal_form.classList.add('show');
		modal_sign_in_form.classList.add('show');
	}
	function show_sign_up() {
		modal_form.classList.add('show');
		modal_sign_up_form.classList.add('show');
	}
	function close_modal_form() {
		if (!has_hover) {
			this.classList.remove('show');
			modal_sign_in_form.classList.remove('show');
			modal_sign_up_form.classList.remove('show');
		}
	}
	function add_hover() { 
		has_hover = true; 
		return has_hover; 
	}
	function remove_hover() { 
		has_hover = false; 
		return has_hover; 
	}

}
// the-end-of-flash-modal-user-form



// flash-modal-user-form-warnings
function flash_modal_user_form_warnings() {

	// getting-elements-and-values
	var sign_in = document.querySelector('.flash-modal-sign-in-form');
	var sign_up = document.querySelector('.flash-modal-sign-up-form');

	// adding-functions-to-sign-in
	flash_disable_submit(sign_in);
	flash_reset_form(sign_in);
	flash_check_email_input(sign_in);
	flash_check_name_input(sign_in, 5, 20);
	flash_check_password_input(sign_in, 5, 10);

	// adding-functions-to-sign-up
	flash_disable_submit(sign_up);
	flash_reset_form(sign_up);
	flash_check_email_input(sign_up);
	flash_check_name_input(sign_up, 5, 20);
	flash_check_password_input(sign_up, 5, 10);

}
// the-end-of-flash-modal-user-form-warnings

// mobile-menu
function flash_mobile_menu() {

	// get-elements-and-values
	var toggler = document.querySelector('.flash-mobile-menu-toggler');
	var toggler_icon = document.querySelector('.flash-mobile-menu-btn-icon');
	var menu = document.querySelector('.flash-mobile-menu'); 
	var close_when_body_is_clicked = 
		menu.getAttribute('close-when-body-is-clicked');

	// add-functions-for-full-screen
	if(flash_has_class(menu, "flash-mobile-menu-full-screen")) {

		var menu_list = menu.querySelector('.flash-mobile-menu-list');
		var close_button = menu.querySelector('.flash-mobile-menu-close-button');
		var is_hover = false;

		toggler.addEventListener('click', show);

		if (!has_close_button()) {

			menu.addEventListener('click', hide);
			menu_list.addEventListener('mouseover', add_hover);
			menu_list.addEventListener('mouseout', remove_hover);

		}
			
		else close_button.addEventListener('click', hide);

	} 

	// add-functions
	else {

		if (flash_has_class(menu, "toggle")) 
			toggler.addEventListener('click', toggle);

		else if (flash_has_class(menu, "fade")) 
			toggler.addEventListener('click', fade);

		else if (flash_has_class(menu, "slide")) 
			toggler.addEventListener('click', slide);

		else if (flash_has_class(menu, "to-right")) 
			toggler.addEventListener('click', to_right);

		else if (flash_has_class(menu, "to-left")) 
			toggler.addEventListener('click', to_left);

		if (close_when_body_is_clicked == "on") {
			toggler.addEventListener('click', add_hiding_clicking_body);
			toggler.addEventListener('mouseover', add_hover);
			toggler.addEventListener('mouseout', remove_hover);
			menu.addEventListener('mouseover', add_hover);
			menu.addEventListener('mouseout', remove_hover);
		}

	}


	// functions
	function toggle() {
		menu.classList.toggle("show");
		toggle_icon();
	}

	function fade() {
		menu.classList.toggle("fade-in");
		toggle_icon();
	}

	function slide() {
		menu.classList.toggle("slide-down");
		toggle_icon();
	}

	function to_right() {
		menu.classList.toggle("animate-to-right");
		toggle_icon();
	}

	function to_left() {
		menu.classList.toggle("animate-to-left");
		toggle_icon();
	}

	function toggle_icon() {
		toggler_icon.classList.toggle('fa-times');
		toggler_icon.classList.toggle('fa-bars');
	}

	function default_icon() { 
		toggler_icon.classList.remove('fa-times'); 
		toggler_icon.classList.add('fa-bars');
	}

	// functions-of-full-screen
	function show() {
		menu.classList.add('show');
		change_transition_delays();	
	}

	function hide() {
		if (!is_hover) { 
			menu.classList.remove('show');
			default_transition_delays();
		}	
	}

	function add_hover() { 
		return is_hover = true; 
	}

	function remove_hover() { 
		return is_hover = false;  
	}

	function has_close_button() {

		if (close_button == undefined) return false;
		else return true;
		
	}

	function change_transition_delays() {

		setTimeout(function() {
			menu.classList.add('transition-delay');
			menu.querySelector('.flash-mobile-menu-list').classList.add('not-transition-delay');
		}, 100);

	}

	function default_transition_delays() {

		setTimeout(function() {
			menu.classList.remove('transition-delay');
			menu.querySelector('.flash-mobile-menu-list').classList.remove('not-transition-delay');
		}, 100);
		
	}

	function add_hiding_clicking_body() {	
		document.body.addEventListener('click', hide_clicking_body);
	}

	function hide_clicking_body() {

		if (!is_hover) {

			flash_remove_classes(menu, ["show","fade-in","slide-down","animate-to-right","animate-to-left"]);	
			default_icon();

			document.body.removeEventListener('click', hide_clicking_body);

		}

	}

}
// the-end-of-mobile-menu













 










