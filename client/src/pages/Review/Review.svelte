<script>
    import { Link } from "svelte-navigator";
    import { useParams } from "svelte-navigator";
    import { onMount } from "svelte";
    import { toast } from '@zerodevx/svelte-toast'

    let user = {}
	const params = useParams();

    onMount(async () => {
        const response = await fetch("http://localhost:8080/api/applications/get/"+ $params.id, {
            method: "GET",
            credentials: "include",    
        })
            let responsePromise = await response.json()
            user = responsePromise
        }
	)

    async function updateUser(id, status) {
        const response = await fetch("http://localhost:8080/api/applications/get/"+ $params.id, {
            method: "GET",
            credentials: "include",    
        })
            let responsePromise = await response.json()
            user = responsePromise
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
            updateUser()
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
</script>


<h2>Application review</h2>
<hr>

<form>
    <p>Status: {user.status}</p>
    <label for="fname">First name</label><br>
    <input type="text" id="fname" name="fname" value={user.first_name} disabled><br>

    <label for="lname">Last name</label><br>
    <input type="text" id="lname" name="lname" value={user.last_name} disabled><br>

    <label for="email">Email</label><br>
    <input type="email" id="email" name="email" value={user.email} disabled><br>

    <label for="description">Description</label><br>
    <textarea rows="15" cols="80" value={user.description} disabled/><br>
</form>

<Link to={"/admin"}><button>Back</button></Link>
<button on:click={() => updateApplicationStatus(user.id, "approved")}>Approve</button>
<button on:click={() => updateApplicationStatus(user.id, "rejected")}>Reject</button>


<style>
    textarea,
    input {
        margin-bottom: 0.8em;
        font-size: 16px;
    
    }
    label {
        font-size: 16px;
    }
</style>