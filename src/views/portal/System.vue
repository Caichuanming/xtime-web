<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="系统名称">
                <el-input v-model="form.name" placeholder="系统名称"></el-input>
            </el-form-item>
            <el-form-item label="系统编码">
                <el-input v-model="form.code" placeholder="系统编码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe border>
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="name" label="系统名称" width="180"></el-table-column>
            <el-table-column prop="code" label="系统编码" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="info" size="medium" icon="el-icon-setting">编辑</el-button>
                    <el-button type="danger" size="medium" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template> 

<script>
export default {
    name: "system",
    data() {
        return {
            form: {
                name: "",
                code: ""
            },
            tableData: [
                {
                    id: "1",
                    name: "平台系统",
                    code: "portal"
                },
                {
                    id: "2",
                    name: "核心系统",
                    code: "cmc"
                },
                {
                    id: "3",
                    name: "票务系统",
                    code: "ticket"
                },
                {
                    id: "4",
                    name: "智能排片系统",
                    code: "ifs"
                }
            ]
        };
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
        handleClick(row) {
            console.log(row);
        }
    }
};
</script>
