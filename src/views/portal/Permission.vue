<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="权限名称">
                <el-input v-model="form.name" placeholder="权限名称"></el-input>
            </el-form-item>
            <el-form-item label="权限编码">
                <el-input v-model="form.code" placeholder="权限编码"></el-input>
            </el-form-item>
            <el-form-item label="所属菜单" :label-width="formLabelWidth">
                <el-cascader
                    v-model="value"
                    :options="menuData"
                    :props="{ expandTrigger: 'hover'}"
                    @change="handleChange"
                    clearable
                ></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-button class="btn-creat" type="success" icon="el-icon-plus" @click="handleCreate">创建</el-button>
        <el-table :data="tableData" stripe border>
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="permName" label="权限名称" width="280"></el-table-column>
            <el-table-column prop="permCode" label="权限编码" width="480"></el-table-column>
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
        <el-dialog :title="titleName" :visible.sync="dialogFormVisible" @opened="openDialog('dialogForm')" width="30%">
            <el-form :model="dialogForm" ref="dialogForm" :rules="rules" status-icon>
                <el-input v-model="dialogForm.id" type="hidden"></el-input>
                <el-form-item label="权限编码" :label-width="formLabelWidth" prop="code">
                    <el-input v-model="dialogForm.code" :disabled="disabled" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属菜单" :label-width="formLabelWidth">
                    <el-cascader
                        v-model="dialogValue"
                        :options="menuData"
                        style="width: 100%"
                        :props="{ expandTrigger: 'hover'}"
                        @change="handleChange"
                        clearable
                        :disabled="disabled"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="菜单项" :label-width="formLabelWidth">
                    <el-switch v-model="ifMenu" :disabled="disabled"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogSubmit('dialogForm')">{{buttonName}}</el-button>
            </div>
        </el-dialog>
    </div>
</template> 
<script>
import * as Perm from "@/api/components/portal/perm.js";
import * as Menu from "@/api/components/portal/menu.js";
export default {
    data() {
      var checkPermCode = (rule, value, callback) => {
            Perm.checkPermCodeSubmit({
                permCode: value,
                id: this.dialogForm.id
            }).then(function(res){
                if(res.data){
                    callback()
                }else{
                    callback(new Error("权限编码重复，请重新输入"))
                }
            })
        };
        return {
          rules: {
                code: [
                    {
                        required: true,
                        message: "请输入权限编码",
                        trigger: "blur"
                    },
                    {
                        min: 10,
                        max: 100,
                        message: "长度在10-100字符",
                        trigger: "blur"
                    },
                    {
                        validator: checkPermCode,
                        trigger: ['change', 'blur']
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入权限名称",
                        trigger: "blur"
                    }
                ]
            },
            dialogValue: [],
            value: [],
            menuData: [],
            ifMenu: false,
            page: {
                currentPage: 1,
                pageSize: 5,
                totalSize: 0
            },
            form: {
                id: 0,
                name: "",
                code: "",
                menuCode: ""
            },
            dialogForm: {
                id: 0,
                name: "",
                code: "",
                menuCode: "",
                sysCode: "",
                menuItems: ""
            },
            tableData: [],
            dialogFormVisible: false,
            formLabelWidth: "100px",
            titleName: "创建权限",
            buttonName: "创建",
            disabled: false
        };
    },
    methods: {
        async getMenuData() {
            try {
                const res = await Menu.getPermMenuDataSubmit({});
                console.log(res);
                this.menuData = res.data;
            } catch (error) {
                console.log(error);
            }
        },
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
        openDialog(form){
            this.$refs[form].clearValidate()
        },
        handleChange(value) {
            console.log(value);
        },
        async handleDelete(row) {
            //先判断是否可以删除权限
            try {
                const result = await Perm.judgeDeleteSubmit({
                    permCode: row.permCode
                })
                console.log(result)
                if(result.data == false){
                    this.$message.error("请先清除权限与角色的绑定关系，再删除此权限")
                    return
                }
                const res = await Perm.deleteSubmit({
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
            this.titleName = "编辑权限";
            this.buttonName = "保存";
            this.dialogForm.id = row.id;
            this.dialogForm.code = row.permCode;
            this.dialogForm.name = row.permName;
            this.dialogForm.menuCode = row.menuCode;
            if (row.ifMenu == 1) {
                this.ifMenu = true;
            }
            if (row.ifMenu == 2) {
                this.ifMenu = false;
            }
            this.disabled = true;
            this.dialogValue = row.menuItems.split(",");
        },
        async handleCreate() {
            this.dialogFormVisible = true;
            this.titleName = "创建权限";
            this.buttonName = "创建";
            this.dialogForm.id = 0;
            this.dialogForm.code = "";
            this.dialogForm.name = "";
            this.disabled = false;
            this.dialogValue = [];
            this.ifMenu = false;
        },
        async handleDialogSubmit(dialogForm) {
          await this.$refs[dialogForm].validate(valid => {
            if (valid) {
                this.dialogFormVisible = false;
                this.dialogForm.sysCode = this.dialogValue[0];
                this.dialogForm.menuCode = this.dialogValue[
                    this.dialogValue.length - 1
                ];
                var ifMenuParam = "";
                if (this.ifMenu) {
                    ifMenuParam = 1;
                } else {
                    ifMenuParam = 2;
                }
                try {
                    const res = Perm.dialogSubmit({
                        id: this.dialogForm.id,
                        code: this.dialogForm.code,
                        name: this.dialogForm.name,
                        ifMenu: ifMenuParam,
                        menuCode: this.dialogForm.menuCode,
                        sysCode: this.dialogForm.sysCode,
                        menuItems: this.dialogValue.join(",")
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
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        async getList() {
            if (this.value.length != 0) {
                this.form.menuCode = this.value[this.value.length - 1];
            }
            try {
                const res = await Perm.listSubmit({
                    code: this.form.code,
                    name: this.form.name,
                    menuCode: this.form.menuCode,
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize
                });
                this.tableData = res.data.list;
                this.page.currentPage = res.data.currentPage;
                this.page.pageSize = res.data.pageSize;
                this.page.totalSize = res.data.totalSize;
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getList();
        this.getMenuData();
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
