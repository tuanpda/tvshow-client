<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>stt</th>
                    <th @click="sortTable('malosanxuat')">malosanxuat</th>
                    <th @click="sortTable('tensanpham')">tensanpham</th>
                    <th @click="sortTable('ttqt')">ttqt</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in paginatedTable" :key="index">
                    <td>{{ startIndex + index + 1 }}</td>
                    <td>{{ item.malosanxuat }}</td>
                    <td>{{ item.tensanpham }}</td>
                    <td>{{ item.ttqt }}</td>
                </tr>
            </tbody>
        </table>
        <div class="pagination"> <button @click="changePage(1)" :disabled="currentPage === 1">First</button> <button
                @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Prev</button> <button
                v-for="page in pages" @click="changePage(page)" :class="{ active: page === currentPage }"> {{ page }}
            </button> <button @click="changePage(currentPage + 1)" :disabled="currentPage === pageCount">Next</button>
            <button @click="changePage(pageCount)" :disabled="currentPage === pageCount">Last</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lokehoach: [
                { malosanxuat: "A-BDN-LOS1", tensanpham: "A-BDN", ttqt: 1 },
                { malosanxuat: "A-BDN-LOS1", tensanpham: "A-BDN", ttqt: 2 },
                { malosanxuat: "A-BDN-LOS1", tensanpham: "A-BDN", ttqt: 4 },
                { malosanxuat: "A-BDN-LOS1", tensanpham: "A-BDN", ttqt: 3 },
                { malosanxuat: "A-BCN-LOS2", tensanpham: "A-BDN", ttqt: 1 },
                { malosanxuat: "A-BCN-LOS2", tensanpham: "A-BDN", ttqt: 2 },
                { malosanxuat: "A-BCN-LOS2", tensanpham: "A-BDN", ttqt: 4 },
                { malosanxuat: "A-BCN-LOS3", tensanpham: "A-BDN", ttqt: 3 },
            ],
            sortDirection: 1,
            sortKey: "ttqt",
            currentPage: 1,
            itemsPerPage: 3,
            // pageCount: 0
        };
    },

    watch: {
        itemsPerPage() {
            this.currentPage = 1;
        },
    },
    
    computed: {
        sortedTable() {
            return this.lokehoach.sort((a, b) => {
                if (a[this.sortKey] < b[this.sortKey]) return -1 * this.sortDirection;
                if (a[this.sortKey] > b[this.sortKey]) return 1 * this.sortDirection;
                return 0;
            });
        },
        pageCount() {
            return Math.ceil(this.sortedTable.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        endIndex() {
            return this.startIndex + this.itemsPerPage;
        },
        paginatedTable() {
            return this.sortedTable.slice(this.startIndex, this.endIndex);
        },
        pages() {
            const startPage = Math.max(1, this.currentPage - 2);
            const endPage = Math.min(this.pageCount, this.currentPage + 2);

            let pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (startPage > 1) {
                pages.unshift("...");
                pages.unshift(1);
            }

            if (endPage < this.pageCount) {
                pages.push("...");
                pages.push(this.pageCount);
            }

            return pages;
        },
    },
    methods: {
        sortTable(key) {
            if (key === this.sortKey) {
                this.sortDirection *= -1;
            } else {
                this.sortDirection = 1;
                this.sortKey = key;
            }
        },
        changePage(pageNumber) {
            if (pageNumber >= 1 && pageNumber <= this.pageCount) {
                this.currentPage = pageNumber;
            }
        },

    },
};
</script>

<style scoped> 
.pagination {
     display: flex;
     justify-content: center;
     margin-top: 20px;
 }

 .pagination button {
     margin: 0 5px;
     padding: 5px 10px;
     border: none;
     background-color: #ccc;
     color: #fff;
     cursor: pointer;
 }

 .pagination button.active {
     background-color: #007bff;
 }
</style>