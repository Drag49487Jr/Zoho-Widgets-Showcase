ZOHO.embeddedApp.on("PageLoad",function(data)
{
        ZOHO.CRM.API.getOrgVariable("Y_K").then(function(re){
            ZOHO.CRM.API.getOrgVariable("Y_S").then(function(as){
                let uuidRequest = {
                    url : "https://api.uuids.io/1"
                };
                ZOHO.CRM.HTTP.get(uuidRequest).then(function(uuidData) {
                    //Get the 1st uuid
                    let uuid = JSON.parse(uuidData).uuid;
                    let entityID = data.EntityId;
                    const zohoCRMName = "Connection Name";
                    const reqData = {
                        "method" : "GET",
                        "url" : "https://www.zohoapis.com/crm/v3/Bicom_Systems/" + entityID
                    };
                
                    ZOHO.CRM.CONNECTION.invoke(zohoCRMName, reqData).then(function(bicomData) {
                        var deviceLst = [];
                        var extensionObject = {};
                        var extensionReqData = {};
                        var bicomModuleData = bicomData.details.statusMessage.data[0];
                        var bicomServerName = bicomModuleData.Server;
                        var tenantName = bicomModuleData.Tenant_Name;
                        var timerElement = document.querySelector("#timer");
                        var elem = document.querySelector("#myBar");
                        var progressElement = document.querySelector("#myProgress");
                        var extensionDataElement = document.querySelector("#extensionData");
                        var containerOneElement = document.querySelector("#containerOne");
                        var extensionSubformArray = bicomModuleData.Extension_Numbers;

                            let timestamp = Date.now();
                            var myURI = 'api/open/v1/manager/rpsServer/add';
                            let data = {
                                url : "http://" + bicomServerName.toLowerCase() + ".cdspbx.com/prov",
                                serverName : tenantName
                            };
                            //Formatting the data to be sent
                            let parsedData = JSON.stringify(data);
                            let ContentMD5 = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(parsedData));
                            let mySigString = 'POST\n' + 
                                            'Content-MD5:' + ContentMD5 + '\n' +
                                            'X-Ca-Key:' + re.Success.Content + '\n' + 
                                            'X-Ca-Nonce:' + uuid + '\n' + 
                                            'X-Ca-Timestamp:' + timestamp + '\n' +
                                            myURI;
                            let hash = CryptoJS.HmacSHA256(mySigString,as.Success.Content);
                            let hashInB64 = CryptoJS.enc.Base64.stringify(hash);
                            var request = {
                                url : "https://api-dm.yealink.com/api/open/v1/manager/rpsServer/add",
                                headers : {
                                    "Content-MD5" : ContentMD5,
                                    "X-Ca-Key" : re.Success.Content,
                                    "X-Ca-Nonce" : uuid,
                                    "X-Ca-Signature":hashInB64,
                                    "X-Ca-Timestamp" : timestamp,
                                    "Content-Type" : "application/json;charset=UTF-8"
                                },
                                body : parsedData,
                            }
                            ZOHO.CRM.HTTP.get(uuidRequest).then(function(uuidTwoData){
                                //Get the second uuid
                                let uuidTwo = JSON.parse(uuidTwoData).uuid;
                                ZOHO.CRM.HTTP.post(request).then(function(rpsServerData){
                                    //Create the server on Yealink using bicom custom module
                                    let rpsServerDataObject = JSON.parse(rpsServerData);
                                    let rpsServerId = rpsServerDataObject.data.id;
    
                                        var siteURI = "api/open/v1/manager/region/add";
                                        let siteData = {
                                            name : tenantName,
                                            parentId : "parent id"
                                        };
                                        let parsedSiteData = JSON.stringify(siteData);
                                        let siteContentMD5 = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(parsedSiteData));
                                        let siteSigString = 'POST\n' + 
                                                    'Content-MD5:' + siteContentMD5 + '\n' +
                                                     'X-Ca-Key:' + re.Success.Content + '\n' + 
                                                     'X-Ca-Nonce:' + uuidTwo + '\n' + 
                                                     'X-Ca-Timestamp:' + timestamp + '\n' +
                                                     siteURI;
                                        let siteHash = CryptoJS.HmacSHA256(siteSigString,as.Success.Content);
                                        let siteHashInB64 = CryptoJS.enc.Base64.stringify(siteHash);
                                        var siteRequest = {
                                            url : "https://api-dm.yealink.com/api/open/v1/manager/region/add",
                                            headers : {
                                                "Content-MD5" : siteContentMD5,
                                                "X-Ca-Key" : re.Success.Content,
                                                "X-Ca-Nonce" : uuidTwo,
                                                "X-Ca-Signature":siteHashInB64,
                                                "X-Ca-Timestamp" : timestamp, 
                                                "Content-Type" : "application/json;charset=UTF-8"
                                            },
                                            body : parsedSiteData,
                                        }
                                        ZOHO.CRM.HTTP.post(siteRequest).then(function(siteData){
                                            //Create the site which falls under the server that was just created
                                            let siteDataObject = JSON.parse(siteData);
                                            let siteId = siteDataObject.data.id;
                                            let siteRegion = siteDataObject.data.number;
    
                                            ZOHO.CRM.HTTP.get(uuidRequest).then(function(uuidThreeData){
                                                //Get the third uuid
                                                let uuidThree = JSON.parse(uuidThreeData).uuid;
                                                createDevice(rpsServerId, siteId, siteRegion, uuidThree);
                                                async function createDevice(rpsServerId, siteId, siteRegion, uuidThree){
                                                    //waits till all the information needed are gathered since the next part needs the information from above
                                                    
                                                    // console.log("ServerId, Site Id / Region. Third UUID Recieved!");

                                                    let macs = [];
                                                    for(let i = 0;i < extensionSubformArray.length;i++){
                                                        
                                                        let extensionMACAddress = extensionSubformArray[i].Mac_Address;
                                                        macs.push(extensionMACAddress);
                                                    }

                                                    Promise.all(macs).then(function(m){
                                                        console.log("MacAdded: ", m);
                                                            var deviceURI = "api/open/v1/manager/rpsDevice/batchAdd";
                                                            let deviceData = {
                                                            macs : m,
                                                            serverId : rpsServerId
                                                            }
                                                            let parsedDeviceData = JSON.stringify(deviceData);
                                                            let deviceContentMD5 = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(parsedDeviceData));
                                                            let deviceSigString = 'POST\n' + 
                                                                        'Content-MD5:' + deviceContentMD5 + '\n' +
                                                                        'X-Ca-Key:' + re.Success.Content + '\n' + 
                                                                        'X-Ca-Nonce:' + uuidThree + '\n' + 
                                                                        'X-Ca-Timestamp:' + timestamp + '\n' +
                                                                        deviceURI;
                                                            let deviceHash = CryptoJS.HmacSHA256(deviceSigString, as.Success.Content);
                                                            let deviceHashInB64 = CryptoJS.enc.Base64.stringify(deviceHash);
                                                            var deviceRequest = {
                                                            url : "https://api-dm.yealink.com/api/open/v1/manager/rpsDevice/batchAdd",
                                                            headers : {
                                                                "Content-MD5" : deviceContentMD5,
                                                                "X-Ca-Key" : re.Success.Content,
                                                                "X-Ca-Nonce" : uuidThree,
                                                                "X-Ca-Signature":deviceHashInB64,
                                                                "X-Ca-Timestamp" : timestamp, 
                                                                "Content-Type" : "application/json;charset=UTF-8"
                                                            },
                                                            body : parsedDeviceData
                                                            }
                                                            ZOHO.CRM.HTTP.post(deviceRequest).then(function(deviceData){
                                                                //Add the extension numbers from the Bicom custom module in a batch instead of one by one
                                                                let deviceDataObject = JSON.parse(deviceData);
                                                                // console.log(deviceDataObject)
                                                            })
                                                    });

                                                }
                                            });
                                        });
                                });
                            });

                        // startExtensionToYealink(serverId);
                        async function startExtensionToYealink(serverID){
                            console.log(serverID);
                
                            var extensionAdded = 1;
                            var time = extensionSubformArray.length * 5;
                            var x = setInterval(function(){
                                function secondToHms(d){
                                    d = Number(d);
                                    var h = Math.floor(d / 3600);
                                    var m = Math.floor(d % 3600 / 60);
                                    var s = Math.floor(d % 3600 % 60);
                                
                                    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours, ") : "";
                                    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes, ") : "";
                                    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                                    return hDisplay + mDisplay + sDisplay;
                                };
                                var result = secondToHms(time);
                                timerElement.innerHTML = result;
                                time-=1;
                                if(time == 0){
                                    clearInterval(x);
                                    elem.style.scale = 0;
                                    progressElement.style.scale = 0;
                                    timerElement.style.scale = 0;
                                    extensionDataElement.style.scale = 0;
                                    containerOneElement.style.scale = 0;
                                    // var config = {
                                    //     Entity:"Bicom_Systems",
                                    //     APIData: {
                                    //         "id" : entityID[0]
                                    //     },
                                    //     Trigger:[]
                                    // }
                                    // ZOHO.CRM.API.updateRecord(config).then(function(res) {
                                    //     ZOHO.CRM.UI.Popup.closeReload(true).then(function(ft) {
                                    //     });
                                    // });
                                }
                            },1000);
                
                            function addExtensionToYealink(){
                                var progressRate = 0;
                                extensionSubformArray.length * 5;
                                for(let i =0;i<extensionSubformArray.length;i++){
                                    (function(i) {
                                        setTimeout(function(){
                                            let extensionMACAddress = extensionSubformArray[i].Mac_Address;
                                            console.log(extensionMACAddress);
                
                
                                            if(extensionAdded == extensionSubformArray.length){
                                                extensionDataElement.innerHTML = "Please wait while we update the CRM.";
                                                return "Breaking out of function"
                                            }
                                            var width = i;
                                            if(extensionSubformArray.length == 100){
                                                elem.style.width = width + "%";
                                            }else {
                                                let formatProgressRate = 100 / extensionSubformArray.length;
                                                progressRate+=formatProgressRate;
                                                elem.style.width = progressRate + "%";
                                                // elem.innerHTML = Math.round(progressRate) + "%";
                                                extensionDataElement.innerHTML = extensionAdded + " out of " +extensionSubformArray.length + " Extensions have been Added.";
                                            };
                                            extensionAdded+=1;
                                        },5000 * i);
                                    })(i);
                                };
                            };
                            addExtensionToYealink();
                        };
                    });
            });
        });
    });



});

ZOHO.embeddedApp.init();






