<script>
	import { Router, Link, Route } from "svelte-navigator"
  import { SvelteToast, toast } from '@zerodevx/svelte-toast'
  import { SHOW_LOGIN } from "./store/globals.js"
  
  import Home from "./pages/Home/Home.svelte"
  import Signin from "./pages/Signin/Signin.svelte"
  import Admin from "./pages/Admin/Admin.svelte"
  import Contact from "./pages/Contact/Contact.svelte"
  import Application from "./pages/Application/Application.svelte"
  import Information from "./pages/Information/Information.svelte"


  async function logOut() {
    await fetch("http://localhost:8080/api/logout", {
      credentials: "include"
      })
      toast.push("Logged out")
      SHOW_LOGIN.set(true)
  }
</script>

<Router>
  <nav>
    <ul>
      <span class="link-item">
        <Link to="/">Home</Link>
      </span>
      <span class="link-item">
        <Link to="/application">Apply</Link>
      </span>
      <span class="link-item">
        <Link to="/information">Information</Link>
      </span>
      <span class="link-item">
        <Link to="/contact">Contact</Link>
      </span>
      {#if $SHOW_LOGIN === true}
      <span class="link-item">
        <span class="login">
          <Link to="/login">Log in</Link>
        </span>
      </span>
      {/if}
      {#if $SHOW_LOGIN === false}
      <span class="link-item">
        <Link to="/admin">Admin</Link>
      </span>
      <span class="link-item">
        <span class="login">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <Link to=""on:click={logOut}>Log out</Link>
        </span>
      </span>
      {/if}
    </ul>
  </nav>

  <div class="title">
    <Link to="/"><img src="https://www.kindpng.com/picc/m/446-4467798_ministry-of-silly-walking-ministry-of-silly-walks.png" alt="Ministry Of Silly Walking - Ministry Of Silly Walks Logo, HD Png" width="64" class="logo"></Link>
    <h2>The Ministry of Silly Walks</h2>
  </div>
  <hr>

  <div>
      <Route path="/" primary={false}><Home /></Route>
      <Route path="/login" primary={false}><Signin /></Route>
      <Route path="/admin" primary={false}><Admin /></Route>
      <Route path="/contact" primary={false}><Contact /></Route>
      <Route path="/application" primary={false}><Application /></Route>
      <Route path="/information" primary={false}><Information /></Route>
  </div>
</Router>

<SvelteToast />


<style>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: rgb(255, 255, 255);
	}
  .link-item {
    padding-left: 6px;
    padding-right: 6px;
    text-transform: uppercase;
  }
  nav {
    padding-bottom: 1.5em;
  }
  .login {
    float: right; 
  }
  hr {
    margin-top: 0px;
    border: 2px solid rgb(0, 0, 0);
  }
  .title {
    font-family: 'Times New Roman', Times, serif;
    font-size: 28px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }
  .logo {
    float: left;
    padding-right: 10px;   
  }

</style>

