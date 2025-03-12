const { PrismaClient } = require( '@prisma/client' );
const express=require('express');
const router=new express.Router();
const bcrypt=require('bcryptjs');
const {generateToken, upload} = require( '../services/generate' );
const authentification = require( '../middleware/auth' );



const prisma=new PrismaClient();
router.post('/createUser',async(req,res)=>{
 const {password,email}=req.body
 const hashedPass=await bcrypt.hash(password,8);
 
try
{await prisma.user.create({
 data:{ 
  password:hashedPass,email
 }
});
res.send('utilisateur creer avec succés')
}catch(err){
 res.status(500).send('error:',err)
}

 
});

router.post('/loginUser',async(req,res)=>{
 const {email,password}=req.body
 const user=await prisma.user.findUnique({
  where:{email}
 });
 if(!user)throw new Error('email incorecte');
 const isPassword=await bcrypt.compare(password,user.password);
 const token=generateToken(user.id);
 if(isPassword){
  res.send(token)
 }else{
  throw new Error("mot de passe incorrect")
 }
});

router.post('/user/addProduct',authentification,upload.single('image'),async(req,res)=>{
 const user=req.users;
 const {name,createdAt,taux,prixEnKilo}=req.body
await prisma.product.create({
 data:{
name:name,
taux:taux,
createdAt:createdAt,
prixEnKilo:prixEnKilo,
userId:user.id
 }
});
res.send('donnés avec succés');

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

    await prisma.archives.create({
      data:{
     produit:name,
     taux:taux,
     createdAt:createdAt,
     price:price,
     userId:user.id
      }
     });
res.send("ca marche")
});

router.get('/getArchiver',authentification,async(req,res)=>{
  const user=req.users;
  const archive=await prisma.archives.findMany({
    where:{userId:user.id}
  });
  res.send(archive);
})


module.exports=router