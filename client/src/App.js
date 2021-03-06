import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import {blue, pink} from '@material-ui/core/colors'
import Navbar from './components/Navbar'
import Auth from './pages/Auth'
import Films from './pages/Films'
import Dashboard from "./pages/Dashboard";
import MakeReservation from "./pages/MakeReservation";
import YourReservations from "./pages/YourReservations";
import Contact from "./pages/support/Contact";

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
          <Route path="/auth" component={Auth} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/yourReservations" component={YourReservations} />
          <Route path="/reservation" component={MakeReservation} />
          <Route path="/support/contact" component={Contact}/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;