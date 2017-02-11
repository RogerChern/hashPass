var jsSHA = require('./sha512.js');
var Clipboard = require('clipboard');

function changeCase(char) {
    if (char >= 'a' && char <= 'z' && (char.charCodeAt(0) - 97) % 2 === 0) {
        return char.toUpperCase();
    } else {
        return char;
    }
}

function calculateHash(masterKey, siteName, passwordLength) {
    var hashObj = new jsSHA("SHA-512", "TEXT");
    hashObj.update(masterKey+siteName.toLowerCase());
    var password = hashObj.getHash("HEX").slice(0, passwordLength);
    var newPass = "";
    for (i = 0; i < password.length; ++i) {
        newPass += changeCase(password[i]);
    }
    return newPass;
}

function showHashcode() {
    site = document.getElementById("site").value.trim();
    if (site === "master") {
        document.getElementById("master-input").hidden = false;
        return;
    }
    master = document.getElementById("master").value.trim();
    localStorage.setItem("master", master);
    
    document.getElementById("hashcode").value = calculateHash(master, site, 16);
}

window.onload = function() {
    document.getElementById("hash").addEventListener("click", showHashcode);
    document.getElementById("master").value = localStorage.getItem("master");
    var inputBox = document.getElementById("site");
    inputBox.focus();
    inputBox.addEventListener("keypress", function(e){
        var key = e.which || e.keyCode;
        if (key == 13) {
            document.getElementById("hash").click();
        }
    });
    new Clipboard('.btn');
};
