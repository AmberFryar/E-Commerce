<template>
    <div id="searchBar">
        <input id="searchField" name="searchField" class="input-field" type="text" v-model="searchString"
            @keydown="checkEnter" @input="input" placeholder="Search...">
        <i id="searchIcon" class="fa-solid fa-magnifying-glass"></i>
    </div>
</template>

<script>
export default {
    props: {
        delay: {
            type: Number,
            default: 1000,
        },
    },
    data() {
        return {
            searchString: "",
            timeoutHandle: 0,
            lastSearchString: "",
        };
    },
    methods: {
        input() {
            this.clearTimeout();
            this.timeoutHandle = window.setTimeout(() => {
                this.tryEmit();
            }, this.delay);
        },

        checkEnter(e) {
            if (e.key === "Enter") {
                this.clearTimeout();   
                this.tryEmit();
            }
        },

        clearTimeout() {
            if (this.timeoutHandle !== 0) {
                window.clearTimeout(this.timeoutHandle);
                this.timeoutHandle = 0;
            }
        },
        tryEmit() {
            if (this.searchString !== this.lastSearchString) {
                this.$emit("searchValueChange", this.searchString);
                this.lastSearchString = this.searchString;
            }
        }
    },
}
</script>
<style >
    .input-field {
        background-color: rgb(204, 204, 176);
    }
</style>