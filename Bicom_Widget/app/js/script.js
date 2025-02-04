//Each server holds a limited amount of phone systems. Each connection name is created for each new server created
var conn_name = [{API:"API_1"}, {API:"API_2"}, {API:"API_3"}, {API:"API_4"}, {API:"API_5"},{API:"API_6"}];
var connInUse;
//
ZOHO.embeddedApp.on("PageLoad",function(data){
    let entityID = data.EntityId;
    let entity = data.Entity;
    var timerElement = document.querySelector("#timer");
    var elem = document.querySelector("#myBar");
    var progressElement = document.querySelector("#myProgress");
    var extensionDataElement = document.querySelector("#extensionData");
    var containerOneElement = document.querySelector("#containerOne");

    var zohoCRMName = "zohocrm";
    var req_data = {
        "method" : "GET",
        "url" : "https://www.zohoapis.com/crm/v3/Bicom_Systems/" + entityID
    }
    ZOHO.CRM.CONNECTION.invoke(zohoCRMName, req_data).then(function(bicomData) {
        //Grabbing all fields needed for API call
        var tenantReqData = {};
        var tenantObject = {};
        var extensionObject = {};
        var extensionReqData = {};
        var updateZOHOCRMExtensionSubform =  [];
        var bicomModuleData = bicomData.details.statusMessage.data[0];
        var bicomServerName = bicomModuleData.Server;
        var bicomIPAddress = bicomModuleData.IP_Address;
        var statusOfBicomCreation = bicomModuleData.Created_in_Bicom;

        if(statusOfBicomCreation == "No"){
        //Tenant API Names
        var tenantName = bicomModuleData.Tenant_Name;
        var tenantCode = bicomModuleData.Tenant_Code;
        var ambulance = bicomModuleData.Ambulance;
        var fire = bicomModuleData.Fire;
        var police = bicomModuleData.Police;
        var tenantAreaCode = bicomModuleData.Tenant_Area_Code;
        var tenantgloCOMUseDNSSRVLookup = bicomModuleData.gloCOM_Use_DNS_SRV_Lookup;
        var tenantGlocomSipProxyAddress = bicomModuleData.gloCOM_SIP_Proxy_address_port;
        var tenantDefaultServer = bicomModuleData.Default_Server;
        var tenantAnnounceTrunks = bicomModuleData.Announce_Trunks;
        var tenantAbsoluteTimeout = bicomModuleData.Absolute_Timeout_sec;
        var tenantVoicemailInCdrs = bicomModuleData.Voicemail_in_CDRs;
        var tenantFaxPageFormat = bicomModuleData.FAX_page_format;
        var tenantFaxFileType = bicomModuleData.FAX_file_type;
        var tenantDisableCallerIDRewriteForTenantToTenantCall = bicomModuleData.Disable_CallerID_rewrite_for_tenant_to_tenant_call;
        var tenantUseDefaultCallerIDForTenantToTenantCalls = bicomModuleData.Use_Default_CallerID_for_tenant_to_tenant_calls;
        var tenantUseDidsAsCallerIDForTenantToTenantCalls = bicomModuleData.Use_DIDs_as_CallerID_for_tenant_to_tenant_calls;
        var tenantFindENumbersInDids = bicomModuleData.Find_E_164_numbers_in_DIDs;
        var tenantShowDirectoryInOsc = bicomModuleData.Show_Directory_in_OSC;
        var tenantRecordCallsByDefault = bicomModuleData.Record_calls_by_default;
        var tenantSilentRecordingByDefault = bicomModuleData.Silent_recording_by_default;
        var tenantPlayPeriodicBeep = bicomModuleData.Tenant_Play_Periodic_Beep_sec;
        var tenantRecordingsFormat = bicomModuleData.Recordings_format;
        var tenantAudioLanguage = bicomModuleData.Audio_Language;
        var tenantEnhancedCallParkingTimeout = bicomModuleData.Enhanced_Call_Parking_Timeout_sec;
        var tenantEnhancedCallParkingTimoutExtension = bicomModuleData.Enhanced_Call_parking_Timeout_Extension;
        var tenantPlaySound = bicomModuleData.Play_Sound;
        var tenantPSTNNumberingMode = bicomModuleData.PSTN_Numbering_mode;
        var tenantCallGroupsPickupGroups = bicomModuleData.Call_groups_Pickup_Groups;
        var tenantRingtoneForLocalCalls = bicomModuleData.Tenant_Ringtone_for_Local_calls;
        var tenantHideCallerIDInOSC = bicomModuleData.Hide_CallerID_in_OSC;
        var tenantAllowEsCallerIDForCallForwarding = bicomModuleData.Allow_ES_CallerID_for_Call_Forwarding;
        var tenantEnableCallerIDCnamLookup = bicomModuleData.Enable_CallerID_CNAM_lookup;
        var tenantSetCallerIDForCallForwardingGroupHuntCall = bicomModuleData.Set_CallerID_for_Call_Forwarding_Group_Hunt_call;
        var tenantOnlyAllowTrunkCallerIDWthnDidRange = bicomModuleData.Tenant_Only_Allow_Trunk_CallerID_within_DID_range;
        var tenantDropAnonymousCalls = bicomModuleData.Tenant_Drop_Anonymous_calls;
        var tenantDoNotAllowUsersSendingAnyCallerID = bicomModuleData.Do_not_allow_users_sending_any_CallerID;
        var tenantHideExtWthNotDepartment = bicomModuleData.Hide_Ext_with_not_department_gloCOM;
        var tenantGlocomPresenceOfflineDelay = bicomModuleData.gloCOM_presence_offline_delay_min;
        var tenantUseDynamicFeatures = bicomModuleData.Use_Dynamic_Features;
        var tenantDisableCallRatingForCallForwarding = bicomModuleData.Tenant_Disable_Call_Rating_for_Call_Forwarding;
        var tenantJitterBuffer = bicomModuleData.Tenant_Jitter_Buffer;
        var tenantMaxLength = bicomModuleData.Tenant_Max_Length_ms;
        var tenantResyncThreshold = bicomModuleData.Tenant_Re_sync_threshold;
        var tenantTargetExtra = bicomModuleData.Tenant_Target_extra;
        var tenantAllowIpAddressAuthenticationForExt = bicomModuleData.Allow_IP_Address_Authentication_for_Ext;
        var tenantSkipVoicemailPinPrompt = bicomModuleData.Skip_Voicemail_PIN_Prompt;
        var tenantFromEmail = bicomModuleData.From_E_mail;
        var tenantVoicemailFromEmail = bicomModuleData.Voicemail_From_E_mail;
        var tenantDahdi = bicomModuleData.DAHDI;
        var tenantNotificationEmail = bicomModuleData.Notification_E_mail;
        var bicomPackage = bicomModuleData.Package;
        var tenantLocalChannel = bicomModuleData.Local_Channels;
        var tenantRemoteChannels = bicomModuleData.Remote_Channels;
        var tenantConferences = bicomModuleData.Conferences;
        var tenantQueues = bicomModuleData.Queues;
        var tenantAutoAttendants = bicomModuleData.Auto_Attendants;
        var tenantLDAPEnabled = bicomModuleData.LDAP_Enable;
        var tenantLDAPPassword = bicomModuleData.LDAP_Password;
        var tenantEXTLength = bicomModuleData.Extensions_digit_length;
        var tenantLoginAttemptsCheck = bicomModuleData.Login_Attempts_Check;
        var automaticLogOut = bicomModuleData.Automatic_Log_Out;
        var tenantEnableTenantToTenantCalls = bicomModuleData.Enable_Tenant_to_Tenant_Calls;
        //Putting fields into an Object for Tenant
        tenantObject["enabletcalls"] = tenantEnableTenantToTenantCalls;
        tenantObject["hdautologout"] = automaticLogOut;
        tenantObject["hdcheck"] = tenantLoginAttemptsCheck;
        tenantObject["ldap_enabled"] = tenantLDAPEnabled;
        tenantObject["ext_length"] = Number(tenantEXTLength);
        tenantObject["auto_attendants"] = tenantAutoAttendants;
        tenantObject["networkcodecs"] = ":gsm";
        tenantObject["remotecodecs"] = ":ulaw:alaw:g722:h264:g729:gsm";
        tenantObject["localcodecs"] = ":ulaw:alaw:g722:h264";
        tenantObject["recordlimit"] = 20;
        tenantObject["country"] = 869;
        tenantObject["national"] = 1;
        tenantObject["international"] = 11;
        tenantObject["apusername"] = "apusername";
        tenantObject["appassword"] = "appassword";
        tenantObject["queues"] = tenantQueues;
        tenantObject["conferences"] = tenantConferences;
        tenantObject["remote_channels"] = tenantRemoteChannels;
        tenantObject["local_channels"] = tenantLocalChannel;
        // tenantObject["bicomPackage"] = bicomPackage;
        tenantObject["dids_notify_email"] = tenantNotificationEmail;
        tenantObject["dahdi"] = tenantDahdi;
        tenantObject["vm_email_from"] = tenantVoicemailFromEmail;
        tenantObject["email_from"] = tenantFromEmail;
        tenantObject["voiceskippin"] = tenantSkipVoicemailPinPrompt;
        tenantObject["allowextipauth"] = tenantAllowIpAddressAuthenticationForExt;
        tenantObject["jbtargetextra"] = tenantTargetExtra;
        tenantObject["jbresyncthreshold"] = tenantResyncThreshold;
        tenantObject["jbmaxsize"] = tenantMaxLength;
        tenantObject["jbimpl"] = tenantJitterBuffer;
        tenantObject["cf_call_rating_disable"] = tenantDisableCallRatingForCallForwarding;
        tenantObject["usedynfeatures"] = tenantUseDynamicFeatures;
        tenantObject["custompresencetime"] = tenantGlocomPresenceOfflineDelay;
        tenantObject["hideextnodir"] = tenantHideExtWthNotDepartment;
        tenantObject["forceunknown"] = tenantDoNotAllowUsersSendingAnyCallerID;
        tenantObject["dropanonymous"] = tenantDropAnonymousCalls;
        tenantObject["cidmatchdid"] = tenantOnlyAllowTrunkCallerIDWthnDidRange;
        tenantObject["setcidforgrouphunt"] = tenantSetCallerIDForCallForwardingGroupHuntCall;
        tenantObject["enablecnamlookup"] = tenantEnableCallerIDCnamLookup;
        tenantObject["allowescallerid"] = tenantAllowEsCallerIDForCallForwarding;
        tenantObject["hidecallerid"] = tenantHideCallerIDInOSC;
        tenantObject["ringtonelocal"] = tenantRingtoneForLocalCalls;
        // tenantObject["tenantCallGroupsPickupGroups"] = tenantCallGroupsPickupGroups;
        tenantObject["pstn_mode"] = tenantPSTNNumberingMode;
        tenantObject["limitsound"] = tenantPlaySound;
        tenantObject["cpark_goto"] = tenantEnhancedCallParkingTimoutExtension;
        tenantObject["cpark_timeout"] = tenantEnhancedCallParkingTimeout;
        // tenantObject["tenantAudioLanguage"] = tenantAudioLanguage;
        tenantObject["recordformat"] = tenantRecordingsFormat;
        tenantObject["recordbeep"] = tenantPlayPeriodicBeep;
        tenantObject["recordsilent"] = tenantSilentRecordingByDefault;
        tenantObject["recordglobal"] = tenantRecordCallsByDefault;
        tenantObject["showdirosc"] = tenantShowDirectoryInOsc;
        tenantObject["finde164"] = tenantFindENumbersInDids;
        tenantObject["usedidcid"] = tenantUseDidsAsCallerIDForTenantToTenantCalls;
        tenantObject["usedefaultcid"] = tenantUseDefaultCallerIDForTenantToTenantCalls;
        tenantObject["disabletcid"] = tenantDisableCallerIDRewriteForTenantToTenantCall;
        // tenantObject["tenantFaxFileType"] = tenantFaxFileType;
        // tenantObject["tenantFaxPageFormat"] = tenantFaxPageFormat;
        // tenantObject["cdrvoicemail"] = tenantVoicemailInCdrs;
        tenantObject["absolutetimeout"] = tenantAbsoluteTimeout;
        tenantObject["announcetrunks"] = tenantAnnounceTrunks;
        tenantObject["defaultserver"] = tenantDefaultServer;
        // tenantObject["tenantGlocomSipProxyAddress"] = tenantGlocomSipProxyAddress;
        tenantObject["glocom_dns_srv_lookup"] = tenantgloCOMUseDNSSRVLookup;
        tenantObject["area_code"] = tenantAreaCode;
        tenantObject["es_police"] = police;
        tenantObject["es_fire"] = fire;
        tenantObject["es_ambulance"] = ambulance;
        tenantObject["tenant_code"] = tenantCode;
        tenantObject["tenant_name"] = tenantName;
        tenantObject["default_location"] = 2;

        //formatting certain fields
        for(let key in tenantObject){
            if(tenantObject[key] != null || tenantObject[key] != undefined){
                if(tenantObject[key] == "No"){
                    tenantReqData[key] = 0;
                }else if(tenantObject[key] == "Yes"){
                    if(key == "ldap_enabled"){
                        tenantReqData["ldap_password"] = tenantLDAPPassword;
                    }
                    tenantReqData[key] = 1;
                }else if(tenantObject[key] == "Both PDF and TIFF"){
                    tenantReqData[key] = 1;
                }else if(tenantObject[key] == "Only PDF"){
                    tenantReqData[key] = 2;
                }else if(tenantObject[key] == "Only TIFF"){
                    tenantReqData[key] = 3;
                }else if(tenantObject[key] == "G729 native -> GSM"){
                    tenantReqData["recordformat"] = "g729";
                }else{
                    tenantReqData[key] = tenantObject[key];
                }
                
            }
        }

        //Extension API Names        
        let email = bicomModuleData.Email;
        let location = bicomModuleData.Default_Extension_Location;
        let status = bicomModuleData.Status;
        let pin = bicomModuleData.PIN;
        let incomingLimit = 3;
        let outgoingLimit = 3;
        let voicemail = bicomModuleData.Voicemail;
        let nat = bicomModuleData.NAT;
        let ssipReinviteSupport = bicomModuleData.SIP_Re_INVITE_Support;
        let ringtoneForLocalCalls = bicomModuleData.Ringtone_for_Local_calls;
        let dhcp = bicomModuleData.DHCP;
        let setCallerId = bicomModuleData.Set_Caller_ID;
        let recordCalls = bicomModuleData.Record_Calls;
        let silentRecording = bicomModuleData.Silent_Recording;
        let sendEmail = bicomModuleData.Send_E_mail;
        let attach = bicomModuleData.Attach;
        let deleteAfterEmailing = bicomModuleData.Delete_After_E_mailing;
        let sendEmailWithAccountDetails = bicomModuleData.Send_E_mail_with_account_details;
        let enableLimits = bicomModuleData.Enable_limits;
        let slave = bicomModuleData.Slave;
        let skipInstructions = bicomModuleData.Skip_Instructions;
        let sayCallerId = bicomModuleData.Say_CallerID;
        let showInDesktopMobileApp = bicomModuleData.Show_In_Desktop_Mobile_App;
        let extAreaCode = bicomModuleData.Area_Code;
        let extQualify = bicomModuleData.Qualify_ms;
        let extRingtime = bicomModuleData.Ringtime_sec;
        let extIncomingDialOptions = bicomModuleData.Incoming_Dial_Options;
        let extOutgoingDialOptions = bicomModuleData.Outgoing_Dial_Options;
        let extLimitType = bicomModuleData.Limit_Type;
        let extSoftLimit = bicomModuleData.Soft_Limit;
        let extHardLimit = bicomModuleData.Hard_Limit;
        let extPinBasedDevicePin = bicomModuleData.PIN_Based_Device_PIN;
        let extDisableCallRatingForCallForwarding = bicomModuleData.Disable_Call_Rating_for_Call_Forwarding;
        let extApplyBusyLevelForIncomingCalls = bicomModuleData.Apply_Busy_Level_for_Incoming_Calls;
        let extJitterBuffer = bicomModuleData.Jitter_Buffer;
        let extMaxLengthMS = bicomModuleData.Max_length_ms;
        let extResyncThreshold = bicomModuleData.Re_sync_threshold;
        let extTargetExtra = bicomModuleData.Target_extra;
        let extShowInDirectory = bicomModuleData.Show_In_Directory;
        let extWebrtcEnabled = bicomModuleData.WebRTC_Enabled;
        let extDefaultIP = bicomModuleData.Default_IP;
        let extDirectRtpSetup = bicomModuleData.Direct_RTP_setup;
        let extCallerIDPresentation = bicomModuleData.CallerID_Presentation;
        let extHideCallerIDForAnonymousCalls = bicomModuleData.Hide_CallerID_for_Anonymous_calls;
        let extDropAnonymousCalls = bicomModuleData.Drop_Anonymous_Calls;
        let extTrustRemotePartyID = bicomModuleData.Trust_Remote_Party_ID;
        let extSendRemotePartyID = bicomModuleData.Send_Remote_Party_ID;
        let extSendCallerIDInRpidForAnonymousCalls = bicomModuleData.Send_Caller_ID_in_RPID_for_Anonymous_calls;
        let extConnectedLineUpdates = bicomModuleData.Connected_Line_Updates;
        let extRpidWithSipUpdate = bicomModuleData.RPID_with_SIP_UPDATE;
        let extBusyLevel = bicomModuleData.Busy_Level;
        let extPlaySoundOnExceededLimit = bicomModuleData.Play_sound_on_exceeded_limit;
        let extSendEmailOnExceededLimit = bicomModuleData.Send_e_mail_on_exceeded_limit;
        let extGreetingMode = bicomModuleData.Greeting_Mode;
        let extPagerEmail = bicomModuleData.Pager_e_mail;
        let extAllowReviewMode = bicomModuleData.Allow_Review_Mode;
        let extAllowOperator = bicomModuleData.Allow_Operator;
        let extPlayEnvelopeMessage = bicomModuleData.Play_Envelope_message;
        let extHideFromDirectory = bicomModuleData.Hide_from_directory;
        let extVideoSupport = bicomModuleData.Video_Support;
        let extAutoFraming = bicomModuleData.Auto_Framing_RTP_Packetization;
        let extVoicemailDelay = bicomModuleData.Voicemail_Delay_sec;
        let extRingsToAnswer = bicomModuleData.Rings_to_answer;
        let extAutoProvisioning = bicomModuleData.Auto_provisioning;
        let extCallRating = bicomModuleData.Call_Rating;
        var zohoSubformArray = bicomModuleData.Extension_Numbers;
        //Putting fields into an Object for Extensions
        extensionObject["autoprovisiong"] = extAutoProvisioning;
        extensionObject["voicemail_timezone"] = "USA";
        // extensionObject["email"] = email;
        extensionObject["location"] = 2;
        extensionObject["status"] = status;
        extensionObject["pin"] = pin;
        extensionObject["incominglimit"] = incomingLimit;
        extensionObject["outgoinglimit"] = outgoingLimit;
        extensionObject["voicemail"] = voicemail;
        extensionObject["nat"] = nat;
        extensionObject["canreinvite"] = ssipReinviteSupport;
        extensionObject["ringtoneforlocalcalls"] = ringtoneForLocalCalls;
        extensionObject["dhcp"] = dhcp;
        extensionObject["setcallerid"] = setCallerId;
        extensionObject["recordcalls"] = recordCalls;
        extensionObject["recordsilent"] = silentRecording;
        extensionObject["vmailsend"] = sendEmail;
        extensionObject["vmailattach"] = attach;
        extensionObject["vmaildelete"] = deleteAfterEmailing;
        extensionObject["send_email"] = sendEmailWithAccountDetails;
        extensionObject["limitenable"] = enableLimits;
        extensionObject["acc_slave"] = slave; 
        extensionObject["vmailskipinst"] = skipInstructions;
        extensionObject["vmailsaycid"] = sayCallerId;
        extensionObject["show_in_app"] = showInDesktopMobileApp;
        extensionObject["areacode"] = extAreaCode;
        extensionObject["qualify"] = extQualify;
        extensionObject["ringtime"] = extRingtime;
        extensionObject["incoming_dialoptions"] = extIncomingDialOptions;
        extensionObject["extOutgoingDialOptions"] = extOutgoingDialOptions;
        extensionObject["limittype"] = extLimitType;
        extensionObject["softlimit"] = extSoftLimit;
        extensionObject["hardlimit"] = extHardLimit;
        // extensionObject["extPinBasedDevicePin"] = extPinBasedDevicePin;
        extensionObject["cf_call_rating_disable"] = extDisableCallRatingForCallForwarding;
        extensionObject["busylevel_incoming"] = extApplyBusyLevelForIncomingCalls;
        extensionObject["jbimpl"] = extJitterBuffer;
        extensionObject["jbmaxsize"] = extMaxLengthMS;
        extensionObject["jbresyncthreshold"] = extResyncThreshold;
        extensionObject["jbtargetextra"] = extTargetExtra;
        extensionObject["show_in_dir"] = extShowInDirectory;
        extensionObject["webrtc"] = extWebrtcEnabled;
        extensionObject["defaultip"] = extDefaultIP;
        extensionObject["directrtpsetup"] = extDirectRtpSetup;
        extensionObject["callingpres"] = extCallerIDPresentation;
        extensionObject["cid_anon"] = extHideCallerIDForAnonymousCalls;
        extensionObject["dropanonymous"] = extDropAnonymousCalls;
        extensionObject["trustrpid"] = extTrustRemotePartyID;
        extensionObject["sendrpid"] = extSendRemotePartyID;
        extensionObject["trust_id_outbound"] = extSendCallerIDInRpidForAnonymousCalls;
        extensionObject["rpid_connectedline"] = extConnectedLineUpdates;
        extensionObject["rpid_update"] = extRpidWithSipUpdate;
        extensionObject["busylevel"] = extBusyLevel;
        extensionObject["limit_notify_play_sound"] = extPlaySoundOnExceededLimit;
        extensionObject["limit_notify_send_email"] = extSendEmailOnExceededLimit;
        extensionObject["busyvoicemail"] = extGreetingMode;
        extensionObject["vmailpager"] = extPagerEmail;
        extensionObject["vmailreview"] = extAllowReviewMode;
        extensionObject["vmailoperator"] = extAllowOperator;
        extensionObject["vmailenvelope"] = extPlayEnvelopeMessage;
        extensionObject["vmailhidefromdir"] = extHideFromDirectory;
        extensionObject["videosupport"] = extVideoSupport;
        extensionObject["autoframing"] = extAutoFraming;
        extensionObject["vmaildelay"] = extVoicemailDelay;
        extensionObject["vmailnrings"] = extRingsToAnswer;
        extensionObject["acodecs"] = ":ulaw:alaw:g723.1:g726:g729:gsm:ilbc:speex:lpc10:h261:h263:h263p";
        extensionObject["call_rating"] = extCallRating;

        //Formatting certain fields
        for(let key in extensionObject){
            if(extensionObject[key] != null || extensionObject[key] != undefined){
                if(extensionObject[key] == "No"){
                    extensionReqData[key] = 0;
                }else if(extensionObject[key] == "Yes"){
                    extensionReqData[key] = 1;
                    if(key == "call_rating"){
                        if(extensionObject[key] == "Yes"){
                            extensionReqData["creditlimit"] = 1000;
                            extensionReqData["reminderbalance"] = 1000;
                        }
                    }
                }else if(key == "callingpres"){
                    if(extensionObject[key] == "Allowed, Not Screened"){
                        extensionReqData[key] = "allowed_not_screened";
                    }else if(extensionObject[key] == "Allowed, Passed Screen"){
                        extensionReqData[key] = "allowed_passed_screen";
                    }else if(extensionObject[key] == "Allowed, Failed Screen"){
                        extensionReqData[key] = "allowed_failed_screen";
                    }else if(extensionObject[key] == "Allowed, Network Number"){
                        extensionReqData[key] = "allowed";
                    }else if(extensionObject[key] == "Prohibited, Not Screened"){
                        extensionReqData[key] = "prohib_not_screened";
                    }else if(extensionObject[key] == "Prohibited, Passed Screen"){
                        extensionReqData[key] = "prohib_passed_screened";
                    }else if(extensionObject[key] == "Prohibited, Failed Screen"){
                        extensionReqData[key] = "prohib_failed_screen";
                    }else if(extensionObject[key] == "Prohibited, Network Number"){
                        extensionReqData[key] = "prohib";
                    }else if(extensionObject[key] == "Number Unavailable"){
                        extensionReqData[key] = "unavailable";
                    }
                } else if(key == "status"){
                    if(extensionObject[key] == "Active"){
                        extensionReqData[key] = 1;
                    }else {
                        extensionReqData[key] = 0;
                    }
                } else if(key == "jbimpl"){
                    extensionReqData[key] = extensionObject[key].toLowerCase();
                } else if(key == "sendrpid"){
                    if(extensionObject[key] == "Use Remote-Party-ID"){
                        extensionReqData[key] = "rpid";
                    }else {
                        extensionReqData[key] = "pai";
                    }
                }else {
                    extensionReqData[key] = extensionObject[key];
                }
            }
        }
        
        var conn_nameLength = conn_name.length;
        //Not all phone systems go the same server so this is where they are separated
        for(i=0;i<conn_nameLength;i++){
            let apiName = bicomServerName.slice(2)
            let serverObjectInUse = conn_name[apiName - 1]
            connInUse = serverObjectInUse;
        }

        var tenantPackageAPIData = {
            "method" : "POST",
            "url" : "http://" + bicomIPAddress + "/index.php?action=pbxware.package.list"
        }

        ZOHO.CRM.CONNECTION.invoke(connInUse.API, tenantPackageAPIData).then(function(tenantPackageAPIResponse){
            //A tenant must be added first before adding the extensions
            let tenantBicomPackage = tenantPackageAPIResponse.details.statusMessage;
            for(key in tenantBicomPackage){
                if(tenantBicomPackage[key] == bicomPackage){
                    tenantReqData["package"] = Number(key);

            let tenantAPIData = {
                        "parameters" : tenantReqData,
                        "method" : "POST",
                        "url" : "http://" + bicomIPAddress + "/index.php?action=pbxware.tenant.add",
                        "param_type" : 1
            };


        ZOHO.CRM.CONNECTION.invoke(connInUse.API, tenantAPIData).then(function(tenantAPIResponse) {
            let tenantIDResponse = tenantAPIResponse.details.statusMessage
            startAddingExtensions(tenantIDResponse.id);
            async function startAddingExtensions(tenantIDResponse){
            let uadAPIData = {
                "method" : "POST",
                "url" : "http://" + bicomIPAddress + "/index.php?action=pbxware.uad.list",
                "param_type" : 1
            }
                //This is a timer to display how long till all extensions are added.
                //Because there is an API limit the function needs to spread out in intervals 
                var extensionAdded = 1;
                var time = zohoSubformArray.length * 5;
                var x = setInterval(function(){
                    function secondsToHms(d) {
                        d = Number(d);
                        var h = Math.floor(d / 3600);
                        var m = Math.floor(d % 3600 / 60);
                        var s = Math.floor(d % 3600 % 60);
                    
                        var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours, ") : "";
                        var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes, ") : "";
                        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                        return hDisplay + mDisplay + sDisplay;
                    }
                    var result = secondsToHms(time);
                    timerElement.innerHTML = result;
                    time-=1;
                    
                    if(time == 0){
                        clearInterval(x);
                        elem.style.scale = 0;
                        progressElement.style.scale = 0;
                        timerElement.style.scale = 0;
                        extensionDataElement.style.scale = 0;
                        containerOneElement.style.scale = 0;
                        var config={
                            Entity:"Bicom_Systems",
                            APIData:{
                                  "id": entityID[0],
                                  "Tenant_ID":tenantIDResponse,
                                  "Created_in_Bicom" : "Yes",
                                  "Extension_Numbers" : updateZOHOCRMExtensionSubform
                            },
                            Trigger:["workflow"]
                          }
                        ZOHO.CRM.API.updateRecord(config).then(function(res){
                                ZOHO.CRM.UI.Popup.closeReload(true).then(function(ft) {
                                });
                        });
                    }
                },1000);
                function addingExtensions(){
                    var progressRate = 0;
                    zohoSubformArray.length * 5;
                    for(i=0;i<zohoSubformArray.length;i++){
                        (function(i) {
                            setTimeout(function() {
                                //Formatting the extension numbers in the subforms based on certain criteria
                                let extensionNumber = zohoSubformArray[i].Extension_Number;
                                let extensionName = zohoSubformArray[i].Name1;
                                let extensionProtocol = zohoSubformArray[i].Protocol;
                                let extensionUAD = zohoSubformArray[i].UAD;
                                let extensionServicePlan = zohoSubformArray[i].Service_Plan;
                                let extensionSecret = zohoSubformArray[i].Secret;
                                let extensionEmail = zohoSubformArray[i].Email_Adress;
                                
                                let extensionMACAddress = zohoSubformArray[i].Mac_Address;
                                for(let key in extensionReqData) {
                                    if(key == "autoprovisiong"){
                                        if(extensionReqData[key] == 1){
                                            extensionReqData["macaddress"] = extensionMACAddress;
                                        }
                                    }
                                }
                                if(extensionServicePlan == "All Inclusive"){
                                    extensionReqData["service_plan"] = 1;
                                }else {
                                    extensionReqData["service_plan"] = 0;
                                }
                                extensionReqData["server"] = tenantIDResponse;
                                extensionReqData["title"] = extensionName;
                                extensionReqData["ext"] = extensionNumber;
                                extensionReqData["name"] = extensionName;
                                extensionReqData["prot"] = extensionProtocol.toLowerCase();
                                extensionReqData["secret"] = extensionSecret;
                                extensionReqData["email"] = extensionEmail.replace(/\s/g, '');
                                ZOHO.CRM.CONNECTION.invoke(connInUse.API,uadAPIData).then(function(uadAPIResponse) {
                                    let arrayUAD = JSON.parse(uadAPIResponse.details.statusMessage);
                                        for(let key in arrayUAD){
                                            if(arrayUAD[key].name.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() == extensionUAD.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()){
                                                extensionReqData["ua"] = arrayUAD[key].id;
                                            }
                                        }   
                                        console.log(extensionReqData);
                                        let extensionAPIDATA = {
                                            "parameters": extensionReqData,
                                            "method" : "POST",
                                            "url" : "http://" + bicomIPAddress + "/index.php?action=pbxware.ext.add",
                                            "param_type" : 1
                                        }
                                        ZOHO.CRM.CONNECTION.invoke(connInUse.API, extensionAPIDATA).then(function(extensionAddedCompletion) {
                                            console.log(extensionAddedCompletion.details);
                                            let extID = extensionAddedCompletion.details.statusMessage.id;
                                        zohoSubformArray[i]["Extension_ID"] = extID;
                                        updateZOHOCRMExtensionSubform.push(zohoSubformArray[i]);
                                                if(extensionAdded == zohoSubformArray.length){
                                                    extensionDataElement.innerHTML = "Please wait while we update the CRM.";
                                                    return "Breaking out of function"
                                                }
                                                var width = i;
                                                if(zohoSubformArray.length == 100){
                                                    elem.style.width = width + "%";
                                                } else {
                                                    let formatProgressRate = 100 / zohoSubformArray.length;
                                                    progressRate+=formatProgressRate;
                                                    elem.style.width = progressRate + "%";
                                                    extensionDataElement.innerHTML = extensionAdded + " out of " +zohoSubformArray.length + " Extensions have been Added.";
                                                }
                                                extensionAdded+=1;
                                        });
                                });

                            }, 5000 * i);
                        })(i);
                        

                    };
                };
                addingExtensions();
            };
        });
                };
            };
        });
    } else {
        console.log("already in bicom");
        extensionDataElement.innerHTML = "Already in Bicom";
        progressElement.style.scale = 0;
    };
    });

});


ZOHO.embeddedApp.init()