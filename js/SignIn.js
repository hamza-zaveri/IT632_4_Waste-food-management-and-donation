if (!sessionStorage.getItem("username")) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    signin.onclick = function () {

        var email = document.getElementById("email").value;
        var pwd = document.getElementById("pwd").value;
        var role = document.getElementById("role").value;

        if (role == "" && email == "") {
            alert("Please Select Who are you !");
        } else {

            if (!email.match(mailformat)) {
                alert("Please Enter Valid Email Address!");
            } else if (pwd == "") {
                alert("Please Enter Password!");
            } else {
                firebase.database().ref(role).orderByChild("email").equalTo(email).once("value", snapshot => {
                    if (snapshot.exists()) {
                        firebase.database().ref(role).orderByChild("password").equalTo(pwd).once("value", snap => {
                            if (snap.exists()) {
                                snap.forEach(
                                    function (data) {
                                        alert("Congrtulations! " + data.val().username + " You Have Successfully Login!");
                                        sessionStorage.setItem("username", data.val().username);
                                        sessionStorage.setItem("mnumber",data.val().mobilenumber);
                                        sessionStorage.setItem("role",role);
                                        window.location.href = "index.html";
                                    }
                                )
                            } else {
                                alert("Password not match!");
                            }
                        });
                        return true;
                    } else {
                        alert("Email not found");
                    }
                });
            }
        }
    }
} else {
    window.location.href = "index.html";
}