/*
 * @Author: lzp
 * @Date: 2022-11-07 11:37:50
 * @Description: file content
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'zarm';
import { useHistory } from 'react-router-dom';
import s from './style.module.less';
import CustomIcon from '../CustomIcon'
interface NavBarProps {
  showNav: boolean
}

// const NavBar = ({ showNav }: NavBarProps) => {
const NavBar = ({ showNav }: NavBarProps) => {
  const [activeKey, setActiveKey] = useState<string>('/');
  const history = useHistory()

  const changeTab = (path?: number | string) => {
    setActiveKey(path as string)
    history.push(path as string)
  }
  return (
    <TabBar visible={showNav} className={s.tab} activeKey={activeKey} onChange={changeTab}>
      <TabBar.Item
        itemKey="/"
        title="账单"
        icon={<CustomIcon type="zhangdan" />}
      />
      <TabBar.Item
        itemKey="/data"
        title="统计"
        icon={<CustomIcon type="tongji" />}
      />
      <TabBar.Item
        itemKey="/user"
        title="我的"
        icon={<CustomIcon type="wode" />}
      />
    </TabBar>
  )
}

NavBar.propTypes = {
  showNav: PropTypes.bool
}

export default NavBar;