import groovy.json.JsonSlurperClassic
node {
    def JWT_KEY_CRED_ID = env.JWT_KEY_CRED_ID_DH
    def toolbelt = tool 'toolbelt'
    def HUB_ORG=env.HUB_ORG_DH
    def CONNECTED_APP_CONSUMER_KEY=env.CONNECTED_APP_CONSUMER_KEY_DH
    def SFDC_HOST = env.SFDC_HOST_DH

   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository
      printf "befote git command"
     checkout scm
   }
    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
    stage('Create Scratch Org') {
        println "In create scratch org"
        //rc = sh returnStatus: true, script: "${toolbelt}/heroku force:org:authorize -i ${CONNECTED_APP_CONSUMER_KEY} -u ${HUB_ORG} -f ${jwt_key_file} -y debug"

        //rc = sh returnStatus: true, script: "${toolbelt}/heroku force:org:authorize -i ${CONNECTED_APP_CONSUMER_KEY} -u ${HUB_ORG} -f ${jwt_key_file} -y debug"		
        rc = sh returnStatus: true, script: "${toolbelt}/sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file} --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
        if (rc != 0) { error 'hub org authorization failed' }

        // need to pull out assigned username
       rmsg = sh returnStdout: true, script: "${toolbelt}/sfdx force:org:create --definitionfile config/project-scratch-def.json --json --setdefaultusername"
       println rmsg
        
        def jsonSlurper = new JsonSlurperClassic() 
       def robj = jsonSlurper.parseText(rmsg)
        println robj
       if (robj.status != 0) { error 'org creation failed: ' + robj.message }
       if (robj.status == 0) { print 'org creation success: ' + robj.result.username }
       SFDC_USERNAME=robj.result.username
       robj = null
       
    }
        
     stage('Push To Test Org') {
    
        rc = sh returnStatus: true, script: "${toolbelt}/sfdx force:source:push --targetusername ${SFDC_USERNAME}"
       if (rc != 0) {
     	error 'push all failed'
       }else{
           println "***Push success****"
       }
       
    }
        
    
    }
}
