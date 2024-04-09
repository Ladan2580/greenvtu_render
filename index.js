require('dotenv').config();
const express= require('express');
const cookieparser= require("cookie-parser")
const session=require("express-session");
const app=express();
const cors =require('cors');
require('dotenv').config()
const mongoose =require('mongoose');
app.use(cors(
  {
    origin:''+process.env.CLIENT_BASE_URL,
    methods:['POST','GET','PUT','OPTIONS','HEAD'],
    credentials:true
  }
));
app.use(express.json());
app.use(cookieparser());
app.use(session({
    secret:'1210210009',
    resave:true,
    saveUninitialized:false,
    rolling:true,
    cookie:{
        secure:false,
        maxAge:null,
    }
}))

const port=process.env.PORT;
const mongo_connect_string=process.env.MONGO_CONNECT_STRING;
mongoose.connect(mongo_connect_string).then(result=>console.log('connected to the database')).catch(err=>console.log(err));
const my_router=require('./routes/education_setting_route')
const dataNameRouter=require('./routes/data_name_setting_route')
const dataPlanRouter=require('./routes/data_plan_setting_route')
const cableNameRouter=require('./routes/cable_name_setting_route')
const airtimeNameRouter=require('./routes/airtime_name_setting_route')
const cablePlanRouter=require('./routes/cable_plan_setting_route')
const airtimePlanRouter=require('./routes/airtime_plan_setting_route')
const billSettingRouter=require('./routes/bill_setting_route')
const smsSettingRouter=require('./routes/sms_setting_route')
app.use('/api', my_router);
app.use('/api', dataNameRouter);
app.use('/api', dataPlanRouter);
app.use('/api', cableNameRouter);
app.use('/api', cablePlanRouter);
app.use('/api', airtimeNameRouter);
app.use('/api', airtimePlanRouter);
app.use('/api', billSettingRouter);
app.use('/api', smsSettingRouter);
app.use('/api',require('./routes/data'))
app.use('/api',require('./routes/airtime'))
app.use('/api',require('./routes/cable'))
app.use('/api',require('./routes/bill'))
app.use('/api',require('./routes/sms'))
app.use('/api',require('./routes/exam'))
app.use('/api',require('./routes/registration'))
app.use('/api',require('./routes/getRequest'))
app.use('/api',require('./routes/admin_action'))
app.get("/",(req,res)=>{
  res.status(200).json({success:true});
})

app.listen(port,()=>{
console.log('server is listening ooo');
})