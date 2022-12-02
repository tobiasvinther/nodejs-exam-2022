<script>
    import Card from "../../components/Card.svelte"
</script>


<h2>News</h2>
<hr>

<p>
    The Ministry of Silly Walks is responsible for all matters concerning silly walks, namely pertaining to reviewing and approving applications
    for government development grants of silly walks. On this page you can peruse examples of various styles of silly walks, as well as filling 
    out and sending applications for you own walk, if it is indeed silly.
</p>

<div class="container"> 
    <Card link="/information">
        <div class="container-box">
            <div class="text-box">
                <b>Meet an employee</b>
            </div>
            <img src="https://img.welt.de/img/bildergalerien/mobile206482893/4522509097-ci102l-w1024/18682718.jpg" alt="A silly walk" style="width: 600px; height: 480px;" class="hover02">
        </div>
    </Card>
    <Card link="/information">
        <div class="container-box">
            <div class="text-box">
                <b>A day in the life</b>
            </div>
            <img src="https://i.dailymail.co.uk/1s/2020/05/16/13/28466104-8326085-image-m-74_1589631926045.jpg" alt="A silly walk" style="width: 600px; height: 480px;">
        </div>
    </Card>
    <Card link="/information">
        <div class="container-box">
            <div class="text-box">
                <b>Christmas walks</b>
            </div>
            <img src="https://kafkadesk.org/wp-content/uploads/2019/04/20150108001086747942-original_0-2.jpg" alt="A silly walk" style="width: 600px; height: 480px;">
        </div>
    </Card>

</div>


<style>
    .container {
        display: flex;
        /*align-items: center;*/
        
        position: relative;
        text-align: center;
    }
    .container-box {
        position: relative;
        display: inline-block;
    }
    .text-box {
        color: #FFF;
        font-size: 26px;
        text-transform: uppercase;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
        position: absolute;    
        bottom: 8px;
        left: 30%;
    }
    /*
    .text-box:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
    */
    img {
        display: block;
        max-width: 100%;
        height: auto;
        object-fit: cover;
    }
    /*
    b {
        box-shadow: inset 0 0 0 0 #ffffff;
        color: #ffffff;
        margin: 0 -.25rem;
        padding: 0 .25rem;
        transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
    }
    b:hover {
        box-shadow: inset 420px 0 0 0 #ffffff;
        color: rgb(0, 0, 0);
    }
    */
</style>