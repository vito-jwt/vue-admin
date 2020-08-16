<template>
	<section>
	<el-row>
	<el-col :xs="24">
		<div id="topn_bl" style="width:100%; height:250px;"></div>
	</el-col>
	<el-col :xs="24">
		<el-input style="width: 28.2%;" v-model="search_filter" placeholder="请输入内容">
		</el-input>
		<el-button @click="search">搜索</el-button>
	</el-col>
	<el-col style="height: 20px;">
	</el-col>
	<el-col :xs="24">
				<!--列表-->
		<el-table :data="main_account_statistics" highlight-current-row v-loading="listLoading"  @sort-change="handleSort" style="width: 100%;">
			<el-table-column prop="uid" label="uid" width="60">
			</el-table-column>
			<el-table-column prop="nick_name" label="账户名" width="120">
			</el-table-column>
			<el-table-column prop="openid" label="openid" width="150">
			</el-table-column>
			<el-table-column prop="thash_24h" label="24H算力" width="130" sortable="custom">
			</el-table-column>
			<el-table-column prop="thash_15m" label="15M算力" width="130" sortable="custom">
			</el-table-column>
			<el-table-column prop="benefit" label="收益" width="130" sortable="custom">
			</el-table-column>
			<el-table-column prop="active_num" label="活跃矿机" width="130" sortable="custom">
			</el-table-column>
			<el-table-column prop="inactive_num" label="非活跃矿机" min-width="100" sortable="custom">
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
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	import echarts from 'echarts'
	import { GetMainAccountStatistics,GetMainAccountStatisticsCount } from '../../api/api';
	export default {
		data() {
			return {
				total_page:0,
				main_account_statistics:null,
				search_filter:'',
				topn_bl:null,
				basic_token:"btc",
				filters: {
					openid:null,
					uid:null,
					nick_name:null,
					order_by:"thash_24h",
					page:0,
					token:"btc"
				}
			}
		},

	// 	computed:{
    // ...mapGetters([
    //   'getMainAccountDetailUid'
    //   // ...
    // ])

	// 	},
		methods: {
			fillStruct(get_count=true,draw_bar=false){
				var x=[];
				var y=[];
				GetMainAccountStatistics(this.filters).then((res) => {
					this.main_account_statistics= res.data.data;
					for(var i=0;i<this.main_account_statistics.length && i<5;i++) 
					{
					x.push(this.main_account_statistics[i]["thash_24h"]);
					y.push(this.main_account_statistics[i]["nick_name"]);
					
					}
					if (draw_bar)
					this.drawBarChart(x,y);
				});
				if(get_count)
				GetMainAccountStatisticsCount(this.filters).then((res) => {
					
					this.total_page=res.data.data["total_count"];
				});
			},
			initialBasicData(){
				this.filters.token=this.basic_token;
				this.fillStruct(true,true)
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
					}else{
						this.filters.uid=this.search_filter;
					}
				}

				this.fillStruct();
			},
			handleSort(column){
				this.filters.order_by=(column.order=="ascending"?"":"-")+column.prop;
				this.fillStruct(false);

			},
			drawBarChart(x,y) {
                this.topn_bl = echarts.init(document.getElementById('topn_bl'));
                this.topn_bl.setOption({
                    title: {
						text: '',
                        subtext: '算力Top5'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: y
                    },
                    series: [
                        {
                            name: '24h算力',
                            type: 'bar',
                            data: x
                        }
                    ]
                });
			},
			goToDetail(row){
				// this.setMainAccountDetailUid(row.uid)
				this.$router.push({name: '子账户信息列表',params:{uid:row.uid}});

			},
	// 		...mapActions([
    //   'setMainAccountDetailUid'
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