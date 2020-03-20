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
const listMot = document.getElementById('listMot')

const params = (method,data) => {
	let setting = {
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: method,
		}
	if (data) {
		if ((data.alias.length > 500 ) || (data.msg.length > 500)) {
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

	return 	fetch('http://88.121.253.98:42333/dico',params("GET"))
		    .then(res => res.json())
		    .then(mots => mots.messages.map(log => { return '<p style="word-break: break-all;width: 100%;margin:0;font-Size : 12px;"> <span style="color:green;font-Size:9px;" > ' +mot.date+ '</span> ' +mot.nom+' </p>' }) )
		    .then(allLog => LOG.innerHTML = allLog.reverse().join('')  )
}


document.addEventListener('keydown', (event) => {
	const nomTouche = event.key;
	if (nomTouche == "Enter" && INPUTmsg.value ) {
		//consig.json
		fetch('http://88.121.253.98:42333/bottle',params("POST",{alias : INPUTalias.value , msg : INPUTmsg.value}))
	    .then(res => res.json())
		.then(mots => {
			mots.messages.map(log => { return '<p style="word-break: break-all;width: 100%;margin:0;font-Size : 12px;"> <span style="color:green;font-Size:9px;" > ' +mot.date+ '</span> ' +mot.nom+' </p>' })
			LOG.innerHTML = allLog.reverse().join('')
			INPUTmsg.value = ''
		} )
	}		
})

worldWild()
LOAD()

