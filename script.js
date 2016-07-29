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
    let hashObj = new jsSHA("SHA-512", "TEXT");
    hashObj.update(master_key+site_name);
    let password = hashObj.getHash("HEX").slice(0, password_length);
    let new_pass = "";
    for (i = 0; i < password.length; ++i) {
        new_pass += change_case(password[i]);
    }
    return new_pass;
}

window.onload = function() {
    document.getElementById("hash").addEventListener("click", function () {
        master = document.getElementById("master").value;
        localStorage.setItem("master", master);
        site = document.getElementById("site").value;
        document.getElementById("hashcode").innerText = calculate_hash(master, site, 16);
    });
    document.getElementById("master").value = localStorage.getItem("master");
};
