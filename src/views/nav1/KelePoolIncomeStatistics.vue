<template>
<el-container>
	<el-header>
		<el-row type="flex">
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>今日预计收入：{{today_estimate}}</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>总收入：{{total_income}}</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>矿池预计收益：{{pool_today_estimate}}</h1>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card class="mc-ui-flex-center" style="height: 100px;background-color:#409EFF;opacity:0.7" shadow="forever" >
					<h1>矿池总收入：{{pool_total_income}}</h1>
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
					<div id="benefit_line" style="height: 450px">
					</div>
				</section>
				<section v-show="is_table">
					<el-table :data="benefit_list" highlight-current-row v-loading="listLoading" style="width: 100%;">
						
						<el-table-column prop="miner_act" label="账户" width="160" sortable>
						</el-table-column>
						<el-table-column prop="estimate_benefit" label="预估收益" width="160" sortable>
						</el-table-column>
						<el-table-column prop="real_benefit" label="实际收益" width="160" :formatter="formatSex" sortable>
						</el-table-column>
						<el-table-column prop="pool_estimate_benefit" label="矿池预估收益" width="160" sortable>
						</el-table-column>
						<el-table-column prop="pool_real_benefit" label="矿池实际收益" width="160" sortable>
						</el-table-column>
						<el-table-column prop="inviter_estimate_benefit" label="邀请人预估收益" width="160" sortable>
						</el-table-column>
						<el-table-column prop="inviter_real_benefit" label="邀请人实际收益" width="160" sortable>
						</el-table-column>
						<el-table-column prop="bill_day" label="日期" width="160" sortable>
						</el-table-column>
					</el-table>
			</section>

			</el-col>
		</el-row>
	</el-header>
</el-container>
</template>

<script>
import echarts from 'echarts'
import { GetMinerBill,GetMinerBillStatistics } from '../../api/api';
	export default {
		data() {
			return {
				total_income:0,
				today_estimate:0,
				pool_total_income:0,
				pool_today_estimate:0,
				benefit_line:null,
				benefit_list:null,
				
				basic_token:"btc",
				is_table:false

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			initialBasicData(){
			GetMinerBillStatistics({"token":this.basic_token}).then((res) => {
				
				//{"code":0,"message":"success","data":{"total_income":67928017.5788,"pool_total_income":554503.4623}}
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
						this.total_income=data["total_income"];
						this.pool_total_income=data["pool_total_income"];	
					}
				}).catch(error=>{
                    console.log(error);
                    });
				var column_name=[];
				var income=[];
				GetMinerBill({"token":this.basic_token}).then((res) => {
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
						this.benefit_list=data;
						//{"estimate_benefit":89900885.0,"real_benefit":null,"pool_estimate_benefit":726472.05,"pool_real_benefit":null,"inviter_estimate_benefit":181617.95,"inviter_real_benefit":null,"bill_day":"2020-08-16T00:00:00"}
							let dicx={}
							let dicx1={}
							let dicx2={}
							for(var i=0;i<data.length;i++) 
							{
							if (dicx.hasOwnProperty(data[i]["bill_day"]))
							{
							dicx[data[i]["bill_day"]]+=data[i]["real_benefit"]
							dicx1[data[i]["bill_day"]]+=data[i]["estimate_benefit"]
							dicx2[data[i]["bill_day"]]+=data[i]["pool_estimate_benefit"]
							}
							
							else{
							dicx[data[i]["bill_day"]]=data[i]["real_benefit"]
							dicx1[data[i]["bill_day"]]=data[i]["estimate_benefit"]
							dicx2[data[i]["bill_day"]]=data[i]["pool_estimate_benefit"]
							}
							}
							
							var res = Object.keys(dicx).sort();
							
							for (var i=0;i<res.length;i++){
								income.push(dicx[res[i]]);
							column_name.push(res[i]);
							};
							
							let l=res.length-1;
							let key=res[l];
							income[l]=dicx1[key];
							
							this.today_estimate=dicx1[key];
							this.pool_today_estimate=dicx2[key];
							this.drawLineChart(column_name,income);
					}
				}).catch(error=>{
                    console.log(error);
                    });
			},
			drawLineChart(column_name,income) {

                this.benefit_line.setOption({
                    title: {
                        text: '收益统计：'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['按天统计']
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
                            name: '当天收入',
                            type: 'line',
                            stack: '收入',
                            data: income
                        }
                    ]
				});
			},
			initialDrawLine(){
		this.benefit_line = echarts.init(document.getElementById('benefit_line'));	
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