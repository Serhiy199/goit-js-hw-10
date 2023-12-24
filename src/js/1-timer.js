import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const listenerButton = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

const nowDate = new Date();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let userSelectedDate = selectedDates[0];

        if (userSelectedDate < nowDate) {
            listenerButton.classList.remove('is-active');
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                titleColor: '#FFFFFF',
                titleSize: '16px',
                messageColor: '#FFFFFF',
                messageSize: '16px',
                backgroundColor: '#EF4040',
                position: 'topRight',
            });
        } else if (userSelectedDate > nowDate) {
            listenerButton.classList.add('is-active');

            listenerButton.addEventListener('click', () => {
                let timeDifference =
                    userSelectedDate.getTime() - nowDate.getTime();

                setInterval(() => {
                    timeDifference -= 1000;

                    if (timeDifference > 1) {
                        convertMs(timeDifference);
                    } else {
                        clearInterval(setInterval(() => {}, 1000));
                    }
                }, 1000);
            });
        }
    },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(timeDifference) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(timeDifference / day));

    // Remaining hours
    const hours = addLeadingZero(Math.floor((timeDifference % day) / hour));

    // Remaining minutes
    const minutes = addLeadingZero(
        Math.floor(((timeDifference % day) % hour) / minute)
    );

    // Remaining seconds
    const seconds = addLeadingZero(
        Math.floor((((timeDifference % day) % hour) % minute) / second)
    );

    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
    console.log(dataSeconds.textContent == '00');

    return { days, hours, minutes, seconds };
}
