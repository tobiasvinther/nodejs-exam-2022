<script>
    //import { onMount } from "svelte/types/runtime/internal/lifecycle";
    import { Link } from "svelte-navigator";

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)

    console.log(window.location.href)

    //onMount(() => {
//
 //   })

</script>


<h2>Application review</h2>
<hr>

<form>
    <p>Status: </p>
    <label for="fname">First name</label><br>
    <input type="text" id="fname" name="fname" disabled><br>

    <label for="lname">Last name</label><br>
    <input type="text" id="lname" name="lname" disabled><br>

    <label for="email">Email</label><br>
    <input type="email" id="email" name="email" disabled><br>

    <label for="description">Description</label><br>
    <textarea rows="15" cols="80" disabled/><br>
</form>

<Link to={"/admin"}><button>Back</button></Link>
<button>Approve</button>
<button>Reject</button>


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