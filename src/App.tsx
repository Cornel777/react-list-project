import './App.css'
import Header from './components/Header/Header'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navigation from './components/Navigation/Navigation'
import CharacterDetails from './components/CharacterDetails/CharacterDetails'
import CharacterList from './components/CharacterList/CharacterList'
import Favorites from './components/Favorites/FavoritesList'
import MainContainer from './components/Navigation/styled/MainContainer'

const queryClient = new QueryClient()

function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header>
          <Navigation />
        </Header>
        <MainContainer>
          <Routes>
            <Route path="/" element={<Navigate to="/characters" replace />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route
              path="characters/:characterId"
              element={<CharacterDetails />}
            />
          </Routes>
        </MainContainer>
      </Router>
    </QueryClientProvider>
    </>
  )
}

export default App
