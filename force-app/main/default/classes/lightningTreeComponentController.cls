public with sharing class lightningTreeComponentController {
    
    
    @auraEnabled
    public static map<SObject,List<SObject>> getTree(String parent, String child, String relationship) {
        /*String query = 'SELECT id, name FROM ' + parent + ';';
        List<SObject> parents = Database.query(query);
        
        query = 'SELECT id, name FROM ' + child + ';';
        List<SObject> children = Database.query(query);

        map<SObject,List<SObject>> childrenByParents = new Map<SObject,List<SObject>>();
        for(SObject parent : parents){
            for(SObject child : children){
                if(child.relationship == parent.id){
                    if(childrenByParents.contains(parent.id){
                        childrenByParents.add(parent,)
                    }
                }
            }
        }*/
        map<SObject,List<SObject>> testMap = new Map<SObject,List<SObject>>();
        List<Account> Accounts = [SELECT id, name FROM Account];
        List<Contact> Contacts = [SELECT id, name FROM Contact];
        for(Account a : accounts){
            testMap.put((SObject)a, (List<Sobject>)Contacts);
        } 

        return testMap;
    }
}
