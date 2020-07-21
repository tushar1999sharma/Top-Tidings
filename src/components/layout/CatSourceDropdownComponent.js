import React from 'react';
import { Link } from "react-router-dom";

const catSourceDropdownComponent = () => {
    return (
        <div className="buttons-container container d-md-none">
            {/* sources */}
            <div className="container dropdown d-md-none d-block w-100">
                <button
                    className="btn btn-toggle dropdown-toggle sources-button w-100"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Sources
				</button>
                <div className="dropdown-menu hidden-md-up w-100 dropdown-in">
                    <Link
                        to="/source/bbc-news"
                        className="dropdown-item dropdown-link"
                    >
                        BBC News
					</Link>
                    <Link
                        to="/source/google-news-in"
                        className="dropdown-item dropdown-link"
                    >
                        Google News In
					</Link>
                    <Link
                        to="/source/the-hindu"
                        className="dropdown-item dropdown-link"
                    >
                        The Hindu
					</Link>
                    <Link
                        to="/source/the-times-of-india"
                        className="dropdown-item dropdown-link"
                    >
                        The Times Of India
					</Link>
                    <Link
                        to="/source/fox-news"
                        className="dropdown-item dropdown-link"
                    >
                        Fox News
					</Link>
                    <Link
                        to="/source/time"
                        className="dropdown-item dropdown-link"
                    >
                        Time News
					</Link>
                    <Link
                        to="/source/fortune"
                        className="dropdown-item dropdown-link"
                    >
                        Fortune
					</Link>
                    <Link
                        to="/source/cnn"
                        className="dropdown-item dropdown-link"
                    >
                        CNN News
					</Link>
                    <Link
                        to="/source/espn"
                        className="dropdown-item dropdown-link"
                    >
                        ESPN
					</Link>
                    <Link
                        to="/source/reddit-r-all"
                        className="dropdown-item dropdown-link"
                    >
                        Reddit
					</Link>
                    <Link
                        to="/source/bloomberg"
                        className="dropdown-item dropdown-link"
                    >
                        Bloomberg
					</Link>
                    <Link
                        to="/source/national-geographic"
                        className="dropdown-item dropdown-link"
                    >
                        National Geography
					</Link>
                    <Link
                        to="/source/mtv-news"
                        className="dropdown-item dropdown-link"
                    >
                        MTV News
					</Link>
                    <div className="dropdown-divider"></div>
                </div>
            </div>

            <br />

            {/* categories */}
            <div className="container dropdown show d-md-none w-100">
                <button
                    className="btn dropdown-toggle btn-toggle categories-button w-100 mt-3"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Categories
				</button>
                <div className="dropdown-menu hidden-md-up w-100 dropdown-in">
                    <Link
                        to="/category/general"
                        className="dropdown-item dropdown-link"
                    >
                        General
					</Link>
                    <Link
                        to="/category/business"
                        className="dropdown-item dropdown-link"
                    >
                        Business
					</Link>
                    <Link
                        to="/category/health"
                        className="dropdown-item dropdown-link"
                    >
                        Health
					</Link>
                    <Link
                        to="/category/sports"
                        className="dropdown-item dropdown-link"
                    >
                        Sports
					</Link>
                    <Link
                        to="/category/technology"
                        className="dropdown-item dropdown-link"
                    >
                        Technology
					</Link>
                    <Link
                        to="/category/entertainment"
                        className="dropdown-item dropdown-link"
                    >
                        Entertainment
					</Link>
                    <Link
                        to="/category/science"
                        className="dropdown-item dropdown-link"
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
