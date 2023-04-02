import {Route, Switch} from 'react-router-dom'

import Header from './components/Header/index'

import Home from './components/Home'

import CourseItemDetails from './components/Course Item Details/index'

import NotFound from './components/Not Found/index'

import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/courses/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
