const express = require('express');
const bodyParser = require('body-parser');
const { userRouter, loginRouter, categorieRouter, blogPostRouter } = require('./controllers');
const { inputError, domainError, serverError } = require('./controllers/errorsHandler');
const authentication = require('./tokenHandler/authentication');

const app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);

app.use(authentication);
app.use('/categories', categorieRouter);
app.use('/post', blogPostRouter);

/* Error Handlers */
app.use(inputError);
app.use(domainError);
app.use(serverError);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
