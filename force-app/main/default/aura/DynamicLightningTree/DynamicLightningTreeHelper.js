({
    swapComponents : function(cmp) {
        if(cmp.find("vertComp") != undefined){
            cmp.find("vertComp").destroy();
            $A.createComponent(
                "c:lightningTreeComponent",
                {
                    "parentObjStr":cmp.get("v.parentObjStr"),
                    "childObjStr":cmp.get("v.childObjStr"),
                    "relationship":cmp.get("v.relationship"),
                    "aura:id": "treeComp"
                },
                function(treeComp, status, errorMessage){
                    if (status === "SUCCESS" && cmp.get("v.compToggle") == false) {
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
        }
        else{//if(cmp.find("treeComp") != undefined){
            cmp.find("treeComp").destroy();
            $A.createComponent(
                "c:verticalNavigationComponent",
                {
                    "parentObjStr":cmp.get("v.parentObjStr"),
                    "childObjStr":cmp.get("v.childObjStr"),
                    "relationship":cmp.get("v.relationship"),
                    "aura:id": "vertComp"
                },
                function(vertComp, status, errorMessage){
                    if (status === "SUCCESS" && cmp.get("v.compToggle") == true) {
                        var body = cmp.get("v.body");
                        body.push(vertComp);
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
        }
    }
})
