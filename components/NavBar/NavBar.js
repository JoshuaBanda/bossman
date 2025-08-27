import { useEffect, useState } from "react";
import styles from "./styles/NavBar.module.css";
import Image from "next/image";

const NavBar = ({ displayBland }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track selected


  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      //console.log("ScrollY:", currentScrollY);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        if (showNav) {
         // console.log("Scrolling down → HIDE navbar");
          setShowNav(false);
        }
      } else {
        if (!showNav) {
         // console.log("Scrolling up → SHOW navbar");
          setShowNav(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, showNav]);


  const links = [
    { name: "Home" },
    { name: "Services" },
    { name: "About" },
    { name: "Contact" },
  ];

  const navLinks = links.map((item, index) => {
    const isSelected = selectedIndex === index;

    return (
      <li
        key={index}
        id={isSelected ? "primaryColorOne" : ""}
        onClick={() => setSelectedIndex(index)}
      >
        {item.name}
      </li>
    );
  });

  return (<div
  className={styles.container}
  style={{
    opacity: showNav ? 1 : 0,
    transition: 'opacity 0.5s ease'
  }}
>

      <div className={styles.name}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          VINE <div id="primaryColorOne" style={{ marginLeft: '10px', fontWeight: 'bolder' }}>YARD</div>
        </div>
      </div>
      <div className={styles.navLinks}>
        <ul>{navLinks}</ul>
      </div>

      <div className={styles.login} >
        Register
      </div>

      <div className={styles.backgroundBlur} />
    </div>
  );
};

export default NavBar;
