# apigee-saml

## Summary
This is a sample proxy that can be used to generate and validate SAML assertions in Apigee Edge.

## Create a key store
You must create the key store in Apigee first.  
Follow the [documentation](http://docs.apigee.com/api-services/content/keystores-and-truststores) to create and upload a key store to Apigee Edge.

The saml.jar file that contains the public and private key to generate the SAML token.  This jar file is located in the certs folder.  

## Curl Commands

### Generate SAML Without a username and password

Get a SAML assertion.  Make sure to replace the `ORG` and `ENV` below with your org and environment.

```
curl -X GET \
  https://ORG-ENV.apigee.net/saml/generate-saml \
  -H 'cache-control: no-cache'
```

### Generate SAML With username and password
This resource generates the SAML assertion only after the username and password provided in the request is validated by Apigee BaaS.

#### Apigee BaaS
For this request to work you should complete the following.
* Login to your [Apigee BaaS](https://appservices.apigee.com/#!/org-overview) instance
  * all Apigee trial accounts have a free BaaS instance that includes a sandbox application
* Create a new user in your Apigee BaaS sandbox application and provide a username and password.

#### Generate the SAML
* You must create a keystore in Apigee first.
* Make sure to replace the `ORG` and `ENV` below with your Apigee org and environment.
* Make sure to replace the `USERNAME` and `PASSWORD` with the Apigee BaaS user that you created above.
* Update the following element in `ServiceCallout-ApigeeBaaS.xml` policy
  * Make sure to replace `BAASOrg` and `BAASApp` with your Apigee BaaS org and app name.
  * `<Path>/BAASOrg/BAASApp/token/</Path>`

```
curl -X POST \
  https://ORG-ENV.apigee.net/saml/generate-saml \
  -H 'content-type: application/json' \
  -d '{
	"username":"USERNAME",
	"password":"PASSWORD"
}'
```

## Validate a request with a WS-Security Header
I used SoapUI to generate the correct SAML on the request.
1) install SoapUI
2) Follow the steps listed in the documentation link below to create a request with a valid WS-Security header.


### SoapUI
The easiest way to generate a correct request to validate the SAML assertion is to use [SoapUI](https://www.soapui.org/downloads/soapui.html).  

This [documentation](https://www.soapui.org/soapui-projects/ws-security.html) describes how to add the WS-Security header to the SOAP request.

## Generate SAML Policy -> GenerateSAML-AssertFromUsernamePassword
The `GenerateSAML-AssertFromUsernamePassword` policy generates a SAML assertion with the `<Template>` element, which is shown below.

The template allows you define how the SAML Assertion as opposed to using the default assertion that Apigee creates.  

Note the following:
* You must use `<![CDATA[ .... template goes here ]]>`
* When you define the template, you can include flow variables to make it dynamic
  * notice that anything in the template with `{}` is a flow variable.
  * anything that is prefixed with `saml` was generated automatically by the SAML policy  

```
<Template ignoreUnresolvedVariables="false"><![CDATA[
<saml:Assertion xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:dsig="http://www.w3.org/2000/09/xmldsig#"
            xmlns:enc="http://www.w3.org/2001/04/xmlenc#" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
            xmlns:x500="urn:oasis:names:tc:SAML:2.0:profiles:attribute:X500"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            Destination="https://liveperson.net"
            ID="71nbhlppVee6mrzFP" IssueInstant="2017-06-06T19:50:58Z" Version="2.0">
    <saml:Subject>
        <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">{apigee.username}</saml:NameID>
        <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
            <saml:SubjectConfirmationData NotOnOrAfter="{saml.issueInstant}"
                                          Recipient="https://liveperson.net"/>
        </saml:SubjectConfirmation>
    </saml:Subject>
    <saml:Conditions NotBefore="{mysaml.now}" NotOnOrAfter="{mysaml.expiry}">
        <saml:AudienceRestriction>
            <saml:Audience>LivePerson</saml:Audience>
        </saml:AudienceRestriction>
    </saml:Conditions>
    <saml:AuthnStatement AuthnInstant="{mysaml.now}">
        <saml:AuthnContext>
            <saml:AuthnContextClassRef>{saml.authnContextClassRef}</saml:AuthnContextClassRef>
        </saml:AuthnContext>
    </saml:AuthnStatement>
    <saml:AttributeStatement>
        <saml:Attribute Name="siteId" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
            <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">1111111
            </saml:AttributeValue>
        </saml:Attribute>
        <saml:Attribute Name="loginName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
            <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">
                {apigee.email}
            </saml:AttributeValue>
        </saml:Attribute>
    </saml:AttributeStatement>
</saml:Assertion>
]]></Template>
```
