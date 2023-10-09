import jsonData from "../data.js";

tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: "#18181B",
                secondary: "#323232",
            },
        },
    },
};

$(document).ready(function () {
    $(".mobile-btn").click(() => $(".mobile-menu").toggleClass("hidden"));
    // Send email feature
    $(".send-email-fm").submit(async function (e) {
        e.preventDefault();
        const userEmail = $(".user-email").val();
        const userSubject = $(".user-subject").val();
        const userMessage = $(".user-message").val();
        const sendBtn = $(".send-email-btn");
        sendBtn.prop("disabled", true);
        sendBtn.text("Sending message...");
        const params = {
            subject: userSubject,
            user_email: userEmail,
            message: userMessage,
            from_name: "Tran Gia Huy",
        };
        try {
            const response = await emailjs.send(
                "portfolio_lxc",
                "template_l3hcp8d",
                params,
                "Onf2dnx_gfu1Z_DQv"
            );
            sendBtn.prop("disabled", false);
            sendBtn.text("Send Message");
        } catch (error) {
            console.error("Error sending email:", error);
            sendBtn.prop("disabled", false);
            sendBtn.text("Send Message");
        }
    });

    // Add projects
    const cards = jsonData.cards;
    const cardsContainer = $(".pricing"); // Get the container where you want to append the cards

    // Create html for cards
    cards.forEach((cardData) => {
        // Create elements for the card
        const card = $("<div>").addClass("card");
        const content = $("<div>").addClass("content");
        const projectType = $("<h4>")
            .addClass("project-type")
            .text(cardData.type);
        const projectTitle = $("<h3>")
            .addClass("project-title")
            .text(cardData.title);
        const description = $("<p>");
        const checkboxIcon = $("<i>").addClass("ri-checkbox-circle-line");
        const projectDescription = $("<span>")
            .addClass("project-description")
            .text(cardData.description);
        description.append(checkboxIcon, projectDescription);
        const viewButton = $("<a>")
            .attr({
                href: cardData.link,
                target: "_blank",
            })
            .addClass(
                "text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            )
            .text("View");

        // Append elements to the card
        content.append(projectType, projectTitle, description);
        card.append(content, viewButton);

        // Append the card to the container
        cardsContainer.append(card);
    });
});
