const { PrismaClient } = require( '@prisma/client' );
const express=require('express');
const router=new express.Router();
const bcrypt=require('bcryptjs');
const {generateToken, upload, ulpoadDir, compresedImage} = require( '../services/generate' );
const authentification = require( '../middleware/auth' );
const path=require('path');




const prisma=new PrismaClient();
router.post('/createUser',async(req,res)=>{
 const {password,email,name}=req.body
 const hashedPass=await bcrypt.hash(password,8);
 
try
{await prisma.user.create({
 data:{ 
  password:hashedPass,email,name
 }
});
res.send('utilisateur creer avec succés')
}catch(err){
 res.status(500).send('error:',err)
}

 
});

router.post('/loginUser',async(req,res)=>{
 const {email,password}=req.body
 const user=await prisma.user.findFirst({
  where:{email}
 })
 if(!user)throw new Error('email incorecte');
 const isPassword=await bcrypt.compare(password,user.password);
 const token=generateToken(user.id);
 if(isPassword){
  res.send(token)
 }else{
  throw new Error("mot de passe incorrect")
 }
});

router.post('/logoutUser',authentification,async (req,res) => {
  res.send('vous ête deconnecter');
  
})

router.post('/user/addProduct',authentification,upload.single('image'),async(req,res)=>{


 const user=req.users;
 const {name,createdAt,taux,prixEnKilo}=req.body;
 const imageName=`image-${Date.now()}.webp`;
 const imagePath=path.join(ulpoadDir,imageName);

 await compresedImage(req.file.buffer,imagePath)

 if(req.file){
  await prisma.product.create({
    data:{
   name:name,
   taux:Number(taux),
   createdAt:createdAt,
   prixEnKilo:Number(prixEnKilo),
   userId:user.id,
   ImageProduct:`/uploads/${imageName}`

   
  }
});
res.json('image telecharger')
 }
else{

  await prisma.product.create({
    data:{
      name:name,
      taux:Number(taux),
      createdAt:createdAt,
      prixEnKilo:Number(prixEnKilo),
      userId:user.id
    }
  });
  res.send('donnés avec succés');
}


});
router.get('/user/getProduct',authentification,async (req,res) => {
 const user=req.users;

try {
 const tasks=await prisma.product.findMany({
  where:{userId:user.id}});
  res.send(tasks)
} catch (error) {
 res.status(500).send('error de recuperation de la tache')
 
}
 
});

router.post("/user/postArchive",authentification,async(req,res)=>{
  const {name,taux,price,createdAt}=req.body;
  const user=req.users;
    
 try{   await prisma.archives.create({
      data:{
        produit:name,
        taux:taux,
        createdAt:createdAt,
        price:price,
        userId:user.id
      }
    });
    res.send("ca marche")}
    catch{
      res.send('ca ne marche pas ')
    }
  
 
});

router.get('/getArchiver',authentification,async(req,res)=>{
  const user=req.users;
 try{ const archive=await prisma.archives.findMany({
    where:{userId:user.id}
  });
  res.send(archive);}
  catch{
    res.send('null')
  }
})


module.exports=router