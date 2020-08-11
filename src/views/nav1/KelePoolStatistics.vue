<template>
<el-container>
	<el-header>
		<el-row type="flex">
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>24小时总算力：{{thash24h}}P</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>15分钟总算力：{{thash15m}}P</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>活跃矿机数：{{active_miner_count}}</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>非活跃矿机数：{{inactive_miner_count}}</h1>
				</el-card>
			</el-col>
		</el-row>
		<el-row >
		<el-col style="height: 50px">
		</el-col>
		</el-row>
		<el-row >
			<el-col>
				<div id="thashs_line" style="height: 450px">
				</div>
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
				thashs_line:null

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			initialBasicData(){
			GetThash24H().then((res) => {
					this.thash24h = res.data.data
					//NProgress.done();
				});
				var column_name=[];
				var thash_values=[];
				GetThashs24H().then((res) => {
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
		}
	}

</script>