<template>
    <el-container>
        <el-container>
            <el-aside width="230px">
                <Menu/>
            </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Terminarz</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-calendar>
                        <template
                                slot="dateCell"
                                slot-scope="{date, data}">
                            <p :class="data.isSelected ? 'is-selected' : ''">
                                {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                            </p>
                        </template>
                    </el-calendar>
                </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Menu from "@/components/Account/Menu";
    export default {
        components: {
            Menu
        },
        name: "Calendar",
        methods: {
        },
        computed: {
        },
    }
</script>

<style scoped>
    .is-selected {
        color: #1989FA;
    }
</style>
