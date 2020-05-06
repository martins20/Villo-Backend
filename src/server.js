import app from './app';

const port = process.env.APP_PORT;

app.listen(process.env.PORT || port);
