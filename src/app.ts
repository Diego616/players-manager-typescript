import express from 'express'
import morgan from 'morgan'
import exphbs from 'express-handlebars'
import path from 'path'

import indexRoutes from './routes'
import playersRoutes from './routes/players'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import Handlebars from 'handlebars'

class Application {
  app: express.Application

  constructor() {
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
  }

  settings() {
    this.app.set('port', 3000)
    this.app.set('views', path.join(__dirname, 'views'))
    this.app.engine('.hbs', exphbs({
      handlebars: allowInsecurePrototypeAccess(Handlebars),
      layoutsDir: path.join(this.app.get('views'), 'layouts'),
      partialsDir: path.join(this.app.get('views'), 'partials'),
      defaultLayout: 'main',
      extname: '.hbs'
    }))
    this.app.set('view engine', '.hbs')
  }

  middlewares() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: false}))
  }

  routes() {
    this.app.use(indexRoutes)
    this.app.use('/players', playersRoutes)

    this.app.use(express.static(path.join(__dirname, 'public')))
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server runnig on port:', this.app.get('port'))
    })
  }
}

export default Application