import {useLayoutEffect,useState,useRef} from 'react'
import FileIcon from '../../resources/svg/fileIcon' 
import SendIcon from '../../resources/svg/sendIcon'
import './dialogInput.scss'
  

const DialogInput = (props) => { 
  const  {sendMessageFromOperator, selectDialog} = props
  const [value, setValue] = useState('');
  const ref = useRef();

  // This only tracks the auto-sized height so we can tell if the user has manually resized
  const autoHeight = useRef();

  const sendMessageFromOperatorInput = (text, selectDialog) => {
    setValue('')
    sendMessageFromOperator(text, selectDialog)
  }

  const handleKeyDown = (event) => {
    // if (event.shiftKey && event.key === 'Enter') {
    //   console.log('Shift')
    // }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessageFromOperatorInput(value, selectDialog)
    }
  }

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.height = "auto";
    ref.current.style.overflow = "hidden";
    let next = ref.current.scrollHeight;
    if (next > 54) {
      next = 54
    }
    next = `${next}px`;
    ref.current.style.height = next;
    autoHeight.current = next;
    ref.current.style.overflow = "auto";
  }, [value, ref, autoHeight]);

  return (
    <div className="dialog__input">
      <div className="dialog__input__wrapper">
        <textarea
        className="dialog__input__textarea"
          ref={ref}
          value={value}
          onChange={event => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Сообщение...' 
        />
        <button className='whiteColor'><FileIcon/></button>
        <button className='blueColor' onClick={()=> sendMessageFromOperatorInput(value, selectDialog)}><SendIcon/></button>
      </div>   
    </div>
  )
}

export default DialogInput