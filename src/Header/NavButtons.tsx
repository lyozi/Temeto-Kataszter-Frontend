import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate, useLocation } from "react-router-dom";

interface NavButtonsProps {
  onClose: () => void;
  loggedUserRole: string;
}

const buttonStyles = {
  color: "gray.200",
  fontSize: { base: "200%", md: "100%", lg: "120%", xl: "200%" },
  size: "lg",
  height: '45px',
  mr: '10px',
  variant: "ghost",
  _hover: { bg: 'gray.600', color: "white" },
  _active: { bg: 'gray.600' }
};

const NavButtons: React.FC<NavButtonsProps> = ({ onClose, loggedUserRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (url: string) => {
    navigate(url);
    onClose();
  }

  return (
    <>
      <Button
        {...buttonStyles}
        onClick={() => handleClick("/lista_inmormantati")}
        isActive={location.pathname === "/lista_inmormantati"}
      >
        Elhunytak
      </Button>
      <Button
        {...buttonStyles}
        onClick={() => handleClick("/harta")}
        isActive={location.pathname === "/harta"}
      >
        Térkép
      </Button>
      <Button
        {...buttonStyles}
        onClick={() => handleClick("/")}
        isActive={location.pathname === "/"}
      >
        Temetők
      </Button>
      <Button
        {...buttonStyles}
        onClick={() => handleClick("/informatii")}
        isActive={location.pathname === "/informatii"}
      >
        Információ
      </Button>
      <Button
        {...buttonStyles}
        onClick={() => handleClick("/login")}
        isActive={location.pathname === "/login-register"}
      >
        Bejelentkezés
      </Button>
      {
        (loggedUserRole == "Admin") &&
        <Button
          {...buttonStyles}
          onClick={() => handleClick("/manage")}
          isActive={location.pathname === "/manage"}
        >
          Temető adminisztrálása
        </Button>
      }
    </>
  );
};

export default NavButtons;
