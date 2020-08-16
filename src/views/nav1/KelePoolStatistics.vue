<template>
<el-container>
	<el-header>
		<el-row type="flex">
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>24小时总算力：{{thash24h}}</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>15分钟总算力：{{thash15m}}</h1>
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
import { GetPoolStatistics,GetThashs24H } from '../../api/api';
	export default {
		data() {
			return {
				thash24h:0,
				thash15m:0,
				active_miner_count:0,
				inactive_miner_count:0,
				thashs_line:null,
				basic_token:"btc",
				basic_miner_uid:null

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			initialBasicData(){
			GetPoolStatistics({"token":this.basic_token}).then((res) => {
			console.log(res);
              let { code,data,message} = res.data;
              if (code !== 0) {
                this.$message({
                  message: message,
                  type: 'error'
                });
              } else {
				  //{"thash_15m":[29.651981421584058,"PH/s"],"thash_24h":[118.63978708995,"PH/s"],"active_num":13.0,"inactive_num":0.0}
				this.thash24h=data["thash_24h"][0]+data["thash_24h"][1];
				this.thash15m=data["thash_15m"][0]+data["thash_15m"][1];
				this.active_miner_count=data["active_num"];
				this.inactive_miner_count=data["inactive_num"];
              }
            }).catch(error=>{
                    console.log(error);
					});
					
				var column_name=[];
				var thash_values=[];
				GetThashs24H({"token":this.basic_token}).then((res) => {
					let { code,data,message} = res.data;
					console.log(data);
					if (code !== 0) 
					{
						this.$message({
						message: message,
						type: 'error'
						});
					} 
					else 
					{
							for(var i=0;i<data.length;i++) 
							{
							thash_values.push(data[i]["thash"]);
							column_name.push(data[i]["xstep"]);
							
							}
							this.drawLineChart(column_name,thash_values);
					}
				}).catch(error=>{
                    console.log(error);
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