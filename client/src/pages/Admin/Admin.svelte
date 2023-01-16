<script>
    import { onMount } from "svelte"
    import { navigate } from "svelte-navigator"
    import { toast } from "@zerodevx/svelte-toast"
    import { Link } from "svelte-navigator"
    import { io } from "socket.io-client"

    const socket = io("http://127.0.0.1:8080")

    let allowed = false
    let applicationList = []
    let originalApplicationList = []
    let filterStatus = "all"
    let message = ""

    onMount(async () => {
        reloadApplicationList()
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
            applicationList = Object.values(responsePromise);
            originalApplicationList = applicationList
        }
	}

    async function updateApplicationStatus(id, status) {
        const response = await fetch(`http://localhost:8080/api/applications/${id}`, {
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
        const response = await fetch(`http://localhost:8080/api/applications/${id}`, {
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
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function broadcastMessage() {
        socket.emit("newMessage", {data: message})
    }
</script>


{#if allowed}
<h2>List of applications</h2>
<hr>

<p><i>Only employees are allowed to access this page. If you somehow accessed this site without being an employee, kindly turn yourself in at the nearest police station.</i></p>

<span>Filter</span>
<select class="filterSelect" bind:value={filterStatus} on:change={() => filterTable(filterStatus)} >
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
      <th>Amount</th>
      <th>Status</th>
      <th></th>
    </tr>
    {#each applicationList as application}
    <tr>
      <td>{application.id}</td>
      <td>{application.creation_date}</td>
      <td>{application.first_name} {application.last_name}</td>
      <td>£{application.amount}</td>
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

<br>
<span>
    <p>Broadcast a message to all online users</p>
    <input type="text" id="message" name="message" bind:value={message} >
    <button style="float: none;" on:click={broadcastMessage}>Send</button>
</span>


<style>
    .filterSelect {
        width: 130px;
        height: 30px;
        font-size: 16px;
        border: 1px solid #dddddd;
        margin-bottom: 11px;
    }
    input {
        width: 400px;
        height: 35px;
        font-size: 16px;
        border: 1px solid #dddddd;
        margin-bottom: 11px;
        margin-right: 4px;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
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