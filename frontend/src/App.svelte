<script>
  import Router from 'svelte-spa-router'
  import Home from './routes/Home.svelte'
  import UserCreate from './routes/UserCreate.svelte'
  import UserLogin from './routes/UserLogin.svelte'
  import Navigation from "./components/Navigation.svelte"
  import DateSelect from './routes/DateSelect.svelte'
  import Survey from './routes/Survey.svelte'
  import SpotSelect from './routes/SpotSelect.svelte'
  import Lodging from './routes/Lodging.svelte'

  const routes = {
    '/': Home,
    '/user-create': UserCreate,
    '/user-login': UserLogin,
    '/date-select':DateSelect,
    '/survey':Survey,
    '/spot-select':SpotSelect,
    '/lodging':Lodging,
  }
</script>

<Navigation />
<Router {routes} />