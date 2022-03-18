// post

// getting-creating-elements-and-values
var character_limit_of_comments = 500;


// using-functions
flash_user_reflections(character_limit_of_comments);

flash_comments({
	character_limit: character_limit_of_comments
});

flash_read_more_post_text();
// the-end-of-using-functions


// functions
function flash_user_reflections(character_limit) {

	// likes-and-dislikes
	// getting-elements-and-values
	var container = document.querySelector('.flash-post-buttons');
	var like_button = container.querySelector('.flash-post-like-button');
	var dislike_button = container.querySelector('.flash-post-dislike-button');
	var like_number = container.querySelector('.flash-post-like-number');
	var dislike_number = container.querySelector('.flash-post-dislike-number');
	var watched_number = container.querySelector('.flash-post-watched-number');

	// if (like_button.hasAttribute("is-liked")) is_liked = true;
	// else is_liked = false;
	// if (dislike_button.hasAttribute("is-disliked")) is_disliked = true;
	// else is_disliked = false;
	if (flash_has_class(like_button, "pressed")) is_liked = true;
	else is_liked = false;
	if (flash_has_class(dislike_button, "pressed")) is_disliked = true;
	else is_disliked = false;

	// add-functions
	like_button.addEventListener('click', like);
	dislike_button.addEventListener('click', dislike);

	// functions
	function like() {

		if (!is_liked) add_like();
		else remove_like();

		if (is_disliked) remove_dislike(); 

	}

	function dislike() {

		if (!is_disliked) add_dislike();
		else remove_dislike();

		if (is_liked) remove_like();

	}

	function add_like() {
		increase_likes();
		is_liked = true;
		like_button.classList.add('pressed');
	}

	function remove_like() {
		decrease_likes();
		is_liked = false;
		like_button.classList.remove('pressed')
	}

	function add_dislike() {
		increase_dislikes();
		is_disliked = true;
		dislike_button.classList.add('pressed');
	}

	function remove_dislike() {
		decrease_dislikes();
		is_disliked = false;
		dislike_button.classList.remove('pressed')
	}

	function increase_likes() {
		like_number.innerHTML = Number(like_number.innerHTML) + 1;
	}

	function increase_dislikes() {
		dislike_number.innerHTML = Number(dislike_number.innerHTML) + 1;
	}

	function decrease_likes() {
		like_number.innerHTML = Number(like_number.innerHTML) - 1;
	}

	function decrease_dislikes() {
		dislike_number.innerHTML = Number(dislike_number.innerHTML) - 1;
	}
	// the-end-of-likes-and-dislikes

	// reply-form
	// getting-elements-and-values
	var reply_form = document.querySelector('.flash-post-reply-form');
	var reply_button = document.querySelector('.flash-post-reply-button'); 
	var class_name;

	// determining-animation-type
	if (flash_has_class(reply_form, "toggle")) class_name = "show";
	else if (flash_has_class(reply_form, "fade")) class_name = "fade-in";
	else if (flash_has_class(reply_form, "slide")) class_name = "slide-down";  
	else { 

		class_name = "show"; 
		reply_form.classList.add('toggle');
			
	}	

	// writing-character-limit-to-html
	var character_limit_shower = document.querySelector('.flash-character-limit-of-main-comment');
	character_limit_shower.innerHTML = character_limit;

	// adding-functions
	reply_button.addEventListener('click', toggle_reply_form);
	reply_form.querySelector('.flash-post-reply-comment').addEventListener('keyup', check_form);
	reply_form.querySelector('.flash-post-reply-reset').addEventListener('click', reset_form);


	// functions
	function toggle_reply_form() {
		reply_form.classList.toggle(''+class_name+'');
	}

	function check_form() {

		var characters = flash_get_number_of_characters(this, true, true);

		if (characters > character_limit) {

			has_error();
			disable_submit();

		}	else if (characters == 0) {

			disable_submit();

		} else {

			is_correct();
			enable_submit();
			
		}

	}	

	function reset_form() {
		is_correct();
		disable_submit();
	}

	function enable_submit() {
		reply_form.querySelector('.flash-post-reply-submit').removeAttribute('disabled');
	}

	function disable_submit() {
		reply_form.querySelector('.flash-post-reply-submit').setAttribute('disabled','');
	}

	function has_error() {
		reply_form.classList.add('has-error');
	}

	function is_correct() {
		reply_form.classList.remove('has-error');
	}
	// the-end-of-reply-form

}

