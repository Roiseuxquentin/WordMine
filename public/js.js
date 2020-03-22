// ################################################### 
// #*/=============================================\*# 
// # ||                      .__                  || #
// # ||   ____   ____   ____ |  |   ____   ____   || #
// # || _/ __ \_/ __ \ / ___\|  |  /  _ \ /  _ \  || #
// # || \  ___/\  ___// /_/  >  |_(  <_> |  <_> ) || #
// # ||  \___  >\___  >___  /|____/\____/ \____/  || #
// # ||      \/     \/_____/                  2020|| #
// #.\=============================================/.#
// ###################################################
//WORDMINE

const mot = document.getElementById('mot')
const listMot = document.getElementById('dico')

const params = (method,data) => {
	let setting = {
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: method,
		}
	if (data) {
		if (data.nom.length > 500) {
			return setting
		} else {
			setting = {
					    headers: {
					      'Accept': 'application/json',
					      'Content-Type': 'application/json'
					    },
					    method: method,
	 					body: JSON.stringify(data)
					}
		}
	}
	return setting
}

const LOAD = () => {

	// return 	fetch('http://88.121.253.98:42333/dico',params("GET"))
	return 	fetch('http://192.168.0.41:42222/dico',params("GET"))
		    .then(res => res.json())
		    .then(mots => mots.dico.map(mot => { return '<p style="font-family: Cinzel, serif;word-break: break-all;width: 100%;margin:0;font-Size : 18px;"> <span style="font-family: Oxanium, cursive;color:green;font-Size:9px;" > ' +mot.date+ '</span> ' +mot.nom.toLowerCase()+' </p>' }) )
		    .then(dico => listMot.innerHTML = dico.reverse().join('')  )
}


    

    



document.addEventListener('keydown', (event) => {
	const nomTouche = event.key;
		console.log('%c DebuGg : ', 'background: orange; color: red' , mot.value )
	if (nomTouche == "Enter" && mot.value ) {
		//consig.json
		// fetch('http://88.121.253.98:42333/plume',params("POST",{nom : mot.value }))
		fetch('http://192.168.0.41:42222/plume',params("POST",{nom : mot.value }))
	    .then(res => res.json())
		.then(mots => mots.dico.map(mot => { return '<p style="font-family: Cinzel, serif;word-break: break-all;width: 100%;margin:0;font-Size : 18px;"> <span style="color:green;font-Size:9px;" > ' +mot.date+ '</span> ' +mot.nom.toLowerCase()+' </p>' }) )
	    .then(dico => listMot.innerHTML = dico.reverse().join('')  )
	    .then(res => mot.value = '' )
	}		
})

LOAD()

