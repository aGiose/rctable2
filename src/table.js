import React, { useState, useEffect } from 'react'
import THeader from './core/tableHeader'
import TBody from './core/tableBody'
import TFooter from './core/tableFooter'
import _ from 'lodash'

import './table.less'

const component = {
    container: 'table',
    header: {
        container: 'thead',
        row: 'tr',
        cell: 'th'
    },
    body: {
        container: 'tbody',
        row: 'tr',
        cell: 'td'
    },
    footer: {
        container: 'tfoot',
        row: 'tr',
        cell: 'td'
    }
}

export default function ({ 
    columns, 
    data = [], 
    pagination = {}, 
    onChange, 
    style = {}, 
    tableStyle = {}, 
    hideFilter = false, 
    className = '', 
    rowClass,
    ...rest }) {
    const [word, setWord] = useState('')
    const [records, setRecords] = useState(data)
    const [groupedRecord, setGroupedRecord] = useState([])
    const [pageConf, setPageConf] = useState({
        ...pagination,
        currentIndex: 0
    })

    useEffect(() => {
        typeof onChange === 'function' && onChange(records, pageConf, word)
    }, [word, pageConf, records])

    //数组排序
    const sortHandler = (key, order, func) => { //order : 0 默认, 1 升序, 2 降序
        if (order === 0) return setRecords(data)
        let temp = [...data]
        temp = Array.prototype.sort.call(temp, func)
        if (order === 2) temp.reverse()

        setRecords(temp)
    }

    useEffect(() => {
        let temp = [...records]
        if (word) {
            temp = temp.filter(item => {
                let values = Object.values(item)
                    , result = false

                for (const value of values) {
                    if (String(value).includes(word)) {
                        result = true
                        break
                    }
                }

                return result
            })
        }
        let size = pageConf.pageSize || 10
            , newRecords = _.chunk(temp, size)
            , currentIndex = pageConf.currentIndex
        if (newRecords.length < pageConf.currentIndex) currentIndex = newRecords.length - 1

        setPageConf({
            ...pageConf,
            total: newRecords.length ? newRecords.length : 1,
            currentIndex
        })
        setGroupedRecord(newRecords)
    }, [records, word])


    return (
        <div className={`table-wrapper ${className}`} style={{ ...style }}>
            {
                !hideFilter
                    ?
                    <SearchInput setSearchWord={setWord} />
                    :
                    null
            }
            <component.container cellSpacing={0} style={{ ...tableStyle }}>
                <THeader component={component.header} columns={columns} sortHandler={sortHandler} />
                <TBody
                    rowClass = {rowClass}
                    component={component.body}
                    columns={columns} /*data = {records}*/
                    data={groupedRecord[pageConf.currentIndex] || []}
                    {...rest}
                />
                <TFooter component={component.footer} cols={columns.length} pagination={pageConf} setPageConf={setPageConf} />
            </component.container>
        </div>
    )
}

const SearchInput = ({ placeholder = '', setSearchWord }) => {
    let timer = null

    useEffect(() => {

        return () => {
            clearTimeout(timer)
        };
    }, [])
    const handleChange = (e) => {
        let value = e.target.value
        clearTimeout(timer)
        timer = setTimeout(() => {
            typeof setSearchWord === 'function' && setSearchWord(value)
        }, 1000)
    }
    return (
        <div className='searchInput-wrapper'>
            <input
                placeholder={placeholder || '请输入筛选条件'}
                onChange={handleChange}
            />
        </div>
    )
}
