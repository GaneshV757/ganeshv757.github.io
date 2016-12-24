$(function() {
    $('.jcarousel').jcarousel({
        wrap: 'both',
        center: true
    });
    $('.jcarousel-prev')
        .on('jcarouselcontrol:active', function() { $(this).removeClass('inactive'); })
        .on('jcarouselcontrol:inactive', function() { $(this).addClass('inactive'); })
        .jcarouselControl({
            target: '-=1'
        });
    $('.jcarousel-next')
        .on('jcarouselcontrol:active', function() { $(this).removeClass('inactive'); })
        .on('jcarouselcontrol:inactive', function() { $(this).addClass('inactive'); })
        .jcarouselControl({
            target: '+=1'
        });
    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() { $(this).addClass('page-active'); })
        .on('jcarouselpagination:inactive', 'a', function() { $(this).removeClass('page-active'); })
        .jcarouselPagination({
            item: function(page) {
                console.log('page ' + page);
                var show = parseInt(page) - 1;
                console.log('show ' + show);
                return '<a href="#' + page + '">' + show + '</a>';
            }
        });
});
