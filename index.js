import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoute from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoute);

const CONNECTION_URL =
	'mongodb+srv://tung-102:xCoaJL7bmOas6aRh@cluster0.p8fkg.gcp.mongodb.net/memories?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server is running on port: ${PORT}`);
		})
	)
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
