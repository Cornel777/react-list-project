import { Button, Link  } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import NavigationContainer from './styled/NavigationContaner'

const Layout = () => {

  return (
    <>
      <NavigationContainer>
        <Link component={RouterLink} to="/characters">
          <Button variant='outlined' color='inherit'>Character List</Button>
        </Link>
        <Link component={RouterLink} to="/favorites">
          <Button variant='outlined' color='inherit'>Favorites</Button>
        </Link>
      </NavigationContainer>
    </>
  )
}

export default Layout;