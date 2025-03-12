const express=require('express')
const app=express();
const cors=require('cors');
const useRoute=require('./routes/rue');
let PORT=7000;


app.use(cors());
app.use(express.json())
app.use(useRoute);



app.listen(PORT,()=>{
 console.log(`application lancée sur le port :http://localhost:${PORT}`)
})