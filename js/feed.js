firebase.database().ref("Restaurant").once("value", function (snapshots) {
    snapshots.forEach(function(childSnaShot){
        firebase.database().ref("Restaurant/"+childSnaShot.key+"/Donation").once('value', function (snapshot) {
            var content = '';
            snapshot.forEach(function (data) {
                var val = data.val();
                var donationStatus = "";
                
                if(sessionStorage.getItem("role")==="NGO"){
                    if(val.NGOStatus == "Pending"){
                        donationStatus = '<a href="feed2.html?token='+data.key+'"><button class="buttonact btn btn-warning" style="background-color:orange;color:white;">Accept Donation</button></a>';
                    }else if(val.NGOStatus == "Accept"){
                        donationStatus = '<button class="buttonact btn btn-success" style="background-color:green;color:white;">Food Accepted &#10003;</button></a>';
                    }else{
                        donationStatus = '<button class="buttonact btn btn-danger" style="background-color:red;color:white;">Not Accepted <b>X</b></button></a>';                    
                    }
                  }
                  
                  content += '<h4 style="margin-left:1%;">' + val.RestaurantName + '</h4><div class="row w-100" >';
                  content += '<div style="margin-left:1%; margin-top:2%;" class="itm col-lg-2"><img src="images/feedfood.jpg" class="img-fluid"></div>';
                  content += '<div class="itm col-lg-2 d-flex flex-column justify-content-around">';
                  content += '<div>';
                  content += '<table>';
                  content += '<tr>';
                  content += '<td class="fw-bold">Quantity</td> </tr> <tr> <td>' + val.Quantity + ' Dishes</td> </tr>';
                  content += '</table>';
                  content += '</div>';
                  content += '<div>';
                  content += '<table> <tr> <td class="fw-bold">Hygine Level</td> </tr> <tr> <td>' + val.hygieneLevel + '</td> </tr> </table></div>';
                  content += '<div>';
                  content += '<table> <tr> <td class="fw-bold">Cooked time</td> </tr> <tr> <td>' + val.cookTime + '</td> </tr> </table></div>';
                  content += '<table> <tr> <td class="fw-bold">Address</td> </tr> <tr> <td>' + val.address + '</td> </tr> </table></div>';
                  content += '<div class="itm col-lg-2 d-flex flex-column justify-content-around">';
                  content += '<div>';
                  content += '<table>';
                  content += '<tr> <td class="fw-bold">Type of food</td> </tr>';
                  content += '<tr> <td>' + val.tyfood + '</td> </tr>';
                  content += '</table>';
                  content += '</div>';
                  content += '<div>';
                  content += '<div>';
                  content += '<table>';
                  content += '<tr> <td class="fw-bold">Expiry time</td> </tr>';
                  content += '<tr> <td>' + val.expiryTime + '</td> </tr>';
                  content += '</table>';
                  content += '</div>';
                  content += '<table>';
                  content += '<tr> <td class="fw-bold">Remark</td> </tr> <tr> <td>' + val.mark + '</td> </tr>';
                  content += '</table>';
                  content += '</div></div>';
                  content += '<div class="itm col-lg-2 d-flex flex-column justify-content-around"> <div> <table> <tr> <td class="fw-bold">Restaurant Number</td> </tr> <tr> <td>' + childSnaShot.val().mobilenumber + '</td> </tr><tr><td class="fw-bold">Accepted NGO No '+val.DeliveryContactN+'</td><br></tr> </table> </div> </div> <div class="itm col-lg-3 d-flex flex-column justify-content-around status-itm"> <div> <table class="w-100"> <tr> '+donationStatus+' </tr> </table> </div></div>';
                  content += '<hr class="mt-4">';
                  content += '</div>';
            });
            $('#ex-table').append(content);
        });
    });
});