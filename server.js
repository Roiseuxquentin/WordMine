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
// WORDMINE

const port = 42222

const express = require('express')
const app = express()
const cors = require('cors')

const curl = require('curl')
const fs = require('fs') 


// Middleware
app.use(cors())
app.use(express.static('./public'))
app.use(express.json({limit: '500kb'}));       // to support JSON-encoded bodies
app.use(express.urlencoded({limit: '500kb', extended: true})); // to support URL-encoded bodies

let i = 0

//////////////////////////////////////////////////////////////////////////////////////////////
// WordMine
//////////////////////////////////////////////////////////////////////////////////////////////


app.post('/plume', (req,res) => {
  const DATA = req.body

  let ip = req.headers['x-forwarded-for'] || req.connection.rewordeAddress;

  var currentdate = new Date() 
  var time =  currentdate.getHours() + ":"  
             + currentdate.getMinutes() + ":" 
             + currentdate.getSeconds()
 
  if ( DATA.nom ) {
    if ( DATA.nom.length < 50 ) {
      let comment 
      (DATA.nom.includes("/")) ? (comment = true) : (comment = false);
      const dataClean = DATA.nom.replace('/',"").replace('"',"").replace("'","").replace("<",'').replace('`','').slice(0,50)

      fs.readFile('./abc/dico.json', 'utf-8', (err, data) => { 
        if (err) throw err

        let buffer = JSON.parse(data).dico
      // config.json
        buffer.push({ ip : ip, nom: dataClean , date : time, comment : comment })
        // buffer.push({ ip : ip.replace("::ffff:","") , nom: dataClean , date : time })
        const newData = { dico : buffer }    

        if (data.length < 100000) {
          fs.writeFile('./abc/dico.json', JSON.stringify(newData) , (err, data) => {
            if (err) throw err

            res.send(JSON.stringify(newData))
          })  
        } else {
          console.log("DB FULL !! ")
          res.send(JSON.stringify(newData))
        }
       
      }) 
    }
  }
})

app.get('/dico', (req,res) => {
  fs.readFile('./abc/dico.json', 'utf-8', (err, data) => { 
    if (err) throw err

    res.send(data)
  }) 
})

app.listen(port, () =>  curl.get('http://roiseux.fr', (err, response, body) => console.log(`ip public :${body}\nport :${String(port)}`) ) )