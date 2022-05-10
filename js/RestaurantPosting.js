//Check if Resturant or Not 
if (sessionStorage.getItem("role") != "Restaurant") {

    alert("You Are Not Resturant So You Not Post Yet");
    window.location.href  = "index.html";
    
} else {
   
    var zipcodeFormate = /(^\d{6}$)|(^\d{6}-\d{4}$)/;
    saveData.onclick = function () {
        var output = "";
        //Donation Information
        const quantity = document.getElementById("quantity").value;
        const typeOfFood = document.getElementById("type").value;
        const cooked_time = document.getElementById("cooked_time").value;
        const expiry_time = document.getElementById("expiry_time").value;
        const hygiene = document.getElementById("hygiene").value;

        //Delivery Information
        var address = document.getElementById("address").value;
        var city = document.getElementById("city").value;
        var state = document.getElementById("State").value;
        var zipcode = document.getElementById("zipcode").value;
        mark = document.getElementById("mark").value;

        //User Information Validation 
        if (quantity == "" && typeOfFood == "" && cooked_time == "" && expiry_time == "" && hygiene == "" && address == "" || city == "" || state == "" || zipcode == "") {
            alert("Please fillup the form!");
        } else {

            if (!zipcode.match(zipcodeFormate)) {
                alert("Please enter valid Zipcode!");
            } else {
                if (mark == "") {
                    output = "default";
                } else {
                    output = document.getElementById("mark").value;
                }
                firebase.database().ref("Restaurant").orderByChild("mobilenumber").equalTo(sessionStorage.getItem("mnumber")).once('value', snap => {
                    snap.forEach(function (childSnapshot) {
                        firebase.database().ref("Restaurant/"+childSnapshot.key+"/Donation").push({
                            NGOStatus:"Pending",
                            Quantity: quantity,
                            tyfood:typeOfFood,
                            cookTime:cooked_time,
                            expiryTime:expiry_time,
                            hygieneLevel:hygiene,
                            address: address,
                            city: city,
                            state: state,
                            zipcode: zipcode,
                            mark: output,
                            RestaurantName:sessionStorage.getItem("username")
                        }).then(()=>{
                            alert("Congrtulations! Successfully Donate Your Food!");
                            window.location.href = "index.html";
                        });
                    });
                });
            }
        }
    }
}