import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import {blue, pink, red} from '@material-ui/core/colors'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Films from './pages/Films'
import Login from "./pages/Login";
import UserAuth from './components/UserAuth'
import {checkUser} from "./utils/auth/checkUser";
import Logout from "./pages/Logout";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
})


function App() {
  // const location = useLocation()
  // useEffect(checkUser, [location])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <UserAuth>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/films">
              <Films />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
          </Switch>
        </UserAuth>
      </Router>
    </ThemeProvider>
  );
}

export default App;