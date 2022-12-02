<template>
  <div class="page">
    <div class="left-tree">
      <template v-if="treeData.length != 0">
        <a-tree
          show-icon
          defaultExpandAll
          :tree-data="treeData"
          :default-expanded-keys="[]"
          :replace-fields="replaceFields"
        >
          <template #grid="value">
            <div
              :class="[
                'check-box-unchecked',
                value.selectedRowKeys.length === 0 ? '' : 'check-box-half',
              ]"
              @click.stop="clickCheckAction(value)"
              v-if="!value.isAll"
            />
            <div v-else @click.stop="clickCheckAction(value)">
              <img src="@/assets/images/icon-tree-selected.png" alt="" />
            </div>
          </template>
          <template #title="value">
            <span @click="handleTreeItem(value)">
              {{ value.name }}({{ value.num }})</span
            >
          </template>
        </a-tree>
      </template>
    </div>
    <div>
      <a-table
        ref="antTable"
        rowKey="qyId"
        :columns="columns"
        :data-source="tableData"
        :scroll="scrollOffset"
        :pagination="false"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: handleTableSelect,
        }"
      >
      </a-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AntDesignDemo",
  components: {},
  props: {},
  data() {
    return {
      treeData: [],
      replaceFields: {
        children: "childList",
        title: "name",
        key: "areaCode",
      },
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          width: "80px",
          key: "index",
        },
        {
          title: "单位名称",
          dataIndex: "qyName",
          key: "qyName",
          width: "200px",
        },
        {
          title: "负责人",
          dataIndex: "xm",
          width: "80px",
          key: "xm",
        },
        {
          title: "联系电话",
          dataIndex: "lxdh",
          width: "120px",
          key: "lxdh",
        },
        {
          title: "所属区域",
          dataIndex: "szwg",
          width: "180px",
          key: "szwg",
        },
        {
          title: "详情地址",
          dataIndex: "dz",
          key: "dz",
          width: "200px",
        },
      ],
      tableData: [],
      loading: false,
      selectedRowKeys: [],
      scrollOffset: { x: 200, y: 500 },
      currentSelectTreeItem: {}, // 当前所勾选的 tree 节点(最新的一个)
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getTreeData();
    this.getTableData();
  },
  mounted() {},
  methods: {
    async getTreeData() {
      axios
        .get("http://localhost:8081/static/mockData/tree.json")
        .then((res) => {
          this.treeData = this.formatTreeData(res.data.result);
        });
    },

    async getTableData(
      areaCode = "",
      isAction = false,
      isAll = false,
      selectedRowKeys = []
    ) {
      axios
        .get("http://localhost:8081/static/mockData/data.json")
        .then((res) => {
          this.tableData = res.data.result
            .map((ele) => {
              if (areaCode) {
                if (areaCode === ele.areaCode) {
                  return ele;
                }
              } else {
                return ele;
              }
            })
            .filter((ele) => ele);

          if (isAction) {
            if (isAll) {
              this.selectedRowKeys = this.tableData.map((ele) => ele.qyId);
              this.currentSelectTreeItem.maxSelectTableLen =
                this.selectedRowKeys.length;
              this.currentSelectTreeItem.selectedRowKeys = this.selectedRowKeys;
            } else {
              this.selectedRowKeys = [];
              this.currentSelectTreeItem.selectedRowKeys = [];
              this.currentSelectTreeItem.maxSelectTableLen = 0;
            }
          } else {
            // 只做查询
            this.selectedRowKeys = selectedRowKeys;
          }

          this.loading = false;
        });
    },

    clickCheckAction(val) {
      let isAll = false;
      this.treeData.forEach((i) => {
        i.childList.forEach((j) => {
          j.childList.forEach((h) => {
            if (val.areaCode === h.areaCode) {
              h.isAll = !h.isAll;
              this.currentSelectTreeItem = h;
              isAll = h.isAll;
            }
          });
        });
      });
      this.getTableData(val.areaCode, true, isAll);
    },

    handleTreeItem(val) {
      this.treeData.forEach((i) => {
        i.childList.forEach((j) => {
          j.childList.forEach((h) => {
            if (val.areaCode === h.areaCode) {
              this.currentSelectTreeItem = h;
            }
          });
        });
      });
      this.getTableData(val.areaCode, false, false, val.selectedRowKeys);
    },

    handleTableSelect(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      this.currentSelectTreeItem.selectedRowKeys = selectedRowKeys;
      if (this.tableData.length === selectedRowKeys.length) {
        this.currentSelectTreeItem.isAll = true;
        this.currentSelectTreeItem.maxSelectTableLen = selectedRowKeys.length;
      } else {
        this.currentSelectTreeItem.isAll = false;
      }
    },
    formatTreeData(treeData) {
      return treeData.map((item) => {
        if (!item.childList || !item.childList.length) {
          item.scopedSlots = {
            icon: "grid",
          };
          item.selectedRowKeys = [];
          item.maxSelectTableLen = 0; // maxSelectTableLen,对应 table 的全部勾选数据
          item.isAll = false;
        } else {
          item.childList = this.formatTreeData(item.childList);
        }
        return item;
      });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  .left-tree {
    img {
      width: 15px;
      transform: translate(-4px, -2px);
      // transform: translate(0px, -6px);
    }
  }
}
.check-box-unchecked {
  margin-top: 4px;
  height: 15px;
  width: 15px;
  border-radius: 20%;
  border: 1px solid #0d1112;
  background-color: #fff;
}

.check-box-half {
  margin-top: 4px;
  height: 15px;
  width: 15px;
  border-radius: 20%;
  background-color: #1da1f2;
}
</style>
