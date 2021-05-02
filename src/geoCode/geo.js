const request = require('request')
const chalk = require('chalk')
const geoCode = (address, callback) =>{
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidGlqYW5pMjUiLCJhIjoiY2tubjR1dXRrMGxzYzJ4bGlxcjBkZ2VycCJ9.VGETRlkbkP5GhApEClpqOw'
	const json = true
	//why {body} because the response it will be just body
	request({url, json},(error,{body})=>{
		if(error){
			callback("Connexion Problm!!!",undefined)
		}else if(body.features.length===0){
			callback("Location address not correct try another",undefined)
		}else{
			callback(undefined,{
				latitude: body.features[0].center[1],
				longtitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
}
module.exports = geoCode