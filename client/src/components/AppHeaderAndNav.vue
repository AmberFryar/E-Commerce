<template >
    <div class="home">
        <header>
            <img id='logo' src="/img/Solar-System-Geeks.png">
            <hr />
            <nav class="navBar">
                <div class="left">
                    <router-link id="homeLink" :to="{ name: 'home' }">Home</router-link>
                    <router-link id="cartLink" :to="{ name: 'shopping-cart' }" >Cart</router-link>
                </div>
                <!-- TODO- Cart message when item added to cart -->
                Message Bar
                <div class="right">
                    <router-link :to="{ name: 'logout' }" v-if="$store.state.token">Logout</router-link>
                    <router-link :to="{ name: 'login' }" v-else>Login</router-link>
                </div>
            </nav>
            <hr />
        </header>
    </div>
</template>

<script>


export default {
    data() { return {} }
}
</script>
<style>
header {
    display: grid;
    width: 100%;

    /* position: fixed; */
    /* background-co*-lor: #070727; */
    top: 0;
    left: 0;
    right: 0;
    ;
}

#logo {
    width: 100%;
    max-width: max-content;
    justify-self: center;
}

.navBar {
    display: flex;
    width: 100%;
    /* margin-top: 200px; */
    /* position: fixed; */
    justify-content: space-around;
    /* background-color: rgb(7, 7, 39); */
    color: hsl(187, 73%, 64%)
}

.left {
    margin-left: -12%;
}

.right {
    margin-right: -12%;
}

#homeLink {
    padding-right: 25px;
}

hr {
    width: 100%;
    border-color: rgb(199, 199, 102);
}
</style>