<template>
	<section>
	<el-row>
	<el-col :xs="24">
		<el-input style="width: 28.2%;" v-model="search_filter" placeholder="请输入内容">
		</el-input>
		<el-button @click="search">搜索</el-button>
	</el-col>
	<el-col style="height: 20px;">
	</el-col>
	<el-col :xs="24" >
				<!--列表-->
		<el-table :data="pool_statistics" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="pool_name" label="矿池名称" width="150">
			</el-table-column>
			<el-table-column prop="thash_24h" label="24H算力" width="150">
			</el-table-column>
			<el-table-column prop="thash_15m" label="15M算力" width="140" sortable="custom">
			</el-table-column>
			<el-table-column prop="active_num" label="活跃矿机" width="140" sortable="custom">
			</el-table-column>
			<el-table-column prop="inactive_num" label="不活跃矿机" width="140" sortable="custom">
			</el-table-column>
			<el-table-column prop="reject_rate" label="拒绝率" width="140" sortable="custom">
			</el-table-column>
			<el-table-column label="操作" width="120">
				<template scope="scope">
					<el-button size="small" @click="goToDetail(scope.row)">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total_page" style="float:right;">
			</el-pagination>
		</el-col> -->
	</el-col>
</el-row>
	</section>
</template>
<script>
	import echarts from 'echarts'
	import { mapGetters,mapActions } from 'vuex'
	import { GetConnectMinerPoolStatistics } from '../../api/api';
	export default {
		data() {
			return {
				self_obsever_url:null,
				pool_statistics:null,
				search_filter:'',
				basic_token:"btc",
				filters: {
					pool_name:null,
					token:"btc"
				}
			}
		},

	// 	computed:{
    // ...mapGetters([
    //   'getAccountDetailAct'
    //   // ...
    // ])

	// 	},
		methods: {
			fillStruct(get_count=true){
				GetConnectMinerPoolStatistics(this.filters).then((res) => {
					let datas=res.data.data
					datas.forEach(element => {
						element["thash_24h"]=element["thash_24h"][0]+element["thash_24h"][1];
						element["thash_15m"]=element["thash_15m"][0]+element["thash_15m"][1];
					});
					this.pool_statistics= datas;
				});
			},
			initialBasicData(){
				this.fillStruct()
			},
			// handleCurrentChange(val) {
			// 	this.filters.page=val-1;
			// 	this.fillStruct();
			// },
			search() {
				//openid,uid,nick_name,order_by,page
				this.filters.page=0;
				if (this.search_filter!='')
				{

				this.filters.pool_name=this.search_filter;

				}
				this.fillStruct();
			},
			goToDetail(row){
				// this.setAccountDetailAct(row.uid)
				alert("implement at phase 2");

			}
		
	// 		...mapActions([
    //   'setAccountDetailAct'
    // ]);
		},
		
		mounted() {
			this.initialBasicData();
			var token = sessionStorage.getItem('basic_token');
			if (token) {
				this.basic_token=token
			}
		}
	}

</script>