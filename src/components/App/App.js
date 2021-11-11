import {Redirect, Route, Switch} from "react-router-dom";
import {useEffect} from "react";
import axios from 'axios';
import Home from "../../domain/Home/Home";
import Nav from "../Nav/Nav";
import SingleMovie from "../../domain/SingleMovie/SingleMovie";
import MovieAdd from "../../domain/MovieAdd/MovieAdd";
import MoviesEdit from "../../domain/MovieEdit/MovieEdit";

function App() {
    return (
        <div className="App">
            <Nav />
            <Switch>
                <Route exact path="/" component={() => <Redirect to='/accueil'/>}/>
                <Route exact path="/accueil" component={() => <Home></Home>}></Route>
                <Route exact path="/movie/:id" component={() => <SingleMovie></SingleMovie>}></Route>
                <Route exact path="/edit/:id" component={() => <MoviesEdit></MoviesEdit>}></Route>
                <Route exact path="/add" component={() => <MovieAdd></MovieAdd>}></Route>
            </Switch>
        </div>
    );
}

export default App;
