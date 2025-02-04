import { FunctionComponent } from 'react';
import HeaderContainer from './styled/HeaderContainer';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: FunctionComponent<HeaderProps> = ({children}) => {
  return (
    <HeaderContainer>
      <img 
        src='https://images.seeklogo.com/logo-png/13/1/star-wars-logo-png_seeklogo-131743.png' 
        loading='lazy' 
        alt='Star Wars Logo'
      >
      </img>
      {children}
    </HeaderContainer>
  );
}

export default Header;
