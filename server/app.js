import { getCharacters, getCharacter, getCreatorInfo, postCharacter, editCharacter, saveCharacterChanges, deleteCharacter, upload, postCharacterImage, repostCharacterImage } from './controllers/controller.js';
import { checkStatus, login, logout, register } from './controllers/authController.js';
import session from 'express-session';
import express from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.urlencoded({extended: false}));
app.use(session({ secret: 'This is a secret', saveUninitialized: true, resave: false }));
app.use('../images/avatars', express.static('./images/avatars'));

ViteExpress.config({printViteDevServerHost: true});

// GET INFO ROUTES:
app.get('/api/characters', getCharacters);
app.get('/api/character/:id', getCharacter);
app.get('/api/editcharacter/:id', editCharacter);
app.get('/api/creatorinfo', getCreatorInfo);

// STORE INFO ROUTES:
app.post('/api/character', postCharacter);
app.post('/api/characterimage', upload, postCharacterImage);
app.post('/api/characterimagetwo', repostCharacterImage);
app.post('/api/characterupdate', saveCharacterChanges);

// DELETE INFO ROUTES:
app.delete('/api/character/:id', deleteCharacter);

//AUTH ENDPOINTS:
app.get('/api/auth/status', checkStatus);
app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.post('/api/auth/register', register);

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`))