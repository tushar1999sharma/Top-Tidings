import React from 'react';
import { Link } from "react-router-dom";

const catSourceDropdownComponent = () => {
    return (
        <div className="buttons-container container">
            {/* sources */}
            <div className="container float-left dropdown d-md-none d-block w-100">
                <button
                    className="btn btn-dark dropdown-toggle mr-4 sources-button mt-3 w-100"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Sources
				</button>
                <div className="dropdown-menu bg-dark hidden-md-up w-100">
                    <Link
                        to="/source/bbc-news"
                        className="dropdown-item"
                    >
                        BBC News
					</Link>
                    <Link
                        to="/source/google-news-in"
                        className="dropdown-item"
                    >
                        Google News In
					</Link>
                    <Link
                        to="/source/the-hindu"
                        className="dropdown-item"
                    >
                        The Hindu
					</Link>
                    <Link
                        to="/source/the-times-of-india"
                        className="dropdown-item"
                    >
                        The Times Of India
					</Link>
                    <Link
                        to="/source/fox-news"
                        className="dropdown-item"
                    >
                        Fox News
					</Link>
                    <Link
                        to="/source/time"
                        className="dropdown-item"
                    >
                        Time News
					</Link>
                    <Link
                        to="/source/fortune"
                        className="dropdown-item"
                    >
                        Fortune
					</Link>
                    <Link
                        to="/source/cnn"
                        className="dropdown-item"
                    >
                        CNN News
					</Link>
                    <Link
                        to="/source/espn"
                        className="dropdown-item"
                    >
                        ESPN
					</Link>
                    <Link
                        to="/source/reddit-r-all"
                        className="dropdown-item"
                    >
                        Reddit
					</Link>
                    <Link
                        to="/source/bloomberg"
                        className="dropdown-item"
                    >
                        Bloomberg
					</Link>
                    <Link
                        to="/source/national-geographic"
                        className="dropdown-item"
                    >
                        National Geography
					</Link>
                    <Link
                        to="/source/mtv-news"
                        className="dropdown-item"
                    >
                        MTV News
					</Link>
                    <div className="dropdown-divider"></div>
                </div>
            </div>

            <br />

            {/* categories */}
            <div className="container float-right dropdown show d-md-none w-100">
                <button
                    className="btn btn-dark dropdown-toggle categories-button mt-3 w-100"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Categories
				</button>
                <div className="dropdown-menu hidden-md-up w-100">
                    <Link
                        to="/category/general"
                        className="dropdown-item"
                    >
                        General
					</Link>
                    <Link
                        to="/category/business"
                        className="dropdown-item"
                    >
                        Business
					</Link>
                    <Link
                        to="/category/health"
                        className="dropdown-item"
                    >
                        Health
					</Link>
                    <Link
                        to="/category/sports"
                        className="dropdown-item"
                    >
                        Sports
					</Link>
                    <Link
                        to="/category/technology"
                        className="dropdown-item"
                    >
                        Technology
					</Link>
                    <Link
                        to="/category/entertainment"
                        className="dropdown-item"
                    >
                        Entertainment
					</Link>
                    <Link
                        to="/category/science"
                        className="dropdown-item"
                    >
                        Science
					</Link>
                    <div className="dropdown-divider"></div>
                </div>
            </div>
        </div>
    );
}

export default catSourceDropdownComponent;
