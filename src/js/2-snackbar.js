import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const buttonDelay = document.querySelector('input[name="delay"]');

buttonDelay.addEventListener('input', event => {
    const valueDelay = event.target.value;
    localStorage.setItem('valueDelay', `${valueDelay}`);
});

form.addEventListener('submit', event => {
    event.preventDefault();
    const resultState = form.elements.state.value;

    const delay = JSON.parse(localStorage.getItem('valueDelay'));

    localStorage.removeItem('valueDelay');
    form.reset();

    const messageDisplay = new Promise((resolve, rejecr) => {
        if (resultState === 'fulfilled') {
            setTimeout(() => {
                resolve(
                    iziToast.success({
                        title: 'OK',
                        message: `✅ Fulfilled promise in ${delay} ms`,
                        icon: '',

                        position: 'topRight',
                    })
                );
            }, `${delay}`);
        } else {
            setTimeout(() => {
                rejecr(
                    iziToast.error({
                        title: 'Error',
                        message: `❌ Rejected promise in ${delay} ms`,
                        icon: '',

                        position: 'topRight',
                    })
                );
            }, `${delay}`);
        }
    });

    messageDisplay
        .then(resolve => {
            resolve;
        })
        .catch(rejecr => {
            rejecr;
        });
});
