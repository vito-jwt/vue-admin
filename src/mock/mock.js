import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
let _Users = Users;
import {Thash24H, Miners,Thashs24H,MainAccountStatistics,AccountStatistics } from './data/kelemoke';


export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    // mock.onPost('/login').reply(config => {
    //   let {username, password} = JSON.parse(config.data);
    //   return new Promise((resolve, reject) => {
    //     let user = null;
    //     setTimeout(() => {
    //       let hasUser = LoginUsers.some(u => {
    //         if (u.username === username && u.password === password) {
    //           user = JSON.parse(JSON.stringify(u));
    //           user.password = undefined;
    //           return true;
    //         }
    //       });

    //       if (hasUser) {
    //         resolve([200, { code: 200, msg: '请求成功', user }]);
    //       } else {
    //         resolve([200, { code: 500, msg: '账号或密码错误' }]);
    //       }
    //     }, 1000);
    //   });
    // });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

    //查询总算力
    mock.onGet('/admin/v1/getthash24h').reply(config => {
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            data: Thash24H
          }]);
        }, 500);
      });
    });

    //查询24小时总算力按小时统计
    mock.onGet('/admin/v1/getthashs24h').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            data: Thashs24H
          }]);
        }, 500);
      });
    });

       //查询主账户信息
    mock.onGet('/admin/v1/getmainaccountstatistics').reply(config => {
     let _MainAccountStatistics=MainAccountStatistics.filter(statistic => {
          if (config.params.openid && statistic["openid"].indexOf(config.params.openid) == -1) return false;
          return true;
        });
        var order=config.params.order_by.indexOf("-")==-1
        _MainAccountStatistics=_MainAccountStatistics.sort((a,b)=>{
          let k=!order? a[config.params.order_by]-b[config.params.order_by]:b[config.params.order_by]-a[config.params.order_by];
          return k; });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            data: _MainAccountStatistics.slice(config.params.page*20,(config.params.page+1)*20)
          }]);
        }, 500);
      });
    }); 

    mock.onGet('/admin/v1/getmainaccountstatisticscount').reply(config => {
      
      let _MainAccountStatistics=MainAccountStatistics.filter(statistic => {
          if (config.params.openid && statistic["openid"].indexOf(config.params.openid) == -1) return false;
          return true;
        });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            data:_MainAccountStatistics.length
          }]);
        }, 500);
      });
    }); 

       //查询子主账户信息
       mock.onGet('/admin/v1/getaccountstatistics').reply(config => {
        let _AccountStatistics=AccountStatistics.filter(statistic => {
             if ((config.params.miner_act && statistic["miner_act"].indexOf(config.params.miner_act) == -1)
             ||(config.params.uid && statistic["miner_uid"]==config.params.uid) ) 
              return false;
             return true;
           });
           var order=config.params.order_by.indexOf("-")==-1
           _AccountStatistics=_AccountStatistics.sort((a,b)=>{
             let k=!order? a[config.params.order_by]-b[config.params.order_by]:b[config.params.order_by]-a[config.params.order_by];
             return k; });
         return new Promise((resolve, reject) => {
           setTimeout(() => {
             resolve([200, {
               code: 200,
               data: _AccountStatistics.slice(config.params.page*20,(config.params.page+1)*20)
             }]);
           }, 500);
         });
       }); 
   
       mock.onGet('/admin/v1/getaccountstatisticscount').reply(config => {
         
         let _AccountStatistics=AccountStatistics.filter(statistic => {
             if (config.params.miner_act && statistic["miner_act"].indexOf(config.params.miner_act) == -1) return false;
             return true;
           });
         return new Promise((resolve, reject) => {
           setTimeout(() => {
             resolve([200, {
               code: 200,
               data:_AccountStatistics.length
             }]);
           }, 500);
         });
       }); 
   






  }
};