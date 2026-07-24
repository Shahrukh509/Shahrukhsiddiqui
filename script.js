$(document).ready(function(){
    // Sticky navbar on scroll
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // Scroll-up button show/hide
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }

        // Scrollspy: Highlight active nav link
        let scrollPos = $(window).scrollTop();
        $('section').each(function() {
            let top = $(this).offset().top - 150;
            let bottom = top + $(this).outerHeight();
            let id = $(this).attr('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                $('.navbar .menu li a').removeClass('active');
                $('.navbar .menu li a[href="#' + id + '"]').addClass('active');
            }
        });
    });

    // Scroll-up action
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0}, 'smooth');
    });

    // Toggle Mobile Navbar Menu
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("fa-bars fa-times");
    });

    // Close mobile navbar on link click
    $('.navbar .menu li a').click(function(){
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').addClass("fa-bars").removeClass("fa-times");
    });

    // Typing animation using Typed.js
    if (typeof Typed !== 'undefined') {
        new Typed(".typing", {
            strings: ["Senior Software Engineer", "Microservices Architect", "Full Stack Developer"],
            typeSpeed: 80,
            backSpeed: 40,
            loop: true
        });
    }

    // Skills Tab Switcher
    $('.tab-btn').click(function(){
        let tabId = $(this).attr('data-tab');
        
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        $('.tab-content').hide();
        $('#' + tabId + '-tab').fadeIn(300);
    });

    // Project Modals Controller
    $('.project-card').click(function(){
        let modalId = $(this).attr('data-modal');
        $('#' + modalId).addClass('active');
        $('body').css('overflow', 'hidden'); // Lock background scroll
    });

    // Close modal via close button or click outside
    $('.modal-close, .project-modal').click(function(e){
        if (e.target === this || $(this).hasClass('modal-close') || $(this).parents('.modal-close').length > 0) {
            $('.project-modal').removeClass('active');
            $('body').css('overflow', 'auto'); // Unlock background scroll
        }
    });

    // Prevent click inside modal content from closing the modal
    $('.modal-content').click(function(e){
        e.stopPropagation();
    });

    // Close modal on Escape key press
    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $('.project-modal').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    // Contact Form Submission Action
    $('#contactForm').submit(function(e){
        e.preventDefault();
        
        let name = $('#formName').val();
        let email = $('#formEmail').val();
        let msg = $('#formMsg').val();
        let submitBtn = $(this).find('button[type="submit"]');
        
        // Visual sending effect
        submitBtn.html('Sending... <i class="fas fa-spinner fa-spin"></i>').prop('disabled', true);
        
        setTimeout(function(){
            // Success State Reset
            submitBtn.html('Message Sent! <i class="fas fa-check"></i>').css('background', 'var(--accent)');
            
            // Show alert box (using modern styles instead of generic window alert)
            let alertBox = $('<div class="form-alert" style="position: fixed; bottom: 20px; left: 20px; background: var(--accent); color: #fff; padding: 15px 25px; border-radius: 8px; z-index: 1000; box-shadow: var(--shadow-lg); font-weight: 600; display: none;">Thank you ' + name + '! Your message was sent successfully.</div>');
            $('body').append(alertBox);
            alertBox.fadeIn(300).delay(3000).fadeOut(300, function(){
                $(this).remove();
            });

            // Reset form fields
            $('#formName').val('');
            $('#formEmail').val('');
            $('#formMsg').val('');
            
            // Restore button
            setTimeout(function(){
                submitBtn.html('Send Message').css('background', '').prop('disabled', false);
            }, 2000);
        }, 1500);
    });

    // Initialize Testimonials Carousel
    if ($.fn.owlCarousel) {
        $('.carousel').owlCarousel({
            margin: 20,
            loop: true,
            autoplay: true,
            autoplayTimeOut: 3000,
            autoplayHoverPause: true,
            responsive: {
                0:{
                    items: 1,
                    nav: false
                },
                768:{
                    items: 2,
                    nav: false
                },
                1000:{
                    items: 3,
                    nav: false
                }
            }
        });
    }
});