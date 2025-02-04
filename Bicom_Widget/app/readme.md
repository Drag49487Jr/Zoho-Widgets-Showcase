<h1>Bicom Docuemntation</h1>

<p>Line 1:</p><br>
<p>You will need to make sure you follow the naming convention of ${bicomapi_mt + (Server Number)}. Only Server Number 3 is different
due to the fact it was the server we started on.
</p><br>

<p>Line 32-168:</p><br>
<p>During this code block we are gathering all the fields that is in the Bicom Systems module and putting them into an object that will be used later on in the code</p><br>
<p>Line 170-192:</p><br>
<p>Now we are looping through the "tenantObject", and replacing values such as "Yes" to "1"(as a number). We doing this because the API documentation accepts certain type's of paramters. You will need to read the documentation for you tto understand this. Once it loops through the data will be saved in another object called "tenantReqData".</p><br>

<p>Lines 194-380:</p>
<p>This code block is just a repeat of code lines 8-11 from above but this time it's for extensions not for tenants.</p><br>

<p>Lines 382-386:</p><br>
<p>We are looping through the conection object using the conn_name that is in use to get the Zoho connection name to use to make API calls with</p><br>

<h4>Lines 393-543:</h4><br>
<label>394-397: </label>
<p>We are going through a for loop to find the right package to assign to the tenants.</p><br>


<label>399-404</label>
<p>We are formatting to use the Zoho CRM SDK to create an API call to create a tenant.</p><br>

<label>407-433</label>
<p>Once we create a tenant we get a response back and in that response we get the server ID which is renamed as tenant ID in our system so we know which ID it belongs to</p><br>
<p>There is an asynchronous function that was created that will wait till that ID has been received so the next function can't start without it</p><br>
<p>This next part is creating countdown which will vary depending on how many extensions are being added.  This will serve as an indicator of how long it will take to upload the extenions to the current tenant. This was done to avoid the API limit per minute.</p><br>
<label>458-533</label>
<p>We use a for loop ot iterate through all the extensions that are in the subform. We collect the information that is in each extension and format it using "for" loops and "if" statements. There is a 5 second delay after each extension that is added</p><br>

<h3>** Code Block 442-455 **</h3><br>
<p>This code bloack will only activate once the timer hits 0. Then it update the module and refresh the screen.</p><br>

<label>If at anytime you need to test this, make sure the tenant code is 801 or 802. Once you are done testing make sure to delete it.</label>


