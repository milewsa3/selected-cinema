import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import {blue, pink, red} from '@material-ui/core/colors'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Films from './pages/Films'
import Login from "./pages/Login";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
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
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;