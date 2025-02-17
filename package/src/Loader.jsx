import React from 'react';
import "./loader.css"
import trophyLogo from '../assets/trophy.png'
import luminosityLogo from '../assets/luminosity.png'

const Loader = () => {
  let date = new Date();
  date = date.toLocaleDateString();
  return (
    <>
      <div className="loaderContainer">
        <div>
          <div className="paragraph">
            <div style={{"display": "flex", "flexDirection": "row"}}>
              <img src={trophyLogo} className="trophyLogo" alt="trophy-logo"/>
              <div>
                <h3>Trophy Modular BIOS v4.51PG, A Luminosity Star Ally</h3>
                <h3>Copyright (C) 1997-2025, Trophy Software, Inc.</h3>
              </div>
            </div>
          </div>
          <div className="paragraph">
            <h3>(55XWUQOE) Recon r430VX PCIset(TM)</h3>
          </div>
          <div className="paragraph">
            <h3>HEXIUM-5 CPU at 128MHz</h3>
            <h3>Memory Test :&emsp;&emsp;32768K OK</h3>
          </div>
          <div className="paragraph">
            <h3>Trophy Plug and Play BIOS Extension v1.0A</h3>
            <h3>Copyright (C) 1997, Trophy Software, Inc.</h3>
            <div className="indent table">
              <div className="tableRow">
                <h3>Detecting IDE Primary Thing</h3>
                <h3>...</h3>
                <h3>PCemHD</h3>
              </div>
              <div className="tableRow">
                <h3 className="col1">Detecting IDE Secondary Thing</h3>
                <h3>...</h3>
                <h3>None</h3>
              </div>
              <div className="tableRow">
                <h3>Detecting Another Thing</h3>
                <h3>...</h3>
                <h3>PCemHD</h3>
              </div>
              <div className="tableRow">
                <h3>Detecting IDE Blah</h3>
                <h3>...</h3>
                <h3>[Press <span style={{"color": "white"}}>F4</span> to skip]_</h3>
              </div>
                
            </div>
          </div>
        </div>
        <div>
          <h3>Press <span style={{"color": "white"}}>DEL</span> to enter SETUP</h3>
          <h3>{date}-r430VX, UMC8469-5A37GH1BC-00</h3>
        </div>
      </div>
      <img src={luminosityLogo} className="energyLogo" alt="energy-star-logo"/>
    </>
  );
}

export default Loader;