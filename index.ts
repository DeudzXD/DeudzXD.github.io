interface TimeRemaining {
      total: number;
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
}
  
class CountdownTimer {
  private endTime: Date;
  private countdownIntervalID: number | null;

  constructor(endTime: Date) {
    this.endTime = endTime;
    this.countdownIntervalID = null;
  }

  public startCountdown(callback: (timeRemaining: TimeRemaining) => void) {
    const updateCountdown = () => {
      const timeRemaining = this.getTimeRemaining();
      if (timeRemaining.total <= 0) {
        clearInterval(this.countdownIntervalID as number);
      } else {
        callback(timeRemaining);
      }
    };

    updateCountdown();
    this.countdownIntervalID = setInterval(updateCountdown, 1000);
  }

  public stopCountdown() {
    clearInterval(this.countdownIntervalID as number);
  }

  private getTimeRemaining(): TimeRemaining {
    const timeRemaining = this.endTime.getTime() - new Date().getTime();

    const totalSeconds = Math.floor(timeRemaining / 1000);
    const seconds = totalSeconds % 60;

    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;

    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;

    const days = Math.floor(totalHours / 24);

    return {
      total: timeRemaining,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
}

const countdownTimer = new CountdownTimer(new Date("2023-06-21T10:00:00"));
const countdownElement: any = document.getElementById("countdown");

countdownTimer.startCountdown((timeRemaining: TimeRemaining) => {
  countdownElement.innerHTML = `${timeRemaining.days} dias, ${timeRemaining.hours} horas, ${timeRemaining.minutes} minutos e ${timeRemaining.seconds} segundos` });
