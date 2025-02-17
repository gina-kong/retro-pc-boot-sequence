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

  const [devices, setDevices] = useState(["", "", "", ""])
  const [memory, setMemory] = useState("0")

  useEffect(() => {
    const bootSequence = async () => {
      await checkMemory();
      await checkDevices();
    }

    bootSequence();
  }, []);

  const checkMemory = async () => {
    return new Promise((resolve) => {
      const BLOCK = 18;
      const MAX = 32768;
      let mem = 0;

      for (let i = 0; i < MAX; i = i + BLOCK) {
        setTimeout(() => {
          mem = i;
          setMemory(`${mem}K`)
        }, i / BLOCK)
      }

      setTimeout(() => {
        setMemory(`${mem}K OK`)
        resolve();
      }, MAX / BLOCK - 1200)
    })
  }

  const checkDevices = async () => {
    const detectedDevices = [...devices]

    const detectDevice = async (index, label, delay = 2000) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          detectedDevices[index] = `Detecting IDE ${label}... ${DEVICES[index]}`;
          setDevices([...detectedDevices])
          resolve();
        }, delay);
      })
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))
    detectedDevices[0] = `Detecting IDE Primary Master... ${DEVICES[0]}`
    setDevices([...detectedDevices])
    console.log(devices)

    await detectDevice(1, "Primary Slave")
    await detectDevice(2, "Secondary Master")
    await detectDevice(3, "Secondary Slave")

    console.log(devices)
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
            Memory Test :&emsp;&emsp; <span className="memory">{memory}</span>
          </p>

          <p className={styles.paragraphBreak}>
            Trophy Plug and Play BIOS Extension v1.0A
            <br />
            Copyright (C) 1997, Trophy Software, Inc.
          </p>

          <div className={styles.deviceCheck}>
            {devices.map((text, index) => (
              <p key={index} className={styles.deviceCheck}>{text}</p>
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