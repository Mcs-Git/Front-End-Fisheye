export async function all_photographers(){
    return fetch("/data/photographers.json").then(function (res){
            return res.json()
        }).then(function(obj){
            console.log(obj)
            return obj;
        }).catch(function(err){
            console.log(err);
        })
    
}
