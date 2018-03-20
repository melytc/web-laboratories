var showSummary = false;

$(document).ready(function(){    
    // Header and footer loaded in document.
    $("footer").text("All Rights Reserved. MR BURGER CO.");
    $("#slogan").html("Burgers and fries,<br>the way they were <span style=\"font-weight: bold\">always</span> meant to be.</slogan>");
    
    // Validations when clicking the submit button.
    $("#submitButton").on("click", addToCart);

    // All inputs should be restarted if clicked.
    $("#restartButton").on("click", resetOrder);

    // Updating content when clicking the menu.
    $("#homeMenu > li").on("click", function(){
    
        // Hiding current element.
        $(".elementSelected").addClass("hiddenElement").removeClass("elementSelected");

        // Update option selected.
        $(".selected").removeClass("selected");

        // Show current element.
        var currentOption = $(this).attr("class");
        $("#" + currentOption).removeClass("hiddenElement");
        $("#" + currentOption).addClass("elementSelected");

        // Update option selected in menu.
        $(this).addClass("selected");
    });

    // Validating comment submissions.
    $("#submitComment").on("click", validateComment);
});

// Function to add order to cart.
function addToCart(){
    showSummary = false;
    validateOrder();

    if(showSummary){
        
        var chosenBurgerType = $("input:radio[name=burgerType]").val();
        var chosenBreadType = $("input:radio[name=breadType]").val();
        var chosenSize = $("input:radio[name=burgerSize]").val();
        var burgerQuantity = $("#burgerQuantity").val();
        
        // Display chosen condiments.
        var chosenCondiments = [];

        $("input[name=burgerCondiment]").each(function() {
            if (this.checked) {
                 chosenCondiments.push($(this).val());
              }
         });
         var condimentsSummaryString = "";
         if(chosenCondiments.length > 0){
            condimentsSummaryString = "With ";
            for(var i = 0; i < chosenCondiments.length - 1; i++){
                condimentsSummaryString += chosenCondiments[i] + ", ";
            }
            condimentsSummaryString += chosenCondiments[chosenCondiments.length - 1] + ".";
         }
         $("#condimentsSummary").text(condimentsSummaryString);
        
        // Display chosen sauces.
		var chosenSauces = [];
        $("input[name=burgerSauce]").each(function() {
            if (this.checked) {
                chosenSauces.push($(this).val());
              }
         });
         var saucesSummaryString = "";

         if(chosenSauces.length > 0){
            saucesSummaryString = "With ";
            for(var i = 0; i < chosenSauces.length - 1; i++){
                saucesSummaryString += chosenSauces[i] + ", ";
            }
            saucesSummaryString += chosenSauces[chosenSauces.length - 1] + ".";
         }
         $("#saucesSummary").text(saucesSummaryString);

        // Display toppings.
        var chosenToppings = [];
        $("input[name=burgerToppings]").each(function() {
            if (this.checked) {
                chosenToppings.push($(this).val());
              }
         });
         
        if(chosenToppings.length == 0){
            // Hide the toppings header.
            $("#toppingHeader").css("display", "none");
        } else {
            $("#toppingHeader").css("display", "inherit");
            $("#toppingsSummary").html("");
            for(var i = 0; i < chosenToppings.length; i++) {
                $("#toppingsSummary").append('<li>' + chosenToppings[i] + '</li>');
            }
        }

        // Display if fries were selected.
		if($("#addFries").is(":checked")){
            $("#friesSummary").text("Includes fries");
		} else {
			$("#friesSummary").text("With no fries");
		}
        
        // Display order quantity.
        burgerSummary.textContent = burgerQuantity + " ";

        // Display the burger summary.
        burgerSummary.textContent += chosenBurgerType + " in " + chosenBreadType + " in size " + chosenSize + ".";
        
        // Display order summary.
        $("#orderSummary").css("display", "inherit");

    } else {
        $("#orderSummary").style.display = "none";
    }
}

// Function to validate inputs.
function validateOrder(){

    // Validate burger type.
    if($("input[name=burgerType]").is(":checked")) {
        $("#errorBurgerType").addClass("hiddenMessage");
        showSummary = true;
    } else {
        $("#errorBurgerType").removeClass("hiddenMessage");
        showSummary = false;
    }

    // Validate bread type.
    if($("input[name=breadType]").is(":checked")) {
        $("#errorBreadType").addClass("hiddenMessage");
        showSummary = true;
    } else {
        $("#errorBreadType").removeClass("hiddenMessage");
        showSummary = false;
    }

    // Validate burger size.
    if($("input[name=burgerSize]").is(":checked")) {
        $("#errorBurgerSize").addClass("hiddenMessage");
        showSummary = true;
    } else {
        $("#errorBurgerSize").removeClass("hiddenMessage");
        showSummary = false;
    }

    // Validate burger orders.
    if($("#burgerQuantity").val() == "") {
        $("#errorBurgerOrders").removeClass("hiddenMessage");
        showSummary = false;
    } else {
        $("#errorBurgerOrders").addClass("hiddenMessage");
        showSummary = true;
    }
}

// Function to reset order.
function resetOrder(){
    // Reset order inputs.
	$("input:radio[name=burgerType]").prop("checked", false);
	$("input:radio[name=breadType]").prop("checked", false);
    $("input:checkbox[name=burgerCondiment]").prop("checked", false);
    $("input:checkbox[name=burgerSauce]").prop("checked", false);
    $("input:checkbox[name=burgerToppings]").prop("checked", false);
    $("input:radio[name=burgerSize]").prop("checked", false);
    $("#addFries").prop("checked", false);
    $("#burgerQuantity").val("");
    
    // Reset order summary.
    $("#burgerSummary").html("");
    $("#condimentsSummary").html("");
    $("#saucesSummary").html("");
    $("#toppingsSummary").html("");
    $("#friesSummary").html("");

    // Change display of order summary.
    $("#orderSummary").css("display","none");

    // Reset order errors.
	$("#errorBurgerType").addClass("hiddenMessage");
	$("#errorBreadType").addClass("hiddenMessage");
	$("#errorBurgerSize").addClass("hiddenMessage");
	$("#errorBurgerOrders").addClass("hiddenMessage");
}

// Function to validate comment submission.
function validateComment(){
    var email = $("#emailText").val();
    var emailError = email == "";

    var comment = $("#commentText").val()
    var commentError = comment == "";

    // Validation of user email.
    if(emailError){
        $("#emailError").removeClass("hiddenMessage");
    } else {
        $("#emailError").addClass("hiddenMessage");
    }

    // Validation of user comment.
    if(commentError){
        $("#commentError").removeClass("hiddenMessage");
    } else {
        $("#commentError").addClass("hiddenMessage");
    }

    // If no error were found, add comment to log.
    if(!(emailError || commentError)){
        var commentLog = "<br>" + email + ":<br>" + comment + "<br>";
        $("#commentLog").html($("#commentLog").html().concat(commentLog));
    }
}
