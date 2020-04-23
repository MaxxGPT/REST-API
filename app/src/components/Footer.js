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
                            <li>Developers</li>
                            <li>Prices</li>
                            <li>Libraries</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4> About </h4>
                        <ul className="list-unstyled">
                            <li>Privacy</li>
                            <li>Terms and Services</li>
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