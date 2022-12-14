import styled from "styled-components";
import HamburgerIcon from "./HamburgerIcon";
import NavSearchIcon from "../Search/NavSearchIcon";
import NavCloseIcon from "./CloseIcon";
import NavMenuModal from "./NavModal";
import SearchCloseIcon from "../Search/SearchCloseIcon";
import NavSearchModal from "../Search/SearchModal";
import SiteLogo from "./SiteLogo";

// import Logo from "../../../../assets/site-logo/1Source.svg";

import { useState } from "react";

export const NavStyles = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100vw;
  height: 10vh;
  padding: 0 2.5rem;
  background-color: var(--primary);
`;

export const Title = styled.h1`
  color: var(--font-primary-color);
  font-size: 3rem;
`;

export const TitleSpan = styled.span`
  font-size: 3rem;
  color: var(--secondary);
`;

function NavMenu() {
  // States for menu and search modals
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Functions to handle menu and search open and close
  function menuModalOpenHandler() {
    setIsMenuModalOpen(true);
    setIsSearchModalOpen(false);
  }

  function menuModalCloseHandler() {
    setIsMenuModalOpen(false);
  }

  function searchModalOpenHandler() {
    setIsSearchModalOpen(true);
    setIsMenuModalOpen(false);
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
  }

  function searchModalCloseHandler() {
    setIsSearchModalOpen(false);
    document.documentElement.style.overflow = "scroll";
    document.body.scroll = "yes";
  }

  return (
    <NavStyles>
      {isMenuModalOpen ? (
        <NavCloseIcon aria-label="Close the menu" menuModalCloseHandler={menuModalCloseHandler} />
      ) : (
        <HamburgerIcon menuModalOpenHandler={menuModalOpenHandler} />
      )}
      {isMenuModalOpen && <NavMenuModal />}
      <SiteLogo />
      {isSearchModalOpen ? (
        <SearchCloseIcon searchModalCloseHandler={searchModalCloseHandler} />
      ) : (
        <NavSearchIcon aria-label="search one source" searchModalOpenHandler={searchModalOpenHandler} />
      )}
      {isSearchModalOpen && (
        <NavSearchModal searchModalCloseHandler={searchModalCloseHandler} />
      )}
    </NavStyles>
  );
}

export default NavMenu;
