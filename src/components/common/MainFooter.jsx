import React from "react";

import "./MainFooter.css";
import { Button } from "react-bootstrap";

export default function MainFooter() {
  return (
    <>
      <footer className="">
        <div className="Copyright_box pt-4 pb-3">
          <div className="row">
            <div className="col-md-7 pl-0">
              <p className="copyright_txt mb-0">
                Copyright © 2021 Walking Dreamz Technologies. All Rights
                Reserved.
              </p>
            </div>
            <div className="col-md-5 text-right pr-0">
              <ul className="footer_navigation mb-0 d-flex justify-content-end align-items-center">
                <li>
                  <Button variant="link">PRIVACY</Button>
                </li>
                <li>
                  <Button variant="link">TERMS</Button>
                </li>
                <li>
                  <Button variant="link">CONTACT</Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
