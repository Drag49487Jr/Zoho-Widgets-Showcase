
ZOHO.CREATOR.init()
.then(function(data) {
  //Code goes here
  var customerPhoneNumber = document.getElementById("customerPhoneNumber");
  var customerPhoneNumberTest = document.getElementById("customerPhoneNumber");
  customerPhoneNumber.focus();
  var inputCustomerField = document.querySelector("#customerPhoneNumber");
  var membershipInfo = document.querySelector("#membershipInfo")
  var membershipStatus = document.querySelector("#membershipStatus");
  var errorMessage = document.querySelector("#errorMessage");
  var successMessage = document.querySelector("#successMessage");
  var successBox = document.querySelector("#successBox");
  var img = document.querySelector("#img");
  var submission = document.querySelector("#button");
  submission.addEventListener("click",submissionHandler, false);
  inputCustomerField.addEventListener("keyup", function(event) {
    if((event.code === "Enter") || (event.key === "Enter")) {
      event.preventDefault();
      document.querySelector("#button").click();
    }
  })
  function submissionHandler(){
    inputValue = customerPhoneNumberTest.value;
    var config = { 
    reportName : "All_Contacts",
    criteria : `(MB_Customer_ID == \"${inputValue}\")`,
    }
    console.log(config);
    
    ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
      //Check if client is in the zoho crm
      var recordArr = response.data;
    for(var index in recordArr){
        // var customerArrayMBCustomerId = [recordArr[index].MB_Customer_ID];
        var customerArrayMBCustomerIdName = [recordArr[index].account_name].toString();
        var customerArrayMBCustomerIdMembership = [recordArr[index].MB_Membership].toString();
        var customerArrayMBCustomerIdStatus = [recordArr[index].MB_Member_Status].toString();
        var customerArrayMBCustomerIdDateofBirth = [recordArr[index].dateOfBirth].toString();
        var customerArrayMBCustomerIdContactOwner = [recordArr[index].Contact_Owner].toString();
        var customerArrayMBCustomerIdContactID = [recordArr[index].Contact_ID].toString();
        var customerArrayMBCustomerIdCustomerImage = [recordArr[index].customer_Image].toString();
      }

      if(customerArrayMBCustomerIdStatus == "Active"){
        let day = new Date().toLocaleDateString('en-us', {day: "numeric"});
        let weekday = new Date().toLocaleDateString('en-us', {month: "short"});
        let year = new Date().toLocaleDateString('en-us', {year: "numeric"});
        let date = day + "-" + weekday + "-" + year;
        let customerDOB = customerArrayMBCustomerIdDateofBirth;
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        let time = hour + ":" + minute + ":" + seconds;

        var addData = {
          "data" : {
            "Client_Name" : customerArrayMBCustomerIdName,
            "Date_field" : date,
            "Time" : time,
            "Contact" : customerArrayMBCustomerIdContactID,
            "Membership_Type" : customerArrayMBCustomerIdMembership,
            "Membership_Status" : customerArrayMBCustomerIdStatus,
            "Contact_Owner" : customerArrayMBCustomerIdContactOwner
          }
        }

        var addConfig = {
          formName : "Client_s_Checking_In",
          data : addData
        }
        
          ZOHO.CREATOR.API.addRecord(addConfig).then(function(response) {
            //Check if client's status is active
            // If client is active, store info for tracking clients activity
            if(response.code == 3000) {
              console.log("Recorded added successfully")
              if(customerDOB[0] == "0") {
                var birthdaySingleDigit = customerDOB.slice(1, 6);
              } else {
                var birthdayDoubleDigit = customerDOB.slice(0,6);
              }
              if(birthdaySingleDigit == date.slice(0,5) || birthdayDoubleDigit == date.slice(0,6)){
                successMessage.textContent = "Happy Birthday " + customerArrayMBCustomerIdName + "!";
                function wait(ms) {
                  return new Promise(resolve => setTimeout(resolve, ms));
              } wait(2000).then(() => {
                  var confettiSettings = { target: 'my-canvas' };
                  var confetti = new ConfettiGenerator(confettiSettings);
                  confetti.render();
              })
              } else {
                successMessage.textContent = "Welcome " + customerArrayMBCustomerIdName + "!";
              }
              //Creating popup ui
              membershipInfo.textContent = `${customerArrayMBCustomerIdMembership}`;
              membershipStatus.textContent = `${customerArrayMBCustomerIdStatus}`;
              membershipStatus.innerHTML = "Status: " + membershipStatus.textContent.slice(0).fontcolor("green");
              var imgURL = customerArrayMBCustomerIdCustomerImage;
              ZOHO.CREATOR.UTIL.setImageData(img, imgURL);
              successBox.style.maxWidth = "450px";
              successBox.style.maxHeight = "400px";
              successBox.style.boxShadow = "20px 20px 50px rgba(0,0,0,0.5)";
              successBox.style.background = "rgba(255, 255, 255, 0.1)";
              successBox.style.borderTop = "1px solid rgba(255, 255, 255, 0.5)";
              successBox.style.borderLeft = "1px solid rgba(255, 255, 255, 0.5)";
              successBox.style.backdropFilter = "blur(5px)";
              if(customerArrayMBCustomerIdMembership == "Gold Membership") {
                membershipInfo.style.color = "#FFD700";
              } if (customerArrayMBCustomerIdMembership == "Platinum Membership") {
                membershipInfo.style.color = "#E5E4E2";
              } if (customerArrayMBCustomerIdMembership == "Silver Membership") {
                membershipInfo.style.color = "#C0C0C0";
              }
            } 
          })
        }

    }).catch((message) => {
      console.log(message);
      errorMessage.textContent = "We're sorry. We could not find your account. Please try again or ask for assisstance.";
      errorMessage.style.color = "red";
    });
    errorMessage.textContent = "";
    successMessage.textContent = "";
    inputCustomerField.value = "";
    membershipInfo.textContent = "";
    img;
  };
});
function awaitingToRestart(){
errorMessage.textContent = "";
successMessage.textContent = "";
membershipInfo.textContent = "";
img.style.display = "none";
location.reload(true);
}
