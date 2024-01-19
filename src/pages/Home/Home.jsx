import './Home.css'
import { useSelector } from "react-redux";

function Home() {
    let user = useSelector(state => state.user);
    return (
        <main className='home-page'>
            <div className="home-div">
                <h1 className="welcome">Welcome{user ? ', ' + user.username + '!' : '!'}</h1>
                <p className='welcome-msg'>
                    This site is designed to help you create interesting characters and 
                    encounters. You can head over to the creator to build a character, 
                    and then, after I finish it, continue on to build a party and 
                    design encounters.<br /> <br />
                </p>
            </div>
        </main>
    );
};

export default Home;