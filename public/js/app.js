//IIFE
(() => {

    document.querySelector('#btn-sign-in').addEventListener('click', alertMe);

    function alertMe() {
        document.querySelector('#btn-sign-in').remove();

        const newButton = `<button class="btn btn-primary btn-block" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Signing in...
        </button>`;

        document.querySelector('.main-form-policy').insertAdjacentHTML('beforebegin', newButton);
        document.querySelector('#form-sign-in').submit();
    };
})();