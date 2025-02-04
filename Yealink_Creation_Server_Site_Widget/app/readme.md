<h1>Please read the Yealink Documentation first</h1><br>

<p>Code Lines 3 & 4: We are just grabbing the Key and Secret from the Variables Section in the CRM</p><br>

<p>Code Line 5: We are going to invoke this URL to receive a UUID that will be used in the API urls. </p><br>

<p>Code Lines 32-153: These are based off the documentation from Yealink just formatted to Javascript from Java & Postman</p><br>
<p>Code Line 113 - 147: </p><br>
<p>This code block is grabbing all the mac addresss in the subform before adding them the yealink rpsDevice. This was done like this to not add each mac address one by one, instead just wait till we have all of them then send them all in one API call.</p>

<label>Code Lines 154 - 225 : This code block is currently in testing phase. I wasn't able to complete this last part however this may or may not be needed. Please test each API call and adjust code segment to tailer the business needs.</label>

