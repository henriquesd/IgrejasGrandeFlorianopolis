$(function () {

    $(document).on("scroll", onScroll);

    $(window).on("mousewheel", function(){
      $('html,body').stop();  
    });
         
    $('.nav li a').click(function(e) {

         if (e.target.innerText != "Eventos"){
            $('.nav li').removeClass('active');

            var $parent = $(this).parent();
            if (!$parent.hasClass('active')) {
                $parent.addClass('active');
            }
            e.preventDefault();
        }
    });
    
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })

        var nomeClass = e.target.className
        var $parent = $(this).parent();

        if (nomeClass != "navbar-brand inicioMenu"){
            $(this).addClass('active');
        }

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-50
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });        

    });
    
    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('#menu-navegacao a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.length != 0){
                if (refElement.position().top <= scrollPos +170 && refElement.position().top + refElement.height() > scrollPos) {
                    $('#menu-navegacao ul li a').removeClass("active");
                    currLink.addClass("active");
                    currLink.parent().removeClass("active");
                }
                else{
                    currLink.removeClass("active");
                }    
            }
            
        });
    }

    $('#menu-navegacao').find('a').click(function () {
        
        if (this.innerText != "Eventos"){
            var scrollPos = $(document).scrollTop();

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 50
                        //  ...offset().top - 30}, 1000);
                    }, 500);
                    return false;
                }
            }
        }
    });


    $(".inicioMenu").click(function(e) {
          $('#menu-navegacao li').removeClass("active");
    });
   
   $(".navbar-nav li a").click(function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
   });
    
});
    
