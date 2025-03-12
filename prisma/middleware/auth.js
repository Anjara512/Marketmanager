const { PrismaClient } = require( '@prisma/client' );
const jwt=require('jsonwebtoken');
require('dotenv').config();
const prisma=new PrismaClient();

const authentification=async(req,res,next)=>{
 const token=req.header('authorization').replace('Bearer'," ").trim();
 const decodedToken=jwt.verify(token,process.env.SECRETE_KEY);
 const user=await prisma.user.findUnique({where:{id:Number(decodedToken)}});
 req.users=user;
 next()

}

module.exports=authentification;