// Common functions for the navbar across all pages
// 190px
// Keeps track of whether or not the mobile nav tray is open
is_mobile_nav_tray_open = false;

// When the mobile hamburger menu button is clicked
$("#expanded_hamburger_icon").click(() => {
    if (is_mobile_nav_tray_open) {
        // Rotate the hamburger icon back to 0deg
        $("#expanded_hamburger_icon").animate(
            {deg: 0},
            {
                duration: 250,
                step: function(now) {
                    $(this).css({transform: `rotate(${now}deg)`});
                }
            }
        )

        // Slide in the mobile nav tray
        $("#mobile_nav_tray").animate({height: 0}, 250);

        is_mobile_nav_tray_open = false;
    }
    else {
        // Rotate the hamburger icon -90deg
        $("#expanded_hamburger_icon").animate(
            {deg: -90},
            {
                duration: 250,
                step: function(now) {
                    $(this).css({transform: `rotate(${now}deg)`});
                }
            }
        )

        // Slide out the mobile nav tray
        $("#mobile_nav_tray").animate({height: `190px`}, 250);

        is_mobile_nav_tray_open = true;
    }
})