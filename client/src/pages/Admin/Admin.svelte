<script>
    import { onMount } from "svelte"
    import { navigate } from "svelte-navigator"
    import { toast } from '@zerodevx/svelte-toast'
    import Application from "../Application/Application.svelte";

    let allowed = false
    let applicationList = []

    onMount(async () => {
        const response = await fetch("http://localhost:8080/api/authenticate", {
            method: "GET",
            credentials: "include",    
        })

        if(response.status === 401) {
            toast.push("Log in to see this page")
            navigate("/login", { replace: false })
        } else {
            allowed = true
            let responsePromise = await response.json()
            applicationList = responsePromise
            //applicationList = Object.entries(applicationList);
            applicationList = Object.values(responsePromise);
            console.log(applicationList)
            console.log(typeof(applicationList))
        }
	})
</script>


{#if allowed}
<h2>List of applications</h2>
<hr>

<p><i>Only employees are allowed to access this page.</i></p>

<ul>
    {#each applicationList as application}
    <li>
      <a href="">{application.creation_date} {application.first_name} {application.last_name}</a>  
    </li>
    {/each}
</ul>
{/if}


<style>
    ul {
        list-style: none;        
        padding-left: 0%;
        margin-top: 30px;
    }
    li {
        margin-bottom: 3px;
    }
</style>