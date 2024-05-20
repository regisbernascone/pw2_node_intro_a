const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')


const app = express()
const Ideia = require('./models/Ideia')

const IdeiaRoutes = require('./routes/ideiaRoutes')
const authRoutes = require('./routes/authRoutes')

const IdeiaController = require('./controllers/IdeiaController')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(
    session({
        name:'session',
        secret:'nosso_secreto',
        resave: false,
        saveUninitialized:false,
        store: new FileStore({
            logFn: function(){},
                path: require('path').join(require('os').timpdir(), 'session'),
            }),
         
         cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
         },
        })
)

app.use(express.json())

app.use(flash())


app.use(express.static('public'))
app.use((req, res, next) =>{
    console.log(req.session.userid)

if(req.session.userid){
    res.locals.session = rq.session
}

 next()
})

app.use('/ideias', IdeiaRoutes)
app.use('/', authRoutes)
app.get('/', IdeiaController.showIdeias)

conn
.sync({force: true})
.then(() => {
    app.listen(3000, () =>{
        console.log('Servidor:http://localhost:3000/')
    })
}).catch((err) => {
    console.error(`Erro do MySQL / Sequelize: ${err}`)
})
