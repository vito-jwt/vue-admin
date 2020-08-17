<template>
	<section>
	<el-row>
	<el-col :xs="24">
		<el-input style="width: 28.2%;" v-model="search_filter" placeholder="请输入内容">
		</el-input>
		<el-button @click="search">搜索</el-button><el-button @click="get_obsever_url">ObserveKey</el-button>
	</el-col>
	<el-col style="height: 50px;">
		<el-input @click="sCopy" type="textarea" v-model="self_obsever_url" ></el-input>
	</el-col>
	<el-col :xs="24" style="height:400px!important;">
				<!--列表-->
		<el-table :data="account_statistics_detail" highlight-current-row v-loading="listLoading"  @sort-change="handleSort" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="miner_act" label="miner_act" width="150">
			</el-table-column>
			<el-table-column prop="worker_act" label="worker_act" width="150">
			</el-table-column>
			<el-table-column prop="thash_24h" label="24H算力" width="140" sortable="custom">
			</el-table-column>
			<el-table-column prop="thash_15m" label="15M算力" width="140" sortable="custom">
			</el-table-column>
			<el-table-column prop="type" label="状态" width="140" sortable="custom">
			</el-table-column>
			<el-table-column label="操作" width="120">
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
	import { GetAccountStatisticsDitail,GetAccountStatisticsDitailCount,Observer } from '../../api/api';
	export default {
		data() {
			return {
				total_page:0,
				self_obsever_url:null,
				account_statistics_detail:null,
				search_filter:'',
				basic_token:"btc",
				openid:null,
				uid:null,
				nick_name:null,
				filters: {
					order_by:"thash_24h",
					page:0,
					worker_act:null,
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
				GetAccountStatisticsDitail(this.filters).then((res) => {
					this.account_statistics_detail= res.data.data;
				});
				if(get_count)
				GetAccountStatisticsDitailCount(this.filters).then((res) => {
					this.total_page=res.data.data;
				});
			},
			initialBasicData(){
				this.filters.miner_act=this.$route.params.miner_act;
				this.openid=this.$route.params.openid;
				this.uid=this.$route.params.uid;
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
					if(this.search_filter.indexOf('@miner_act=')>-1){
						this.filters.miner_act=this.search_filter.replace("@miner_act=","");
					}else{
						this.filters.worker_act=this.search_filter;
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
				alert("implement at phase 2");

			},
			copy_(data) {
						let url = data
						let oInput = document.createElement('input')
						oInput.value = url
						document.body.appendChild(oInput)
						oInput.select() // 选择对象
						document.execCommand("Copy") // 执行浏览器复制命令
						this.$message({
							message: '复制成功',
							type: 'success'
						});
						oInput.remove()
						},
			sCopy(){
				copy_(this.self_obsever_url);
			},

			get_obsever_url(){
				Observer({"miner_act":this.miner_act,"openid":JSON.parse(this.openid)}).then((res) => {
					console.log(res.data.data);
					this.self_obsever_url= res.data.data["observer_url"];
				});

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