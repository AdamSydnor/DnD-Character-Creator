import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import axios from 'axios';
import App from './App.jsx';
import Home from './pages/Home/Home.jsx';
import Characters from './pages/Characters/Characters.jsx';
import Creator from './pages/Creator/Creator.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route 
                path="/characters"
                element={<Characters />}
                loader={async() => {
                    const { data } = await axios.get(`/api/characters`);
                    return {
                        data: data
                    };
                }}
            />
            <Route
                path="/creator/:id"
                element={<Creator />}
                loader={async({ params }) => {
                    let myCharacter = null;
                    const { data } = await axios.get('/api/creatorinfo');
                    if (+params.id) {
                        myCharacter = await axios.get(`/api/editcharacter/${+params.id}`);
                        return {
                            races: data.races,
                            backgrounds: data.backgrounds,
                            skills: data.skills,
                            classes: data.classes,
                            myCharacter: myCharacter.data.myCharacter
                        };
                    } else {
                        return {
                            races: data.races,
                            backgrounds: data.backgrounds,
                            skills: data.skills,
                            classes: data.classes,
                        }
                    }
                }}
            />
        </Route>
    )
);

export default router