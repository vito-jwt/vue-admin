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
	<el-col :xs="24">
				<!--列表-->
		<el-table :data="account_statistics" highlight-current-row v-loading="listLoading"  @sort-change="handleSort" style="width: 100%;">
			<el-table-column prop="miner_act" label="miner_act" width="150">
			</el-table-column>
			<el-table-column prop="worker_act" label="worker_act" width="150">
			</el-table-column>
			<el-table-column prop="thash_24h" label="24H算力" width="130" sortable="custom">
			</el-table-column>
			<el-table-column prop="thash_15m" label="15M算力" width="130" sortable="custom">
			</el-table-column>
			<el-table-column prop="type" label="状态" width="130" sortable="custom">
			</el-table-column>
			<el-table-column label="操作" width="110">
				<template scope="scope">
					<el-button size="small" @click="goToDetail(scope.row)">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total_page" style="float:right;">
			</el-pagination>
		</el-col>
	</el-col>
</el-row>
	</section>
</template>
<script>
	import echarts from 'echarts'
	import { mapGetters,mapActions } from 'vuex'
	import { GetAccountStatistics,GetAccountStatisticsCount } from '../../api/api';
	export default {
		data() {
			return {
				total_page:0,
				account_statistics:null,
				search_filter:'',
				topn_bl:null,
				basic_token:"btc",
				filters: {
					openid:null,
					uid:null,
					nick_name:null,
					order_by:"thash_24h",
					page:0,
					miner_act:null,
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
				var x=[];
				var y=[];
				GetAccountStatistics(this.filters).then((res) => {
					this.account_statistics= res.data.data;
				});
				if(get_count)
				GetAccountStatisticsCount(this.filters).then((res) => {
					this.total_page=res.data.data;
				});
			},
			initialBasicData(){

				this.filters.uid=this.$route.params.uid;
				this.filters.token=this.basic_token;
				this.fillStruct()
			},
			handleCurrentChange(val) {
				this.filters.page=val-1;
				this.fillStruct();
			},
			search() {
				//openid,uid,nick_name,order_by,page
				this.filters.page=0;
				if (this.search_filter!='')
				{
					if (this.search_filter.indexOf("@openid=")>-1)
					{
						this.filters.openid=this.search_filter.replace("@openid=","");
					}else if(this.search_filter.indexOf('@nick_name=')>-1){
						this.filters.nick_name=this.search_filter.replace("@nick_name=","");
					}else if(this.search_filter.indexOf('@uid=')>-1){
						this.filters.nick_name=this.search_filter.replace("@uid=","");
					}else{
						
						this.filters.miner_act=this.search_filter;
					}
				}
				this.fillStruct();
			},
			handleSort(column){
				this.filters.order_by=(column.order=="ascending"?"":"-")+column.prop;
				this.fillStruct(false);

			},
			goToDetail(row){
				// this.setAccountDetailAct(row.uid)
				this.$router.push({ path: '/table' });

			},
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