(function ($) {
    $(document).ready(function () {
        var moveToNextSection = function (currentSection) {
            currentSection.hide();
            currentSection.next().show();
            $('.getting-started__steps ol li.current')
                .removeClass('current')
                .addClass('completed')
                .next().addClass('current');
        };

        // Skip buttons
        $('.welcome__section a.skip').click(function (event) {
            event.preventDefault();
            var currentSection = $(this).closest('.welcome__section');
            moveToNextSection(currentSection);
        });

        // Title step
        $('#welcome__site-title .submit input').click(function (event) {
            var data, title = $('#site-title').val();
            event.preventDefault();

            if (!title || title.trim() === '') {
                return;
            }
            data = {
                action: 'jps_change_title',
                nonce: JPS.jps_change_title,
                title: title
            };
            $('#wp-admin-bar-site-name a').html(title);
            $.post(ajaxurl, data);
            moveToNextSection($('#welcome__site-title'));
        });

        // Layout step
        $('#welcome__layout .submit input').click(function (event) {
            event.preventDefault();
            moveToNextSection($('#welcome__layout'));
        });

        // Stats step
        $('#welcome__stats .submit input').click(function (event) {
            event.preventDefault();
            moveToNextSection($('#welcome__stats'));
        });

        // Design step
        $('#welcome__design .submit input').click(function (event) {
            event.preventDefault();
            moveToNextSection($('#welcome__design'));
        });

        // Traffic step
        $('#welcome__traffic .submit input').click(function (event) {
            event.preventDefault();
            moveToNextSection($('#welcome__traffic'));
        });

        // Advanced step
        $('#welcome__advanced .submit input').click(function (event) {
            event.preventDefault();
            moveToNextSection($('#welcome__advanced'));
        });

    });
})(jQuery);
