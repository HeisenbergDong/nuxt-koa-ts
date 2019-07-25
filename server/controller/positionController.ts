import { BaseContext } from 'koa';
import { City } from '../entity/city';
import { Province } from '../entity/province';
import sign from '../config/sign';
import axios from '../config/axios';

export default class PositionController {

  public static async getPosition (ctx: BaseContext) {

    let { status,
      data: {
        province,
        city
      }
    } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);
    if (status === 200) {
      ctx.body = {
        province,
        city
      }
    } else {
      ctx.body = {
        province: '',
        city: ''
      }
    }

  }

  public static async getProvince (ctx: BaseContext) {
    let province = await Province.find();
    ctx.status = 200;
    ctx.body = {
      province: province.map(item => {
        return {
          id: item.id,
          name: item.value[0]
        }
      })
    }

    // let {status,
    //   data: {
    //     province
    //   }
    // } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`);
    // ctx.body = {
    //   province: status === 200 ? province : []
    // }

  }

  public static async getProvinceCity (ctx: BaseContext) {
    let city = await City.findOne({id: ctx.params.id});
    ctx.status = 200;
    ctx.body = city == null?city:city.value.map(item => {
      return {province: item.province, id: item.id, name: item.name}
    })

    // let {status,
    //   data: {
    //     city
    //   }
    // } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`);
    // if (status === 200) {
    //   ctx.body = {
    //     city
    //   }
    // } else {
    //   ctx.body = {
    //     city: []
    //   }
    // }

  }

  public static async getCity (ctx: BaseContext) {

    let result = await City.find();
    let cityList: Array<any> = [];
    result.forEach(city => {
      cityList = cityList.concat(city.value);
    });

    ctx.status = 200;
    ctx.body = cityList.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      }
    })


    // let {status,
    //   data: {
    //     city
    //   }
    // } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
    // if (status === 200) {
    //   ctx.body = {
    //     city
    //   }
    // } else {
    //   ctx.body = {
    //     city: []
    //   }
    // }

  }

  public static async hotCity (ctx: BaseContext) {
    let list = [
        '北京市',
        '上海市',
        '广州市',
        '深圳市',
        '天津市',
        '西安市',
        '杭州市',
        '南京市',
        '武汉市',
        '成都市'
    ];
    let result = await City.find();
    let nList: Array<any> = [];
    result.forEach(item => {
      nList = nList.concat(item.value.filter((k: any) => list.includes(k.name) || list.includes(k.province)))
    })
    ctx.body = {
      hots: nList
    }

    // let {status,
    //   data: {
    //     hots
    //   }
    // } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
    // if (status === 200) {
    //   ctx.body = {
    //     hots
    //   }
    // } else {
    //   ctx.body = {
    //     hots: []
    //   }
    // }

  }

}
