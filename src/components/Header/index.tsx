import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'

import { NavBar, Icon } from 'zarm';
import s from './style.module.less'
interface PropsType {
  title:string
}
const Header = ({title}: PropsType)=> {
  const history= useHistory()
  return <div className={s.headerWarp}>
    <div className={s.block}>
      <NavBar
        className={s.header}
        left={<Icon type="arrow-left" theme="primary" onClick={() => history.go(-1)} />}
        title={title}
      />
    </div>
  </div>
}
export default Header