function flash_comments(settings = {
	toggle_comments: true,
	replies_is_showed: false,
	character_limit: 1000,
	hide_other_replies: false,
	hide_other_forms: true
}) {

	// determining-default-settings
	if (settings.toggle_comments == undefined) settings.toggle_comments = true;
	if (settings.replies_is_showed == undefined) settings.replies_is_showed = false;
	if (settings.character_limit == undefined) settings.character_limit = 1000;
	if (settings.hide_other_replies == undefined) settings.hide_other_replies = true;
	if (settings.hide_other_forms == undefined) settings.hide_other_forms = true;


	// likes-and-dislikes
	// getting-elements-and-values
	var container = document.querySelector('.flash-comments-container');
	var my_user_id = container.getAttribute('my-user-id'); 
	var comments = container.querySelectorAll('.flash-comments-item');
	var like_buttons = container.querySelectorAll('.flash-comments-like-button');
	var dislike_buttons = container.querySelectorAll('.flash-comments-dislike-button');
	var buttons_length = like_buttons.length;
	var like_numbers = container.querySelectorAll('.flash-comments-like-number');
	var dislike_numbers = container.querySelectorAll('.flash-comments-dislike-number');
	var is_liked = [];
	var is_disliked = [];
	var index;
	var number_of_comments = document.querySelector('.flash-post-replies-number');
	var comments_toggler = document.querySelector('.flash-post-comments-button');
	var character_limits = container.querySelectorAll('.flash-character-limit-of-comment');

	// avoiding-errors
	if (flash_is_undefined(comments[0])) {

		number_of_comments.innerHTML = "0";
		comments_toggler.setAttribute('disabled','');
		return;

	}

	// writing-character-limit-to-html
	for (var i = 0; i < character_limits.length; i++) {
		character_limits[i].innerHTML = settings.character_limit;
	}

	// using-function
	if (settings.toggle_comments) toggle_comments();
	
	// giving-number-of-comments-to-page
	number_of_comments.innerHTML = like_buttons.length;	

	// add-functions
	for (var i = 0; i < buttons_length; i++) {

		like_buttons[i].addEventListener('click', like);
		like_buttons[i].setAttribute('index',''+i+'');
		dislike_buttons[i].addEventListener('click', dislike);
		dislike_buttons[i].setAttribute('index',''+i+'');

		if (flash_has_class(like_buttons[i], "pressed")) is_liked[i] = true;
		else is_liked[i] = false;
		if (flash_has_class(dislike_buttons[i], "pressed")) is_disliked[i] = true;
		else is_disliked[i] = false;

	}

	// functions
	function like() {

		var x = this.getAttribute('index');

		if (!is_liked[x]) add_like(x);
		else remove_like(x);

		if (is_disliked[x]) remove_dislike(x); 

	}

	function dislike() {

		var x = this.getAttribute('index');

		if (!is_disliked[x]) add_dislike(x);
		else remove_dislike(x);

		if (is_liked[x]) remove_like(x);

	}

	function add_like(x) {
		increase_likes(x);
		is_liked[x] = true;
		like_buttons[x].classList.add('pressed');
	}

	function remove_like(x) {
		decrease_likes(x);
		is_liked[x] = false;
		like_buttons[x].classList.remove('pressed')
	}

	function add_dislike(x) {
		increase_dislikes(x);
		is_disliked[x] = true;
		dislike_buttons[x].classList.add('pressed');
	}

	function remove_dislike(x) {
		decrease_dislikes(x);
		is_disliked[x] = false;
		dislike_buttons[x].classList.remove('pressed')
	}


	function increase_likes(y) {
		like_numbers[y].innerHTML = Number(like_numbers[y].innerHTML) + 1;
	}

	function increase_dislikes(y) {
		dislike_numbers[y].innerHTML = Number(dislike_numbers[y].innerHTML) + 1;
	}

	function decrease_likes(y) {
		like_numbers[y].innerHTML = Number(like_numbers[y].innerHTML) - 1;
	}

	function decrease_dislikes(y) {
		dislike_numbers[y].innerHTML = Number(dislike_numbers[y].innerHTML) - 1;
	}
	// the-end-of-likes-and-dislikes

	// delete-comments
	var delete_comment_buttons = container.querySelectorAll('.flash-comments-delete-button');

	// loop
	for (var i = 0, comments_user_id = []; i < comments.length; i++) {
		
		delete_comment_buttons[i].setAttribute('index',''+i+'');
		delete_comment_buttons[i].addEventListener('click', delete_comment);

		comments_user_id[i] = comments[i].getAttribute('user-id');

		if (comments_user_id[i] == my_user_id) show_delete_button(i);

	}

	// functions
	function delete_comment() {

		var x = this.getAttribute('index');
		comments[x].style.display = "none";
		increase_number_of_comments();

		if (x == 0) comments[1].style.marginTop = "0";

	}

	function show_delete_button(y) {
		delete_comment_buttons[y].classList.remove('hide');
	}

	function increase_number_of_comments() {
		number_of_comments.innerHTML = Number(number_of_comments.innerHTML - 1);
	}
	// the-end-of-delete-comments


	// replies
	// getting-elements-and-values
	var reply_containers = container.querySelectorAll('.flash-replies-list');
	var reply_buttons = container.querySelectorAll('.flash-comments-replies-button');
	var reply_numbers = container.querySelectorAll('.flash-comments-replies-number');
	var numbers_of_replies = container.querySelectorAll('.flash-comments-replies-number');

	// giving-reply-numbers-to-comments
	for (var i = 0, numbers = []; i < reply_numbers.length; i++) {

		var replies_per_comment = reply_containers[i].querySelectorAll('.flash-replies-item');

		if (flash_is_undefined(replies_per_comment[0])) {

			numbers_of_replies[i].innerHTML = "0";
			disable_reply_button(i);

		} 	else numbers_of_replies[i].innerHTML = replies_per_comment.length;

	}

	// determining-animation-type
	if (flash_has_class(reply_containers[0], "toggle")) class_name = "show";
	else if (flash_has_class(reply_containers[0], "fade")) class_name = "fade-in";
	else if (flash_has_class(reply_containers[0], "slide")) class_name = "slide-down";  
	else { 

		class_name = "show"; 

		for (var i = 0; i < reply_containers.length; i++) {
			reply_containers[i].classList.add('toggle');
		}
		
	}	

	// adding-functions
	for (var i = 0; i < reply_buttons.length; i++) {

		reply_buttons[i].addEventListener('click', toggle_replies);
		reply_buttons[i].setAttribute('index',''+i+'');

	}

	// functions
	function toggle_replies() {

		var x = this.getAttribute('index');

		reply_containers[x].classList.toggle(''+class_name+'');

		if (settings.hide_other_replies) hide_other_replies(x);
	
	}

	function hide_other_replies(y) {

		for (var i = 0; i < reply_containers.length; i++) {

			if (i == y) continue;
			reply_containers[i].classList.remove(''+class_name+'');

		}

	}

	function disable_reply_button(y) {
		reply_buttons[y].setAttribute('disabled', '');
	}
	
	// the-end-of-replies

	// reply-form
	// getting-elements-and-values
	var reply_forms = container.querySelectorAll('.flash-comments-reply-form');
	var reply_form_buttons = container.querySelectorAll('.flash-comments-reply-button');

	// determining-animation-type
	if (flash_has_class(reply_forms[0], "toggle")) class_name = "show";
	else if (flash_has_class(reply_forms[0], "fade")) class_name = "fade-in";
	else if (flash_has_class(reply_forms[0], "slide")) class_name = "slide-down";  
	else { 

		class_name = "show"; 

		for (var i = 0; i < reply_forms.length; i++) {
			reply_forms[i].classList.add('toggle');
		}
		
	}	


	// adding-functions
	for (var i = 0; i < reply_form_buttons.length; i++) {

		reply_form_buttons[i].addEventListener('click', toggle_reply_form);
		reply_form_buttons[i].setAttribute('index',''+i+'');
		reply_forms[i].querySelector('.flash-comments-reply-comment').addEventListener('keyup', check_form);
		reply_forms[i].querySelector('.flash-comments-reply-comment').setAttribute('index',''+i+'');
		reply_forms[i].querySelector('.flash-comments-reply-reset').addEventListener('click', reset_form);
		reply_forms[i].querySelector('.flash-comments-reply-reset').setAttribute('index',''+i+'');
	}

	// functions
	function toggle_reply_form() {

		var x = this.getAttribute('index');

		reply_forms[x].classList.toggle(''+class_name+'');

		if (settings.hide_other_forms) hide_other_reply_forms(x);
	
	}

	function hide_other_reply_forms(y) {

		for (var i = 0; i < reply_form_buttons.length; i++) {

			if (i == y) continue;
			reply_forms[i].classList.remove(''+class_name+'');

		}

	}

	function check_form() {

		var x = this.getAttribute('index');

		var characters = flash_get_number_of_characters(this, true, true);

		if (characters > settings.character_limit) {

			has_error(x);
			disable_submit(x);

		}	else if (characters == 0) {

			disable_submit(x);

		} else {

			is_correct(x);
			enable_submit(x);
			
		}

	}	

	function reset_form() {

		var x = this.getAttribute('index');
		is_correct(x);
		disable_submit(x);

	}

	function enable_submit(y) {
		reply_forms[y].querySelector('.flash-comments-reply-submit').removeAttribute('disabled');
	}

	function disable_submit(y) {
		reply_forms[y].querySelector('.flash-comments-reply-submit').setAttribute('disabled','');
	}

	function has_error(y) {
		reply_forms[y].classList.add('has-error');
	}

	function is_correct(y) {
		reply_forms[y].classList.remove('has-error');
	}
	// the-end-of-reply-form

	// likes-and-dislikes-of-replies
	// getting-elements-and-values
	var reply_like_buttons = container.querySelectorAll('.flash-replies-like-button');
	var reply_dislike_buttons = container.querySelectorAll('.flash-replies-dislike-button');
	var reply_buttons_length = reply_like_buttons.length;
	var reply_like_numbers = container.querySelectorAll('.flash-replies-like-number');
	var reply_dislike_numbers = container.querySelectorAll('.flash-replies-dislike-number');
	var reply_is_liked = [];
	var reply_is_disliked = [];
		
	// add-functions
	for (var i = 0; i < reply_buttons_length; i++) {

		reply_like_buttons[i].addEventListener('click', like_reply);
		reply_like_buttons[i].setAttribute('index',''+i+'');
		reply_dislike_buttons[i].addEventListener('click', dislike_reply);
		reply_dislike_buttons[i].setAttribute('index',''+i+'');

		if (flash_has_class(reply_like_buttons[i], "pressed")) reply_is_liked[i] = true;
		else reply_is_liked[i] = false;
		if (flash_has_class(reply_dislike_buttons[i], "pressed")) reply_is_disliked[i] = true;
		else reply_is_disliked[i] = false;

	}

	// functions

	function like_reply() {

		var x = this.getAttribute('index');

		if (!reply_is_liked[x]) add_like_to_reply(x);
		else remove_like_from_reply(x);

		if (reply_is_disliked[x]) remove_dislike_from_reply(x); 

	}

	function dislike_reply() {

		var x = this.getAttribute('index');

		if (!reply_is_disliked[x]) add_dislike_to_reply(x);
		else remove_dislike_from_reply(x);

		if (reply_is_liked[x]) remove_like_from_reply(x);

	}

	function add_like_to_reply(x) {
		increase_reply_likes(x);
		reply_is_liked[x] = true;
		reply_like_buttons[x].classList.add('pressed');
	}

	function remove_like_from_reply(x) {
		decrease_reply_likes(x);
		reply_is_liked[x] = false;
		reply_like_buttons[x].classList.remove('pressed')
	}

	function add_dislike_to_reply(x) {
		increase_reply_dislikes(x);
		reply_is_disliked[x] = true;
		reply_dislike_buttons[x].classList.add('pressed');
	}

	function remove_dislike_from_reply(x) {
		decrease_reply_dislikes(x);
		reply_is_disliked[x] = false;
		reply_dislike_buttons[x].classList.remove('pressed')
	}

	function increase_reply_likes(y) {
		reply_like_numbers[y].innerHTML = Number(reply_like_numbers[y].innerHTML) + 1;
	}

	function increase_reply_dislikes(y) {
		reply_dislike_numbers[y].innerHTML = Number(reply_dislike_numbers[y].innerHTML) + 1;
	}

	function decrease_reply_likes(y) {
		reply_like_numbers[y].innerHTML = Number(reply_like_numbers[y].innerHTML) - 1;
	}

	function decrease_reply_dislikes(y) {
		reply_dislike_numbers[y].innerHTML = Number(reply_dislike_numbers[y].innerHTML) - 1;
	}
	// the-end-of-likes-and-dislikes-of-replies

	/// delete-replies
	var delete_reply_buttons = container.querySelectorAll('.flash-replies-delete-button');
	var replies = container.querySelectorAll('.flash-replies-item');
	// loop
	for (var i = 0, replies_user_id = []; i < delete_reply_buttons.length; i++) {
		
		delete_reply_buttons[i].setAttribute('index',''+i+'');
		delete_reply_buttons[i].addEventListener('click', delete_reply);

		replies_user_id[i] = replies[i].getAttribute('user-id');

		if (replies_user_id[i] == my_user_id) show_reply_delete_button(i);

	}

	// giving-parent-index-to-reply-delete-buttons
	// !it is necesary to increase number of replies
	for (var i = 0; i < comments.length; i++) {
		
		var delete_reply_buttons_per_comment = comments[i].querySelectorAll('.flash-replies-delete-button');

		for (var x = 0; x < delete_reply_buttons_per_comment.length; x++) {

			delete_reply_buttons_per_comment[x].setAttribute('parent-index',''+i+'');
		}

	}

	// functions
	function delete_reply() {

		var x = this.getAttribute('index');
		var z = this.getAttribute('parent-index');
		replies[x].style.display = "none";
		increase_number_of_reply_comments(z);

	}

	function show_reply_delete_button(y) {
		delete_reply_buttons[y].classList.remove('hide');
	}

	function increase_number_of_reply_comments(y) {

		var number = comments[y].querySelector('.flash-comments-replies-number');
		var button = comments[y].querySelector('.flash-comments-replies-button');

		number.innerHTML = Number(number.innerHTML) - 1;

		if (number.innerHTML == 0) button.setAttribute('disabled','');

	}
	// the-end-of-delete-replies

}

