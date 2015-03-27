(function () {

    // Creates an object based in the HTML Element prototype
    var element = Object.create(HTMLElement.prototype);

    var importDoc = document.currentScript.ownerDocument,
        templateDocument = importDoc.querySelector('#hs-clock').content;

    // Fires when an instance of the element is created
    element.createdCallback = function () {

        var self = this,
            shadow = self.createShadowRoot();

        shadow.appendChild(templateDocument.cloneNode(true));
    };

    // Fires when an instance was inserted into the document
    element.attachedCallback = function () {

        var self = this,
            shadow = self.shadowRoot;

        var $hours = shadow.children[0],
            $minutes = shadow.children[2],
            $seconds = shadow.children[4],
            $timezone = shadow.children[6];

        var lastTime = new Date().getTime();

        var updateTime = function () {

            var time = new Date().getTime();

            if (time > lastTime) {

                var m = moment().tz(self.getAttribute('timezone'));

                $hours.innerHTML = m.format('HH');
                $minutes.innerHTML = m.format('mm');
                $seconds.innerHTML = m.format('ss');
                $timezone.innerHTML = m.format('zz');

                lastTime = time + 1000;
            }
            self.raf = requestAnimationFrame(updateTime);
        };

        updateTime();
    };

    // Fires when an instance was removed from the document
    element.detachedCallback = function () {
        var self = this;
        cancelAnimationFrame(self.raf);
    };

    // Fires when an attribute was added, removed, or updated
    element.attributeChangedCallback = function (attr, oldVal, newVal) {
        console.log('hs-clock attr changed', attr, oldVal, newVal, this);
    };

    document.registerElement('hs-clock', {
        prototype: element
    });
}());