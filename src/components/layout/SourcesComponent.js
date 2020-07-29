import React from "react";
import { Link, withRouter } from "react-router-dom";
import BBClogo from "../../media/bbc logo.png";
import FOXlogo from "../../media/Fox-news-logo.png";
import Gnewslogo from "../../media/Google-news-logo.webp";
import Hindulogo from "../../media/the-hindu-newspaper-logo.jpg";
import TOIlogo from "../../media/TOI logo.png";
import ESPNlogo from "../../media/ESPN logo.jpg";
import NGlogo from "../../media/national-geographic-logo.jpg";
import MTVlogo from "../../media/mtv logo.webp";
import Redditlogo from "../../media/redditLogo.png";

const sourceComponent = () => {
	return (
		<div className="container">
			<div className="center d-none d-md-block text-center">
				<h4>Top Healines from your favourite source</h4>
				<Link to="/source/bbc-news">
					<img
						id="left-most-logo"
						className="logo-img"
						src={BBClogo}
						alt="bbc"
					/>
				</Link>
				<Link to="/source/google-news-in">
					<img className="logo-img" src={Gnewslogo} alt="google" />
				</Link>
				<Link to="/source/the-hindu">
					<img className="logo-img" src={Hindulogo} alt="hindu" />
				</Link>
				<Link to="/source/the-times-of-india">
					<img className="logo-img" src={TOIlogo} alt="TOI" />
				</Link>
				<Link to="/source/fox-news">
					<img className="logo-img" src={FOXlogo} alt="FOX" />
				</Link>
				<Link to="/source/espn">
					<img className="logo-img" src={ESPNlogo} alt="espn" />
				</Link>
				<Link to="/source/reddit-r-all">
					<img className="logo-img" src={Redditlogo} alt="reddit" />
				</Link>
				<Link to="/source/national-geographic">
					<img className="logo-img" src={NGlogo} alt="natGeo" />
				</Link>
				<Link to="/source/mtv-news">
					<img
						id="right-most-logo"
						className="logo-img"
						src={MTVlogo}
						alt="MTV"
					/>
				</Link>
			</div>
		</div>
	);
};

export default withRouter(sourceComponent);
