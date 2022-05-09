firebase.database().ref("Restaurant").once("value", function (snapshots) {
    snapshots.forEach(function(childSnaShot){
        firebase.database().ref("Restaurant/"+childSnaShot.key+"/Donation").once('value', function (snapshot) {
            var content = '';
            snapshot.forEach(function (data) {
                var val = data.val();
                content += '<tr><td><h3>Timpani</h3></td></tr>';
                content += '<tr>';
                content += '<td rowspan="2" style=" margin: 50px;"><img style="height:200px;width:200px;" src="C:/Users/Admin/OneDrive/Desktop/Screenshot 2022-04-25 171244.png"></td>';
                content += '<td><b>quantity</b><br>'+val.Quantity+'</td>';
                content += '<td><b>hygiene level</b><br>'+val.hygieneLevel+'</td>';
                content += '<td><b>Cooked time</b><br>'+val.cookTime+'</td>';
                content += '<td>'+val.address+'</td>';
                content += '<td><a href="feed2.html?token='+data.key+'"><button class="buttonact">Accept Donation</button></a></td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td><b>Type of food</b><br>'+val.tyfood+'</td>';
                content += '<td><b>Expiry time</b><br>'+val.expiryTime+'</td>';
                content += '<td></td>';
                content += '<td>'+childSnaShot.val().mobilenumber+' </td>';
                content += '</tr>';
                content += '<tr><td style="clear: both;display: inline-block;overflow: hidden;white-space: nowrap;"></td></tr>';
            });
            $('#ex-table').append(content);
        });
    });
});