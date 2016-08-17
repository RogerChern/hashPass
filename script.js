function change_case(char) {
    if (char >= 'a' && char <= 'z') {
        if ((char.charCodeAt(0) - 97) % 2 === 1) {
            return char;
        } else {
            return char.toUpperCase();
        }
    } else {
        return char;
    }
}

function calculate_hash(master_key, site_name, password_length) {
    var hashObj = new jsSHA("SHA-512", "TEXT");
    hashObj.update(master_key+site_name);
    var password = hashObj.getHash("HEX").slice(0, password_length);
    var new_pass = "";
    for (i = 0; i < password.length; ++i) {
        new_pass += change_case(password[i]);
    }
    return new_pass;
}

function show_hashcode() {
        master = document.getElementById("master").value;
        localStorage.setItem("master", master);
        site = document.getElementById("site").value;
        document.getElementById("hashcode").innerText = calculate_hash(master, site, 16);
}

window.onload = function() {
    document.getElementById("hash").addEventListener("click", show_hashcode);
    document.getElementById("master").value = localStorage.getItem("master");
    var input_box = document.getElementById("site");
    input_box.focus();
    input_box.addEventListener("keypress", function(e){
        var key = e.which || e.keyCode;
        if (key == 13) {
            show_hashcode();
        }
    });
};
