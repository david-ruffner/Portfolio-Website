function get_employers() {
    $.ajax({
        url: 'https://api.davidr.pro/virtualresume/employers',
        success: function(response) {
            try {
                response = JSON.parse(response);
                if (!response.status === "success") {
                    console.log("Error");
                }
                try {
                    var employers = response.message[0].employers;
                    // Create an employer card for each employer
                    employers.forEach(employer => {
                        var card = `
                        <div class='employer_container'>
                            <h1>${employer.employer_name}</h1>
                            <p>${employer.job_title}</p>
                            <hr>
                            <p>${employer.start_date} - ${employer.end_date}</p>
                            <button value='${employer.employer_id}' class='employer_more_info_button'>More Info</button>
                        </div>`;

                        $("#employment_resume_container").append(card);
                    })

                    // Animate in each card
                    $(".employer_container").each(function(index) {
                        $(this).delay(50 * index).animate({left: 0, opacity: 1}, 250);
                    })
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            catch (ex) {
                console.log(ex);
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
}

function get_education() {
    $.ajax({
        url: 'https://api.davidr.pro/virtualresume/education',
        success: function(response) {
            try {
                response = JSON.parse(response);
                if (!response.status === "success") {
                    console.log("Error");
                }
                try {
                    var education = response.message[0].education;
                    // Create an employer card for each employer
                    education.forEach(educate => {
                        if (educate.major_name && educate.major_name.length > 0) {
                            // In this case the card will have 5 rows
                            var card = `
                            <div class='education_container'>
                                <h1>${educate.school_name}</h1>
                                <p>${educate.degree_name}</p>
                                <p>${educate.major_name}</p>
                                <hr>
                                <p>${educate.graduation_date}</p>
                            </div>`;
                            $("#education_resume_container").append(card);
                        }
                        else {
                            // In this case the card will have 4 rows
                            var card = `
                            <div class='education_container'>
                                <h1>${educate.school_name}</h1>
                                <p>${educate.degree_name}</p>
                                <hr>
                                <p>${educate.graduation_date}</p>
                            </div>`;
                            $("#education_resume_container").append(card);
                        }
                    })

                    // Animate in each card
                    $(".education_container").each(function(index) {
                        $(this).delay(50 * index).animate({left: 0, opacity: 1}, 250);
                    })
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            catch (ex) {
                console.log(ex);
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
}

// Adds the contact links to the DOM
function add_contact_info(contact_info) {
    // Add the GitHub link
    var html =
    `<div class="contact_container">
        <img src="./resources/icons/github.png" width="100"/>
        <hr>
        <a href="${contact_info.github_link}" target="_blank">${contact_info.github_link.replace(/https?:\/\//, "")}</a>
    </div>`;
    $("#contact_info_container").append(html);

    // Add the LinkedIn link
    html =
    `<div class="contact_container">
        <img src="./resources/icons/linkedin.png" width="100"/>
        <hr>
        <a href="${contact_info.linkedin_link}" target="_blank">${contact_info.linkedin_link.replace(/https?:\/\//, "")}</a>
    </div>`;
    $("#contact_info_container").append(html);

    // Add the email link
    html =
    `<div class="contact_container">
        <img src="./resources/icons/envelope.png" width="125"/>
        <hr>
        <a href="mailto:${contact_info.email_address}">${contact_info.email_address}</a>
    </div>`;
    $("#contact_info_container").append(html);

    // Parse the phone number into human readable format
    var friendly_phone_number = `(${contact_info.phone_number.substring(0, 3)}) ${contact_info.phone_number.substring(3, 6)}-${contact_info.phone_number.substring(6)}`;
    
    // Add the phone number
    html =
    `<div class="contact_container">
        <img src="./resources/icons/phone.png" width="100"/>
        <hr>
        <a href="tel:${contact_info.phone_number}">${friendly_phone_number}</a>
    </div>`;
    $("#contact_info_container").append(html);
}

// Adds the language skills to the DOM
function add_language_skills(languages) {
    current_language = 1;
    languages.forEach(language => {
        html =
        `<div class="skill_meter" skill-level="${language.familiarity_score}">
            <h2 class="skill_header">${language.language_name}</h2>
            <div class="skill_meter_background"></div>`;
        
        if (current_language < 5) {
            html += `<div class="skill_meter_foreground" style="background-color: var(--web-blue)"></div>`
        }
        else {
            html += `<div class="skill_meter_foreground" style="background-color: var(--web-orange)"></div>`
        }

        if (current_language >= 8) {
            current_language = 1;
        }
        else {
            current_language++;
        }
        
        html += `<div class="skill_tooltip">
                <p>${(language.familiarity_score / 10).toFixed(1)} / 10</p>
            </div>
        </div>`;
        $("#languages_card").append(html);
    })

    // Animate in the languages card meters
    
}

// Add professional skills to the DOM
function add_professional_skills(skills) {
    current_skill = 1;
    skills.forEach(skill => {
        html =
        `<div class="skill_meter" skill-level="${skill.familiarity_score}">
            <h2 class="skill_header">${skill.skill_name}</h2>
            <div class="skill_meter_background"></div>`;
        
        if (current_language < 5) {
            html += `<div class="skill_meter_foreground" style="background-color: var(--web-blue)"></div>`
        }
        else {
            html += `<div class="skill_meter_foreground" style="background-color: var(--web-orange)"></div>`
        }

        if (current_language >= 8) {
            current_language = 1;
        }
        else {
            current_language++;
        }
        
        html += `<div class="skill_tooltip">
                <p>${(skill.familiarity_score / 10).toFixed(1)} / 10</p>
            </div>
        </div>`;
        $("#professional_skills_card").append(html);
    })
}

// Add personal skills to the DOM
function add_personal_skills(skills) {
    current_skill = 1;
    skills.forEach(skill => {
        html =
        `<div class="skill_meter" skill-level="${skill.familiarity_score}">
            <h2 class="skill_header">${skill.skill_name}</h2>
            <div class="skill_meter_background"></div>`;
        
        if (current_language < 5) {
            html += `<div class="skill_meter_foreground" style="background-color: var(--web-blue)"></div>`
        }
        else {
            html += `<div class="skill_meter_foreground" style="background-color: var(--web-orange)"></div>`
        }

        if (current_language >= 8) {
            current_language = 1;
        }
        else {
            current_language++;
        }
        
        html += `<div class="skill_tooltip">
                <p>${(skill.familiarity_score / 10).toFixed(1)} / 10</p>
            </div>
        </div>`;
        $("#personal_skills_card").append(html);
    })
}

// Add employment history to the DOM
function add_employment_history(jobs) {
    jobs.forEach(job => {
        html =
        `<div class="employment_card">
            <div class="employment_card_overlay">
                <h1>Click For More Info</h1>
            </div>
            <h1>${job.employer_name}</h1>
            <hr>
            <h2>${job.job_title}</h2>
            <h2>${job.start_date} - `;
        
        html += (job.currently_working ? `Present</h2></div>` : `${job.end_date}</h2></div>`);
        
        $("#employment_history_container").append(html);
    })
}

// Add education history to the DOM
function add_education_history(education) {
    education.forEach(degree => {
        html =
        `<div class="education_card">
            <div class="education_card_overlay">
                <h1>Click For More Info</h1>
            </div>
            <h1>${degree.school_name}</h1>
            <hr>
            <h2>${degree.degree_type}</h2>
            <h2>Major: ${degree.major}</h2>
            <h2>Graduated: ${degree.graduation_date}</h2>
        </div>`;
        
        $("#education_history_container").append(html);
    })
}

// Add certificate history to the DOM
function add_certificate_history(certificates) {
    certificates.forEach(cert => {
        html =
        `<div class="certificate_card">
            <div class="certificate_card_overlay">
                <h1>Click For More Info</h1>
            </div>
            <h1>${cert.certificate_organization}</h1>
            <hr>
            <h2>${cert.certificate_name}</h2>
            <h2>Received: ${cert.received_date}</h2>
        </div>`;
        
        $("#certificate_history_container").append(html);
    })
}

// Global var to hold the resume API response
var resp;

// Keeps track of the current resume view switch (default is all)
var current_resume_view_switch_id = $("#all_resume_view_switch");
// Keeps track of the current resume view header (default is all)
var current_resume_view_header_id = $("#all_resume_view_header");

// Determines if we're on a mobile device or not (based on screen width)
var client_is_mobile = false;

// Keeps track of the original height of the more info modal, to be used for max-height animations
var more_info_original_height = 0;

// When an inactive resume view switch button is clicked
$(document).on("click", ".resume_inactive_switch", function() {
    // Remove the active class from the current active resume view switch
    current_resume_view_switch_id.removeClass("resume_active_switch").addClass("resume_inactive_switch").children(".resume_switch_overlay").css("width", "0px");
    // Remove the active class from the current active resume view header
    current_resume_view_header_id.removeClass("resume_switch_active_header").addClass("resume_switch_inactive_header");

    // Set the new resume view switch and header
    current_resume_view_switch_id = $(`#${$(this).attr("id")}`); 
    current_resume_view_header_id = $(`#${$(this).attr("id").replace("switch", "header")}`);
    
    // Remove the inactive class, and add the active class to the new header
    current_resume_view_header_id.removeClass("resume_switch_inactive_header").addClass("resume_switch_active_header");
    
    // Animation for the new active view switch
    current_resume_view_switch_id.children(".resume_switch_overlay").animate({width: "150px"}, 250, function() {
        current_resume_view_switch_id.removeClass("resume_inactive_switch").addClass("resume_active_switch");
    });

    // Fade out the resume container
    $("#resume_container").animate({opacity: 0}, 250, function() {
        // Hide all of the resume sub-elements
        $("#skill_cards_container").css("display", "none");
        $("#employment_cards_container").css("display", "none");
        $("#education_cards_container").css("display", "none");
        $("#project_cards_container").css("display", "none");

        // Reveal a specific sub-element based on the switch that was clicked
        switch (current_resume_view_switch_id.attr("id")) {
            case "all_resume_view_switch":
                $("#skill_cards_container").css("display", "grid");
                $("#employment_cards_container").css("display", "grid");
                $("#education_cards_container").css("display", "grid");
                $("#project_cards_container").css("display", "grid");
                break;

            case "skills_resume_view_switch":
                $("#skill_cards_container").css("display", "grid");
                break;
            
            case "employment_resume_view_switch":
                $("#employment_cards_container").css("display", "grid");
                break;

            case "education_resume_view_switch":
                $("#education_cards_container").css("display", "grid");
                break;

            case "projects_resume_view_switch":
                $("#project_cards_container").css("display", "grid");
                break;
        }

        // Fade back in the resume container
        $("#resume_container").animate({opacity: 1}, 250);
    })
})

// When an inactive resume switch header is clicked on, change to its corresponding view
$(document).on("click", ".resume_switch_inactive_header", function() {
    // Remove the active class from the current active resume view switch
    current_resume_view_switch_id.removeClass("resume_active_switch").addClass("resume_inactive_switch").children(".resume_switch_overlay").css("width", "0px");
    // Remove the active class from the current active resume view header
    current_resume_view_header_id.removeClass("resume_switch_active_header").addClass("resume_switch_inactive_header");

    // Set the new resume view switch and header
    current_resume_view_header_id = $(`#${$(this).attr("id")}`); 
    current_resume_view_switch_id = $(`#${$(this).attr("id").replace("header", "switch")}`);
    
    // Remove the inactive class, and add the active class to the new header
    current_resume_view_header_id.removeClass("resume_switch_inactive_header").addClass("resume_switch_active_header");
    
    // Animation for the new active view switch
    current_resume_view_switch_id.children(".resume_switch_overlay").animate({width: "150px"}, 250, function() {
        current_resume_view_switch_id.removeClass("resume_inactive_switch").addClass("resume_active_switch");
    });

    // Fade out the resume container
    $("#resume_container").animate({opacity: 0}, 250, function() {
        // Hide all of the resume sub-elements
        $("#skill_cards_container").css("display", "none");
        $("#employment_cards_container").css("display", "none");
        $("#education_cards_container").css("display", "none");
        $("#project_cards_container").css("display", "none");

        // Reveal a specific sub-element based on the switch that was clicked
        switch (current_resume_view_switch_id.attr("id")) {
            case "all_resume_view_switch":
                $("#skill_cards_container").css("display", "grid");
                $("#employment_cards_container").css("display", "grid");
                $("#education_cards_container").css("display", "grid");
                $("#project_cards_container").css("display", "grid");
                break;

            case "skills_resume_view_switch":
                $("#skill_cards_container").css("display", "grid");
                break;
            
            case "employment_resume_view_switch":
                $("#employment_cards_container").css("display", "grid");
                break;

            case "education_resume_view_switch":
                $("#education_cards_container").css("display", "grid");
                break;

            case "projects_resume_view_switch":
                $("#project_cards_container").css("display", "grid");
                break;
        }

        // Fade back in the resume container
        $("#resume_container").animate({opacity: 1}, 250);
    })
})

$(document).ready(function() {
    // Determine if we're on mobile
    client_is_mobile = ($(window).width() <= 1400);

    // Fill in the employment cards based on the corresponding info in text_fillin.js
    $(".employment_card").each(function() {
        let employer_id = parseInt($(this).attr("employer_id"));
        if (isNaN(employer_id)) {
            $(this).children("ul").remove();
            return $(this).children("h2").after(`<h1 style="justify-self: center; text-align: center; align-self: center;">Sorry, projects information for this employer couldn't be loaded.</h1>`);
        }

        let employer_projects = employer_objects.find(employer => employer.employer_id == employer_id).projects;
        if (employer_projects == null || employer_projects == undefined || typeof(employer_projects) != "object" 
        || employer_projects.length < 1) {
            $(this).children("ul").remove();
            return $(this).children("h2").after(`<h1 style="justify-self: center; text-align: center; align-self: center;">Sorry, projects information for this employer couldn't be loaded.</h1>`);
        }

        employer_projects.forEach(project => {
            let project_html = `<li><p class="employment_card_description">${project.project_description}</p></li>`;
            $(this).children("ul").append(project_html);
        })
    })

    // Fade in each contact container class
    $(".contact_container").each(function() {
        $(this).animate({opacity: 1}, 400);
    })

    // Animate the progress bars
    $("progress").each(function() {
        $(this).animate({value: $(this).attr("skill-value")}, 250);
    })

    // Grab the GET param from the current URL. Right now there can only be one param 'view', and it can only equal projects, so this will be pretty simple.
    if (window.location.search.substr(1).split("=")[1] === "projects") {
        // Remove the active class from the current active resume view switch
        current_resume_view_switch_id.removeClass("resume_active_switch").addClass("resume_inactive_switch").children(".resume_switch_overlay").css("width", "0px");
        // Remove the active class from the current active resume view header
        current_resume_view_header_id.removeClass("resume_switch_active_header").addClass("resume_switch_inactive_header");

        current_resume_view_header_id = $("#projects_resume_view_header");
        current_resume_view_switch_id = $("#projects_resume_view_switch");

        // Remove the inactive class, and add the active class to the new header
        current_resume_view_header_id.removeClass("resume_switch_inactive_header").addClass("resume_switch_active_header");
        
        // Animation for the new active view switch
        current_resume_view_switch_id.removeClass("resume_inactive_switch").addClass("resume_active_switch");
        current_resume_view_switch_id.children(".resume_switch_overlay").css("width", "150px");

        // Make the project view the active view
        $("#skill_cards_container").css("display", "none");
        $("#employment_cards_container").css("display", "none");
        $("#education_cards_container").css("display", "none");
        $("#project_cards_container").css("display", "grid");
    }
})

// Download the resume when the "download resume" button is clicked
$("#download_resume_button").click(function() {
    window.open("https://davidr.pro/resources/David%20Ruffner%20Resume.pdf")
})

// When a skill progress bar is hovered over, show its corresponding tooltip
$(".skill_progress_bar").mouseover(function() {
    $(this).next(".skill_tooltip").animate({opacity: 1}, 250);
})

// Hide that same tooltip on mouse leave
$(".skill_progress_bar").mouseleave(function() {
    $(this).next(".skill_tooltip").animate({opacity: 0}, 250, function() {
        // $(this).css("display", "none");
    })
})

// Handles clicks on contact info images
$(document).on('click', '.contact_container > img', function() {
    // Every contact container holds the corresponding link in an a tag 2 spots beneath the img tag
    // Grab that link and open it in a new tab
    window.open($(this).next().next().prop('href'));
})

// Handles hovering over a skill meter (shows a tooltip)
$(document).on('mouseover', '.skill_meter_background', function() {
    $(this).parent().find(".skill_tooltip").animate({opacity: 1}, 200);
})

$(document).on('mouseleave', '.skill_meter_background', function() {
    $(this).parent().find(".skill_tooltip").animate({opacity: 0}, 200);
})

// Handles hovering over an employment card (click for more info)
// $(document).on('mouseover', '.employment_card', function() {
//     $(this).find(".employment_card_overlay").animate({opacity: 1}, 200);
// })

// $(document).on('mouseleave', '.employment_card', function() {
//     $(this).find(".employment_card_overlay").animate({opacity: 0}, 200);
// })

// Handles hovering over an education card (click for more info)
$(document).on('mouseover', '.education_card', function() {
    $(this).find(".education_card_overlay").animate({opacity: 1}, 200);
})

$(document).on('mouseleave', '.education_card', function() {
    $(this).find(".education_card_overlay").animate({opacity: 0}, 200);
})

// Handles hovering over a certification card (click for more info)
$(document).on('mouseover', '.certificate_card', function() {
    $(this).find(".certificate_card_overlay").animate({opacity: 1}, 200);
})

$(document).on('mouseleave', '.certificate_card', function() {
    $(this).find(".certificate_card_overlay").animate({opacity: 0}, 200);
})

// Handles scrolling
var personal_skills_scroll_handled = false;

var employment_history_scroll_handled = false;
var employment_history_container_scroll_handled = false;

var education_history_header_scroll_handled = false;
var education_history_container_scroll_handled = false;

var certificate_history_header_scroll_handled = false;
var certificate_history_container_scroll_handled = false;

function personal_skills_inview() {
    var halfHeight = $(window).height() / 1.1;
    var position = $('#personal_skills_card').offset().top;
    var topWindow = $(window).scrollTop();
    if (!personal_skills_scroll_handled && position < (topWindow + halfHeight)) {
        personal_skills_scroll_handled = true;

        // Animate the personal skills card in
        $("#personal_skills_card").animate({right: 0}, 300, function() {
            // Animate the skill meters
            $("#personal_skills_card > .skill_meter > .skill_meter_foreground").each(function(index) {
                // Get the custom skill level property and ensure it's an int
                let skill_level = parseInt($(this).parent().attr("skill-level"));
                // skill_level *= 0.9;
                skill_level = skill_level + "%";
        
                $(this).delay(50 * index).animate({width: skill_level}, 500)
            })
        });
    }
}

function employment_history_header_inview() {
    var halfHeight = $(window).height();
    var position = $('#employment_history_header_container').offset().top;
    var topWindow = $(window).scrollTop();
    if (!employment_history_scroll_handled && position < (topWindow + halfHeight)) {
        employment_history_scroll_handled = true;
        $("#employment_history_header_container").animate({left: 0}, 300);
    }
}

function employment_history_container_inview() {
    var halfHeight = $(window).height();
    var position = $('#employment_history_container').offset().top;
    var topWindow = $(window).scrollTop();
    if (!employment_history_container_scroll_handled && position < (topWindow + halfHeight)) {
        employment_history_container_scroll_handled = true;
        
        // Animate the employment cards
        if (window.innerWidth > 1300) {
            $(".employment_card").each(function(index) {
                $(this).delay(50 * index).animate({right: 20}, 300)
            })
        }
        else {
            $(".employment_card").each(function(index) {
                $(this).delay(50 * index).animate({right: 0}, 300)
            })
        }
    }
}

function education_history_header_inview() {
    var halfHeight = $(window).height();
    var position = $('#education_history_header_container').offset().top;
    var topWindow = $(window).scrollTop();
    if (!education_history_header_scroll_handled && position < (topWindow + halfHeight)) {
        education_history_header_scroll_handled = true;
        $("#education_history_header_container").animate({right: 0}, 300);
    }
}

function education_history_container_inview() {
    var halfHeight = $(window).height();
    var position = $('#education_history_container').offset().top;
    var topWindow = $(window).scrollTop();
    if (!education_history_container_scroll_handled && position < (topWindow + halfHeight)) {
        education_history_container_scroll_handled = true;

        if (window.innerWidth > 1300) {
            $(".education_card").each(function(index) {
                $(this).delay(50 * index).animate({left: 20}, 300);
            })
        }
        else {
            $(".education_card").each(function(index) {
                $(this).delay(50 * index).animate({left: 0}, 300);
            })
        }
    }
}

function certificate_history_header_container_inview() {
    var halfHeight = $(window).height();
    var position = $('#certificate_history_header_container').offset().top;
    var topWindow = $(window).scrollTop();
    if (!certificate_history_header_scroll_handled && position < (topWindow + halfHeight)) {
        certificate_history_header_scroll_handled = true;
        $("#certificate_history_header_container").animate({right: 0}, 300);
    }
}

function certificate_history_container_inview() {
    var halfHeight = $(window).height();
    var position = $('#certificate_history_container').offset().top;
    var topWindow = $(window).scrollTop();
    if (!certificate_history_container_scroll_handled && position < (topWindow + halfHeight)) {
        certificate_history_container_scroll_handled = true;
        $(".certificate_card").each(function(index) {
            $(this).delay(50 * index).animate({opacity: 1}, 300);
        })
    }
}

$(window).on('scroll', function() {
    // personal_skills_inview();
    // employment_history_header_inview();
    // employment_history_container_inview();
    // education_history_header_inview();
    // education_history_container_inview();
    // certificate_history_header_container_inview();
    // certificate_history_container_inview();
});

// Changes the view in the more info modal
// The animate param dictates whether or not we want to run the style animations
// The resize_height param is used when we want to resize the card's height while going from contact to projects view and vice versa.
function more_info_change_view(view, animate = true, resize_height = false) {
    if (view === "projects") {
        // Change the current active button to an inactive state
        $("#more_info_contact_button > .more_info_view_button_header_overlay").css("width", "0");
        $("#more_info_contact_button").removeClass("more_info_active_view_button");

        // Change the clicked button to an active state
        $("#more_info_projects_button").addClass("more_info_active_view_button");
        
        if (animate) {
            $("#more_info_projects_button").children(".more_info_view_button_header_overlay").animate({width: "100%"}, 150);
        }
        else {
            $("#more_info_projects_button").children(".more_info_view_button_header_overlay").css("width", "100%");
        }

        // Transition the corresponding view
        if (animate) {
            $("#more_info_contact_view_container").animate({left: "100%"}, 350);
            $("#more_info_projects_view_container").animate({right: "5%"}, 350);
        }
        else {
            $("#more_info_contact_view_container").css("left", "100%");
            $("#more_info_projects_view_container").css("right", "5%");
        }

        /* If client is mobile the more info card's height must be changed to 75% when switching to projects view, so that we have a defined height for overflow-y.
        Otherwise, we want to keep the height at max-content to make the modal look nice */
        // if (client_is_mobile && resize_height) {
        //     $("#more_info_card").animate({height: "75%"}, 200);
        // }

        if (!client_is_mobile) {
            if (animate) {
                // In the projects view mode, the parent more_info card needs to get a bit bigger if the screen width is greater than 1200px
                $("#more_info_card").animate({width: '1300px', height: '80%'}, 350);
            }
            else {
                $("#more_info_card").css("width", "1300px").css('height', '80%');
            }
        }
    }
    else {
        // Change the current active button to an inactive state
        $("#more_info_projects_button > .more_info_view_button_header_overlay").css("width", "0");
        $("#more_info_projects_button").removeClass("more_info_active_view_button");

        // Change the clicked button to an active state
        $("#more_info_contact_button").addClass("more_info_active_view_button");
        
        if (animate) {
            $("#more_info_contact_button").children(".more_info_view_button_header_overlay").animate({width: "100%"}, 150);
        }
        else {
            $("#more_info_contact_button").children(".more_info_view_button_header_overlay").css("width", "100%");
        }

        if (animate) {
            $("#more_info_contact_view_container").animate({left: 0}, 350);
            $("#more_info_projects_view_container").animate({right: "100%"}, 350);
        }
        else {
            $("#more_info_contact_view_container").css("left", 0);
            $("#more_info_projects_view_container").css("right", "100%");
        }

        /* If client is mobile the more info card's height must be changed to 75% when switching to projects view, so that we have a defined height for overflow-y.
        Otherwise, we want to keep the height at max-content to make the modal look nice */
        // if (client_is_mobile && resize_height) {
        //     $("#more_info_card").animate({height: more_info_original_height}, 200);
        // }

        if (!client_is_mobile) {
            if (animate) {
                // In the contact info view mode, the parent more_info card will become smaller
                $("#more_info_card").animate({width: '1100px', height: '575px'}, 350);
            }
            else {
                $("#more_info_card").css("width", "1100px").css('height', '575px');
            }
        }
    }
}

// When a view button is clicked in the more info modal
$(".more_info_view_button").click(function() {
    // For some reason the :not selector isn't working here, so we have to check if the clicked on button has an active class already. If it does, return.
    if ($(this).hasClass("more_info_active_view_button")) {
        return;
    }

    if ($(this).attr("id") === "more_info_contact_button") {
        more_info_change_view("contact", true, true);
    }
    else {
        more_info_change_view("projects", true, true);
    }
})

// Opens or closes the more info screen with the action param = "close" or "open"
function more_info_toggle(action) {
    if (action === "close") {
        $("#more_info_background").animate({opacity: 0}, 250, function() {
            $("#more_info_background").css("display", "none");
            $("#more_info_card").css("bottom", "100vh");
        })
    }
    else {
        $("#more_info_background").css("display", "grid").animate({opacity: 1}, 250);
        $("#more_info_card").animate({bottom: 0}, 250, function() {
            more_info_original_height = $("#more_info_card").height();
            console.log(more_info_original_height);
        });
    }
}

// When the more info close button is clicked, close the modal
$("#more_info_header_close_overlay").click(function() {
    more_info_toggle("close");
})

// When an employment card is clicked (this happens on mobile)
$(".employment_card").click(function() {
    let contact_table = $('#more_info_contact_table');
    let projects_table = $('#more_info_projects_table');

    // Prepare the more info modal with info from ./text_fillin.js based on the clicked card's employer_id attribute
    let employer_id = parseInt($(this).attr("employer_id"));
    if (isNaN(employer_id)) {
        $(this).children("ul").remove();
        return $(this).children("h2").after(`<h1 style="justify-self: center; text-align: center; align-self: center;">Sorry, projects information for this employer couldn't be loaded.</h1>`);
    }

    let employer_object = employer_objects.find(employer => employer.employer_id == employer_id);
    let contact_info = employer_object.contact_info;
    let projects = employer_object.projects;

    // Set the employer contact info in the contact table
    contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(0)").text(contact_info.main_phone);
    contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(1)").text(contact_info.address);
    contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(2)").text(contact_info.manager_name);
    contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(3)").text(contact_info.manager_email);
    contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(4)").text(contact_info.manager_phone);

    // Set the employer project info in the projects table
    projects_table.children(".more_info_projects_table_cell").remove();
    projects.forEach(project => {
        let project_html = `
        <div class="more_info_projects_table_cell">
            <h2>${project.project_name}</h2>
        </div>
        <div class="more_info_projects_table_cell">
            <h2>${project.project_description}</h2>
        </div>
        <div class="more_info_projects_table_cell">
            <h2>${project.languages_used}</h2>
        </div>`

        // Append beneath the table's headers
        projects_table.children("h1").last().after(project_html);
    })

    // Reset the card to be on the contact info view
    more_info_change_view("contact", false);

    // Fade in the modal
    more_info_toggle("open");
})
// When an employment card overlay is clicked, show the more info modal with the appropriate info
$(".employment_card_overlay").click(function() {
    // If we're on desktop, we're concerned with a different container than we are if we're on mobile
    if (client_is_mobile) {
        let contact_table = $('#more_info_contact_table');
        let projects_table = $('#more_info_projects_table');

        // Prepare the more info modal with info from ./text_fillin.js based on the clicked card's employer_id attribute
        let employer_id = parseInt($(this).parent().attr("employer_id"));
        if (isNaN(employer_id)) {
            $(this).children("ul").remove();
            return $(this).children("h2").after(`<h1 style="justify-self: center; text-align: center; align-self: center;">Sorry, projects information for this employer couldn't be loaded.</h1>`);
        }

        let employer_object = employer_objects.find(employer => employer.employer_id == employer_id);
        let contact_info = employer_object.contact_info;
        let projects = employer_object.projects;

        // Set the employer contact info in the contact table
        contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(0)").text(contact_info.main_phone);
        contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(1)").text(contact_info.address);
        contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(2)").text(contact_info.manager_name);
        contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(3)").text(contact_info.manager_email);
        contact_table.children(".more_info_contact_row").children(".more_info_contact_data:eq(4)").text(contact_info.manager_phone);

        // Set the employer project info in the projects table
        projects_table.children(".more_info_projects_table_cell").remove();
        projects.forEach(project => {
            let project_html = `
            <div class="more_info_projects_table_cell">
                <h2>${project.project_name}</h2>
            </div>
            <div class="more_info_projects_table_cell">
                <h2>${project.project_description}</h2>
            </div>
            <div class="more_info_projects_table_cell">
                <h2>${project.languages_used}</h2>
            </div>`

            // Append beneath the table's headers
            projects_table.children("h1").last().after(project_html);
        })
    }
    else {
        let contact_table = $('#more_info_contact_table_mobile');
        let projects_table = $('#more_info_projects_table_mobile');

        // Prepare the more info modal with info from ./text_fillin.js based on the clicked card's employer_id attribute
        let employer_id = parseInt($(this).parent().attr("employer_id"));

        let employer_object = employer_objects.find(employer => employer.employer_id == employer_id);
        let contact_info = employer_object.contact_info;
        let projects = employer_object.projects;

        // Set the employer contact info in the contact table
        contact_table.children(".more_info_contact_row_mobile").children(".more_info_contact_data:eq(0)").text(contact_info.main_phone);
        contact_table.children(".more_info_contact_row_mobile").children(".more_info_contact_data:eq(1)").text(contact_info.address);
        contact_table.children(".more_info_contact_row_mobile").children(".more_info_contact_data:eq(2)").text(contact_info.manager_name);
        contact_table.children(".more_info_contact_row_mobile").children(".more_info_contact_data:eq(3)").text(contact_info.manager_email);
        contact_table.children(".more_info_contact_row_mobile").children(".more_info_contact_data:eq(4)").text(contact_info.manager_phone);

        // Set the employer project info in the projects table
        projects_table.children(".mobile_projects_table_row").remove();
        projects.forEach(project => {
            let project_html = `
            <div class="mobile_projects_table_row">
                <h1>Project Name</h1>
                <h2>${project.project_name}</h2>
                <h1>Project Description</h1>
                <h2>${project.project_description}</h2>
                <h1>Languages/Skills Used</h1>
                <h2>${project.languages_used}</h2>
            </div>`

            // Append to the mobile projects table
            projects_table.append(project_html);
        })
    }

    // Reset the card to be on the contact info view
    more_info_change_view("contact", false);

    // Fade in the modal
    more_info_toggle("open");
})

// When the more info card is swiped right on change to the projects view if contacts is the active view
$("#more_info_card").swiperight(function() {
    // Only allow if we're on mobile
    if (client_is_mobile) {
        if ($(".more_info_active_view_button").attr("id") === "more_info_contact_button") {
            more_info_change_view("projects", true, true);
        }
    }
})

// When the more info card is swiped left on
$("#more_info_card").swipeleft(function() {
    if (client_is_mobile) {
        if ($(".more_info_active_view_button").attr("id") === "more_info_projects_button") {
            more_info_change_view("contact", true, true);
        }
    }
})

// If the more info background is clicked on, fade it out (clicking out of the more info card)
$("#more_info_background").click(function() {
    $(this).animate({opacity: 0}, 250, function() {
        $(this).css("display", "none");
    })
})

// Prevents the more info background from fading out when the more info card or its children are clicked
$("#more_info_card").click(e => {
    e.preventDefault();
    e.stopPropagation();
})

// If the escape key is pressed while the more info background is opened, fade it out
$(document).keyup(e => {
    if (e.key === "Escape") {
        if ($("#more_info_background").is(":visible")) {
            more_info_toggle("close");
        }
    }
})