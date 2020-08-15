import Mock from 'mockjs';
import util from '../../common/js/util'
const Thash24H =2000000;

const Miners = [];

for (let i = 0; i < 86; i++) {
    Miners.push(Mock.mock({
    id: 1,
    name: "Mock.Random.name",
    thash: 100000
  }));
}

const Thashs24H = [];
var now_=new Date()
var ts=now_.getTime();
now_.setTime(ts -1000 * 60*60*23)
ts=now_.getTime();
for (let i = 0; i < 24; i++) {
    now_.setTime(ts +1000 * 60*60*i)
    Thashs24H.push({
    "thash": Mock.Random.float(100000,3000000),
    "xstep": util.formatDate.format(now_, 'yyyy-MM-dd h')
  });
}
const MainAccountStatistics=[]

for (let i=0;i<33;i++){

  //24小时算力，15分钟算力，收益，活跃矿机数，非活跃矿机数
  MainAccountStatistics.push({
    "thash_24h": Mock.Random.float(1000,3000000),
    "thash_15m": Mock.Random.float(100,3000000),
    "active_num": Mock.Random.int(2,5000),
    "inactive_num": Mock.Random.float(0,10),
    "income": Mock.Random.float(100000,3000000),
    "uid":i,
    "nick_name":Mock.Random.name(),
    "openid":Mock.Random.string()
  });
}

const AccountStatistics=[]

for (let i=0;i<83;i++){

  //24小时算力，15分钟算力，收益，活跃矿机数，非活跃矿机数
  AccountStatistics.push({
    "thash_24h": Mock.Random.float(100,300000),
    "thash_15m": Mock.Random.float(100,300000),
    "active_num": Mock.Random.int(2,500),
    "inactive_num": Mock.Random.float(0,10),
    "income": Mock.Random.float(10000,300000),
    "uid":i%20,
    "nick_name":Mock.Random.name(),
    "openid":Mock.Random.string(),
    "miner_act":Mock.Random.string()
  });
}


export { Thash24H, Miners,Thashs24H,MainAccountStatistics,AccountStatistics };
