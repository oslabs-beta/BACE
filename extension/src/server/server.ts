import express, { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import path from 'path';
const PORT: number = 3000;

const app = express();
app.use(express.json());

app.use(express.static('public'));
app.get('/public', express.static('public/dist'));
app.get('/devtool.js', (req: Request, res: Response) => {
  console.log('serving devtools.html file')
  res.status(200).sendFile(path.resolve(__dirname, '../../public/devtools.html'))
});
app.get('/popup.js', (req: Request, res: Response) => {
  console.log('serving index.html file')
  res.status(200).sendFile(path.resolve(__dirname, '../../public/index.html'))
});

// will comment this out for now as having an error handler is helpful for debugging
// app.use('/*', (req, res) => {
//   return res.status(200).redirect('/');
// });

type ServerError = {
  log: string,
  status: number,
  message: { err: string }
}

const globalErrorHandler: ErrorRequestHandler = (err: ServerError, req, res, next) => {
  const defaultErr: ServerError = {
    log: 'Express error caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  }
  const errorObj = Object.assign(defaultErr, err)
  console.log(errorObj.log)
  return res.status(errorObj.status).json(errorObj.message)
}

app.use(globalErrorHandler)

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

module.exports = app;
