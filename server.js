let port = process.env.PORT || 3000;
const express = require('express')
const path = require('path');
const app =  express()

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))


app.listen(port,()=>{
    console.log(`Listening on ${port}`)
})

app.get('/', (req,res)=>{
res.sendFile(__dirname+'/public/views/index.html');
})