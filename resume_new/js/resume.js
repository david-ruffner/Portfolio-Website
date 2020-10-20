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

$(document).ready(function() {
    // Fade in each contact container class
    $(".contact_container").each(function() {
        $(this).animate({opacity: 1}, 400);
    })

    // Animate the progress bars
    $("progress").each(function() {
        $(this).animate({value: $(this).attr("skill-value")}, 250);
    })

    // $(".card").each(function(index) {
    //     $(this).delay(50 * index).animate({left: 0, opacity: 1}, 250);
    // })
    // get_employers();

    // $.ajax({
    //     url: "https://api.davidr.pro/virtualresume/get",
    //     success: function(response) {
    //         resp = JSON.parse(response);
    //         resp = resp.message;

    //         // Add the contact info
    //         var contact_info = resp.find((elem) => {
    //             return elem.document_name == "contact_info"
    //         })
    //         add_contact_info(contact_info);

    //         // Slide in the contact container background, and then fade in the elements
    //         $("#contact_info_container").animate({right: 0}, 300, function() {
    //             $(".contact_container").animate({opacity: 1}, 300);
    //         })

    //         // Add the language skills
    //         var languages = resp.find((elem) => {
    //             return elem.document_name == "languages";
    //         }).languages;
    //         add_language_skills(languages);

    //         // Add the professional skills
    //         var professional_skills = resp.find((elem) => {
    //             return elem.document_name == "professional_skills";
    //         }).skills;
    //         add_professional_skills(professional_skills);

    //         // Add the personal skills
    //         var personal_skills = resp.find((elem) => {
    //             return elem.document_name == "personal_skills";
    //         }).skills;
    //         add_personal_skills(personal_skills);

    //         // Add the employment history
    //         var employment_history = resp.find((elem) => {
    //             return elem.document_name == "employment_history";
    //         }).employers;
    //         add_employment_history(employment_history);

    //         // Add the education history
    //         var education_history = resp.find((elem) => {
    //             return elem.document_name == "education_history"
    //         }).education;
    //         add_education_history(education_history);

    //         // Add the certification history
    //         var certificate_history = resp.find((elem) => {
    //             return elem.document_name == "certificate_history"
    //         }).certificates;
    //         add_certificate_history(certificate_history);

    //         // Slide in the cards
    //         $("#languages_card").animate({right: 0}, 300, function() {
    //             // Animate the skill meters
    //             $("#languages_card > .skill_meter > .skill_meter_foreground").each(function(index) {
    //                 // Get the custom skill level property and ensure it's an int
    //                 let skill_level = parseInt($(this).parent().attr("skill-level"));
    //                 // skill_level *= 0.9;
    //                 skill_level = skill_level + "%";
    //                 console.log(skill_level);
            
    //                 $(this).delay(50 * index).animate({width: skill_level}, 500)
    //             })
    //         });

    //         $("#professional_skills_card").animate({left: 0}, 300, function() {
    //             // Animate the skill meters
    //             $("#professional_skills_card > .skill_meter > .skill_meter_foreground").each(function(index) {
    //                 // Get the custom skill level property and ensure it's an int
    //                 let skill_level = parseInt($(this).parent().attr("skill-level"));
    //                 // skill_level *= 0.9;
    //                 skill_level = skill_level + "%";
    //                 console.log(skill_level);
            
    //                 $(this).delay(50 * index).animate({width: skill_level}, 500)
    //             })
    //         });
    //     },
    //     error: function(error) {
    //         //TODO: Handle this
    //     }
    // })
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
$(document).on('mouseover', '.employment_card', function() {
    $(this).find(".employment_card_overlay").animate({opacity: 1}, 200);
})

$(document).on('mouseleave', '.employment_card', function() {
    $(this).find(".employment_card_overlay").animate({opacity: 0}, 200);
})

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
    personal_skills_inview();
    employment_history_header_inview();
    employment_history_container_inview();
    education_history_header_inview();
    education_history_container_inview();
    certificate_history_header_container_inview();
    certificate_history_container_inview();
});