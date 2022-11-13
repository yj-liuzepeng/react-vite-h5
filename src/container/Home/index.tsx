import React, { useState, useEffect, useRef } from 'react'
import { Icon, Pull } from 'zarm'
import dayjs from 'dayjs'
import BillItem from '@/components/BillItem'
import PopupType from '@/components/PopupType'
import PopupDate from '@/components/PopupDate'
import CustomIcon from '@/components/CustomIcon'
import PopupAddBill from '@/components/PopupAddBill'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils'

import s from './style.module.less'
interface SelectType {
  id:string
  name:string
  type:string
  user_id:number
}
interface Current {
  close:()=>void
  show:()=>void
}
interface typeRef {
 current:Current
}
const Home = () => {
  const typeRef = useRef() as typeRef; // 账单类型 ref
  const monthRef = useRef() as typeRef; // 月份筛选 ref
  const addRef = useRef() as typeRef; // 添加账单ref

  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [currentSelect, setCurrentSelect] = useState({} as SelectType); // 当前筛选类型
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM') as string); // 当前筛选时间
  const [page, setPage] = useState(1); // 分页
  const [list, setList] = useState([]); // 账单列表
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态

  useEffect(() => {
    getBillList() // 初始化
  }, [page, currentSelect, currentTime])

  const getBillList = async () => {
    const { data } = await get(`/api/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${currentSelect.id || 'all'}`);
    // 下拉刷新，重制数据
    if (page == 1) {
      setList(data.list);
    } else {
      setList(list.concat(data.list));
    }
    setTotalExpense(data.totalExpense.toFixed(2));
    setTotalIncome(data.totalIncome.toFixed(2));
    setTotalPage(data.totalPage);
    // 上滑加载状态
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
  }

  // 请求列表数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    if (page != 1) {
      setPage(1);
    } else {
      getBillList();
    };
  };

  const loadData = () => {
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading);
      setPage(page + 1);
    }
  }

  // 添加账单弹窗
  const toggle = () => {
    typeRef.current && typeRef.current.show()
  };
  // 选择月份弹窗
  const monthToggle = () => {
    monthRef.current && monthRef.current.show()
  };

  // 筛选类型
  const select = (item:SelectType) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentSelect(item)
  }
  // 筛选月份
  const selectMonth = (item:string) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentTime(item)
  }
  const addToggle = () => {
    addRef.current && addRef.current.show()
    
  }
  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ { totalExpense }</b></span>
        <span className={s.income}>总收入：<b>¥ { totalIncome }</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left} onClick={toggle}>
          <span className={s.title}>{ currentSelect.name || '全部类型' } <Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
        <div className={s.right}>
          <span className={s.time} onClick={monthToggle}>{ currentTime }<Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
      </div>
    </div>
    <div className={s.contentWrap}>
      {
        list.length ? <Pull
          animationDuration={200}
          stayTime={400}
          refresh={{
            state: refreshing,
            handler: refreshData
          }}
          load={{
            state: loading,
            distance: 200,
            handler: loadData
          }}
        >
          {
            list.map((item, index) => <BillItem
              bill={item}
              key={index}
            />)
          }
        </Pull> : null
      }
    </div>
    <div className={s.add} onClick={addToggle}><CustomIcon type='tianjia' /></div>
    <PopupType ref={typeRef} onSelect={select} />
    <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
    <PopupAddBill ref={addRef} onReload={refreshData}></PopupAddBill>
  </div>
}

export default Home