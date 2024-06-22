URL = "https://developerfolio-server.herokuapp.com/apis/contact"

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {

    // loads a spinner
    document.getElementById('submitButton').value = "Submitting..."
    // document.getElementById('submitButton').style.color = "green";

    e.preventDefault();

    // Get values 
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');

    saveMessage(name, email, message);
}

// Function to get get form values 
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase 
function saveMessage(name, email, message) {
    var formdata = new FormData();

    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("message", message);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://developerfolio-server.onrender.com/apis/contact", requestOptions)
        .then(response => {
            let statusCode = response.status;
            if (statusCode === 201) {
                document.getElementById('status').innerHTML =
                    " <p style='font-size:18px; font-weight:500; '> Hello," + name + " .Thank you for contacting me. <br> I will contact you soon. </p>"
                document.getElementById('status').style.color = "green";
                document.getElementById('status').style.fontWeight = "500";
                document.getElementById('submitButton').value = "Submitted"
                document.getElementById('submitButton').style.color = "green";
                document.getElementById('submitButton').toggleAttribute("disabled", true);
            }
            else if (statusCode === 307) {
                document.getElementById('status').innerHTML =
                    "<p style='font-size:18px; font-weight:500; '> Hello," + name + " .You have already submitted the query that is not answered yet.<br><span style=\"color:green\">Will get back to you soon.Don't Worry !!</span></p >"
                document.getElementById('status').style.color = "red";
                document.getElementById('status').style.fontWeight = "500";
                document.getElementById('status').style.fontSize = "18";
                document.getElementById('submitButton').value = "Already Submitted"
                document.getElementById('submitButton').style.color = "red";
                document.getElementById('submitButton').toggleAttribute("disabled", true);

            }
            else if (statusCode === 400) {
                document.getElementById('status').innerHTML =
                    "Profanity language not allowed."
                document.getElementById('status').style.color = "red";
                document.getElementById('status').style.fontWeight = "500";
                document.getElementById('status').style.fontSize = "18";
                document.getElementById('submitButton').value = "Send Message"
                document.getElementById('submitButton').style.color = "white";
            }
            else {
                document.getElementById('status').innerHTML =
                    "There is some issue !! Please Try again"
                document.getElementById('status').style.color = "red";
                document.getElementById('status').style.fontWeight = "500";
                document.getElementById('status').style.fontSize = "18";
                document.getElementById('submitButton').value = "Send Message"
                document.getElementById('submitButton').style.color = "white";
            }
        })
        .catch(error => {
            document.getElementById('status').innerHTML =
                "There is some issue !! Please Try again"
            document.getElementById('status').style.color = "red";
            document.getElementById('status').style.fontWeight = "500";
            document.getElementById('status').style.fontSize = "18";
            document.getElementById('submitButton').value = "Send Message"
            document.getElementById('submitButton').style.color = "white";
        })
}