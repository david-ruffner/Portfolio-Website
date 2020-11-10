var employer_objects = [
    {
        employer_id: 1,
        contact_info: {
            main_phone: `(888) 745-6948`,
            address: `600 Executive Dr, Troy, MI 48083`,
            manager_name: "Chris Ecklesdafer",
            manager_email: "cecklesdafer@managedway.com",
            manager_phone: `(888) 745-6948 x225`
        },
        projects: [
            {
                project_name: "ManagedDefender Dashboard",
                project_description: "\
                Designed, created, and deployed a single pane of glass dashboard for our DDoS mitigation service customers. The application used JWT tokens \
                as part of its rigorous authentication process. Additionally, it interacted with an ELK (Elasticsearch, Logstash, Kibana) cluster to pull \
                data about how the service was working for them. A modern mobile-first UI and interactive graphs displayed the customer's data, and they \
                also could print and download these reports as PDF files.",
                languages_used: "HTML/CSS/JavaScript, jQuery, PHP, ELK Stack"
            },
            {
                project_name: "Service Qualification Software",
                project_description: "\
                Designed, created, deployed, and supported a mobile-first web application that could store our partner carriers' serviceable addresses. \
                The program could import Excel files ranging from 5 MB to 250+ MB in size. I wrote the file import module in C to ensure the fastest \
                processing of files. The addresses were stored and sorted by partner carrier in a central database and then made searchable via a PHP \
                (later updated to NodeJS) back-end.",
                languages_used: "HTML/CSS/JavaScript, jQuery, PHP, C, SQLite, Apache"
            },
            {
                project_name: "Company Audit Software",
                project_description: "\
                Designed, created, deployed, and supported a mobile-first single pane of glass application to store and make searchable all company \
                info about customers, services, physical inventory, and more. The back-end used a relational MySQL database to store this data and \
                the relationships between it.",
                languages_used: "HTML/CSS/JavaScript, jQuery, NodeJS, MySQL, Nginx"
            },
            {
                project_name: `Inventory Management Software`,
                project_description: "\
                Designed, created, deployed, and supported a mobile-first web application to keep track of the company's inventory, \
                as well as allowing server build requests from the sales team to be managed by showing if the needed parts are in stock, \
                and where they are. The application focused on the relationships between all of the different categories of inventory and \
                their assigned users/departments/buildings. Users could easily explore these relationships and conditional multi-term search \
                with dynamically generated SQL queries allowed for very robust user searches. A report generation option allowed users to \
                visualize these relationships. Some of these reports include 'Trends of the inventory assigned to a particular department or user,' \
                'Users that have not checked in borrowed items yet,' and 'Popular computer parts used in recent server build projects.' \
                These reports were generated in PDF format and could be downloaded or emailed to the user automatically. Proper authorization with \
                several different user access levels allowed for only the appropriate users to gain access to certain information.\
                ",
                languages_used: "HTML/CSS/JavaScript, jQuery, NodeJS, MySQL, Nginx"
            }
        ]
    },
    {
        employer_id: 2,
        contact_info: {
            main_phone: `(800) 750-4627`,
            address: `313 E Hudson Ave M111, Royal Oak, MI 48067`,
            manager_name: "Guy Vaiasicca",
            manager_email: "gvaiasicca@obscorp.com",
            manager_phone: `(800) 750-4627`
        },
        projects: [
            {
                project_name: "Macedonia Property Onboarding",
                project_description: "\
                Assisted with the onboarding of the new American House Macedonia property in Ohio. Duties include setting up and configuring \
                new user's Active Directory and e-mail accounts, preparing new laptops and phones for the employees according to an SOP, \
                and providing remote support to all employees during the transition period and beyond. Additionally, I was responsible \
                for updating inventory lists and writing documentation regarding the new property on the fly.",
                languages_used: "Communication Skills, Technical/Troubleshooting Skills, Organizational Skills, Documentation Skills, Support Skils"
            },
            {
                project_name: "Keene Property Onboarding",
                project_description: "\
                Very similar to the Macedonia property onboarding; however, this was for American House Keene in New Hampshire.",
                languages_used: "Communication Skills, Technical/Troubleshooting Skills, Organizational Skills, Documentation Skills, Support Skils"
            },
            {
                project_name: 'Employee Phone Upgrade Project',
                project_description: "\
                American House decided to upgrade the cell phones of several of the employees at each property. I was in charge of this large project, \
                with over 200 phones being configured, documented, and sent out to their new owners. Additionally, \
                I worked with our team to ensure the prompt return of each employee's old phone. We documented each returned phone, \
                and assessed it for current value. If we were able to get credit with our mobile provider for a returned cell phone, we shipped it to them, \
                and made sure that they added the credit. Finally, we cataloged the phones that were in-eligible for the trade-in program, ensured their \
                complete wipe, and took them to an electronics recycling facility.",
                languages_used: "Communication Skills, Technical/Troubleshooting Skills, Organizational Skills, Documentation Skills, Support Skils"
            }
        ]
    }
]