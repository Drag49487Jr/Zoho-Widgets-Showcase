var id;
var conn_name = "Connection Name";

ZOHO.embeddedApp.on("PageLoad", function(data) {
    ZOHO.CRM.UI.Resize({height:"1000",width:"800"}).then(function(data){});
    id = data.EntityId;

    ZOHO.CRM.API.getAllRecords({Entity: "Contacts", RecordID:id}).then(function(response) {
        let accountID = JSON.stringify(response.data[0].Account_Name.id).replace(/["]/g, '');
        let firstName = response.data[0].First_Name;
        let lastName = response.data[0].Last_Name;
        let email = response.data[0].Email;
        let phone = response.data[0].Phone;
        let salesPerson = response.data[0].Owner.name;

        let subscriptionData = {
            "parameters" : {
                "reference_id_type" : "zcrm_account_id",
                "organization_id" : "organization id",
                "name" : "name"
            },
            "method" : "GET",
            "url" : `https://subscriptions.zoho.com/api/v1/customers/reference/${accountID}`
        }

        ZOHO.CRM.CONNECTION.invoke(conn_name, subscriptionData).then(function(response) {
            //Check if customer is in Zoho Subscriptions
            subscriptionCustomerID = response.details.statusMessage.customer.customer_id;
        })

        let planData = {
            "parameters" : {
                // "reference_id_type" : "zcrm_account_id",
                "filter_by" : "PlanStatus.ACTIVE",
                "organization_id" : "organization id",
                "name" : "name"
            },
            "method" : "GET",
            "url" : `https://subscriptions.zoho.com/api/v1/plans`
        }
        ZOHO.CRM.CONNECTION.invoke(conn_name, planData).then(function(response) {
            //Grabs all subscription plans available for clients to choose from
            let subscriptionsAvailable = response.details.statusMessage.plans;
            let subscriptionMap = subscriptionsAvailable.map(function(data) {
                return(
                    `
                    <tr class="row">
                        <td class="membershipType">${data.name}</td>
                        <td class="fee" hidden>Initiation Fee $${data.setup_fee}</td>
                        <td class="price" hidden>Price$${data.recurring_price}</td>
                        <td class="paymentInterval" hidden>Recurring Payment every ${data.interval} weeks</td>
                        <td class="planCode" hidden>${data.plan_code}</td>
                        <td class="buttonTd"><button class="button">Purchase</button></td>
                    </tr>
                    `
                );
            }).join('');
            let tableBody = document.querySelector(".tableBody");
            tableBody.innerHTML = subscriptionMap;

            let buttons = document.querySelectorAll(".button");
            let row = document.querySelectorAll(".row");
            buttons.forEach(function(currentbtn) {
                currentbtn.addEventListener('click', handleEvent, false);
                let btn = currentbtn.parentNode.parentNode;
                let code = btn.querySelector(".planCode").innerHTML;
                let price = btn.querySelector(".price").innerHTML.replace(/[A-z]/g, "");
                let fee = btn.querySelector(".fee").innerHTML.replace(/[A-z]/g, "");
                let membership = btn.querySelector(".membershipType").innerHTML;
                let totalDue = "$" + ((parseFloat(price.replace(/[A-z, $]/g, "")) + parseFloat(fee.replace(/[A-z, $]/g, ""))) * 1.04).toFixed(2);

                function handleEvent() {
                    let submitMembership = {
                        "parameters" : {
                            "customer_id" : subscriptionCustomerID,
                            "plan" : {
                                "plan_code" : code
                            },
                            "salesperson_name" : salesPerson
                        },
                        "method" : "POST",
                        "url" : `https://subscriptions.zoho.com/api/v1/hostedpages/newsubscription?organization_id=orgnization_id`
                    }
                    ZOHO.CRM.CONNECTION.invoke(conn_name, submitMembership).then(function(response) {
                        //Grab the membership form to gather credit card information that is available for a limited time
                        //Also creates a subscription plan in Zoho Subscriptions
                        let url = response.details.statusMessage.hostedpage.url;
                        let plan = {
                            "parameters" : {
                                "organization_id" : "organization id",
                                "name" : "name"
                            },
                            "method" : "GET",
                            "url" : `https://subscriptions.zoho.com/api/v1/plans/${code}`
                        }
                        ZOHO.CRM.CONNECTION.invoke(conn_name, plan).then(function(response) {
                            //Gets the membership agreement form for client to sign. 
                            let autoPay = response.details.statusMessage.plan.custom_field_hash.cf_number_of_autopay_s;
                            let params = "width=630,height=1000"; 
                            let formParams = "width=630,height=1000,left=640";
                            let formUrl = `https://form/${membership.replace(/[\s,()]/g,"")}?null=''&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}&contactID=${id}&membershipDues=${price}&setupFee=${fee}&totalPayments=${autoPay}&totalDue=${totalDue}&membershipType=${membership}`;
    
                            let hostedPageWindow = window.open(url, "New Membership", params);
                            let formWindow = window.open(formUrl, "MemberShip Contract", formParams);

                        });
                    });                 
                } 
            });
            //Display subscription plans for cleints to see
            row.forEach(function(row) {
                row.addEventListener("mouseover", hover, false);
                row.addEventListener("mouseout", hoverEnd, false);
                let color = row.querySelector(".membershipType").innerHTML.replace(/ .*/,'').toLowerCase();
                function hover() {
                    row.style.backgroundColor = `${color}`;
                    if (color === "platinum") {
                        row.style.backgroundColor = "white";
                    } else if (color === "virtual") {
                        row.style.backgroundColor = "aqua";
                    } else {
                        row.style.backgroundColor = `${color}`;
                    }
                }
                function hoverEnd() {
                    row.style.backgroundColor = "transparent";
                }
            });
        });
    });
});

ZOHO.embeddedApp.init();
