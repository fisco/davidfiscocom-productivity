<script async>
    (function() {
        "use strict";

        function _goToSearchPage(searchUrl) {
            window.location.href = searchUrl;
        }

        function reportGoogleAnalyticsSearchEvent(jQueryObject, searchUrl) {
            var submitObject = {};

            ga && jQueryObject || _goToSearchPage(searchUrl);

            try {
                ga.getAll();
                submitObject.hitCallback = function() {
                    _goToSearchPage(searchUrl);
                }
                submitObject.hitType = "event";
                submitObject.eventCategory = jQueryObject.attr("id");
                submitObject.eventAction = "search";
                submitObject.eventLabel = jQueryObject.find("input.form-control").val();
                ga("send", submitObject);
            } catch (err) {
                _goToSearchPage(searchUrl);
            }
        }

        $(".fisco-site-search-form").submit(function(event) {
            event.preventDefault();
            reportGoogleAnalyticsSearchEvent($(this), "https://www.google.com/search?q=" + encodeURIComponent($(this).find("input.form-control").val()) + "+site%3A" + "davidfisco.com");
        });
    })();
</script>
