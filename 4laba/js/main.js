$(document).ready(function () {
    $('.burger').on('click', function() {
        console.log('hello');
        $('.burger span').toggleClass('active');
        $('.menu').toggleClass('anime');
    });
    $('.close').on('click', function() {
        $('.menu').toggleClass('anime');
        $('.burger span').toggleClass('active');
    })
});