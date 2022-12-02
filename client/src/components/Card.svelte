<script>
    import { Link } from "svelte-navigator"

    export let link
</script>


<Link to={link}>
    <div class="card">
        <slot></slot>
    </div>
</Link>


<style>
    .card {
        background: #fff;
        padding: 0px;
        margin: 0.4em;
        border-radius: 6px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);  
        
        transition: transform .18s;
    }
    .card:hover {
        transform:translateY(-10px)
    }
</style>