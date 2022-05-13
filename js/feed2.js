Save.onclick = function(){
    
    const name = document.getElementById("Dname").value;
    const Dnumber = document.getElementById("Dnumber").value;
    var id = location.search.split('token=')[1];
    var numberFomrate = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    if(name == "" && Dnumber == ""){
        alert("Please Fillup the Form!");
    }else if(!Dnumber.match(numberFomrate)){
        alert("Please Enter Valid Mobile Number!");
    }else{
        firebase.database().ref("Restaurant").once("value", function (snapshots) {
            snapshots.forEach(function(childSnaShot){
                firebase.database().ref("Restaurant/"+childSnaShot.key+"/Donation/"+id).update({
                    NGOStatus:"Accept",
                    DeliveryPname:name,
                    DeliveryContactN:Dnumber
                }).then(()=>{
                    alert("Successfully Accept Donator Food!");
                    window.location.href = "feed.html";
                });
            });
        });        
    }
}