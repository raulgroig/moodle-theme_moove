require(['core/first'], function() {
    require(['jquery', 'theme_moove/app', 'core/log'],
        function($, Moove, log) {
            log.debug('Moove JS initialised');

            // Add slideDown animation to Bootstrap dropdown when expanding.
            $('.navbar-custom-menu .dropdown').on('show.bs.dropdown', function() {
                $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
            });

            // Add slideUp animation to Bootstrap dropdown when collapsing.
            $('.navbar-custom-menu .dropdown').on('hide.bs.dropdown', function() {
                $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
            });

            function setEqualHeightMax(selector) {
                if (selector.length > 0) {
                    var arr = [];
                    var selector_height;
                    selector.css("min-height", "initial");
                    selector.each(function(index, elem) {
                        selector_height = elem.offsetHeight;
                        arr.push(selector_height);
                    });
                    selector_height = Math.max.apply(null, arr);
                    selector.css("min-height", selector_height);
                }
            }
            function setEqualHeightMin(selector) {
                if (selector.length > 0) {
                    var arr = [];
                    var selector_height;
                    selector.css("max-height", "initial");
                    selector.each(function(index, elem) {
                        selector_height = elem.offsetHeight;
                        arr.push(selector_height);
                    });
                    selector_height = Math.min.apply(null, arr);
                    selector.css("max-height", selector_height);
                }
            }
            $(function() {
                $("[data-pincontrolsidebar]").on('click', function (e) {
                    e.preventDefault();
                    // Toggle the class.
                    $(this).toggleClass('pinned');

                    var pinned = 0;
                    if($(this).hasClass('pinned')){
                        pinned = 1;
                    }

                    change_layout($(this).data('pincontrolsidebar'));
                    var slide = 1;
                    if(Moove.options.controlSidebarOptions.slide) {
                        slide = 0;
                    }
                    Moove.options.controlSidebarOptions.slide = slide;
                    $(".rightsidebar-toggle").data('slide', slide);
                    M.util.set_user_preference('postsidebar_pinned', pinned);
                    if (!slide) {
                        $('.control-sidebar').removeClass('control-sidebar-open');
                    } else {
                        $('.control-sidebar').addClass('control-sidebar-open');
                    }
                });

                // Set equal heights for all grid columns in theme.
                setEqualHeightMax($('.wdm_generalbox .iconbox .iconbox-content'));
                setEqualHeightMax($('.course-grid > div .box-body'));
                setEqualHeightMax($('#frontpage-course-list .fp-coursebox'));
                setEqualHeightMax($('#frontpage-course-list .card-content'));
                setEqualHeightMax($('.blog .recent-caption'));

                // For scrolling large tables for small screen.
                setTimeout(function() {
                    $('.content table').each(function(ind, obj) {
                        if ($(this).width() > $('.content-wrapper > .content').width()) {
                            $(this).wrap("<div class='no-overflow table-wrap-remui'></div>");
                            $(this).parent('.table-wrap-remui').prepend(function() {
                                return "<span class='indicate-right'><i class='fa fa-arrow-right fa-lg' style='padding: 10px 1px;' aria-hidden='true'></i></span>";
                            });
                        }
                    });

                    $('body').on('click', '.indicate-right', function() {
                        var in_pr = $(this).parent('.table-wrap-remui');
                        $(in_pr).scrollLeft(1000);
                    });
                }, 2000);
            });
        });
});
