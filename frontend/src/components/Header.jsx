import { Fragment } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

function Header(){
    return <Fragment>
        <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
                    <img width="80px" src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <Search/>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span>
      </div>
    </nav>
    </Fragment>
}

export default Header;