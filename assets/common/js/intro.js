$(document).ready(function() {
	updateDate();
});

function updateDate() {
	$("#date").html(moment().format("DD MMM YYYY HH:mm"));
	setTimeout(() => {
		updateDate();
	}, 1000);
}

function next() {
	window.location.href = "login.html";
}

module.next = next;