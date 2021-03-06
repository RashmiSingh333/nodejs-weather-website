const express=require('express')
const app=express()
const port=process.env.PORT || 3000
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather App',
    name:'Rashmi Singh'
  })
})
app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About me',
    name:'Rashmi Singh',
    description:'Currently pursuing B.Tech in Electronics and Communication Engineering at National Institute of Technology Kurukshetra'
  })
})
app.get('/help',(req,res)=>{
  res.render('help',{
    helpText:'This is simple weather application that uses two api weatherstack and mapbox to fetch the weather data',
    title:'Help',
    name:'Rashmi Singh'
  })
})

app.get('/weather',(req,res)=>{
if(!req.query.address){
  return res.send({
    error:'You must provide an address!'
  })
}
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
  if(error){
    return res.send({error})
  }
  forecast(latitude,longitude,(error,forecastData)=>{
    if(error){
      return res.send({error})
    }
    res.send({
      forecast:forecastData,
      location,
      address:req.query.address
    })
  })
})

})

app.get('*',(req,res)=>{
  res.render('404',{
    errormessage:'Page not found',
    title:'404',
    name:'Rashmi Singh'
  })
})


app.listen(port,()=>{
  console.log('Server is up on ' + port);
})
