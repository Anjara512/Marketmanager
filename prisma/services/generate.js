const jwt=require('jsonwebtoken');
const multer = require( 'multer' );
const path=require('path');
const fs=require("fs")
const sharp = require( 'sharp' );
require('dotenv').config();

const generateToken=(id)=>{
 const token=jwt.sign(id.toString(),process.env.SECRETE_KEY);

 return token
 
}

const ulpoadDir=path.join(__dirname,"uploads")
if(!fs.existsSync(ulpoadDir)){
 fs.mkdirSync(ulpoadDir)
}




const storage=multer.memoryStorage()
const upload=multer({storage:storage})


const compresedImage=async(request,imagePath)=>{
 const Imagecompresed=await sharp(request).resize(200,200).toFormat('webp').toFile(imagePath)
 return Imagecompresed;
}


module.exports={generateToken,upload,compresedImage,ulpoadDir}