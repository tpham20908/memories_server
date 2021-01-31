import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoute from './routes/posts.js';

dotenv.config();
const { USER_NAME, USER_PASSWORD, COLLECTION_NAME } = process.env;
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello to memories_tp20908 API');
});

app.use('/posts', postRoute);

const CONNECTION_URL = `mongodb+srv://${USER_NAME}:${USER_PASSWORD}@cluster0.p8fkg.gcp.mongodb.net/${COLLECTION_NAME}?retryWrites=true&w=majority`;

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
