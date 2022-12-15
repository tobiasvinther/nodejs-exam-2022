<script>
    import { toast } from "@zerodevx/svelte-toast"

    let name = ""
    let email = ""
    let text = ""

    async function sendEmail() {
        const response = await fetch("http://localhost:8080/api/contact", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                text: text,
            }),
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })

        const unpackedResult = await response.json()
        name = "";
        text = "";
        toast.push("Message sent", {
            theme: {
                "--toastColor": "black",
                "--toastBackground": "rgb(0, 255, 0)",
            }
        })

        console.log("Email link:", unpackedResult.Link)

        /*
        if (window.confirm('Click ok to view email in a new tab'))
            {
            window.open(unpackedResult.Link, '_blank')
            };
        */
    }
</script>


<h2>Contact</h2>
<hr>
<p>Inquires for the Ministry of Silly Walks.</p>

<form>
    <label for="fname">Name</label><br>
    <input type="text" id="fname" name="fname" bind:value={name}><br>

    <label for="email">Email</label><br>
    <input type="email" id="email" name="email" bind:value={email}><br>

    <label for="description">Message</label><br>
    <textarea rows="15" cols="80" bind:value={text} placeholder="Type you inquiry here" /><br>

    <button type="submit" on:click|preventDefault={sendEmail}> Submit </button>
</form>

<!--
<label>
    Name <input type="text" name="name" bind:value={name} />
</label>

<br />
<textarea rows="18" cols="36" bind:value={text} />
<br /><br />

<button type="submit" on:click|preventDefault={sendEmail}> SUBMIT </button>
-->

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