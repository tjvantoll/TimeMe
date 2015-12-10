function blurActiveElement() {
	document.activeElement.blur();
}

var hoursWidget = $("#hours").kendoNumericTextBox({
	format: "0#",
	min: 0,
	spin: blurActiveElement
}).data("kendoNumericTextBox");
var minutesWidget = $("#minutes").kendoNumericTextBox({
	format: "0#",
	min: 0,
	max: 59,
	spin: blurActiveElement
}).data("kendoNumericTextBox");
var secondsWidget = $("#seconds").kendoNumericTextBox({
	format: "0#",
	min: 0,
	max: 59,
	spin: blurActiveElement
}).data("kendoNumericTextBox");

var stopButton = $("#stop-button");
var startButton = $("#start-button");
var resetButton = $("#reset-button");

var startingHours = 0;
var startingMinutes = 0;
var startingSeconds = 0;
var hours, minutes, seconds;
var timer;

function setValues() {
	hoursWidget.value(hours);
	minutesWidget.value(minutes);
	secondsWidget.value(seconds);
}

function startTicking() {
	timer = setInterval(function() {
		seconds--;
		
		if (seconds <= 0 && minutes === 0 && hours === 0) {
			seconds = 0;
			setValues();
			alert("Timer Complete");
			reset();
			hours = startingHours;
			minutes = startingMinutes;
			seconds = startingSeconds;
			setValues();
			return;
		}

		if (seconds < 0) {
			seconds = 59;
			minutes--;
			if (minutes < 0) {
				minutes = 59;
				hours--;
			}
		}
		
		setValues();
	}, 1000);
	document.body.classList.add("running");
}
function stopTicking() {
	clearInterval(timer);
	document.body.classList.remove("running");
}

function reset() {
	hoursWidget.enable();
	minutesWidget.enable();
	secondsWidget.enable();

	stopTicking();

	startButton.show();
	resetButton.show();
	stopButton.hide();
}

$("#start-button")
	.kendoButton()
	.on("click", function() {
		hours = hoursWidget.value();
		minutes = minutesWidget.value();
		seconds = secondsWidget.value();
	
		startingHours = hours;
		startingMinutes = minutes;
		startingSeconds = seconds;

		hoursWidget.enable(false);
		minutesWidget.enable(false);
		secondsWidget.enable(false);

		startButton.hide();
		resetButton.hide();
		stopButton.show();

		startTicking();
	});

$("#stop-button")
	.kendoButton()
	.on("click", reset);

$("#reset-button")
	.kendoButton()
	.on("click", function() {
		hours = startingHours;
		minutes = startingMinutes;
		seconds = startingSeconds;
		setValues();
		reset();
	});

$("input").on("focus", function(event) {
	$(this).blur();
});
