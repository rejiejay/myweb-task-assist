/**
 * 定时器 对外方法:
 * @doc https://github.com/node-schedule/node-schedule
 * @viewer crontab执行时间计算- 在线工具： https://tool.lu/crontab/
 * The cron format consists of:
 * *    *    *    *    *    *
 * ┬    ┬    ┬    ┬    ┬    ┬
 * │    │    │    │    │    │
 * │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 * │    │    │    │    └───── month (1 - 12)
 * │    │    │    └────────── day of month (1 - 31)
 * │    │    └─────────────── hour (0 - 23)
 * │    └──────────────────── minute (0 - 59)
 * └───────────────────────── second (0 - 59, OPTIONAL)
 * 
 * @init 初始化方法
 */
import init from './instantiate'

const Schedule = {
    init
}

export default Schedule