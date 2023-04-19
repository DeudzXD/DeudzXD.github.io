var CountdownTimer = /** @class */ (function () {
    function CountdownTimer(endTime) {
        this.endTime = endTime;
        this.countdownIntervalID = null;
    }
    CountdownTimer.prototype.startCountdown = function (callback) {
        var _this = this;
        var updateCountdown = function () {
            var timeRemaining = _this.getTimeRemaining();
            if (timeRemaining.total <= 0) {
                clearInterval(_this.countdownIntervalID);
            }
            else {
                callback(timeRemaining);
            }
        };
        updateCountdown();
        this.countdownIntervalID = setInterval(updateCountdown, 1000);
    };
    CountdownTimer.prototype.stopCountdown = function () {
        clearInterval(this.countdownIntervalID);
    };
    CountdownTimer.prototype.getTimeRemaining = function () {
        var timeRemaining = this.endTime.getTime() - new Date().getTime();
        var totalSeconds = Math.floor(timeRemaining / 1000);
        var seconds = totalSeconds % 60;
        var totalMinutes = Math.floor(totalSeconds / 60);
        var minutes = totalMinutes % 60;
        var totalHours = Math.floor(totalMinutes / 60);
        var hours = totalHours % 24;
        var days = Math.floor(totalHours / 24);
        return {
            total: timeRemaining,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    };
    return CountdownTimer;
}());
var countdownTimer = new CountdownTimer(new Date("2023-06-21T10:00:00"));
var countdownElement = document.getElementById("countdown");
countdownTimer.startCountdown(function (timeRemaining) {
    countdownElement.innerHTML = "".concat(timeRemaining.days, " dias, ").concat(timeRemaining.hours, " horas, ").concat(timeRemaining.minutes, " minutos e ").concat(timeRemaining.seconds, " segundos");
});
