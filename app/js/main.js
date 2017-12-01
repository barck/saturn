if(window.screen.width >= 765) {
    $('.areas-slider').slick({
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1
    });
    $('.similar-slider').slick({
        infinite: true,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1
    });
    $('.partners-slider').slick({
        infinite: true,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1
    });
} else{
    $('.areas-slider').slick({
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $('.similar-slider').slick({
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $('.partners-slider').slick({
        infinite: true,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 2,
        slidesToScroll: 1
    });
}


$(document).ready(function(){
    $("#scroll").on("click"," a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        // event.preventDefault();    //раскомментировать, если будет лагать скролл

        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href');

        // если ебучая пустая ссылка - выходим (для формы захвата)
        if(id === '#' || id !== undefined && id.length > 0 && id[0] !== '#' ) {
            return;
        }

        $id = $(id);

        // если не на главной - перемещаемся туда
        if($id === undefined || $id.length === 0) {
            window.location.href = "/#" + id;
            return;
        }

        //узнаем высоту от начала страницы до блока на который ссылается якорь
        var top = $(id).offset().top - 90;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
});


// $( "#arrow" ).click(function() {
//     $( "#arrow" ).fadeOut( 1500, function() {
//         // Анимация завершена.
//     });
// });


$('#menu-toggle').click(function(){
    $(this).toggleClass('open');
    $('.nav').toggleClass('toggle');
})
