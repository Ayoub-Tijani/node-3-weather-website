const path = require('path')
const geoCode = require('./geoCode/geo')
const forcast = require('./geoCode/forcas')
const express = require('express')
const hbs = require('hbs')

const port = process.env.PORT || 3000

const app = express()

const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')


const partialsPath = path.join(__dirname,'../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
	res.render('index',{
		title:'weather app',
		name: 'Ayoub Tijani'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		title:'helping page is up',
		name: 'ayoub tijani'
	})
})

app.get('/about',(req,res)=>{
	res.render('about',{
		title:'About Me',
		name: 'ayoub tijani'
	})
})

app.get('/weather',(req,res)=>{
	const address = req.query.address
	if(!address){
		return res.send({
			error:"you must provide an address"
		})
	}else{
		geoCode(address,(error,{latitude,longtitude,location}={})=>{
			if(error){
				return res.send({ error })
			}else{
				forcast(latitude,longtitude,(error,forcastdata) => {
					if(error){
						return res.send({error})
					}else{
						return res.send({
							location: location,
							forcastdata:forcastdata,
							address: address
						})
					}
				})
			}
		})
	}
})



app.get('/help/*',(req,res)=>{
	res.render('404',{
		title:"404",
		errorMsg: "The page is not exist",
		name:'ayoub tijani'
	})
})

app.get('*',(req,res)=>{
	res.render('404',{
		title:"404",
		errorMsg: "The page is not exist",
		name:'ayoub tijani'
	})
})



app.listen(port,()=>{
	console.log('server is up. on the port '+port)
})