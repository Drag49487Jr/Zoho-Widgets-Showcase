<h1>The following folders are the Zoho widgets I have created</h1>
<p>All of the code written was using Zoho CRM's / Creator Widget framework.</p>

<h3>Add Ons For Subscription Widget</h3>
<p>Navigate to the folder called "app", then you will see the "css" and "js" folder. The frontend is using "html".<p>
<h6>Brief Summary<h6>
<p>
This widget is used for gym clients that would like to purchase additional Add-On sessions.
Depending on the type of Subscription the client had (ex., Silver, Gold, Platinum) will populate the Add-Ons that correspond to that plan.
This widget is scalable because if there are new Add-Ons, it will automatically grab them without changing the code.
The opposite is true if an Add-On is deactivated.
</p>

<h3>Bicom Widget</h3>
<p>Navigate to the folder called "app", then you will see the "css" and "js" folder. The frontend is using "html".<p>\
<h6>Brief Summary<h6>
<p>
This widget grabs the information that the technician has filled out in a custom module and create the tenant with the extensions into Bicom.
Due to the API limit per second, this widget must send the extensions in intervals to avoid an interuption or an error.
This allows the technician to stay in Zoho CRM without needing to navigate to Bicom to enter the information. 
</p>

<h3>Check In Widget</h3>
<p>Navigate to the folder called "app", then you will see the "css" and "js" folder. The frontend is using "html".<p>
<h6>Brief Summary<h6>
<p>
A Zoho Creator widget for clients to check into the gym.
Stores information to track a clients activity.
</p>

<h3>New Subscription Widget</h3>
<p>Navigate to the folder called "app", then you will see the "css" and "js" folder. The frontend is using "html".<p>
<h6>Brief Summary<h6>
<p>
    This widget is used for clients to sign up for the gym.
    The subscription plans shown is controlled by the user in Zoho Subscriptions so no code adjustment is needed which also makes if scalable.
    Whichever plan the client chooses, a form will popup to collect credit card information for a limited time and another form for the client to sign as part of the membership agreement.
</p>

<h3>VI Port API Widget</h3>
<p>Navigate to the folder called "app", then you will see the "css" and "js" folder. The frontend is using "html".<p>
<h6>Brief Summary<h6>
<p>
    This widget is a button that check how many phones are online.
    This just makes an API call to a 3rd party and update a Zoho CRM field.
</p>

<h3>Yealink Creation Server Site Widget</h3>
<p>Navigate to the folder called "app", then you will see the "css" and "js" folder. The frontend is using "html".<p>
<h6>Brief Summary<h6>
<p>
This widget uses the information entered from the custom module.
We call a uuid api three times since a uuid cannot be repeated for security measures. 
We encrpyt the payload in base64 then in MD5 then in HmacSHA256. We do this three times to make three different API calls.
The first is to create the server.
The second is to create the site which is associated to the server.
For the third api call, we use an async function to wait till the previous API calls are done. 
We create a "promise" to gather all the mac addresses in the custom module then put them into an array for them to be encrypted to make the final API call.
</p>