const express = require('express')
const hbs = require('hbs')
const fs  = require('fs')

let app = express()

app.set('view engine', 'hbs')


hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYears', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('say', (text) => {
  return text.toUpperCase()
})
// 
// app.use((req, res, next) => {
//   res.render('maintance.hbs')
// })

app.use((req, res, next) => {
  let now = new Date().toString()
  const log = `${now} ${req.method} ${req.url}`
next()
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('err')
    }
  })

});

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=>{
  // res.send('<em>Hello Express</em>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    greeting : 'Hi! Good morning'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'request is bad'
  })
})

app.listen(3400);
