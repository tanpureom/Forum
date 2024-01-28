function toggleAnswer(faqId) {
    const answerElement = document.getElementById(`faq-answer-${faqId}`);
    answerElement.style.display = answerElement.style.display === 'none' ? 'block' : 'none';
}
function submitRequest(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    // You can implement further validation here if needed

    // Display a confirmation message (replace this with your desired action)
    alert(`Request submitted!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nDescription: ${description}`);

    // Optionally, you can reset the form
    document.getElementById('requestForm').reset();
}

var login = document.querySelector(".login");
var register = document.querySelector(".register");

function fileFetch() {
    login.addEventListener("click", () => {
        location.href = "login.html";
    })

    register.addEventListener("click", () => {
        location.href = "register.html";
    })
}

fileFetch();