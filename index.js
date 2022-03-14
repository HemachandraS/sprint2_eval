
const express=require("express")
const mongoose=require("mongoose")

const app=express();

const connect =()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/Banking_system")
}
const User =mongoose.model("User",UserSchema)
const UserSchema=mongoose.Schema(
    {
        firstName:{type:String,require:true},
        middleName:{type:String,require:false},
        lastName:{type:String,require:true},
        age:{type:Number,require:true},
        email:{type:email,require:true},
        address:{type:String,require:true},
        gender:{type:String,require:false,default:"Female"},
        type:{type:String,require:false,default:"customer"},
        //updatetime
    },
    {
        timestamps:true
    }
)
const BranchDetail =mongoose.model("BranchDetail",BranchDetailSchema)
const BranchDetailSchema=mongoose.Schema({
    name:{type:String,require:true},
    address:{type:String,require:true},
    IFSC:{type:String,require:true},
    MICR:{type:Number,require:true},
    //updatetime
},
{
    timestamps:true
})
const MasterAccount =mongoose.model("MasterAccount",MasterAccountSchema)
const MasterAccountSchema=mongoose.Schema({
    balance:{type:Number,require:true},
    //updatetime
},
{
    timestamps:true
})
const SavingsAccount =mongoose.model("SavingsAccount",SavingsAccountSchema)
const SavingsAccountSchema=mongoose.Schema({
    account_number:{type:Number,require:true,distinct:true},
    balance:{type:Number,require:true},
    interestRate:{type:Number,require:true},
    //updatetime

},
{
    timestamps:true
})
const FixedAccount =mongoose.model("FixedAccount",FixedAccountSchema)
const FixedAccountSchema=mongoose.Schema({
    account_number:{type:Number,require:true,distinct:true},
    balance:{type:Number,require:true},
    interestRate:{type:Number,require:true},
    startDate:{type:String,require:true},
    maturityDate:{type:String,require:true},
    //updatetime
},
{
    timestamps:true
})






app.get('/MasterAccount',async (req,res)=>{
    try {
        const MasterAccount=await MasterAccount.find().lean().exec();

        return res.status(200).send({MasterAccount:MasterAccount})
    } catch (error) {
        return res.status(500).send({MasterAccount:MasterAccount})
    }
})

app.post('/SavingsAccount',async (req,res)=>{
    try {
        const SavingsAccount=await SavingsAccount.create(req.body)

        return res.status(200).send({SavingsAccount:SavingsAccount})
    } catch (error) {
        return res.status(500).send({SavingsAccount:SavingsAccount})
    }
})
app.post('/FixedAccount',async (req,res)=>{
    try {
        const FixedAccount=await FixedAccount.create(req.body)

        return res.status(200).send({FixedAccount:FixedAccount})
    } catch (error) {
        return res.status(500).send({FixedAccount:FixedAccount})
    }
})
app.get('/MasterAccount',async (req,res)=>{
    try {
        const MasterAccount=await MasterAccount.find().lean().exec();

        return res.status(200).send({MasterAccount:MasterAccount})
    } catch (error) {
        return res.status(500).send({error:error})
    }
})

app.delete('/FixedAccount',async (req,res)=>{
    try {
        const FixedAccount=await FixedAccount.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send({FixedAccount:FixedAccount})
    } catch (error) {
        return res.status(500).send({error:error})
    }
})


app.post('/FixedAccount',async (req,res)=>{
    try {
        const SavingsAccount=await SavingsAccount.create(req.body)

        return res.status(200).send({SavingsAccount:SavingsAccount})
    } catch (error) {
        return res.status(500).send({error:error})
    }
})









app.listen(5000,async(req,res)=>{
    try {
        await connect()
    } catch (error) {
        Console.log(error)
    }
    console.log("listen in 5000")
})