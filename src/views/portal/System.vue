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
                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-button
            class="btn-creat"
            type="success"
            icon="el-icon-plus"
            @click="dialogFormVisible = true"
        >创建</el-button>
        <el-table :data="tableData" stripe border>
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="sysName" label="系统名称" width="300"></el-table-column>
            <el-table-column prop="sysCode" label="系统编码" width="300"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        @click="handleUpdate(scope.row)"
                        type="info"
                        size="medium"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="danger"
                        size="medium"
                        icon="el-icon-delete"
                        disabled="disabled"
                        @click="handleDelete(scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <p class="page-box">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page.currentPage"
                :page-sizes="[5, 10, 50, 100]"
                :page-size="page.pageSize"
                layout="sizes, prev, pager, next"
                :total="page.totalSize"
            ></el-pagination>
        </p>
        <el-dialog
            :title="titleName"
            :visible.sync="dialogFormVisible"
            @opened="openDialog('dialogForm')"
            width="30%"
        >
            <el-form :model="dialogForm" ref="dialogForm" :rules="rules" status-icon>
                <el-input v-model="dialogForm.id" type="hidden"></el-input>
                <el-form-item label="系统编码" :label-width="formLabelWidth" prop="code">
                    <el-input v-model="dialogForm.code" :disabled="disabled" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="系统名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogSubmit">{{buttonName}}</el-button>
            </div>
        </el-dialog>
    </div>
</template> 
<script>
import * as System from "@/api/components/portal/system.js";
export default {
    name: "system",
    data() {
        var checkSysCode = (rule, value, callback) => {
            System.checkSysCodeSubmit({
                sysCode: value,
                id: this.dialogForm.id
            }).then(function(res) {
                if (res.data) {
                    callback();
                } else {
                    callback(new Error("系统编码重复，请重新输入"));
                }
            });
        };
        return {
            rules: {
                code: [
                    {
                        required: true,
                        message: "请输入系统编码",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在2-20字符",
                        trigger: "blur"
                    },
                    {
                        validator: checkSysCode,
                        trigger: ["change", "blur"]
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入系统名称",
                        trigger: "blur"
                    }
                ]
            },
            page: {
                currentPage: 1,
                pageSize: 5,
                totalSize: 0
            },
            form: {
                id: 0,
                name: "",
                code: ""
            },
            dialogForm: {
                id: 0,
                name: "",
                code: ""
            },
            tableData: [],
            dialogFormVisible: false,
            formLabelWidth: "100px",
            titleName: "创建系统",
            buttonName: "创建",
            disabled: false
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.page.pageSize = val;
            this.page.currentPage = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page.currentPage = val;
            this.getList();
        },
        onSubmit() {
            this.getList();
        },
        openDialog(form) {
            this.$refs[form].clearValidate();
        },
        async handleDelete(row) {
            try {
                const res = await System.deleteSubmit({
                    id: row.id
                });
                if (res.data != 0) {
                    this.$message({
                        message: "恭喜您，删除成功",
                        type: "success"
                    });
                }
                this.page.currentPage = 1;
                this.getList();
            } catch (error) {
                console.log(error);
            }
        },
        async handleUpdate(row) {
            console.log(row);
            this.dialogFormVisible = true;
            this.titleName = "编辑系统";
            this.buttonName = "保存";
            this.dialogForm.id = row.id;
            this.dialogForm.code = row.sysCode;
            this.dialogForm.name = row.sysName;
            this.disabled = true;
        },
        async handleCreate() {
            this.dialogFormVisible = true;
            this.titleName = "创建系统";
            this.buttonName = "创建";
            this.dialogForm.id = 0;
            this.dialogForm.code = "";
            this.dialogForm.name = "";
            this.disabled = false;
        },
        async handleDialogSubmit() {
            this.dialogFormVisible = false;
            try {
                const res = await System.dialogSubmit({
                    id: this.dialogForm.id,
                    code: this.dialogForm.code,
                    name: this.dialogForm.name
                });
                if (res.data != 0) {
                    this.$message({
                        message: "恭喜您，" + this.buttonName + "成功",
                        type: "success"
                    });
                }
                this.getList();
            } catch (error) {
                console.log(error);
            }
        },
        async getList() {
            const res = await System.listSubmit({
                code: this.form.code,
                name: this.form.name,
                currentPage: this.page.currentPage,
                pageSize: this.page.pageSize
            });
            this.tableData = res.data.list;
            this.page.currentPage = res.data.currentPage;
            this.page.pageSize = res.data.pageSize;
            this.page.totalSize = res.data.totalSize;
        }
    },
    created() {
        this.getList();
    }
};
</script>
<style lang="scss" scoped>
.btn-creat {
    margin-bottom: 20px;
}
</style>
<style lang="scss">
.page-box {
    width: 100%;
    text-align: center;
}
</style>