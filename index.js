const express=require('express');
const path=require('path');
const urlroute=require('./routes/url');
const {connectmongodb}=require('./connection')
const url=require('./models/url')
const staticroute=require('./routes/staticrouter')
const app=express();
const PORT=8001;
connectmongodb('mongodb://localhost:27017/shorturl')
.then(()=>{
    console.log('mongodb connected')
})
app.set("view engine","ejs");
app.set('views',path.resolve("./views")) ; //ye bta rrha h express server ko sari ejs file views ke andar padi h


app.get('/url/:shortid',async(req,res)=>{
const shortid= req.params.shortid;
const entry=await url.findOneAndUpdate({
    shortid,
},
{
    $push:{
    visithistory:{
    timestamp:Date.now(),
    },
},
});
res.redirect(entry.redirecturl);
});
//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));


app.use('/url',urlroute)
app.use('/',staticroute)
app.listen(PORT,()=>console.log(`server started at Port: ${PORT}`))
