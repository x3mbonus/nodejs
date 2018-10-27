import express from 'express';
import bodyParser from 'body-parser';
import {register_routes} from './controllers';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/my_database');

const port = 8080;

let app = express();
app.use(bodyParser.json());
register_routes(app);

app.listen(port, ()=> {console.log(`Listening port ${port}`)});