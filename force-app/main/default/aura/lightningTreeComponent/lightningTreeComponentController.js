({
    doInit: function (cmp, event, helper) {
        var itemsAction = cmp.get("c.getTree");
        itemsAction.setParams({
            "parent": cmp.get("v.parentObj"),
            "child": cmp.get("v.childObj"),
            "relationship" : cmp.get("v.relationship")
        });

        itemsAction.setCallback(this, function(response){
            cmp.set("v.items", response.getReturnValue());
            console.log('Hello');
            console.log(response.getReturnValue());
        });
        $A.enqueueAction(itemsAction);
    
        /*var items = [{
            "label": "Western Sales Director",
            "name": "1",
            "expanded": true,
            "items": [{
                "label": "Western Sales Manager",
                "name": "2",
                "expanded": true,
                "items" :[{
                    "label": "CA Sales Rep",
                    "name": "3",
                    "expanded": true,
                    "items" : []
                },{
                    "label": "OR Sales Rep",
                    "name": "4",
                    "expanded": true,
                    "items" : []
                }]
            }]
        }, {
            "label": "Eastern Sales Director",
            "name": "5",
            "expanded": false,
            "items": [{
                "label": "Easter Sales Manager",
                "name": "6",
                "expanded": true,
                "items" :[{
                    "label": "NY Sales Rep",
                    "name": "7",
                    "expanded": true,
                    "items" : []
                }, {
                    "label": "MA Sales Rep",
                    "name": "8",
                    "expanded": true,
                    "items" : []
                }]
            }]
        }];
        cmp.set('v.items', items);*/
    },     
})