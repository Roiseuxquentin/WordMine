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

app.get('/echo', (req,res) => {
  console.log('echo')
  fs.readFile('./ghost.json', 'utf-8', (err, data) => { 
    if (err) throw err

    res.send(data)
  })
})
let i = 0

app.get('/workbench', (req,res) => {
  console.log('workbench')

            i= i + 1

      fs.readFile('./logs/logs.json', 'utf-8', (err, data) => { 
        if (err) throw err


        let buffer = JSON.parse(data).messages
        buffer.push({ date : "WorkBench : "+i , who : "WorkBench"+i , alias : "WorkBench" , msg: "dataClean"+i })
        const newData = { messages : buffer }    

    fs.writeFile('./logs/logs.json', JSON.stringify(newData) , (err, data) => {
            if (err) throw err

            res.send("ok"+i)
      })
    })
})

app.post('/bottle', (req,res) => {
  const DATA = req.body
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var currentdate = new Date() 
  var time =  currentdate.getHours() + ":"  
             + currentdate.getMinutes() + ":" 
             + currentdate.getSeconds()

  if ( DATA.msg ) {
    if ( DATA.msg.length < 500 ) {
      const dataClean = DATA.msg.replace('"',"").replace("'","").replace("<",'').replace('`','').slice(0,500)
      let aliasClean 

      if (DATA.alias) {
        aliasClean = DATA.alias.replace('"',"").replace("'","").replace('<','').replace('`','').slice(0,35)
      } else {
        aliasClean = 'Anonymous'
      }


      fs.readFile('./logs/logs.json', 'utf-8', (err, data) => { 
        if (err) throw err

        let buffer = JSON.parse(data).messages
      //config.json
        buffer.push({ date : "JOUR 6 : "+time , who : ip.replace("::ffff:","") , alias : aliasClean , msg: dataClean })
        const newData = { messages : buffer }    

        if (data.length < 100000) {
          fs.writeFile('./logs/logs.json', JSON.stringify(newData) , (err, data) => {
            if (err) throw err

            res.send(JSON.stringify(newData))
          })  
        } else {
          res.send(JSON.stringify(newData))
        }
       
      }) 
    }
  }
})

app.get('/logs', (req,res) => {
  fs.readFile('./logs/logs.json', 'utf-8', (err, data) => { 
    if (err) throw err

    res.send(data)
  }) 
})


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

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////



app.listen(42333, () =>  curl.get('http://roiseux.fr', (err, response, body) => console.log(`ip public :${body}\nport :42333`) ) )