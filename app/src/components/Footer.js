import React from 'react';
import "../Styles/footer.css"


const Footer = () => {
    return(
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4> AsaTera API </h4>
                        <ul className="list-unstyled">
                            <li><a href="/developers">Developers</a></li>
                            <li><a href="/prices">Prices</a></li>
                            <li><a href="/Developers/#libraries">Libraries</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4> About </h4>
                        <ul className="list-unstyled">
                            <li><a href="/privacy">Privacy</a></li>
                            <li><a href="/terms">Terms and Services</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4> Contact </h4>
                        <ul className="list-unstyled">
                            <li>Contact Us</li>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                            <li>Github</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} AsaTera Media Inc. | All Rights Reserved | Terms of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer;