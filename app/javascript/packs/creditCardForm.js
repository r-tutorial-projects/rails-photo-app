$(document).ready(function (message) {
    const showError = function () {
        if ($('#flash-messages').size < 1) {
            $('div.container.main div:first').prepend('<div class="flash-messages"></div>');
        }
        $('#flash-messages').html('<div class="alert alert-warning">' +
            '<a class="close" data-dismiss="alert">x</a>' +
            '<div id="flash-alert">' + message + '</div></div>');
        $('.alert').delay(5000).fadeOut(3000);
        return false;
    };

    const responseHandler = function (status, response) {
        const form = $('.cc_form');
        if (response.error) {
            console.error(response.error.message);
            showError(response.error.message);
            form.find('input[type=submit]').prop('disabled', false);
        } else {
            const token = response.id;
            form.append($('<input type="hidden" name="payment[token]" />').val(token));
            $('[data-stripe=number]').remove();
            $('[data-stripe=cvc]').remove();
            $('[data-stripe=exp-year]').remove();
            $('[data-stripe=exp-month]').remove();
            $('[data-stripe=label]').remove();
            form.get(0).submit();
        }

        return false;
    };

    $('.cc_form').on('submit', function (e) {
        const form = $(e.target);
        form.find('input[type=submit]').prop('disabled', true);

        if (Stripe) {
            Stripe.card.createToken($form, responseHandler);
        } else {
            showError("Failed to load credit card processing functionality. Please reload this page in your browser.");
        }
        return false;
    });
});
