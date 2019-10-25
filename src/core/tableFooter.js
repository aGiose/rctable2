//分页组件
import React ,{useState} from 'react'
import './pagination.less'

export default function tableFooter({ component, cols,pagination,setPageConf }) {    
    return (
        <component.container>
            <component.row >
                <component.cell colSpan={cols}>
                    <Pagination pagination = {pagination} setPageConf = {setPageConf}/>
                </component.cell>
            </component.row>
        </component.container>
    )
}

const Button = ({ children, style = {}, className = '', onClick,disabled }) => {
    return <button
        className={`normal-btn ${className}`}
        onClick = {onClick}
        style={{ ...style }}>
        {children}
    </button>
}

const Pagination = ({pagination = {} ,setPageConf }) => {
    const {currentIndex = 0, total = 6} = pagination
    // const [current,setCurrent] = useState(currentIndex)
    let current = currentIndex + 1
    const handleClick = (id) => {
        
        return (e) => {
            if(id === 'next' && current < total) return setPageConf({
                ...pagination,
                currentIndex:current 
            })
            if(id === 'previous' && current > 1) return setPageConf({
                ...pagination,
                currentIndex:current - 2
            })
            if(typeof id === 'number') return setPageConf({
                ...pagination,
                currentIndex:id-1
            })
        }
    }
    return (
        <ul className='pagination-wrapper'>
            <li title='上一页' className='pagination-previous'>
                <Button onClick = {handleClick('previous')}>
                    <svg t="1571895824831" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2212" width="12" height="12"><path d="M254.89 512l448-448 60.417 60.33-448 448L254.89 512z m60.843-60.757l453.291 453.376-60.33 60.33-453.377-453.376 60.416-60.33z" p-id="2213" fill="#8a8a8a"></path></svg>
                </Button>
            </li>
            {
                Array.from(new Array(total)).map((item,index) => {
                    let _index = index + 1
                    return  <li className='pagination-item'>
                                <Button className = {_index === current ? 'btn-is-active' : ''} id = {_index} onClick = {handleClick(_index)}>{_index}</Button>
                            </li>
                })
            }
            <li title='下一页' className='pagination-next'>
                <Button onClick = {handleClick('next')}>
                    <svg t="1571895931446" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2483" width="12" height="12"><path d="M769.11 512l-448 448-60.417-60.33 448-448L769.11 512z m-60.843 60.757l-453.291-453.376 60.33-60.33 453.377 453.376-60.416 60.33z" p-id="2484" fill="#8a8a8a"></path></svg>
                </Button>
            </li>
        </ul>
    )
}
