(function (jQuery) {
    "use strict";
    var revapi, tpj;

    // INDEX-6 REV-SLIDER (DEMO6 - Predictive Analytics)
    jQuery(document).ready(function () {
        tpj = jQuery;

        if (tpj("#rev_slider_6_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_6_1");
        } else {
            revapi = tpj("#rev_slider_6_1").show().revolution({
                jsFileLocation: "./assets/revslider/js/",
                sliderLayout: "fullwidth",
                visibilityLevels: "1240,1024,778,480",
                gridwidth: "1400,1024,767,479",
                gridheight: "900,700,500,400",
                minHeight: "900",
                autoHeight: false,
                lazyType: "smart",
                spinner: "spinner0",
                editorheight: "900,700,500,400",
                responsiveLevels: "1240,1024,778,480",
                disableProgressBar: "on",
                navigation: {
                    mouseScrollNavigation: false,
                    touch: {
                        touchenabled: true
                    }
                },
                parallax: {
                    levels: [1, 2, 3, 4, 5, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                    type: "mouse"
                },
                fallbacks: {
                    allowHTML5AutoPlayOnAndroid: true
                },
            });
        }

    });

})(jQuery);

function revslider_showDoubleJqueryError(sliderID) {
    var err = "<div class='rs_error_message_box'>";
    err += "<div class='rs_error_message_oops'>Oops...</div>";
    err += "<div class='rs_error_message_content'>";
    err += "You have some jquery.js library include that comes after the Slider Revolution files js inclusion.<br>";
    err += "To fix this, you can:<br>&nbsp;&nbsp;&nbsp; 1. Set 'Module General Options' ->  'jQuery & OutPut Filters' -> 'Put JS to Body' to on";
    err += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jQuery.js inclusion and remove it";
    err += "</div>";
    err += "</div>";
    jQuery(sliderID).show().html(err);
}

