/// <reference path="~/js/jquery-1.8.3.js"/>
$(document).ready(function () {
    $("#featured > ul").tabs({ fx: [{ opacity: 'fadeOut', duration: 'fast' }, { opacity: "toggle", duration: 'fast' }] }).tabs("rotate", 5000, true);
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0") {
        DD_belatedPNG.fix('div, ul, img, li, input , a:hover');
    }
    $("#featured > ul a").each(function () {
        $(this).focus(function () {
            $(this).blur();
        });
    });
});