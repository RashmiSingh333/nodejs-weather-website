



const request=require('request');

const forecast=(latitude,longitude,callback) =>{
  const url='http://api.weatherstack.com/current?access_key=62032b5ce44cfc95b6b2f5515cd0034b&query=' + latitude +','+ longitude+'&units=f';
  request({url:url,json:true},(error,response)=>{
    if(error){
      callback('Unable to connect to wether services',undefined)
    }else if(response.body.error){
      callback('Unable to find location',undefined)
    }else{
      callback(undefined,'It is currently ' + response.body.current.temperature + '  degree fahrenheight out ') ;
    }
  })
}




module.exports=forecast;
