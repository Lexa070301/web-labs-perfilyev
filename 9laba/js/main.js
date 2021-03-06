$(document).ready(function () {
    $('.header__arrow, .header__menu__item__link').on( 'click', function(){
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
    $("input[type='tel']").mask("+7(999)999-99-99");
});