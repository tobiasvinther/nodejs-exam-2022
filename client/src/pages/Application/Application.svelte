<script>
    import { toast } from "@zerodevx/svelte-toast"
    import {navigate} from "svelte-navigator"

    let fname = "Tobias"
    let lname = "Vinther"
    let email = "mail@mail.com"
    let description = "I lay on the floor and wriggle myself forward, like a snake. I'm not sure if it can even be considered a walk, or it should be classified as a 'slither'."
    let amount = 10000

    async function submitApplication() {
        const authenticateResponse = await fetch("http://localhost:8080/api/authenticate1", {
            method: "GET",
            credentials: "include",    
        })

        console.log(authenticateResponse.status)
        if(authenticateResponse.status === 200) {
            toast.push("Employees cannot apply for grants")
            return
        }

        const response = await fetch("http://localhost:8080/api/applications", {
            method: "POST",
            body: JSON.stringify({
                firstName: fname,
                lastName: lname,
                email: email,
                text: description,
                amount: amount
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
        if(response.status === 200) {
            toast.push("Application sent", {
                theme: {
                    "--toastColor": "black",
                    "--toastBackground": "rgb(110, 238, 93)",
                } 
            })
        navigate("/", { replace: false });
        } else {
            console.log("Application not sent")
        }      

    }
</script>

<h2>Apply for government grant</h2>
<hr>
<p>Put in the required details below to apply for a government grant to develop your silly walk. Please note that only walks that are deemed to already be relatively silly and thus has
    the potential to be developed into a particularly silly walk, will be eligible for a grant. If approved, the size of the grant will be determined by the ministry based on a number of factors.
</p>

<form>
    <label for="fname">First name</label><br>
    <input type="text" id="fname" name="fname" bind:value={fname}><br>

    <label for="lname">Last name</label><br>
    <input type="text" id="lname" name="lname" bind:value={lname}><br>

    <label for="email">Email</label><br>
    <input type="email" id="email" name="email" bind:value={email}><br>

    <label for="description">Description</label><br>
    <textarea rows="15" cols="80" bind:value={description} placeholder="Describe your silly walk" /><br>

    <label for="amount">Amount</label><br>
    £<input type="number" id="amount" name="amount" bind:value={amount} style="margin-left: 4px;"><br>

    <button type="submit" on:click|preventDefault={submitApplication}> Submit </button>
</form>


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