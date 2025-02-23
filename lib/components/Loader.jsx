import styles from './loader.module.css'
import trophyLogo from '../../src/assets/trophy.png'
import luminosityLogo from '../../src/assets/luminosity.png'
import { useState } from 'react';
import { useEffect } from 'react';

export const Loader = () => {
  let date = new Date();
  date = date.toLocaleDateString();

  const DEVICES = [
    "ABCDE",
    "12335",
    "Potato Tornado",
    "Howdy"
  ]

  const DEVICETYPES = [
    "Primary Master",
    "Primary Slave",
    "Secondary Master",
    "Secondary Slave"
  ]

  const [devices, setDevices] = useState(["", "", "", ""])
  const [memory, setMemory] = useState("0")
  const [biosExtension, setBiosExtension] = useState("")
  const [copyright, setCopyright] = useState("")
  const [cursor, setCursor] = useState({"memory": "", "copyright": "", "deviceCheck": ["", "", "", ""]})

  useEffect(() => {
    const bootSequence = async () => {
      await checkMemory();
      await checkDevices();
    }

    bootSequence();
  }, []);

  const checkMemory = async () => {
    return new Promise((resolve) => {
      const BLOCK = 64;
      const MIN = 640;
      const MAX = 65536;
      let mem = 0;
      const newCursor = {...cursor}
      
      for (let i = MIN; i < MAX; i = i + BLOCK) {
        setTimeout(() => {
          mem = i;
          setMemory(`${mem}K`)
          newCursor.memory = "_"
          setCursor(newCursor)
        }, i / BLOCK)
      }
      console.log(cursor)

      setTimeout(() => {
        newCursor.memory = ""
        setCursor(newCursor)
        setMemory(`${mem}K OK`)
        resolve();
      }, MAX / BLOCK - 1200)
    })
  }

  const checkDevices = async () => {
    const detectedDevices = [...devices]
    const newCursor = {...cursor}

    await new Promise((resolve) => {
      setTimeout(() => {
        setCopyright("Copyright (C) 1997, Trophy Software, Inc.")
        setBiosExtension("Trophy Plug and Play BIOS Extension v1.0A")
        newCursor.copyright = "_"
        setCursor(newCursor)
        resolve()
      }, 2000);
    })

    const detectDevice = async (index, delay = 2000) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (index == 0) {
            newCursor.copyright = ""
            setCursor(newCursor)
          }
          if (index != DEVICES.length) {
            newCursor.deviceCheck[index] = "_"
            setCursor({...newCursor})
            detectedDevices[index] = `Detecting IDE ${DEVICETYPES[index].padEnd(16, " ")}... [Press F4 to skip]`;
            setDevices([...detectedDevices])
          }
          if (index > 0) {
            newCursor.deviceCheck[index - 1] = ""
            setCursor({...newCursor})
            detectedDevices[index - 1] = `Detecting IDE ${DEVICETYPES[index - 1].padEnd(16, " ")}... ${DEVICES[index - 1]}`;
            setDevices([...detectedDevices])
          }
          resolve();
        }, delay);
      })
    }

    for (let i = 0; i <= DEVICES.length; i++) {
      await detectDevice(i)
    }
  }

  return (
    <>
      <div className={styles.screen}>
        <div className={styles.header}>
          <img src={luminosityLogo} className={styles.energyLogo} alt="energy-star-logo"/>

            <div className={styles.brandText}>
              <img src={trophyLogo} className={styles.trophyLogo} alt="trophy-logo"/>
                <p className={styles.paragraphBreak}>
                  Trophy Modular BIOS v4.51PG, A Luminosity Star Ally
                  <br />
                  Copyright (C) 1997-2025, Trophy Software, Inc.
                </p>
            </div>
              
          <p className={styles.paragraphBreak}>(55XWUQOE) Recon r430VX PCIset(TM)</p>

          <p className={styles.paragraphBreak}>
            HEXIUM-5 CPU at 128MHz
            <br />
            Memory Test :&emsp;&emsp; <span className="memory">{memory}<span className={styles.cursor}>{cursor.memory}</span></span>
          </p>

          <p className={styles.paragraphBreak}>
            {biosExtension}
            <br />
            {copyright}<span className={styles.cursor}>{cursor.copyright}</span>
          </p>

          <div className={styles.deviceCheck}>
            {devices.map((text, index) => (
              <p key={index} className={styles.deviceCheck}>{text}<span className={styles.cursor}>{cursor.deviceCheck[index]}</span></p>
            ))}
          </div>

        </div>
        <div className={styles.footer}>
          <p>Press <span style={{"color": "white"}}>DEL</span> to enter SETUP</p>
          <p>{date}-r430VX, UMC8469-5A37GH1BC-00</p>
        </div>
      </div>
    </>
  );
}