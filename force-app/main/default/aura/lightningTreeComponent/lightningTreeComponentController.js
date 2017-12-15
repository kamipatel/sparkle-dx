({
    doInit: function (cmp, event, helper) {
        var parentAction = cmp.get("c.getParent");
        var childAction = cmp.get("c.getChild");

        parentAction.setParams({
            "parent": "Account"
        });

        parentAction.setCallback(this, function(response){
            cmp.set("v.parentObj", response.getReturnValue());

            //In order to guarantee parent is first, 
            //I've put child inside.
            //Doesn't seem right?
            childAction.setParams({
                "child": cmp.get("v.childObjStr"),
                "parents" : cmp.get("v.parentObj"),
                "relationship" : cmp.get("v.relationship")
            });
    
            childAction.setCallback(this, function(response){
                cmp.set("v.items", response.getReturnValue());
                console.log(response.getReturnValue());
            });
            $A.enqueueAction(childAction);

        });
        $A.enqueueAction(parentAction);
    },     

    handleSelect: function (cmp, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/" + event.getParam('name')
        });
        urlEvent.fire();
    }
})