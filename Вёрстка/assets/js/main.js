$ (function () {
    $('.projects-slider').slick({
        infinite: true,
        dots: true,
        arrows: false,
        slidesToShow: 1,
        centerMode: true,
        focusOnSelect: true,
        // добавил свойство, которое разрешает элементу слайдера менять ширину в зависимости от нашего желания(настройка в css)
        variableWidth: true
        //
    });

        $('.gratitude__slider').slick({
        infinite: true,
        dots: true,
        arrows: true,
        slidesToShow: 1,
        arrows: false,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                arrows: true
            }
            },
        ] 
    });    

  
    $('.jsTabBtn').on('click', function() {
        const tabLabel = $(this).attr('data-tab');
        const contentLabel = $('.jsTabContent[data-tab="'+ tabLabel +'"]');  

        $('.jsTabBtn.active').removeClass('active');
        $(this).addClass('active');
    
        $('.jsTabContent.active').removeClass('active');
        contentLabel.addClass('active'); 
    });

    $('.jsBtn').on('click', function() {
        const tabLabel = $(this).attr('data-tab');
        const contentLabel = $('.jsContent[data-tab="'+ tabLabel +'"]');  

        $('.jsBtn.active').removeClass('active');
        $(this).addClass('active');
    
        $('.jsContent.active').removeClass('active');
        contentLabel.addClass('active'); 
    });
  

   // Burger

    $('.menu-contacts__burger').click(function () {
        $('.menu__wrapper .menu__list').toggleClass('active');
    })

    // Имитация подгрузки через json и ajaks  
    // Блог наши проекты
    $(document).ready(function () {
        let count = $('.news__item').length,
            start = 4,
            show = 2;

        $('.news__item').addClass('d-none');
        $('.news__item:lt(' +start+ ')').removeClass('d-none');

        $('.news__btn').click(function () {

        let load = $(this).data('load'),
            more = $(this).data('more');

        start = (start + show <= count) ? start + show : count;

        $(this).text(load);

        setTimeout(() => {
            $('.news__item:lt(' + start + ')').removeClass('d-none');

            if  ($('.news__item:not(.d-none)').length == count) {
                $(this).remove();
            }
            $(this).text(more);
        }, 1000);
        });
    });

    // Имитация подгрузки через json и ajaks  
    // Благодарность
    $(document).ready(function () {
        let count = $('.gratitude__wrapper').length,
            start = 2,
            show = 1;

        $('.gratitude__wrapper').addClass('d-none');
        $('.gratitude__wrapper:lt(' +start+ ')').removeClass('d-none');

        $('.gratitude__btn').click(function () {

        let load = $(this).data('load-gratitude'),
            more = $(this).data('more-gratitude');

        start = (start + show <= count) ? start + show : count;

        $(this).text(load);

        setTimeout(() => {
            $('.gratitude__wrapper:lt(' + start + ')').removeClass('d-none');

            if  ($('.gratitude__wrapper:not(.d-none)').length == count) {
                $(this).remove();
            }
            $(this).text(more);
        }, 1000);
        });
    });

  // pop-up

    // $('.mailing__form').submit(function(e) {
    //     var empty = $(this).parent().find("input").filter(function() {
    //         return this.value === "";
    //     });
    //     if (!empty.length) {
    //         //Если все графы заполнены, то показываем popup
    //         $('.thanks-modal').fadeIn();
    //         //очищаем все данные текстовых полей, кроме кнопок
    //         $('.mailing__form input').not(':button, :submit').val('');
    //     }
    //     e.preventDefault();
    // });

    // Закрытие модального окна
    $('.modal-wrapper button').on('click', function() {
        $('.modal-wrapper').fadeOut();
        $(this).children().fadeOut()
    });


    //Валидатор и регулярные выражения

    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })

  
    $.validator.addMethod("regex", function(value, element, regexp) {
        let regExp = new RegExp(regexp);
        return this.optional(element) || regExp.test(value)
    }, 'Please check your input');
    
    function valEl(el) {
        el.validate({
            rules: {
                firstName: {
                    required: true,
                    regex : "[A-Za-z]"   
                },

                email : {
                    required : true
                },

                phoneNumber: {
                    digits : true,
                    required: true,
                    minlength: 10,
                    maxlength: 12,
                    regex: "[0-9]+"
                },

                build: {
                    digits : true,
                    required: true,
                    minlength: 1,
                    maxlength: 10,
                    regex: "[0-9]+"
                },

                flat: {
                    digits : true,
                    required: true,
                    minlength: 1,
                    maxlength: 100,
                    regex: "[0-9]+"
                },

                country: {
                    required: true,
                    regex : "[A-Za-z]"   
                },

                town: {
                    required: true,
                    regex : "[A-Za-z]"   
                },

                street: {
                    required: true,
                    regex : "[A-Za-z]"   
                },
            },

            messages: {
                phoneNumber : {
                    required: 'Введите ваш телефон',
                    regex: 'Неправильно набран номер'
                },
                firstName : {
                    required: 'Введите ваше имя',
                    regex: 'Неправильно написано имя'
                },
                email : {
                    required: 'Неправильно введена почта',
                    regex: 'Неправильно введена почта'
                },
                country : {
                    required: 'Страна',
                    regex: 'Неправильно написана страна'
                },
                town : {
                    required: 'Город',
                    regex: 'Неправильно написан город'
                },
                street : {
                    required: 'Введите вашу улицу',
                    regex: 'Неправильно написана улица'
                },
                build : {
                    required: 'Номер дома',
                    regex: 'Неверный номер дома'
                },
                flat : {
                    required: 'Номер квартиры',
                    regex: 'Неверный номер квартиры'
                },
            },

            submitHandler: function(form){
                let $form = $(form);
                let $formId = $(form).attr('id');
                
                switch ($formId) {
                    case 'subscribe-form' :
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize()
                        })
                        .done(function() {
                            console.log('Succes');
                        })
                        .fail(function() {
                            console.log('Fail');
                        })
                        
                        .always(function() {
                            
                            setTimeout(function() {
                            $('.thanks-modal').fadeIn();
                            }, 100);
                        });
                    break;
                        
                } 
                return false;   
                
            }
            
        })

        // Очищает поле   
        // $('.mailing__btn').click( 
        //     function () {
        //         $('.mailing__mail').val('');
        //     }
        // ); 
        // Очищает поле 

    }
    
    

    $('.mailing__form').each(function() {
        valEl($(this));      
    });

    











});       // JQ END 