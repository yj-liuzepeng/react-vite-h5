import React, { useState, useCallback, useRef } from 'react'
import { Cell, Input, Button, Checkbox, Toast } from 'zarm'
import { post } from '@/utils'
import CustomIcon from '@/components/CustomIcon'
import Captcha from "react-captcha-code"
import { useHistory } from 'react-router-dom'
import cx from 'classnames'
import s from './style.module.less'

const Login = () => {
  const history = useHistory()
  const [type, setType] = useState<string>('login')
  const [username, setUsername] = useState<string>(''); // 账号
  const [password, setPassword] = useState<string>(''); // 密码
  const [verify, setVerify] = useState<string>(''); // 验证码
  const [captcha, setCaptcha] = useState<string>(''); // 验证码变化后存储值
  const captchaRef = useRef() as any
  //  验证码变化，回调方法
  const handleChange = useCallback((captcha: string) => {
    console.log('captcha', captcha)
    setCaptcha(captcha)
  }, []);

  const onSubmit = async () => {
    if (!username) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    try {
      // 判断是否是登录状态
      if (type == 'login') {
        // 执行登录接口，获取 token
        const { data } = await post('/api/user/login', {
          username,
          password
        });
        // 将 token 写入 localStorage
        localStorage.setItem('jizhang_token', data.token);
        // history.push('/')
        window.location.href = '/';


      } else {
        if (!verify) {
          Toast.show('请输入验证码')
          return
        };
        if (verify != captcha) {
          Toast.show('验证码错误')
          return
        };
        const { data } = await post('/api/user/register', {
          username,
          password
        });
        Toast.show('注册成功');
        // 注册成功，自动将 tab 切换到 login 状态
        setType('login');
      }
    } catch (error) {
      console.log(error)
      Toast.show('系统错误');
    }
  };

  return <div className={s.auth}>
    <div className={s.head} />
    <div className={s.tab}>
      <span className={cx({ [s.avtive]: type == 'login' })} onClick={() => setType('login')}>登录</span>
      <span className={cx({ [s.avtive]: type == 'register' })} onClick={() => setType('register')}>注册</span>
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="zhanghao" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          onChange={(value?: string | number) => setUsername(value as string)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="mima" />}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          onChange={(value?: string | number) => setPassword(value as string)}
        />
      </Cell>
      {
        type == 'register' ? <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入验证码"
            onChange={(value?: string | number) => setVerify(value as string)}
          />
          <Captcha ref={captchaRef} charNum={4} onChange={handleChange} />
        </Cell> : null
      }

    </div>
    <div className={s.operation}>
      {
        type == 'register' ? <div className={s.agree}>
          <Checkbox />
          <label className="text-light">阅读并同意<a>《掘掘手札条款》</a></label>
        </div> : null
      }
      <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
    </div>
  </div>
}

export default Login