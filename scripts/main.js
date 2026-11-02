function displayFooterInformation() {

    const yearElement =
        document.querySelector("#year");

    const modifiedElement =
        document.querySelector("#lastModified");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }

    if (modifiedElement) {
        modifiedElement.textContent =
            `Last Modified: ${document.lastModified}`;
    }
}

const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");

menuButton.addEventListener("click", function () {

    siteNav.classList.toggle("show");

    const isOpen = siteNav.classList.contains("show");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.textContent = isOpen ? "✕" : "☰";

});


const courses = [
    {
        subject: "WDD",
        number: 130,
        credits: 2,
        completed: false
    },

    {
        subject: "WDD",
        number: 131,
        credits: 2,
        completed: false
    },

    {
        subject: "WDD",
        number: 231,
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 110,
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 111,
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 210,
        credits: 2,
        completed: false
    }
];

const courseList = document.querySelector("#course-list");

const courseCredits = document.querySelector("#course-credits");


function displayCourses(courseArray) {

    courseList.innerHTML = "";

    courseArray.forEach(function (course) {

        const courseCard = document.createElement("div");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            ${course.completed ? "✓ " : ""}
            ${course.subject} ${course.number}
        `;

        courseList.appendChild(courseCard);

    });

    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    courseCredits.textContent =
        `The total credits for courses listed below is ${totalCredits}.`;

}

document.querySelector("#all-courses").addEventListener("click", function () {

    displayCourses(courses);

});

document.querySelector("#wdd-courses").addEventListener("click", function () {

    const wddCourses = courses.filter(function (course) {
        return course.subject === "WDD";
    });

    displayCourses(wddCourses);

});

document.querySelector("#cse-courses").addEventListener("click", function () {

    const cseCourses = courses.filter(function (course) {
        return course.subject === "CSE";
    });

    displayCourses(cseCourses);

});

displayCourses(courses);