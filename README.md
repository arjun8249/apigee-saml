# apigee-saml

### Summary
This is a sample proxy that can be used to test SAML assertions in Apigee.


### Create a key store
Following the [documentation](http://docs.apigee.com/api-services/content/keystores-and-truststores) here to create and upload a key store to Apigee Edge.


### Curl Commands

Get a SAML assertion

```
curl -X GET \
  https://org-env.apigee.net/saml/generate-saml2 \
  -H 'cache-control: no-cache'
  
```

#### generatesaml2 - GET /generate-saml2
This resource generates the SAML assertion. However, if you at the policy you must create a keystore in Apigee first.

### Validate a request with SAML
I used SoapUI to generate the correct SAML on the request. 



