'use strict';

(function () {

    var clock = document.querySelector('#clock');

    document.body.addEventListener('click', function (event) {
        var timezone = event.target.dataset.timezone;
        if (timezone) {
            clock.setAttribute('timezone', timezone);
        }
    });

})();
