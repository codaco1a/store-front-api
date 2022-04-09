import express, { Request, Response } from 'express' // importing express packages
import bodyParser from 'body-parser' // importing body parser so that we can acess the json from the body
import cors from 'cors' // importing cors packages
import productRoutes from './handlers/products' // imprting products endpoints from handler file
import humansRoute from './handlers/users' // importing users endpoints from handler file
import ordersRoute from './handlers/orders' // importing orders endpoints from orders file

const server: express.Application = express() // making an app
const address = "0.0.0.0:3000" // port 3000

const corsOptions = {
    origin: 'https://www.google.com', // a site can be white listed, this case google
    optionsSuccessStatus: 200
}

server.use(cors(corsOptions)) // All endpoints are cors enabled
server.use(bodyParser.json()) // app uses body-parser

productRoutes(server) // using products routes
humansRoute(server) // using users routes
ordersRoute(server) // using orders routes


server.get('/', function (req: Request, res: Response) {
    res.send('This Is The: '.concat('Root Page.')) // the root page
})

export default server // exporting server for testing