<h1>The following folders are the Zoho widgets I have created</h1>
<p>All of the code written was using Zoho CRM's / Creator Widget framework.</p>

<h3>Add Ons For Subscription Widget</h3>
<p>Navigate to the folder called "app", then you will see the "CSS" and "js" folders. The frontend is using "HTML".<p>
<h4>Brief Summary<h4>
<p>
This widget is used for gym clients who would like to purchase additional Add-On sessions.
Depending on the type of subscription the client had (e.g., Silver, Gold, Platinum), the add-ons corresponding to that plan will populate.
This widget is scalable because if there are new Add-Ons, it will automatically grab them without changing the code.
The opposite is true if an Add-On is deactivated.
</p>

<h3>Bicom Widget</h3>
<p>Navigate to the folder called "app", then you will see the "CSS" and "js" folders. The frontend is using "HTML".<p>
<h4>Brief Summary<h4>
<p>
This widget grabs the information that the technician has filled out in a custom module and creates the tenant with the extensions into Bicom.
Due to the API limit per second, this widget must send the extensions in intervals to avoid an interruption or an error.
This allows the technician to stay in Zoho CRM without needing to navigate to Bicom to enter the information. 
</p>

<h3>Check In Widget</h3>
<p>Navigate to the folder called "app", then you will see the "CSS" and "js" folders. The frontend is using "HTML".<p>
<h4>Brief Summary<h4>
<p>
A Zoho Creator widget for clients to check into the gym.
Stores information to track a client's activity.
</p>

<h3>New Subscription Widget</h3>
<p>Navigate to the folder called "app", then you will see the "CSS" and "js" folders. The frontend is using "HTML".<p>
<h4>Brief Summary<h4>
<p>
    This widget is used for clients to sign up for the gym.
    The subscription plans shown are controlled by the user in Zoho Subscriptions so no code adjustment is needed which also makes it scalable.
    Whichever plan the client chooses, a form will pop up to collect credit card information for a limited time and another form for the client to sign as part of the membership agreement.
</p>

<h3>VI Port API Widget</h3>
<p>Navigate to the folder called "app", then you will see the "CSS" and "js" folders. The frontend is using "HTML".<p>
<h4>Brief Summary<h4>
<p>
    This widget is a button that checks how many phones are online.
    This just makes an API call to a 3rd party and updates a Zoho CRM field.
</p>

<h3>Yealink Creation Server Site Widget</h3>
<p>Navigate to the folder called "app", then you will see the "CSS" and "js" folders. The frontend is using "HTML".<p>
<h4>Brief Summary<h4>
<p>
This widget uses the information entered from the custom module.
We call a uuid API three times since a uuid cannot be repeated for security measures. 
We encrypt the payload in base64 then in MD5 then in HmacSHA256. We do this three times to make three different API calls.
The first is to create the server.
The second is to create the site which is associated with the server.
For the third API call, we use an async function to wait till the previous API calls are done. 
We create a "promise" to gather all the Mac addresses in the custom module and then put them into an array for them to be encrypted to make the final API call.
</p>
