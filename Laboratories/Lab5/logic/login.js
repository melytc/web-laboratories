$(document).ready(function(){
    
    // AJAX call to check if we had to remember a username (the remember cookie is set)
	$.ajax({
		url: "./data/cookieService.php",
		type: "POST",
		dataType: "json",
		success: function(dataReceived){
			$("#username").val(dataReceived.cookieUsername);
		},
		error: function(errorMessage){
			// alert("Error on AJAX call for cookies! " + errorMessage.statusText);
			console.error(errorMessage);
        }
    });
        
    $("#loginButton").on("click", function(){

		var username = $("#username").val();
		var password = $("#userPassword").val();
		var remember = $("#rememberBox").is(":checked");

		if (username != "" && password != ""){
			var jsonToSend = {
				"uName" : username,
				"uPassword" : password,
				"rememberMe" : remember
			};
							 
			$.ajax({
				url : "./data/loginService.php",
				type : "POST",
				data : jsonToSend,
				ContentType : "application/json",
				dataType : "json",
				success : function(dataReceived){
					if(dataReceived.success){
						alert("Welcome back " + dataReceived.firstname + " " + dataReceived.lastname);
						window.location.href = "./home.html";
					} else{
						alert('Could not log you in. Please try again.');

					}
				},
				error : function(errorMessage){
					alert(errorMessage.statusText);
				}
			});
		}
	});
});