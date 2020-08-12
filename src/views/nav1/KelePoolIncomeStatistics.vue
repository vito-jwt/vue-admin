<template>
<el-container>
	<el-header>
		<el-row type="flex">
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>总收益：{{thash24h}}P</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>今日预计收益：{{thash15m}}P</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>总利润：{{active_miner_count}}</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>非活跃矿机数：{{inactive_miner_count}}</h1>
				</el-card>
			</el-col>
		</el-row>
		<el-row >
		<el-col style="height: 40px">
		</el-col>
		</el-row>
		<el-row >
			<el-col>
				<el-switch v-model="is_table">
				</el-switch>
				<section v-show="!is_table">
					<div id="thashs_line" style="height: 450px">
					</div>
				</section>
				<section v-show="is_table">
					<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column type="index" width="60">
						</el-table-column>
						<el-table-column prop="name" label="姓名" width="120" sortable>
						</el-table-column>
						<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
						</el-table-column>
						<el-table-column prop="age" label="年龄" width="100" sortable>
						</el-table-column>
					</el-table>
					<el-col :span="24" class="toolbar">
						<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
						</el-pagination>
					</el-col>
			</section>

			</el-col>
		</el-row>
	</el-header>
</el-container>
</template>

<script>
import echarts from 'echarts'
import { GetThash24H,GetThashs24H } from '../../api/api';
	export default {
		data() {
			return {
				thash24h:0,
				thash15m:0,
				active_miner_count:0,
				inactive_miner_count:0,
				thashs_line:null,
				basic_token:"btc",
				is_table:false

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			initialBasicData(){
			GetThash24H(this.basic_token).then((res) => {
					this.thash24h = res.data.data
					//NProgress.done();
				});
				var column_name=[];
				var thash_values=[];
				GetThashs24H(this.basic_token).then((res) => {
					var datas= res.data.data;
					for(var i=0;i<datas.length;i++) 
					{
					thash_values.push(datas[i]["thash"]);
					column_name.push(datas[i]["xstep"]);
					
					}
					this.drawLineChart(column_name,thash_values);
				});
			},
			drawLineChart(column_name,thash_values) {

                this.thashs_line.setOption({
                    title: {
                        text: '24H算力统计：'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['按小时统计']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: column_name
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '按小时统计',
                            type: 'line',
                            stack: '总量',
                            data: thash_values
                        }
                    ]
				});
			},
			initialDrawLine(){
		this.thashs_line = echarts.init(document.getElementById('thashs_line'));	
		}
		},
		
		mounted() {
			this.initialBasicData();
			this.initialDrawLine();
			var token = sessionStorage.getItem('basic_token');
			if (token) {
				this.basic_token=token
			}
		}
	}

</script>