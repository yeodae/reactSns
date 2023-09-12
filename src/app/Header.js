import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import './header.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuBone } from "react-icons/lu";
import { SlStar } from "react-icons/sl";
import { GoPeople } from "react-icons/go";

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div>
      <div>
        <span className='h1' onClick={toggleMenu}>
          𝑰𝒏𝒔𝒅𝒐𝒈𝒓𝒂𝒎 <RiArrowDropDownLine />
        </span>
        <a href="/dm">
          <LuBone className="headerIcon" />
        </a>
        <a href="/heart">
          <FiHeart className="headerIcon" />
        </a>        
      </div>

      <div className={`menu-container ${isMenuVisible ? 'visible' : ''}`}>
        <ul className="menu-list">
          <li className='headerList'><a href="#">팔로잉 <GoPeople className="listIcon"/></a></li>
          <li className='headerList'><a href="#">즐겨찾기<SlStar className="listIcon"/></a></li>
        </ul>
      </div>

      <div className={`icon-container ${isMenuVisible ? 'menu-visible' : ''}`}>       
      </div>
    </div>
  );
}
