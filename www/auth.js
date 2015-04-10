function checkLoginStatus(){
  $fh.auth.hasSession(function(err, exist){
    if(err){
      alert('Failed to check user session');
    } else {
      if(exist){
        $('#description').text('User is logged in');
        setTimeout(function(){
          showTestPage();
        }, 300);
      } else {
        $('#description').text('User is not logged in');
        setTimeout(function(){
          showLoginPage();
        }, 300);
      }
    }
  });
}

function bindEvents(){
  $('#login_btn').click(function(){
    doUserLogin();
  });
  $('#hello_btn').click(function(){
    callSecureEndpoint();
  });
  $('#logout_btn').click(function(){
    $fh.auth.clearSession(function(err, res){
      if(err){
        alert('Failed to logout due to error');
      } else {
        checkLoginStatus();
      }
    });
  });
}

function doUserLogin(){
  var username = $('#username_field').val();
  var password = $('#password_field').val();
  if(username === ''){
    $('#description').text('Please enter username!');
    return;
  }
  if(password === ''){
    $('#description').text('Please enter password');
    return;
  }
  $('#description').text('Logging in...');
  $fh.auth({
    policyId:'ldapservice',
    clientToken: 'ry3kexcq3bjvhwxrvmq7xsag',
    params: {
      username: username,
      password: password
    }
  }, function(res){
    $('#description').text('Sucessfully logged in');
    $('#cloudResponse').html('<p>' + JSON.stringify(res, null, 2) + '</p>');
    setTimeout(function(){
      showTestPage();
    }, 500);
  }, function(err){
     $('#description').text('Login Failed');
     $('#cloudResponse').html('<p>' + JSON.stringify(err, null, 2) + '</p>');
  });
}

function callSecureEndpoint(){
  $fh.cloud({
    path: '/hello',
    method: 'POST',
    data: {hello:'user'},
  }, function(res){
    $('#secureCloudResponse').html('<p>' + JSON.stringify(res, null, 2) + '</p>');
  }, function(err){
    $('#secureCloudResponse').html('<p>' + JSON.stringify(err, null, 2) + '</p>');
  });
}

function showTestPage() {
  $('.pages').hide();
  $('#test_page').show();
}

function showLoginPage(){
  $('.pages').hide();
  $('#login_page').show();
}

$(document).ready(function(){
  checkLoginStatus();
  bindEvents();
});