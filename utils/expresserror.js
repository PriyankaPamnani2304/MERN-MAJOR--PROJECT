// class Expresserror extends Error{
//     constructor(statuscode,message){
//         super();
//         this.status=status;
//         this.message=message
//     }
// }
// module.exports=Expresserror
class expresserror extends Error{
    constructor(status,message){
        super();
        this.status=status;
        this.message=message;
    }
}
module.exports=expresserror;