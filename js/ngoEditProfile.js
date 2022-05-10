firebase.database().ref("NGO").orderByChild("mobilenumber").equalTo(sessionStorage.getItem("mnumber")).once('value',function(snapshot){
    snapshot.forEach(function(childSnapshot){
        document.getElementById("name").value = childSnapshot.val().username;
        document.getElementById("region").value = childSnapshot.val().region;
        document.getElementById("number").value = childSnapshot.val().mobilenumber;
        document.getElementById("email").value = childSnapshot.val().email;
        document.getElementById("address").value = childSnapshot.val().address;
        document.getElementById("city").value = childSnapshot.val().city;
        document.getElementById("State").value = childSnapshot.val().state;
        document.getElementById("zipcode").value = childSnapshot.val().zipcode;
        document.getElementById("mark").value = childSnapshot.val().mark;
        document.getElementById("password").value = childSnapshot.val().password;
    });
});
saveBtn.onclick = function(){
    firebase.database().ref("NGO").orderByChild("mobilenumber").equalTo(sessionStorage.getItem("mnumber")).once('value',function(snapShot){
        snapShot.forEach(function(childSnapshot){
            firebase.database().ref("NGO/"+childSnapshot.key).update({
                username:document.getElementById("name").value,
                region:document.getElementById("region").value,
                mobilenumber:document.getElementById("number").value,
                email:document.getElementById("email").value,
                address:document.getElementById("address").value,
                city:document.getElementById("city").value,
                state:document.getElementById("State").value,
                zipcode:document.getElementById("zipcode").value,
                mark:document.getElementById("mark").value,
                password:document.getElementById("password").value
            }).then(()=>{
                alert(document.getElementById("name").value + " Successfully Update Your Profile!");
                sessionStorage.setItem("username",document.getElementById("name").value);
                sessionStorage.setItem("mnumber",document.getElementById("number").value);
                window.location.href = "NGO.html";
            });
        });
    });
}