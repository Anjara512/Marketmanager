const jwt=require('jsonwebtoken');
const mutler=require('multer');
const sharp = require( 'sharp' );
require('dotenv').config();

const generateToken=(id)=>{
 const token=jwt.sign(id.toString(),process.env.SECRETE_KEY);

 return token
 
}

const storage=mutler.memoryStorage();
const upload=mutler({storage});


const compresedImage=async(request)=>{
 const Imagecompresed=await sharp(request).resize(200,200).jpeg({quality:80}).toBuffer()
 return Imagecompresed;
}


module.exports={generateToken,upload,compresedImage}