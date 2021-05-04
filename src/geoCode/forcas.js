const request = require('request')
const chalk = require('chalk')
const forcast = (latitude,longtitude,callback)=>{
	const url = 'http://api.weatherstack.com/current?access_key=6fcd61456292375931d28499c0c917ef&query='+latitude+','+longtitude+'&units=f'
	const json = true
	request({url,json},(error,{body})=>{
		if(error){
			callback("Connexion error may be!",undefined)
		}else if(body.error){
			callback("the cordinate given't not correct",undefined)
		}else{
			callback(undefined,"Location Name : "+body.location.name+" "+body.location.country+" "+body.location.region+"temperature: "+body.current.temperature) 
		} 
	})
}
module.exports=forcast

