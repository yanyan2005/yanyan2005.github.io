function search() {
    let filter = document.getElementById('search-item').value.toUpperCase();
    let item = document.querySelectorAll('.card');

    for (var i = 0; i < item.length; i++) {
        let a = item[i].getElementsByTagName('h3')[0];
        let value = a.textContent || a.innerText;

        if (value.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}
