// getting-elements-and-values

// the-end-of-getting-elements-and-values



// using-functions
flash_sign_up_warnings();
flash_reset_image();
// the-end-of-using-functions



// functions

// flash-sign-up-warnings
function flash_sign_up_warnings() {

	// getting-elements-and-values
	var sign_up = document.querySelector('.flash-sign-up-form');

	// adding-functions
	flash_disable_submit(sign_up);
	flash_reset_form(sign_up);
	flash_check_email_input(sign_up);
	flash_check_name_input(sign_up, 5, 20);
	flash_check_password_input(sign_up, 5, 10);
	flash_check_password_repeat_input(sign_up);

}
// the-end-of-flash-sign-up-warnings

// the-end-of-functions