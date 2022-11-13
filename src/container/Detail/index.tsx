/*
 * @Author: lzp
 * @Date: 2022-11-12 22:02:37
 * @Description: file content
 */
import React, {  useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import { get, post, typeMap } from '@/utils';
import { Modal, Toast } from 'zarm';
import { useLocation,useHistory } from 'react-router-dom';
// import qs from 'query-string';
import dayjs from 'dayjs';
import cx from 'classnames';
import CustomIcon from '@/components/CustomIcon';
import PopupAddBill from '@/components/PopupAddBill';
import s from './style.module.less';

interface DetailType {
  amount: string
  date: string
  id: string
  pay_type: number
  type_id: string
  remark: string
  type_name: string
  user_id: string
}
const Detail = () => {
  const editRef = useRef();
  const location = useLocation(); // 获取 locaton 实例，我们可以通过打印查看内部都有些什么内容。
  const history= useHistory()
  // const { id } = qs.parse(location.search);
  const id = location.search.slice(4)
  console.log('id', location.search.slice(4))
  const [detail, setDetail] = useState({} as DetailType);

  useEffect(() => {
    getDetail()
  }, []);

  const getDetail = async () => {
    const { data } = await get(`/api/bill/detail?id=${id}`);
    setDetail(data);
  }
  // 删除方法
  const deleteDetail = () => {
    Modal.confirm({
      title: '删除',
      content: '确认删除账单？',
      onOk: async () => {
        const { data } = await post('/api/bill/delete', { id })
        Toast.show('删除成功')
        history.go(-1)
      },
    });
  }
  return <div className={s.detail}>
    <Header title='账单详情' />
    <div className={s.card}>
      <div className={s.type}>
        {/* 通过 pay_type 属性，判断是收入或指出，给出不同的颜色*/}
        <span className={cx({ [s.expense]: detail.pay_type == 1, [s.income]: detail.pay_type == 2 })}>
          {/* typeMap 是我们事先约定好的 icon 列表 */}
          <CustomIcon className={s.iconfont} type={detail.type_id ? typeMap[detail.type_id].icon : 1} />
        </span>
        <span>{detail.type_name || ''}</span>
      </div>
      {
        detail.pay_type == 1
          ? <div className={cx(s.amount, s.expense)}>-{detail.amount}</div>
          : <div className={cx(s.amount, s.incom)}>+{detail.amount}</div>
      }
      <div className={s.info}>
        <div className={s.time}>
          <span>记录时间</span>
          <span>{dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')}</span>
        </div>
        <div className={s.remark}>
          <span>备注</span>
          <span>{detail.remark || '-'}</span>
        </div>
      </div>
      <div className={s.operation}>
        <span><CustomIcon type='shanchu' onClick={deleteDetail}/>删除</span>
        <span onClick={() => editRef.current && editRef.current.show()}><CustomIcon type='tianjia' />编辑</span>
      </div>
    </div>
    <PopupAddBill ref={editRef} detail={detail} onReload={getDetail} />
  </div>
}

export default Detail