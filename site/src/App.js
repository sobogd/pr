import React, { useEffect, useState } from "react";
import { Switch, withRouter } from "react-router-dom";
import { BrowserRouter as _, Route } from "react-router-dom";
import "styles.css";
import Header from "components/header/header";
import HomePage from "components/home/homepage";

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="site">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/categories/">
            Все категории
          </Route>
          <Route exact path="/categories/:link">
            Страница категории
          </Route>
          <Route exact path="/products/">
            Все товары
          </Route>
          <Route exact path="/products/:link/">
            Страница товара
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
