const shortid=require("shortid");
const url=require('../models/url')
async function handlegeneratenewshorturl(req,res){
    const body=req.body;
    if(!body.url){
        return res.status(400).json({error:'url is required'})
    } 
    const shortId=shortid();
await url.create({
    shortid:shortId,
    redirecturl:body.url,
    visithistory:[],
});
return res.render("home",{id: shortId});
}
async function handlegetanalytics(req,res){
    const shortId=req.params.shortId;
const result=await url.findOne({shortId});
return res.json({totalClicks:result.visithistory.length,analytics:result.visithistory});
}
module.exports={
    handlegeneratenewshorturl,handlegetanalytics
}
