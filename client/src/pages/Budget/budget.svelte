<script>
    import { onMount } from "svelte"
    import { toast } from "@zerodevx/svelte-toast"
    import { navigate } from "svelte-navigator"

    let applicationList = []
    const totalBudget = 300000 //change this to come from the backend
    let totalExpenses = 0

    onMount(async () => {
        loadApprovedApplications()
    })

    async function loadApprovedApplications() {
        const response = await fetch("http://localhost:8080/api/approved", {
            method: "GET",
            credentials: "include",    
        })

        if(response.status === 401) {
            toast.push("Log in to see this page")
            navigate("/login", { replace: false })
        } else {
            let responsePromise = await response.json()
            applicationList = responsePromise
            applicationList = Object.values(responsePromise);
            applicationList.forEach((application => totalExpenses = totalExpenses += application.amount))
        }
	}
</script>


<h2>Budget</h2>
<hr>
<p>This page is for employees only.</p>

<table>
    <th>Approved applications</th>
    <th>Amount</th>
    {#each applicationList as application}
    <tr>
        <td>{application.first_name} {application.last_name}</td>
        <td>£{application.amount}</td> 
    </tr>
    {/each}
</table>

<br>
<br>

<table style="width: 33%; float:right; border: 0px solid;">
    <tr>
        <td><b>Total budget</b></td>
        <td>£{totalBudget}</td> 
    </tr>
    <tr>
        <td><b>Total expenses</b></td>
        <td>£{totalExpenses}</td> 
    </tr>
    <tr>
        <td><b>Balance</b></td>
        <td>£{totalBudget - totalExpenses}</td> 
    </tr>
</table>


<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
</style>