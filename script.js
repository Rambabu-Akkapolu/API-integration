function formValidation() {
  var uid = document.registration.userid;
  var passid = document.registration.passid;
  var uname = document.registration.username;
  var uadd = document.registration.address;
  var ucountry = document.registration.country;
  var uzip = document.registration.zip;
  var uemail = document.registration.email;
  var umsex = document.registration.msex;
  var ufsex = document.registration.fsex;

  if (userid_validation(uid, 5, 12)) {
    if (passid_validation(passid, 5, 20)) {
      if (allLetter(uname)) {
        if (alphanumeric(uadd)) {
          if (countryselect(ucountry)) {
            if (allnumeric(uzip)) {
              if (ValidateEmail(uemail)) {
                if (validsex(umsex, ufsex)) {
                  alert("Form Successfully Submitted");
                  return true;
                }
              }
            }
          }
        }
      }
    }
  }
  return false;
}
function userid_validation(uid, mx, my) {
  var uid_len = uid.value.length;
  if (uid_len == 0 || uid_len >= my || uid_len < mx) {
    alert(
      "User Id should not be empty / length be between " + mx + " to " + my
    );
    uid.focus();
    return false;
  }
  return true;
}
function passid_validation(passid, mx, my) {
  var passid_len = passid.value.length;
  if (passid_len == 0 || passid_len >= my || passid_len < mx) {
    alert(
      "Password should not be empty / length be between " + mx + " to " + my
    );
    passid.focus();
    return false;
  }
  return true;
}
function allLetter(uname) {
  var letters = /^[A-Za-z]+$/;
  if (uname.value.match(letters)) {
    return true;
  } else {
    alert("Username must have alphabet characters only");
    uname.focus();
    return false;
  }
}
function alphanumeric(uadd) {
  var letters = /^[0-9a-zA-Z]+$/;
  if (uadd.value.match(letters)) {
    return true;
  } else {
    alert("User address must have alphanumeric characters only");
    uadd.focus();
    return false;
  }
}
function countryselect(ucountry) {
  if (ucountry.value == "Default") {
    alert("Select your country from the list");
    ucountry.focus();
    return false;
  } else {
    return true;
  }
}
function allnumeric(uzip) {
  var numbers = /^[0-9]+$/;
  if (uzip.value.match(numbers)) {
    return true;
  } else {
    alert("ZIP code must have numeric characters only");
    uzip.focus();
    return false;
  }
}
function ValidateEmail(uemail) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (uemail.value.match(mailformat)) {
    return true;
  } else {
    alert("You have entered an invalid email address!");
    uemail.focus();
    return false;
  }
}
function validsex(umsex, ufsex) {
  var x = 0;
  if (umsex.checked) {
    x++;
  }
  if (ufsex.checked) {
    x++;
  }
  if (x == 0) {
    alert("Select Male/Female");
    umsex.focus();
    return false;
  }
  return true;
}
document
  .getElementById("retrieve-button")
  .addEventListener("click", fetchUserData);

function fetchUserData() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      renderUserData(data);
      document.getElementById("users-data").classList.remove("hidden");
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function renderUserData(users) {
  const usersDataContainer = document.getElementById("users-data");
  usersDataContainer.innerHTML = ""; 
  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
        `;
    usersDataContainer.appendChild(userDiv);
  });
}
