# apigee-saml

### Summary
This is a sample proxy that can be used to test SAML assertions in Apigee.


### Create a key store
Following the [documentation](http://docs.apigee.com/api-services/content/keystores-and-truststores) here to create and upload a key store to Apigee Edge.

The saml.jar file that contains the public and private key to generate the SAML is located in the certs folder.  


### Curl Command to Generate SAML

Get a SAML assertion

```
curl -X GET \
  https://org-env.apigee.net/saml/generate-saml2 \
  -H 'cache-control: no-cache'
  
```

#### generatesaml2 Flow - GET /generate-saml2
This resource generates the SAML assertion. However, you must create a keystore in Apigee first.

### Validate a request with a WS-Security Header
I used SoapUI to generate the correct SAML on the request.
1) install SoapUI
2) Follow the steps listed in the documentation link below to create a request with a valid WS-Security header.


#### SoapUI 
The easiest way to generate a correct request to validate the SAML assertion is to use [SoapUI](https://www.soapui.org/downloads/soapui.html).  

This [documentation](https://www.soapui.org/soapui-projects/ws-security.html) describes how to add the WS-Security header to the SOAP request.
