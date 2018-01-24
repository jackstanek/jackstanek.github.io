var section_names;
var sections;

function populate_section_names() {
    section_names = new Array();
    var names_html_coll = document.getElementsByClassName("section-name");
    for (var i = 0; i < names_html_coll.length; i++) {
        section_names[i] = names_html_coll[i];
    }
}

function populate_sections() {
    sections = new Array();
    var sections_html_coll = document.getElementsByClassName("content");
    for (var i = 0; i < sections_html_coll.length; i++) {
        sections[i] = sections_html_coll[i];
    }
}

/* called when section name is clicked */
function select_section_name(selected_elem_id) {
    section_names.forEach(function (elem) {
        /* Set active section name */
        if (elem.id == selected_elem_id &&
            !elem.classList.contains("active-section-name")) {
            elem.classList.add("active-section-name");
        } else if (elem.id != selected_elem_id) {
            elem.classList.remove("active-section-name");
        }
    });

    sections.forEach(function (elem) {
        /* Set active section name */
        if (elem.id == selected_elem_id &&
            !elem.classList.contains("active-content")) {
            elem.classList.add("active-content");
        } else if (elem.id != selected_elem_id) {
            elem.classList.remove("active-content");
        }
    });
}

/* add event listener to each section name */
function init_nav() {
    populate_section_names();
    populate_sections();
    section_names.forEach(function(elem) {
        elem.addEventListener("click", function () {
            select_section_name(elem.id);
        });
    })
}

function init() {
    init_nav();
}

/* do things! */
window.onload = init;
