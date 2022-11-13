/*
 * @Author: lzp
 * @Date: 2022-11-08 17:52:01
 * @Description: file content
 */
import React, { forwardRef, useState } from 'react'
import { Popup, DatePicker  } from 'zarm'
import dayjs from 'dayjs' 
interface PropsType {
  onSelect:(value:string)=>void
  mode:string
}
interface Current {
  close:()=>void
  show:()=>void
}
interface typeRef {
 current:Current
}
const PopupDate = forwardRef(({ onSelect, mode = 'date' }:PropsType, ref) => {
  const [show, setShow] = useState(false)
  const [now, setNow] = useState(new Date())

  const choseMonth = (item:string) => {
    setNow(item as any)
    setShow(false)
    if (mode == 'month') {
      onSelect(dayjs(item).format('YYYY-MM'))
    } else if (mode == 'date') {
      onSelect(dayjs(item).format('YYYY-MM-DD'))
    }
  }

  if (ref) {
    ref.current = {
      show: () => {
        setShow(true)
      },
      close: () => {
        setShow(false)
      }
    }
  };
  return <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  >
    <div>
      <DatePicker
        visible={show}
        value={now}
        mode={mode}
        onOk={choseMonth}
        onCancel={() => setShow(false)}
      />
    </div>
  </Popup>
});



export default PopupDate;

