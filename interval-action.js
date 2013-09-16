(function ($) {

    function setCountAndExpiration(cookieName, runCount, expirationInterval) {
        setCookie(cookieName + "Count", runCount, 365);
        setCookie(cookieName + "Expiration", "", expirationInterval);
    }

    function getCookie(cookieName) {
        var c = document.cookie;
        var cStart = c.indexOf(" " + cookieName + "=");
        if (cStart == -1) {
            cStart = c.indexOf(cookieName + "=");
        }
        if (cStart == -1) {
            c = null;
        }
        else {
            cStart = c.indexOf("=", cStart) + 1;
            var cEnd = c.indexOf(";", cStart);
            if (cEnd == -1) {
                cEnd = c.length;
            }
            c = unescape(c.substring(cStart, cEnd));
        }
        return c;
    }

    function setCookie(cookieName, cookieValue, actionInterval) {
        var exDate = new Date();
        exDate.setDate(exDate.getDate() + actionInterval);
        var c = escape(cookieValue) + ((actionInterval == null) ? "" : "; expires=" + exDate.toUTCString());
        document.cookie = cookieName + "=" + c;
    }

    $.intervalAction = function (options) {
        var settings = $.extend({
            cookieName: "TSDIntervalAction",
            actionInterval: null,
            actionCount: 3,
            functionToRun: null
        }, options);

        var countCookie = getCookie(settings.cookieName + "Count");
        var expirationCookie = getCookie(settings.cookieName + "Expiration");

        if (countCookie == null && expirationCookie == null) {
            setCountAndExpiration(settings.cookieName, 1, settings.interval);
        } else {
            if (countCookie != null && countCookie < settings.actionCount && expirationCookie == null) {
                var runCount = parseInt(countCookie) + 1;
                setCountAndExpiration(settings.cookieName, runCount, settings.interval);
            } else {
                return false;
            }
        }

        if (settings.functionToRun != null) {
            return settings.functionToRun();
        } else {
            return false;
        }
    };

}(jQuery));
