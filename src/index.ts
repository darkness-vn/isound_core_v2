import http from "http"
import express from "express"
import "reflect-metadata"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { HomeRoute, AuthRoute, MediaRoute, UserRoute } from "./routers"
import { Innertube, UniversalCache, Utils } from 'youtubei.js';

const location = "VN" //process.env.location
const lang = "vi" //process.env.lang

async function main () {
	dotenv.config()
	const app = express()
	const server = http.createServer(app)
	
	const routes = [
		new HomeRoute(),
		new AuthRoute(),
		new MediaRoute(),
		new UserRoute()
	]

	app.use(cors())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())

    routes.forEach(route => {
      app.use('/', route.router);
    });

	server.listen(8888, () => {
		console.log(`server is running on port 8888`)
	})
}

main ()