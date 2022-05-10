firebase.database().ref("Restaurant").once("value", function (snapshots) {
    snapshots.forEach(function(childSnaShot){
        firebase.database().ref("Restaurant/"+childSnaShot.key+"/Donation").once('value', function (snapshot) {
            var content = '';
            snapshot.forEach(function (data) {
                var val = data.val();
                var donationStatus = "";
                if(val.NGOStatus == "Pending"){
                    donationStatus = '<a href="feed2.html?token='+data.key+'"><button class="buttonact btn btn-warning" style="background-color:orange;color:white;">Accept Donation</button></a>';
                }else if(val.NGOStatus == "Accept"){
                    donationStatus = '<button class="buttonact btn btn-success" style="background-color:green;color:white;">Food Accepted &#10003;</button></a>';
                }else{
                    donationStatus = '<button class="buttonact btn btn-danger" style="background-color:red;color:white;">Not Accepted <b>X</b></button></a>';                    
                }
                content += '<tr><td><h3>'+val.RestaurantName+'</h3></td></tr>';
                content += '<tr>';
                content += '<td rowspan="2" style=" margin: 50px;"><img style="height:200px;width:200px;" src="C:/Users/Admin/OneDrive/Desktop/Screenshot 2022-04-25 171244.png"></td>';
                content += '<td><b>Quantity</b><br>'+val.Quantity+'</td>';
                content += '<td><b>Hygiene level</b><br>'+val.hygieneLevel+'</td>';
                content += '<td><b>Cooked time</b><br>'+val.cookTime+'</td>';
                content += '<td><b>Address </b><br>'+val.address+'</td>';
                content += '<td><br></td>';
                content += '<td>'+donationStatus+'</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td><b>Type of food</b><br>'+val.tyfood+'</td>';
                content += '<td><b>Expiry time</b><br>'+val.expiryTime+'</td>';
                content += '<td><b>Mark</b><br>'+val.mark+'</td>';
                content += '<td><b>Restaurant Number</b><br>+91 '+childSnaShot.val().mobilenumber+' </td>';
                content += '</tr>';
                content += '<tr><td style="clear: both;display: inline-block;overflow: hidden;white-space: nowrap;"></td></tr>';
            });
            $('#ex-table').append(content);
        });
    });
});