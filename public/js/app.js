const weatherForm = document.querySelector('form')
const LocationAddress = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

msgOne.textContent='from browser'


weatherForm.addEventListener('submit',(e)=>{
	e.preventDefault();
	const addresslocation = LocationAddress.value
	msgTwo.textContent='Loading...'
	fetch('/weather?address='+addresslocation).then((response)=>{
		response.json().then((data)=>{
			if(data.error){
				msgTwo.textContent="error : the address not good"
			}else{
				msgOne.textContent=`location is : ${data.location}`
				msgTwo.textContent=`${data.forcastdata}`
				console.log(data.location)
				console.log(data.forcastdata)
			}
		})
	})

})