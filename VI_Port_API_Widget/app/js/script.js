ZOHO.embeddedApp.on("PageLoad", function(data){
var xmlStatusHTMLElement = document.querySelector("#xmlStatus");
var xmlFOCDateElement = document.querySelector("#FOCDate");
var xmlBillingTNElement = document.querySelector("#BillingTN");
let entityId = data.EntityId;
let entity = data.Entity;
var tnArray = [];

ZOHO.CRM.UI.Resize({height:"200",width:"1000"}).then(function(data){
	console.log(data);
});
ZOHO.CRM.API.getRecord({Entity:entity,RecordID:entityId})
.then(function(recordData){
  var portRequestNumber = recordData.data[0].Port_Request_Number;

console.log(portRequestNumber);
  var response_xml = `<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" 
  // xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\r\n  <soap12:Body>\r\n    
  // <getPortDetails xmlns=\"http://tempuri.org/\">\r\n      
  // <login></login>\r\n      <secret></secret>\r\n      
  // <portId>${portRequestNumber}</portId>\r\n    </getPortDetails>\r\n  
  // </soap12:Body>\r\n</soap12:Envelope>`;

  var request = {
    url : "https://backoffice.voipinnovations.com/Services/APIService.asmx",
    body : response_xml,
    headers : {
        "Content-Type" : "application/soap+xml"
    }

  }
  ZOHO.CRM.HTTP.post(request).then(function(response_data){
    //Make an API call to get the amount of phones online
    //This refreshes the page and update the "Phone_Online field"
    let parser = new DOMParser();
    let xmlDocs = parser.parseFromString(JSON.stringify(response_data), "text/html");
    let xmlPortDetailsResponse = xmlDocs.getElementsByTagName("portdetails")[0];
    let xmlPortDetailsStatus = xmlDocs.getElementsByTagName("status")[0].childNodes[0].nodeValue;
    let xmlDIDs = xmlDocs.getElementsByTagName("dids")[0].children;
    let xmlFOCDate = xmlDocs.getElementsByTagName("focdate")[0].childNodes[0].nodeValue;
    let xmlBillingTN = xmlDocs.getElementsByTagName("billingtn")[0].childNodes[0].nodeValue;

    const d = new Date(xmlFOCDate.split("T")[0]);

    for(var i = 0; i < xmlDIDs.length;i++){
      var itemPortDID = xmlDocs.getElementsByTagName("dids")[0].childNodes.item(i);
      var portDIDTN = itemPortDID.getElementsByTagName("tn")[0].childNodes[0].nodeValue;
      tnArray.push(portDIDTN);
    }
    console.log(tnArray);
    xmlStatusHTMLElement.innerHTML = "Status of Port: " + xmlPortDetailsStatus;
    xmlFOCDateElement.innerHTML = "FOC Date: " + xmlFOCDate.split("T")[0];
    xmlBillingTNElement.innerHTML = "Billing TN: " + xmlBillingTN;
  });
});
});
  
ZOHO.embeddedApp.init();