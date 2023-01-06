<script>
    import { onMount } from "svelte"
    import { navigate } from "svelte-navigator"
    import { toast } from '@zerodevx/svelte-toast'
    import { Link } from "svelte-navigator"
    import { select_option } from "svelte/internal";

    let allowed = false
    let applicationList = []
    let originalApplicationList = []

    let filterStatus = "all"

    onMount(async () => {
        reloadApplicationList()
        /*
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
            originalApplicationList = applicationList
            //console.log(applicationList)
            //console.log(typeof(applicationList))
        }
        */
	})

    async function reloadApplicationList() {
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
            originalApplicationList = applicationList
            //console.log(applicationList)
            //console.log(typeof(applicationList))
        }
	}

    async function updateApplicationStatus(id, status) {
        const response = await fetch(`http://localhost:8080/api/applications/update/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                status: status
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
        if(response.status === 200) {
            reloadApplicationList()
            toast.push("Application status updated", {
            theme: {
                "--toastColor": "black",
                "--toastBackground": "rgb(110, 238, 93)",
            }
            
        })
        } else {
            console.log("Something went wrong")
        }
    }
    
    async function deleteApplication(id) {
        const response = await fetch(`http://localhost:8080/api/applications/delete/${id}`, {
            method: "DELETE",
        })
        if(response.status !== 200) {
            toast.push("Something went wrong")
        } else {
            toast.push("Application deleted")
            reloadApplicationList()
        }
        
    }

    function filterTable(status) {
        if(status === "all") {
            reloadApplicationList()
            return
        } 
        applicationList = originalApplicationList
        applicationList = applicationList.filter(application => application.status === status)
        //applicationList = applicationList.map(application => application.status === status)
        console.log(status)
        console.log(applicationList)
        
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>


{#if allowed}
<h2>List of applications</h2>
<hr>

<p><i>Only employees are allowed to access this page.</i></p>

<p>Filter</p>
<select bind:value={filterStatus} on:change={() => filterTable(filterStatus)} >
    <option value="all">All</option>
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>
</select>

<table>
    <tr>
      <th>Id</th>
      <th>Date</th>
      <th>Name</th>
      <th>Status</th>
      <th></th>
    </tr>
    {#each applicationList as application}
    <tr>
      <td>{application.id}</td>
      <td>{application.creation_date}</td>
      <td>{application.first_name} {application.last_name}</td>
      <td>{capitalizeFirstLetter(application.status)}
        {#if application.status === "approved"}
            <span class="dot" style="background-color: limegreen;"></span>
            {:else}
                {#if application.status === "rejected"}
                <span class="dot" style="background-color: red;"></span>
            {:else}
            <span class="dot"></span>
            {/if}
        {/if}
      </td>
      <td>
        <button on:click={() => updateApplicationStatus(application.id, "approved")} disabled={application.status==="approved"} class="button-approve">Approve</button>
        <button on:click={() => updateApplicationStatus(application.id, "rejected")} disabled={application.status==="rejected"} class="button-reject">Reject</button>
        <button on:click={() => deleteApplication(application.id)} class="button-delete">Delete</button>
        <Link to={"/review/" + application.id} class="link-review"><button class="button-review">Review</button></Link></td>
    </tr>
    {/each}
</table>
{/if}


<style>
    select {
        width: 130px;
        height: 30px;
        font-size: 16px;
        border: 1px solid #dddddd;
        margin-bottom: 11px;
    }
    .link-review {
        color: black;
    }
    ul {
        list-style: none;        
        padding-left: 0%;
        margin-top: 30px;
    }
    li {
        margin-bottom: 3px;
    }
    table {
        /*font-family: arial, sans-serif;*/
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    tr:nth-child(even) {
        /*background-color: #dddddd;*/
    }
    button {
        float: right;
        margin-right: 6px;
    }
    .button-approve {
        background-color: limegreen;
    }
    .button-approve:disabled {
        background-color: rgba(50, 205, 50, 0.5);
    }
    button:hover {
        transition: border-color 0s;
        transition: transform .15s;
        transform: scale(1.085);
    }
    .button-review {
        float: left;
    }
    .button-reject {
        background-color:red;
        color: white;
    }
    .button-reject:disabled {
        background-color:rgba(255, 0, 0, 0.5);
        color: rgba(255, 255, 255, 0.5);
    }
    .button-delete {
        background-color:rgb(20, 20, 20);
        color: white;
    }
    .dot {
        height: 18px;
        width: 18px;
        background-color: #bbb;
        border-radius: 50%;
        float: right;
    }
    
</style>