public with sharing class lightningTreeComponentController {
    
    
    @auraEnabled
    public static List<SObject> getParent(String parent) {
        String query = 'SELECT id, name FROM ' + parent;
        List<SObject> parents = Database.query(query);
        
        return parents;
    }

    @auraEnabled
    public static List<item> getChild(String child, List<SObject> parents, String relationship){
        System.debug('Child: ' + child);
        System.debug('Parents: ' + parents);
        System.debug('Relationship: ' + relationship);
        //Extract all the parent IDs into a set for comparison
        Set<Id> parentIds = (new Map<Id,SObject>(parents)).keySet();
        String query = 'SELECT id, name, ' + relationship + ' FROM ' + child + ' WHERE ' + relationship + ' != null';
        List<SObject> children = Database.query(query);
        List<SObject> childrenToReturn = new List<SObject>();
        for(SObject obj : children){
            Id thisParent = (ID)obj.get(relationship);
            if(parentIds.contains(thisParent)){
                childrenToReturn.add(obj);
            }
        }

        List<item> tree = buildTree(parents, childrenToReturn, relationship);
        return tree;
    }
        
    @AuraEnabled  
    public static List<item> buildTree(List<SOBject> parents, List<SObjecT> children, String relationship) {  
        List<item> tree = new List<item>();  
        List<item> subtree = new List<item>();
        Map<SObject, List<SObject>> childrenByParents = new Map<SObject, List<SObject>>();
        System.debug('Parent: ' + parents);
        System.debug('Children: ' + children);
        System.debug('Relationship: ' + relationship);
        for(SObject parent : parents){
            subtree.clear();
            for(SOBject child : children) {    
                if((ID)child.get(relationship) == parent.id){
                    if(childrenByParents.get(parent) == null){
                        childrenByParents.put(parent,new List<SObject>());
                    }
                    item i = new item((String)child.get('name'), child.id, false, null);
                    subtree.add(i);
                    childrenByParents.get(parent).add(child);
                }
            }
            item currentTree = new item((String)parent.get('name'), (String)parent.Id, true, new List<item>(subtree));
            System.debug('currentTree: ' + currentTree);
            tree.add(currentTree);
        }
        System.debug('Tree: ' + tree);
        return tree;    
    }   

    public class item {      
        @AuraEnabled  
        public string label {get;set;}  

        @AuraEnabled  
        public string name {get;set;}  
            
        @AuraEnabled  
        public Boolean expanded {get;set;}

        @AuraEnabled  
        public List<item> items {get;set;}  

        public item(String label, String name, Boolean expanded, List<item> item) {  
            this.label = label;  
            this.name = name;  
            this.expanded = expanded;  
            this.items = item;   
        }  
    }  
}
