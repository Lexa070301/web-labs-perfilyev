$(document).ready(function () {
    $('.header__img').on( 'click', function(){
        var el = $(this);
        var dest = el.attr('href'); // получаем направление
        if(dest !== undefined && dest !== '') { // проверяем существование
            $('html').animate({
                    scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
                }, 1000 // скорость прокрутки
            );
        }
        return false;
    });
});