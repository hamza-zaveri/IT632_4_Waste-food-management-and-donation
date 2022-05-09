let counterno = 0;
firebase.database().ref("Restaurant").once("value", function (snapshots) {
    snapshots.forEach(function(childSnapshot){
        firebase.database().ref("Restaurant/"+childSnapshot.key+"/Donation").once('value',function(snap){
            counterno = (snap.numChildren() + 100);
            $({ Counter: 0 }).animate({
                Counter: counterno
              }, {
                duration: 4000,
                easing: 'swing',
                step: function() {
                  $('#NoOfFeed').text(Math.ceil(this.Counter));
                  $('#NoOfFeed').css('color','blue');
                }
            });
            snap.forEach(function(childCheck){
                let numOfDdone = 54;
                let numOfFailed = 19;
                if(childCheck.val().NGOStatus == "Accept"){
                    numOfDdone++;
                    $({ Counter: 0 }).animate({
                        Counter: numOfDdone
                      }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function() {
                          $('#numOfDdone').text(Math.ceil(this.Counter));
                          $('#numOfDdone').css('color','green');
                        }
                    });
                }else if(childCheck.val().NGOStatus == "Failed"){
                        numOfFailed++;
                        $({ Counter: 0 }).animate({
                            Counter: numOfFailed
                          }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function() {
                              $('#numOfFailed').text(Math.ceil(this.Counter));
                              if(Math.ceil(this.Counter) < 10){
                                $('#numOfFailed').css('color','green');
                              }else if(Math.ceil(this.Counter) > 10){
                                $('#numOfFailed').css('color','red');
                                $('#numOfFailed').css('text-decoration','line-through');
                              }
                            }
                        });
                }
            });
        });
    });
});