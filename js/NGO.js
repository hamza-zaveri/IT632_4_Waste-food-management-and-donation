document.getElementById("ngoname").innerHTML = sessionStorage.getItem("username") + " NGO";
let counterno = 0;
let dish = 0;
firebase.database().ref("Restaurant").once("value", function (snapshots) {
   snapshots.forEach(function (chilsSnapshot) {
    firebase.database().ref("Restaurant/" + chilsSnapshot.key + "/Donation").once('value', function (snap) {
      counterno = (snap.numChildren());
      var content = '';    
      var hygieneLevelEdit = "";
      var ngStatus = "";
      let numOfDdone = 0;
      let numOfFailed = 0;
      snap.forEach(function (childCheck) {
        var val = childCheck.val();
        if (childCheck.val().NGOStatus == "Accept") {
          numOfDdone++;
          dish += parseInt(childCheck.val().Quantity);
          $({ Counter: 0 }).animate({
            Counter: dish
          }, {
            duration: 4000,
            easing: 'swing',
            step: function () {
              $('#NoOfFeed').text(Math.ceil(this.Counter));
              $('#NoOfFeed').css('color', 'blue');
            }
        });
          $({ Counter: 0 }).animate({
            Counter: numOfDdone
          }, {
            duration: 4000,
            easing: 'swing',
            step: function () {
              $('#numOfDdone').text(Math.ceil(this.Counter));
              $('#numOfDdone').css('color', 'green');
            }
          });
        } else if (childCheck.val().NGOStatus == "Failed") {
          numOfFailed++;
          $({ Counter: 0 }).animate({
            Counter: numOfFailed
          }, {
            duration: 4000,
            easing: 'swing',
            step: function () {
              $('#numOfFailed').text(Math.ceil(this.Counter));
              if (Math.ceil(this.Counter) < 10) {
                $('#numOfFailed').css('color', 'green');
              } else if (Math.ceil(this.Counter) > 10) {
                $('#numOfFailed').css('color', 'red');
                $('#numOfFailed').css('text-decoration', 'line-through');
              }
            }
          });
        }
        /*Listing*/

        if (val.hygieneLevel == 1) {
          hygieneLevelEdit = '⭐';
        } else if (val.hygieneLevel == 2) {
          hygieneLevelEdit = '⭐⭐';
        } else if (val.hygieneLevel == 3) {
          hygieneLevelEdit = '⭐⭐⭐';
        } else if (val.hygieneLevel == 4) {
          hygieneLevelEdit = '⭐⭐⭐⭐';
        } else {
          hygieneLevelEdit = '⭐⭐⭐⭐⭐';
        }
        if (val.NGOStatus == "Accept") {
          ngStatus = '<td class="btn btn-success fw-bold">Accepted &#10003;</td>';
        } else if (val.NGOStatus == "Pending") {
          ngStatus = '<td class="btn btn-warning fw-bold">Pending <b>!</b></td>';
        } else {
          ngStatus = '<td class="btn btn-danger fw-bold">Failed <b>X</b></td>';
        }
        content += '<h4>' + chilsSnapshot.val().username + '</h4><div class="row" >';
        content += '<div class="itm col-lg-2"><img src="https://picsum.photos/200" class="img-fluid"></div>';
        content += '<div class="itm col-lg-2 d-flex flex-column justify-content-around">';
        content += '<div>';
        content += '<table>';
        content += '<tr>';
        content += '<td class="fw-bold">Quantity</td> </tr> <tr> <td>' + val.Quantity + ' Dishes</td> </tr>';
        content += '</table>';
        content += '</div>';
        content += '<div>';
        content += '<table> <tr> <td class="fw-bold">Types of food</td> </tr> <tr> <td>' + val.tyfood + '</td> </tr> </table>';
        content += '</div> </div>';
        content += '<div class="itm col-lg-2 d-flex flex-column justify-content-around">';
        content += '<div>';
        content += '<table>';
        content += '<tr> <td class="fw-bold">Hygine Level</td> </tr>';
        content += '<tr> <td>' + hygieneLevelEdit + '</td> </tr>';
        content += '</table>';
        content += '</div>';
        content += '<div>';
        content += '<table>';
        content += '<tr> <td class="fw-bold">Expiry Time</td> </tr> <tr> <td>' + val.expiryTime + ' hours</td> </tr>';
        content += '</table>';
        content += '</div>';
        content += '</div>';
        content += '<div class="itm col-lg-2 d-flex flex-column justify-content-around"> <div> <table> <tr> <td class="fw-bold">Cooked Time</td> </tr> <tr> <td>' + val.cookTime + ' pm</td> </tr> </table> </div> </div> <div class="itm col-lg-2 d-flex flex-column justify-content-around"> <div> <table> <tr> <td class="fw-bold">Remarks </td> </tr><tr> <td>' + val.mark + ', </td> </tr> </table> </div> <div> <table><tr> <td class="fw-bold">Restaurant No</td> </tr> <tr> <td class="fw-bold">+91 ' + chilsSnapshot.val().mobilenumber + '</td> </tr> </table> </div> </div> <div class="itm col-lg-2 d-flex flex-column justify-content-around status-itm"> <div> <table class="w-100"> <tr> <td class="fw-bold">Status</td> </tr> <tr> ' + ngStatus + ' </tr> </table> </div> </div>';
        content += '<hr class="mt-4">';
      });
      $('#ex-table').append(content);
    });
  });
});