var firebaseConfig = {
    apiKey: "AIzaSyDzUL6l9ceuncsrxVDBrlfjWGZH2kbGFGs",
    authDomain: "contact-info-1eaa5.firebaseapp.com",
    projectId: "contact-info-1eaa5",
    storageBucket: "contact-info-1eaa5.appspot.com",
    messagingSenderId: "609146899166",
    appId: "1:609146899166:web:054e0258bb7d072697504f",
    measurementId: "G-RK5XPMTGLL"
};


firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('ContactDetails/');

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
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
function setInputVal(id) {
    // return document.getElementById(id) = 
}

// Save message to firebase 
function saveMessage(name, email, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message,
        datetime: new Date().toString()
    }).then(() => {
        document.getElementById('status').innerHTML =
            " <p style='font-size:18px; font-weight:500; '> Hello," + name + " .Thank you for contacting me. <br> I will contact you soon. </p>"
        document.getElementById('status').style.color = "green";
        document.getElementById('status').style.fontWeight = "500";

        setInputVal('name');
        setInputVal('email');
        setInputVal('message');

    }

    ).catch(() => {
        document.getElementById('status').innerHTML =
            "There is some issue !! Please Try again"
        document.getElementById('status').style.color = "red";
        document.getElementById('status').style.fontWeight = "500";
        document.getElementById('status').style.fontSize = "20";
    }
    );
}
