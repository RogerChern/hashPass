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
    var hashButton = document.getElementById("hash");
    var masterInput = document.getElementById("master");
    var siteInput = document.getElementById("site");
    var clearButton = document.getElementById("clear");
    var hashcodeInput = document.getElementById("hashcode");

    masterInput.value = localStorage.getItem("master");
    hashButton.addEventListener("click", showHashcode);
    siteInput.addEventListener("keypress", function(e){
        var key = e.which || e.keyCode;
        if (key == 13) {
            hashButton.click();
        }
    });
    siteInput.focus();
    clearButton.addEventListener("click", function(e){
        hashcodeInput.value = "";
        siteInput.value = "";
        siteInput.focus();
    });
    new Clipboard('.btn');
};
