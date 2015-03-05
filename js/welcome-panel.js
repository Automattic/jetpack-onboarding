(function ($) {
    $(document).ready(function () {
        var moveToNextSection = function (currentSection) {
            currentSection.hide();
            currentSection.next().show();
            $( '.getting-started__steps ol li.current')
                .removeClass('current')
                .addClass('completed')
                .next().addClass('current');
        };
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
    });
})(jQuery);
