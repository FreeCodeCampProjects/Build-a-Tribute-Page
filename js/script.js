/* ( x ) When the DOM loads, our script is executed:
*****************************************************/

jQuery(document).ready(function() {
    var animateIn, chevron, closeAccordionSection;
    
    /* ( x ) 'animateIn' enacts an intro animation 
        so as to fade and move elements in at 
        different times:
    **************************************************/

    animateIn = function(ei) {
        var expandIntro = ei;

        $('.accordion, .footer, .image').hide();
        $('.title-row').fadeIn(2500);

        setTimeout(function() {
            $('.title-row').animate({ marginTop: 20 });
            setTimeout(function() { $('.image').fadeIn(2000); }, 1000);
            setTimeout(function() { $('.accordion').fadeIn(2000); }, 2000);
            setTimeout(function() { $('.footer').fadeIn(2000); }, 2500);
            if (expandIntro) setTimeout(function() { $('#accordion-1')[0].click(); }, 3500);
        }, 3500);
    };

    /* ( x ) 'chevron' is an object that stores
        different chevron states/classes for accordion:
    **************************************************/

    chevron = {
        down: 'glyphicon-chevron-down',
        downArrow: true,
        up: 'glyphicon-chevron-up'
    };

    /* ( x ) When the user closes an accordion section
        what happens behind the scenes is that the
        element loses its "active" class and contracts
        (jQuery's slideUp):
    **************************************************/

	closeAccordionSection = function () {
		jQuery('.accordion .accordion-section-title').removeClass('active');
		jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	};

    /* ( x ) When the accordian is clicked, the chevron
        (arrow icon) state is toggled:
    **************************************************/

	jQuery('.accordion-section-title').click(function(e) {
        let x = $(e.target).html(), y;
        
        if (chevron.downArrow) {
            chevron.downArrow = false;
            y = x.replace(chevron.down, chevron.up)
        } else {
            chevron.downArrow = true;
            y = x.replace(chevron.up, chevron.down)
        }

        $(e.target).html(y);

        /* ( x ) Grab current anchor value:
        **************************************************/

		let currentAttrValue = jQuery(this).attr('href');

		if (jQuery(e.target).is('.active')) {
			closeAccordionSection();
		} else {
			closeAccordionSection();
			jQuery(this).addClass('active');
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}
		e.preventDefault();
	});
    
    /* ( x ) "animateIn(0)" calls the animateIn
        function and passes it an argument of 0. 
        What this does is provide a falsy value so
        as the accordion doesn't expand automatically
        when the intro animation finishes. It was
        set up this way so that if I change my mind
        later and feel content should be presented to
        the user upon the intro animation finishing, I
        can easily change it (change the 0 to a 1):
    **************************************************/

    animateIn(0);
});