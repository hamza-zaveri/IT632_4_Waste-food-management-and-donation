document.getElementById("rcname").innerHTML = sessionStorage.getItem("username") + " Restaurant";
let nof = 0,nodd = 0, nofd = 0;

firebase.database().ref("Restaurant").orderByChild("mobilenumber").equalTo(sessionStorage.getItem("mnumber")).once('value',snapshot=>{
    snapshot.forEach(function(chilsSnapshot){
       firebase.database().ref("Restaurant/"+chilsSnapshot.key+"/Donation").once('value',function(childQuerySnapshot){
        var content = '';    
        var hygieneLevelEdit = "";
        var ngStatus = "";
        var dNo;
        childQuerySnapshot.forEach(function(queryData){
            var val = queryData.val();
                nof++;
                $({ Counter: 0 }).animate({
                    Counter: nof
                  }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function() {
                      $('#nof').text(Math.ceil(this.Counter));
                      $("#nof").css("color","blue");
                    }
                });
                if(queryData.val().NGOStatus == "Accept"){
                    nodd++;
                    $({ Counter: 0 }).animate({
                        Counter: nodd
                      }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function() {
                          $('#nodd').text(Math.ceil(this.Counter));
                          $("#nodd").css("color","green");
                        }
                    });
                }else if(queryData.val().NGOStatus == "Failed"){
                    nofd++;
                    $({ Counter: 0 }).animate({
                        Counter: nofd
                      }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function() {
                          $('#nofd').text(Math.ceil(this.Counter));
                          $("#nofd").css("color","red");
                        }
                    });
                }
                /*Listing*/
                
                if(val.hygieneLevel == 1){
                    hygieneLevelEdit = '⭐';
                }else if(val.hygieneLevel == 2){
                    hygieneLevelEdit = '⭐⭐';
                }else if(val.hygieneLevel == 3){
                    hygieneLevelEdit = '⭐⭐⭐';
                }else if(val.hygieneLevel == 4){
                    hygieneLevelEdit = '⭐⭐⭐⭐';
                }else{
                    hygieneLevelEdit = '⭐⭐⭐⭐⭐';
                }
                if(val.NGOStatus == "Accept"){
                    ngStatus = '<td class="text-success fw-bold">Accept</td>';
                }else if(val.NGOStatus == "Pending"){
                    ngStatus = '<td class="text-warning fw-bold">Pending</td>';
                }else{
                    ngStatus = '<td class="text-danger fw-bold">Failed</td>';
                }
                if(val.DeliveryContactN==null){
                    dNo = "Pending";
                }else{
                    dNo = "+91 "+ val.DeliveryContactN;
                }
                content += '';
                content += '<h4>'+chilsSnapshot.val().username+'</h4><div class="row">';
                content += '<div class="itm col-lg-2"><img src="https://picsum.photos/200" class="img-fluid"></div>';
                content += '<div class="itm col-lg-2 d-flex flex-column justify-content-around">';
                content += '<div>';
                content += '<table>';
                content += '<tr>';
                content += '<td class="fw-bold">Quantity</td> </tr> <tr> <td>'+val.Quantity+' Dishes</td> </tr>';
                content += '</table>';
                content += '</div>';
                content += '<div>';
                content += '<table> <tr> <td class="fw-bold">Types of food</td> </tr> <tr> <td>'+val.tyfood+'</td> </tr> </table>';
                content += '</div> </div>';
                content += '<div class="itm col-lg-2 d-flex flex-column justify-content-around">';
                content += '<div>';
                content += '<table>';
                content += '<tr> <td class="fw-bold">Hygine Level</td> </tr>';
                content += '<tr> <td>'+hygieneLevelEdit+'</td> </tr>';
                content += '</table>';
                content += '</div>';
                content += '<div>';
                content += '<table>';
                content += '<tr> <td class="fw-bold">Expiry Time</td> </tr> <tr> <td>'+val.expiryTime+' hours</td> </tr>';
                content += '</table>';
                content += '</div>';
                content += '</div>';
                content += '<div class="itm col-lg-2 d-flex flex-column justify-content-around"> <div> <table> <tr> <td class="fw-bold">Cooked Time</td> </tr> <tr> <td>'+val.cookTime+' pm</td> </tr> </table> </div> </div> <div class="itm col-lg-2 d-flex flex-column justify-content-around"> <div> <table> <tr> <td class="fw-bold">Remarks </td> </tr><tr> <td>'+val.mark+', </td> </tr> </table> </div> <div> <table><tr> <td class="fw-bold">Deliver No</td> </tr> <tr> <td class="fw-bold">'+dNo+'</td> </tr> </table> </div> </div> <div class="itm col-lg-2 d-flex flex-column justify-content-around status-itm"> <div> <table class="w-100"> <tr> <td class="fw-bold">Status</td> </tr> <tr> '+ngStatus+' </tr> </table> </div> </div>';
                content += '<hr class="mt-4">';
            }); 
            $('#ex-table').append(content);
       });
    });
});


