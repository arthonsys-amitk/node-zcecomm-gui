window.loggedin = false;
window.errorLogs=[];
/*
  This method identifies if a valid session is already in progress (using cookie), if so then we load it and work with it
  Otherwise we return false so that the callee handles it accordingly.
*/
function loadSession() {
  if($.cookie("access_token") && $.cookie("user")) {
    access_token=$.cookie("access_token");
    userInfo=JSON.parse($.cookie("user"));
    window.loggedin=true;
    return true;
  } else {
    return false;
  }
}

/*
  This method clears up session on logout or server resonse for session timeout.
*/

function clearSession() {
  $.removeCookie("access_token");
  $.removeCookie("user");
  access_token="";
  userInfo="";
  sessionStorage.removeItem('companyName');
  sessionStorage.removeItem('companyID');
  if(window.loggedin) {
    window.loggedin=false;
    location.reload();
  }
}



/*
  This method sets up session after authentication has been successful
*/

function setSession(authDetails) {
  $.cookie("access_token", authDetails.token, {expires: authDetails.expires});
  $.cookie("user", JSON.stringify(authDetails.user), {expires: authDetails.expires});
  access_token=authDetails.token;
  userInfo=authDetails.user;
  window.loggedin=true;
  location.reload();
}

/*  This method makes API calls, fetches data from the server and calls the calback function passed.
    It is also the place where we will validate the responses from the server, log/display the errors/exceptions.
    And also we will ensure there auth token has not expired yet. If it has, then we shall go to login page.
*/
function fetchData(url, method, data, callBackFunc, hasfiles){
  let reqHeaders={}, processData=true, contentType='application/x-www-form-urlencoded';
  if(hasfiles ===true){
    let formdata = new FormData();
    for(var key in data) {
      if(data.hasOwnProperty(key)){
        formdata.append(key, data[key]);
      }
    }
    data = formdata;
    processData=false;
    contentType=false;
  }
  if(access_token !="") {
    reqHeaders = {"x-access-token" : access_token};
  }
  $.ajax({
    url: url,
    headers : reqHeaders,
    method: method,
    data : data,
    processData: processData,
    contentType : contentType,
    success: function (responseData, status, jqXHR) {
      if(responseData.hasOwnProperty('message')) {
        handleError('warning','Server Response',responseData);
      } else {
        
      callBackFunc(responseData);
    }
    },
    error: function (jqXHR, status, error ) {
      switch(status) {
        case 401 :
        case 400 :
          //For 401 and 400, we logout the user.
          handleError('danger', 'Server Response',jqXHR.responseJSON);
          clearSession();
        break;
        break;
        default :
          handleError('danger', 'Server Response', jqXHR.responseJSON);
        break;
      }
    }
  });
}

/*
This function handles errors encountered while using APIs.
*/
function handleError(priority, title, errorObj) {

  if(errorObj.message) {
    if(errorObj.message.constructor === Array) {
      for(let i=0;i<errorObj.message.length;i++) {
        window.errorLogs.push({priority : priority, title: title, message: errorObj.message[i]});
      }
    } else {
      window.errorLogs.push({priority : priority, title: title, message: errorObj.message});
    }
  } else {
    window.errorLogs.push({priority : priority, title: title, message: "Unkown Error"});
  }
}

/*
  This method accepts array of objects that contains information that needs to be read of variable (globals).
  Currently there is only userInfo object that is supposed to contain information which may be required
  at several places, but still having a generic method allows us to control things better with the configuration
  if we were to use another such source in future, we'll only need to implement it here, and it will be available
  across the app.
*/
function getValues(queryInfo) {
  let retData={};
  if(queryInfo.constructor === Array) {
    for(let i=0; i<queryInfo.length; i++){
      retData[queryInfo[i].name] = getValue(queryInfo[i]);
    }
    return retData;
  }
  else {
    return getValue(queryInfo);
  }
}


/*
  This method is complimentry to the above defined method and only accepts single object.
*/
function getValue(queryInfo) {
  if(queryInfo.constructor === Array) {
    return getValues(queryInfo);
  }
  else {
    // if query is for accountid than check for company selected if selected than return with selected company id
    if(queryInfo.param == 'accountID' && sessionStorage.getItem('companyID')){
        return sessionStorage.getItem('companyID');
    }
    switch(queryInfo.source) {
      case "userInfo" :
        return userInfo[queryInfo.param];
      break;
      default :
        console.log("Invalid source specified.");
        return "";
      break;
    }
  }
}

function scrollToDiv(id,scrollto){
    var $id = $(id);
    var pos = $id.offset().top - 230;
    $('.'+scrollto).animate({scrollTop: pos});
}

function reformatDate(s) {
  function z(n){return ('0'+n).slice(-2)}
  var months = [,'jan','feb','mar','apr','may','jun',
                 'jul','aug','sep','oct','nov','dec'];
  var b = s.toLowerCase().split(' ');
  return b[2] + z(months.indexOf(b[1])) + z(b[0]);
}


