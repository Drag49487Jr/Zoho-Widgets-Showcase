var id;
var conn_name = "Zoho Connection Name";

ZOHO.embeddedApp.on("PageLoad",function(data){
    ZOHO.CRM.UI.Resize({height:"500", width:"500"}).then(function(data) {
        //Resize the Widget
    });
    id = data.EntityId;

    ZOHO.CRM.API.getAllRecords({Entity: "Contacts", RecordID:id})
    .then(function(response) {
        let accountID = JSON.stringify(response.data[0].Account_Name.id).replace(/["]/g, '');
        let subscription_data = {
            "parameters" : {
                "reference_id_type" : "zcrm_account_id",
                "organization_id" : "organization id",
                "name" : "name"
            },
            "method" : "GET",
            "url" : `https://subscriptions.zoho.com/api/v1/customers/reference/${accountID}`
        }
        ZOHO.CRM.CONNECTION.invoke(conn_name, subscription_data).then(function(response) {
            //Checks if the customer exists in Zoho Subscriptions
            subscriptionCustomer_ID = JSON.stringify(response.details.statusMessage.customer.customer_id).replace(/["]/g, '');
            let customerSubscription_data = {
                "parameters" : {
                    "organization_id" : "orgnization id",
                    "name" : "name",
                    "filter_by" : "SubscriptionStatus.LIVE",
                    "customer_id" : subscriptionCustomer_ID
                },
                "method" : "GET",
                "url" : `https://subscriptions.zoho.com/api/v1/subscriptions`
            }
            ZOHO.CRM.CONNECTION.invoke(conn_name, customerSubscription_data).then(function(response) {
                //Checks if the customer's subscription plan is Active
                planCode= JSON.stringify(response.details.statusMessage.subscriptions[0].plan_code).replace(/["]/g, '');
                let subscription_ID = response.details.statusMessage.subscriptions[0].subscription_id;
                let planCode_data = {
                    "parameters" : {
                        "organization_id" : "organization id",
                        "name" : "name"
                    },
                    "method" : "GET",
                    "url" : `https://subscriptions.zoho.com/api/v1/plans/${planCode}`
                }
                ZOHO.CRM.CONNECTION.invoke(conn_name, planCode_data).then(function(response) {
                    //Grabs the plan id to make the next api call
                    product_id = JSON.stringify(response.details.statusMessage.plan.product_id).replace(/["]/g, '');
                    let addonsAssociated = {
                        "parameters" : {
                            "organization_id" : "organization id",
                            "name" : "name",
                            "filter_by": "AddonStatus.ACTIVE",
                            "product_id" : product_id
                        },
                        "method" : "GET",
                        "url" : `https://subscriptions.zoho.com/api/v1/addons`
                    }
                    ZOHO.CRM.CONNECTION.invoke(conn_name, addonsAssociated).then(function(response) {
                        //Grabs all add on plans associated to the plan
                        let addOns = response.details.statusMessage.addons;
                        addOns.forEach(myFunction);

                        function myFunction(item) {
                            //Create HTML elements along with CSS to be dynamic
                            let header = document.querySelector("#header");
                            let addOnName = item.name;
                            let price ="Regular Price - $"+item.price_brackets[0].price;
                            //DO NOT RENAME "TEST" => For some reason renaming will not make the style work
                            let test = document.createElement("div");
                            let btn = document.createElement("button")
                            let info = document.createElement("div");

                            test.className = "addOn";
                            btn.className = "btn";
                            info.className = "info";
                            header.innerHTML = "Add On Sessions";
                            test.innerHTML = addOnName;
                            info.innerHTML += price;
                            btn.innerHTML = "Confirm Addon";

                            let addOn = document.getElementById("addOns").appendChild(test);
                            let extraInfo = test.appendChild(info)
                            let button = test.appendChild(btn);
                            
                            button.style.height = "30px";
                            button.style.width = "150px";
                            addOn.style.backgroundColor = "black";
                            addOn.style.margin = "40px";
                            addOn.style.height = "100px";
                            addOn.style.width = "150px";
                            extraInfo.style.backgroundColor = "#a41c5b";
                            extraInfo.style.height = "60px";
                            extraInfo.style.marginTop = "10px";

                            btn.addEventListener("click", submittingAddon, false);

                            function submittingAddon() {
                                //This will take the user to the actual form to collect credit card information
                                let submitAddon = {
                                    "parameters": {
                                        // "organization_id" : "organization id",
                                        // "name" : "name",
                                        "subscription_id" : subscription_ID,
                                        "addons": [{"addon_code" : item.addon_code}]
                                    },
                                    "method" : "POST",
                                    "url" : `https://subscriptions.zoho.com/api/v1/hostedpages/buyonetimeaddon?organization_id=organization_id`
                                }
                                ZOHO.CRM.CONNECTION.invoke(conn_name, submitAddon).then(function(response) {
                                    let url = response.details.statusMessage.hostedpage.url;
                                    let params = "width=630,height=1000"
                                    window.open(url, "AddOns", params);
                                })
                            }
                        }
                        //Organize add on elements in rows of 3.
                        let box = document.getElementById("addOns").childNodes;
                        let keys = Object.keys(box);
                        console.log(keys);
                        for(let x of keys) {  
                            x += 1;
                            if(x % 3 == 0) {
                                console.log("divisible by 3");
                                let num = parseInt(x.replace("1", ""));
                                let a = document.getElementById("addOns").childNodes[num];
                            }
                        }
                        let allAddOns = document.getElementById("addOns");
                        console.log(allAddOns);
                    });
                });
            }).catch((message) => {
                console.log(message);
                let errorMessage = document.querySelector("#box");
                errorMessage.innerHTML = "No addons can be displayed. Please check if their subscription is active."
            });
        });
    });
});



ZOHO.embeddedApp.init();
