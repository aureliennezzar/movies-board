import {Redirect, Route, Switch} from "react-router-dom";
import './App.scss'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={() => <Redirect to='/accueil' />} />
            </Switch>
        </div>
    );
}

export default App;
