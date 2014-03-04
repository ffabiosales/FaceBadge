(function ($) {
    /*
     jquery.faceBadge.js v1.0
     Last updated: 31 January 2014
     
     Created by Fábio Sales
     
     
     Licensed under a Creative Commons Attribution-Non-Commercial 3.0 Unported License
     http://creativecommons.org/licenses/by-nc/3.0/
     */
    /*global window, jQuery */
    $.fn.faceBadge = function (options) {
        "use strict";

        $.fn.faceBadge.defaults = {
            pageId: null,
            loaderText: "Loading badge...",
            width: 500,
            height: 165,
            coverHeight: 137,
            textColor: "#999",
            showDesc: false,
            linkToPage: true
        };

        var o = $.extend({}, $.fn.faceBadge.defaults, options);

        return this.each(function () {
            var c = $(this),
                preLoaderHTML = $("<p class=\"preLoader\">" + o.loaderText + "</p>");

            // hide container element, remove alternative content, and add class
            c.hide().empty().addClass("faceBadge");


            // add preLoader to container element
            //var preLoaderHTML = $("<p class=\"preLoader\">" + o.loaderText + "</p>");
            c.append(preLoaderHTML);

            // show container element
            c.css('width', o.width);
            c.css('height', o.height);
            c.show();
            //c.html('teste');

            // call facebook graph of page.
            window.jsonPageGraph = "http://graph.facebook.com/" + o.pageId;


            //code to fetch fan page details
            jQuery.getJSON(jsonPageGraph, {
                format: "json"
            })
                    .done(function (data) {

                        c.hide();
                        var fb_count = data['likes'].toString(),
                            fb_about = data['about'].toString().substr(0, 100) + ' ...',
                            fb_name = data['name'].toString(),
                            fb_desc = '',
                            fb_about = '',
                            coverBad = data.cover.source,
                            cover = coverBad.replace('s720x720', 's720x720'),
                            desc = '';
                        if (o.linkToPage) {
                            var link = '<a target="_blank" href="' + data['link'] + '">',
                                linkEnd = '</a>';
                        } else {
                            link = '';
                            linkEnd = '';
                        }
                        if (data['description'] !== undefined) {
                            fb_desc = data['description'].toString().substr(0, 70) + ' ...';
                            desc = fb_desc;
                        }
                        else {
                            fb_desc = 'No description';

                            if (data['about'] !== undefined) {
                                fb_about = data['about'].toString().substr(0, 70) + ' ...';

                                desc = fb_about;
                            }
                            else {
                                fb_about = 'No description';
                            }

                        }

                        fb_count = add_commas(fb_count);
                        c.html('<div class="faceBadge-cover"></div>');
                        var fbcover = $(".faceBadge-cover");
                        fbcover.css('height', o.coverHeight);

                        if (o.showDesc) {
                            fbcover.append('<div class="faceBadge-desc">' + desc + '</div>');
                        }
                        fbcover.append('<img width="' + o.width + ' " style="" src="' + cover + '" /><div style="height: ' + o.coverHeight + 'px ; width:100%" class="cover-shadow"></div>');
                        //c.append('<div style="height: 100%; width:100%" class="cover-shadow"></div>');
                        c.append('<div id="faceBadge" class="faceBadge-page-data"></div>');

                        var fbdata = $('.faceBadge-page-data');
                        fbdata.append('<div class="FaceBadge-image">' + link + '<img src="https://graph.facebook.com/' + o.pageId + '/picture?width=100&height=100" width="100" height="100"/>' + linkEnd + '</div>');
                        fbdata.append('<div class="faceBadge-content"><div class="faceBadge-name">' + fb_name + '</div></div>');
                        fbdata.append('<div class="faceBadge-like-count"></div>');
                        $(".faceBadge-like-count").append('<iframe src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent(('http://www.facebook.com/' + o.pageId)) + '&amp;width=100px&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=35&amp;appId=442899805810904" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:35px; float:left" allowTransparency="true" id="face"></iframe>');
                        $(".faceBadge-like-count").append('<span style="color:' + o.textColor + '; text-shadow:none">' + fb_count + '</span>');

                        c.fadeIn();
                    });

        });
        
        //customize like number
        function add_commas(number) {
            if (number.length > 3) {
                var mod = number.length % 3,
                    signal = '.',
                    output = (mod > 0 ? (number.substring(0, mod)) : ''),
                    i = 0;
                for (i = 0; i < Math.floor(number.length / 3); i++) {
                    if ((mod === 0) && (i === 0)) {
                        output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                    } else {
                        if (output > 1) {
                            signal = ',';
                        }
                        output += signal + number.substring(mod + 3 * i, mod + 3 * i + 3);
                    }
                }
                return (output);
            } else {
                return number;
            }
        }
    };
})(jQuery);