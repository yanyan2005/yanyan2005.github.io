function animateValue(id, start, end, duration, suffix = '') {
    let obj = document.getElementById(id);
    let range = end - start;
    let current = start;
    let increment = range / (duration / 10);
    let stepTime = 10;
    let timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        obj.innerHTML = Math.floor(current) + suffix;
    }, stepTime);
}

window.onload = function () {
    animateValue("students", 0, 85838, 50000);
    animateValue("passRate", 0, 80, 30000, '%');
    animateValue("clubs", 0, 3, 4000);
};