function toggle_comments() {

	// getting-elements-and-values
	var button = document.querySelector('.flash-post-comments-button');
	var comments = document.querySelector('.flash-comments-container');
	var class_name;

	// avoiding-errors
	if (flash_is_undefined(button)) return;

	// determining-animation-type
	if (flash_has_class(comments, "toggle")) class_name = "show";
	else if (flash_has_class(comments, "fade")) class_name = "fade-in";
	else if (flash_has_class(comments, "slide")) class_name = "slide-down";  
	else { 
		class_name = "show"; 
		comments.classList.add('toggle');
		comments.classList.add('show');
	}	

	// adding-functions
	button.addEventListener('click', toggle);

	// functions
	function toggle() {

		comments.classList.toggle(''+class_name+'');
		
	}

}
// the-end-of-functions


// read-more-post-text
function flash_read_more_post_text() {

	// getting-elements-and-values
	var text = document.querySelector('.flash-post-text');
	var btn = document.querySelector('.flash-post-read-more-button');
	var close_btn = document.querySelector('.flash-post-close-text-button');

	// avoiding-errors
	if (flash_is_undefined(btn) || flash_is_undefined(close_btn)) return;

	// adding-functions
	btn.addEventListener('click', show_total_text);
	close_btn.addEventListener('click', close_text);

	// functions
	function show_total_text() {

		this.style.display = "none";
		close_btn.style.display = "inline-block";

		text.classList.add('flash-post-total-text');

	}

	function close_text() {

		btn.style.display = "inline-block";
		this.style.display = "none";

		text.classList.remove('flash-post-total-text');

	}

}
// the-end-of-read-more-post-text


							
// the-end-of-post



							// these codes belong only to this page


// using-functions
flash_exercise();
// the-end-of-using-functions

// exercise
function flash_exercise() {

	// getting-elements-and-values
	var con = document.querySelector('.flash-exercise-container');
	// avodiding-errors
	if (con == undefined) return;
	var btn = document.querySelector('.flash-exercise-open-button');
	var close_btn = con.querySelector('.flash-exercise-close-button');



	// adding-functions
	btn.addEventListener('click', show);
	close_btn.addEventListener('click', hide);

	// functions 
	function show() {

		con.classList.add('flash-exercise-container-show');
		this.style.display = "none";

	}

	function hide() {

		con.classList.remove('flash-exercise-container-show');
		btn.style.display = "inline-block";

	}

}

// the-end-of-exercise
