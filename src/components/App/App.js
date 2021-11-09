import {Redirect, Route, Switch} from "react-router-dom";
import {useEffect} from "react";
import axios from 'axios';
import Home from "../../domain/Home/Home";
import Nav from "../Nav/Nav";
import SingleMovie from "../../domain/SingleMovie/SingleMovie";
import MoviesAdd from "../../domain/MovieAdd/MovieAdd";

function App() {
    return (
        <div className="App">
            <Nav />
            <Switch>
                <Route exact path="/" component={() => <Redirect to='/accueil'/>}/>
                <Route exact path="/accueil" component={() => <Home></Home>}></Route>
                <Route exact path="/movie/:id" component={() => <SingleMovie></SingleMovie>}></Route>
                <Route exact path="/add" component={() => <MoviesAdd></MoviesAdd>}></Route>
            </Switch>
        </div>
    );
}

export default App;
