// Function to show the pop-up after 0.5 seconds
window.onload = function () {
    setTimeout(function () {
        document.getElementById("popup").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }, 500);
};

// Function to close (hide) the pop-up
function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Function to completely remove the pop-up from the DOM
function removePopup() {
    document.getElementById("popup").remove();
    document.getElementById("overlay").remove();
}

// Function to navigate to the course page
function goToCourse() {
    window.location.href = "course.html"; // Change this to your course page URL
}

