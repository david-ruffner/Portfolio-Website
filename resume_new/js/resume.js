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

$(document).ready(function() {
    // $(".card").each(function(index) {
    //     $(this).delay(50 * index).animate({left: 0, opacity: 1}, 250);
    // })
    get_employers();
})

$("#resume_sort_select").change(function() {

})