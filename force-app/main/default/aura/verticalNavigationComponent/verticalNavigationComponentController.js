({
    doInit: function (cmp, event, helper) {
        var parentAction = cmp.get("c.getParent");
        var childAction = cmp.get("c.getChild");
        console.log('1');
        parentAction.setParams({
            "parent": cmp.get("v.parentObjStr")
        });
        console.log('2');
        parentAction.setCallback(this, function(response){
            cmp.set("v.parentObj", response.getReturnValue());
            console.log('3');
            //In order to guarantee parent is first, 
            //I've put child inside.
            //Doesn't seem right?
            childAction.setParams({
                "child": cmp.get("v.childObjStr"),
                "parents" : cmp.get("v.parentObj"),
                "relationship" : cmp.get("v.relationship"),
            });
    
            childAction.setCallback(this, function(response){
                cmp.set("v.items", response.getReturnValue());
                //console.log(response.getReturnValue());
            });
            console.log('5');
            $A.enqueueAction(childAction);

        });
        $A.enqueueAction(parentAction);
    },     

    handleSelect: function (cmp, event, helper) {
        if(cmp.get("{!v.onClickBehaviour}")=="Navigate to Record"){
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": "/" + event.getParam('name')
            });
            urlEvent.fire();
        }else if(cmp.get("{!v.onClickBehaviour}")=="Detail Popup"){

        }
    },
        showModal : function(component, event, helper) {
        
            document.getElementById("yourId").style.display = "block";
        
        },
        
        hideModal : function(component,event, helper){
        
           document.getElementById("yourId").style.display = "none" ;
       }
})