<script>
  import Router from 'svelte-spa-router'
  import Home from './routes/Home.svelte'
  import UserCreate from './routes/UserCreate.svelte'
  import UserLogin from './routes/UserLogin.svelte'
  import Navigation from "./components/Navigation.svelte"

  const routes = {
    '/': Home,
    '/user-create': UserCreate,
    '/user-login': UserLogin,
  }
</script>

<Navigation />
<Router {routes} />