({
    buildTree : function(cmp, relationship){
        var childrenByParents = new Map();
        var keyString = 'key';
        var keyObj={}

        var parentRecords = cmp.get("v.parentObj");
        var childRecords = cmp.get("v.childObj");

        var items = [];
        for (var i=0; i<parentRecords.length;++i){
            for (var j=0; j<childRecords.length;++j){
                if(childRecords[j][relationship] == parentRecords[i].Id){
                    if(childrenByParents.get(parentRecords[i]) == null){
                        childrenByParents.set(parentRecords[i],[]);    
                    }
                    var childList = childrenByParents.get(parentRecords[i]);
                    childList.push(childRecords[j]);
                    childrenByParents.set(parentRecords[i].Id,childList);
                }
            }
        }
        console.log('After Loop:');
        console.log(childrenByParents);
        console.log(childrenByParents.size);

        cmp.set('v.items', childrenByParents);
    }
})