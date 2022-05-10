Save.onclick = function(){
    
    const name = document.getElementById("Dname").value;
    const Dnumber = document.getElementById("Dnumber").value;
    var id = location.search.split('token=')[1];
    if(name == "" && Dnumber == ""){
        alert("Please Fillup the Form!");
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