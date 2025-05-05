console.log('ready index');

// je rentre dans la zone d'un svg
$('svg .zone').on('mouseenter', function(){
    console.log('mouse enter zone');
    //
    $(this).parent().find('.fond').removeClass('hidden');
});
// je clique sur la zone d'un svg
$('svg .zone').on('click',function(){
    console.log('click zone');
    //
    let nom = $(this).parent().attr('data-name');
    console.log(nom);
    let slide = $('section[data-name="'+nom+'"]');
        $('section.slide').removeClass('opened');
        slide.addClass('opened');
});
// je sors de la zone d'un svg
$('svg .zone').on('mouseleave',function(){
    console.log('mouse leave zone');
    //
    $(this).parent().find('.fond').addClass('hidden');
});


// fermeture bouton slide
$('section.slide button').on('click', function(){
    console.log('click button close slide');

    $(this).parent().removeClass('opened');
})