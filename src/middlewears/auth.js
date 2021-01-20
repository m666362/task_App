const testMiddlewear = async (req, res, next)=>{
    console.log("I am running");
    next();
}
module.exports = testMiddlewear;