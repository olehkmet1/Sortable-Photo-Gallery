var thumbnailSpacing = 15;
$(document).ready(function(){
    $('a.sortLink').on('click', function(e){
        e.preventDefault();
        $('a.sortLink').removeClass('selected');
        $(this).addClass('selected');
        let keyword = $(this).attr('data-keyword');
        sortThumbnails(keyword);
    });
    $('.gallery .sorting').css('margin-bottom',window.thumbnailSpacing+'');
    $('.thumbnail_container a.thumbnail').addClass('showMe').addClass('fancybox').attr('rel','group');
    
    positionThumbnails();
    
}
);


function sortThumbnails(keyword) {
    $('.thumbnail_container a.thumbnail').each(function () {
        let thumbnailKeywords = $(this).attr('data-keywords');
        if (keyword === 'all') {
            $(this).addClass('showMe').removeClass('hideMe');
        } else {
            if (thumbnailKeywords.indexOf(keyword) != -1) {
                $(this).addClass('showMe').removeClass('hideMe').attr('rel','group');
            } else {
                $(this).addClass('hideMe').removeClass('showMe').attr('rel','none');
            }
        }
    });
    positionThumbnails();
}
$( window ).resize(function() {
    positionThumbnails();
  });
function positionThumbnails(){
    $('.debug-remainder').html('');
    $('.thumbnail_container a.thumbnail.hideMe').animate({opacity:0},500, function(){
        $(this).css({'display':'none','top':'0px','left':'0px'});
    })
    let containerWidth = $('.photos').width(),
        thumbnail_R = 0,
        thumbnail_C = 0,
        thumbnailWidth = $('a.thumbnail img:first-child').outerWidth() + window.thumbnailSpacing,
        thumbnailHeight = $('a.thumbnail img:first-child').outerHeight() + window.thumbnailSpacing,
        max_C = Math.floor(containerWidth / thumbnailWidth);
        $('.thumbnail_container a.thumbnail.showMe').each(function (index) {
            let remainder = (index%max_C)/100,
                maxIndex = 0;
                $('.debug-remainder').append(remainder+' - ');
            if (remainder == 0) {
                if (index != 0) {
                    thumbnail_R +=thumbnailHeight;
                }
                thumbnail_C = 0;
            } else {
                thumbnail_C += thumbnailWidth;
            }    
            $(this).css('display','block').animate({
                'opacity':1,
                'top':thumbnail_R+'px',
                'left':thumbnail_C+'px'
            },500);

           
        });
        detectFancyboxLinks();
        let sortingWidth = $('.thumbnail_container').width()/ thumbnailWidth;
        let newWidth = sortingWidth * thumbnailWidth - window.thumbnailSpacing;
        $('.sorting').css('width',newWidth+'px');
}
function detectFancyboxLinks() {
    $('a.fancybox').unbind('click.fb');
    if ($(window).width()<550) {
        $('.thumbnail_container a.thumbnail').removeClass('fancybox').attr('target','_blank');
    } else {
        $('.thumbnail_container a.thumbnail').removeAttr('target');
    }
    $('a.fancybox[rel="group"]').fancybox({
        'transitionIn':'elastic',
        'transitionOut':'elastic',
        'titlePosition':'over',
        'speedIn': 500,
        'overlayColor' : '#000',
        'padding': 0,
        'overlayOpacity' : .75,
        'cyclic' : true
    })
}