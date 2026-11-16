
// MOBILE NAVIGATION MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});


// CLOSE MENU AFTER CLICKING A LINK

navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});


// MENU CATEGORY FILTER

const filterButtons = document.querySelectorAll(".filter-button");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        foodCards.forEach((card) => {

            const shouldShow =
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory;

            card.hidden = !shouldShow;
        });
    });
});


// SET MINIMUM RESERVATION DATE

const dateInput = document.getElementById("date");

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
)
    .toISOString()
    .split("T")[0];

dateInput.min = localToday;


// RESERVATION FORM

const bookingForm = document.getElementById("bookingForm");

const formStatus = document.getElementById("formStatus");

bookingForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
    }

    const customerName =
        document.getElementById("name").value.trim();

    const reservationDate =
        document.getElementById("date").value;

    const guestCount =
        document.getElementById("guests").value;

    formStatus.textContent =
        `Thank you, ${customerName}! Your request for ${guestCount} on ${reservationDate} has been received.`;

    bookingForm.reset();

    dateInput.min = localToday;
});
