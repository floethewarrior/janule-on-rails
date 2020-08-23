import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Memes from "../components/Memes";
import Meme from "../components/Meme";
import NewMeme from "../components/NewMeme";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/memes" exact component={Memes} />
      <Route path="/meme/:id" exact component={Meme} />
      <Route path="/new_meme" exact component={NewMeme} />
    </Switch>
  </Router>
);
