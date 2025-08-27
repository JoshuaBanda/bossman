"use client";
import { useState } from "react";
import NavBar from "./NavBar";

const NavBarWrapper = () => {
    const [displayBrandProp,setDisplayBrand]=useState(false);
    return (
        <div>
            <NavBar displayBland={displayBrandProp}/>
        </div>
    );
}
 
export default NavBarWrapper;