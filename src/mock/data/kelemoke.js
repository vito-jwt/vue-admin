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

export { Thash24H, Miners,Thashs24H };
