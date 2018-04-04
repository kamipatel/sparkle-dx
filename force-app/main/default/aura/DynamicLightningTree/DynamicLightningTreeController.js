({
    /*doInit : function(cmp, event, helper) {
        helper.swapComponents(cmp);
    },*/

    handleToggle : function(cmp, event, helper) {
        helper.swapComponents(cmp);
        alert('Button Pressed');
    },

    /*createComponentController.js*/
    doInit : function(cmp) {
        //Call function to create component
        $A.createComponent(
            "c:lightningTreeComponent",
            {
                "parentObjStr":cmp.get("v.parentObjStr"),
                "childObjStr":cmp.get("v.childObjStr"),
                "relationship":cmp.get("v.relationship"),
                "aura:id": "treeComp"
            },
            function(treeComp, status, errorMessage){
                if (status === "SUCCESS") {
                    var body = cmp.get("v.body");
                    body.push(treeComp);
                    cmp.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
})