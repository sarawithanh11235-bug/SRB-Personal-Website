var attempt = 7; 
function validate() {
var firstName = document.getElementById("firstname").value;
var lastName = document.getElementById("lastname").value;
var emailAddress = document.getElementById("emailaddress").value;
if (firstName == "firstnameTEST" && lastName == "lastnameTEST" && emailAddress == "emailaddressTEST"){
alert("You have logged in successfully!");
window.location = "account_view.html"; 
return false;
}
else {
attempt--;
alert("You have " + attempt +  "/7 attempts left! Please try again.");
if(attempt == 0){
document.getElementById("firstName").disabled = true;
document.getElementById("lastName").disabled = true;
document.getElementById("emailAddress").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}
