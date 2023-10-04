<template>
    <div>
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <!-- tìm theo các điều kiện riêng lẻ -->
            <tr style="background-color: #faf0f5;">
                <td style="width: 10%">
                    <div class="autocomplete">
                        <input class="input is-small is-danger" type="text" v-model="search" @input="onInput">
                        <div class="autocomplete-items" v-if="suggestions.length">
                            <div class="autocomplete-item" v-for="suggestion in suggestions"
                                @click="selectSuggestion(suggestion)">
                                {{ suggestion }}
                            </div>
                        </div>
                    </div>
                </td>
                <td></td>
            </tr>
        </table>



    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            countries: [
                { country: "Viet Nam" },
                { country: "Thai Lan" },
                { country: "Campuchia" },
                // Thêm các nước Châu Âu
                { country: "Pháp" },
                { country: "Đức" },
                { country: "Ý" },
            ],
            suggestions: [],
        }
    },

    methods: {
        onInput() {
            if (!this.search) {
                this.suggestions = [];
                return;
            }
            const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
            this.suggestions = this.countries
                .map((c) => c.country)
                .filter((country) => country.toLowerCase().includes(this.search.toLowerCase()))
                .map((country) => country.trim())
                .slice(0, MAX_SUGGESTIONS);
        },
        selectSuggestion(suggestion) {
            this.search = suggestion;
            this.suggestions = [];
        },
    }
}
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
}

.autocomplete {
    position: relative;
}

.autocomplete-items {
    position: absolute;
    background-color: white;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    top: 100%;
    left: 0;
    right: 0;
}

.autocomplete-item {
    padding: 4px;
    cursor: pointer;
    border-bottom: 1px solid #d4d4d4;
    font-size: small;
}

.autocomplete-item:hover {
    background-color: #e9e9e9;
}
</style>