<template>
    <div>
        <el-button
            class="btn-creat"
            type="success"
            icon="el-icon-plus"
            round
            size="small"
            @click="handleCreate"
        >创建</el-button>
        <div class="el-tree-default">
            <el-tree :data="menuData" node-key="id" accordion :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            round
                            size="mini"
                            @click="() => handleUpdate(data)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            round
                            size="mini"
                            @click="() => handleRemove(node, data)"
                        ></el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <el-dialog
            :title="titleName"
            :visible.sync="dialogFormVisible"
            @opened="openDialog('dialogForm')"
            width="30%"
        >
            <el-form :model="dialogForm" ref="dialogForm" :rules="rules" status-icon>
                <el-input v-model="dialogForm.id" type="hidden"></el-input>
                <el-form-item label="菜单编码" :label-width="formLabelWidth" prop="menuCode">
                    <el-input v-model="dialogForm.menuCode" :disabled="disabled" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName">
                    <el-input v-model="dialogForm.menuName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级菜单" :label-width="formLabelWidth">
                    <el-cascader
                        v-model="value"
                        :options="menuData"
                        style="width: 100%"
                        :props="{ expandTrigger: 'hover', checkStrictly: true }"
                        @change="handleChange"
                        :disabled="disabled"
                        clearable
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="排序码" :label-width="formLabelWidth" prop="rank">
                    <el-input v-model.number="dialogForm.rank" autocomplete="off"></el-input>
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
import * as Menu from "@/api/components/portal/menu.js";
export default {
    data() {
        var checkMenuCode = (rule, value, callback) => {
            const sysCode = this.value[0];
            const id = this.dialogForm.id;
            if (id > 0) {
                return callback();
            }
            if (
                sysCode === "" ||
                sysCode === undefined ||
                value === "" ||
                value === undefined
            ) {
                return callback();
            }
            Menu.checkMenuCodeSubmit({
                menuCode: value,
                sysCode: sysCode,
                id: this.dialogForm.id
            }).then(function(res) {
                if (res.data) {
                    callback();
                } else {
                    callback(new Error("菜单编码重复，请重新输入"));
                }
            });
        };
        var checkMenuRank = (rule, value, callback) => {
            const oldRank = this.existRank;
            if (value === oldRank) {
                return callback();
            }
            Menu.checkMenuRankSubmit({
                rank: value,
                sysCode: this.dialogForm.sysCode,
                pMenuCode: this.dialogForm.pMenuCode
            }).then(function(res) {
                if (res.data) {
                    callback();
                } else {
                    callback(new Error("菜单排序码重复，请重新输入"));
                }
            });
        };
        return {
            rules: {
                menuCode: [
                    {
                        required: true,
                        message: "请输入菜单编码",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 30,
                        message: "长度在2-30字符",
                        trigger: "blur"
                    },
                    {
                        validator: checkMenuCode,
                        trigger: ["change", "blur"]
                    }
                ],
                menuName: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur"
                    }
                ],
                rank: [
                    {
                        required: true,
                        message: "请输入菜单排序码",
                        trigger: "blur"
                    },
                    {
                        validator: checkMenuRank,
                        trigger: ["change", "blur"]
                    }
                ]
            },
            value: [],
            menuData: [],
            dialogForm: {
                id: 0,
                menuCode: "",
                menuName: "",
                pMenuCode: "",
                rank: "",
                sysCode: "",
                level: ""
            },
            dialogFormVisible: false,
            formLabelWidth: "100px",
            titleName: "创建菜单",
            buttonName: "创建",
            existRank: "",
            disabled: false
        };
    },
    methods: {
        async getMenuData() {
            try {
                const res = await Menu.getMenuDataSubmit({});
                console.log(res);
                this.menuData = res.data;
            } catch (error) {
                console.log(error);
            }
        },
        handleNodeClick(data) {
            console.log(data);
        },
        handleChange(value) {
            console.log(value);
        },
        openDialog(form) {
            this.$refs[form].clearValidate();
        },
        async handleDialogSubmit(dialogForm) {
            await this.$refs[dialogForm].validate(valid => {
                if (valid) {
                    this.dialogFormVisible = false;
                    this.dialogForm.sysCode = this.value[0];
                    this.dialogForm.level = this.value.length;
                    this.dialogForm.pMenuCode = this.value[
                        this.value.length - 1
                    ];
                    try {
                        const res = Menu.dialogSubmit({
                            id: this.dialogForm.id,
                            code: this.dialogForm.menuCode,
                            name: this.dialogForm.menuName,
                            pCode: this.dialogForm.pMenuCode,
                            rank: this.dialogForm.rank,
                            sysCode: this.dialogForm.sysCode,
                            level: this.dialogForm.level
                        });
                        if (res.data != 0) {
                            this.$message({
                                message: "恭喜您，" + this.buttonName + "成功",
                                type: "success"
                            });
                        }
                        this.getMenuData();
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        handleCreate() {
            this.dialogFormVisible = true;
            this.titleName = "创建菜单";
            this.buttonName = "创建";
            this.dialogForm.id = 0;
            this.dialogForm.menuCode = "";
            this.dialogForm.menuName = "";
            this.existRank = "";
            this.disabled = false;
        },
        handleUpdate(row) {
            console.log(row);
            if (row.root) {
                //根节点不允许编辑
                this.$message.error("系统信息不得在此页面修改");
                return;
            }
            this.dialogForm.id = row.id;
            this.dialogForm.menuCode = row.value;
            this.dialogForm.menuName = row.label;
            this.dialogForm.rank = row.rank;
            this.existRank = row.rank;
            this.value = row.menuItems.split(",");
            this.disabled = true;
            this.dialogFormVisible = true;
            this.titleName = "修改菜单";
            this.buttonName = "保存";
        },
        async handleRemove(node, data) {
            console.log("data=" + data);
            console.log("node=" + node);
            //如果节点下有子菜单，则不允许删除
            if (data.children != null && data.children.length !== 0) {
                this.$message.error("菜单含有子节点，不得删除");
                return;
            }
            if (data.menuItems == null || data.menuItems == "") {
                this.$message.error("菜单参数有误无法删除，请联系管理员");
                return;
            }
            const menuItemsArray = data.menuItems.split(",");
            try {
                const result = await Menu.judgeDeleteSubmit({
                    menuCode: data.value,
                    sysCode: menuItemsArray[0]
                });
                console.log(result);
                if (result.data == false) {
                    this.$message.error(
                        "请先清除菜单与权限的绑定关系，再删除此菜单"
                    );
                    return;
                }
                const res = await Menu.deleteSubmit({
                    id: data.id
                });
                if (res.data != 0) {
                    this.$message({
                        message: "恭喜您，删除成功",
                        type: "success"
                    });
                }
                this.getMenuData();
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getMenuData();
    }
};
</script>
<style lang="scss" scoped>
.btn-creat {
    margin-bottom: 20px;
}
.el-tree-default {
    width: 400px;
}
</style>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
}
.el-tree-node__content {
    height: auto;
}
</style>
