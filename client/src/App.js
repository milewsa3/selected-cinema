import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import {blue, pink} from '@material-ui/core/colors'
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
          <Route exact path="/" component={Home} />
          <Route path="/films" component={Films} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;