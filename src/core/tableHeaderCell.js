import React, { Fragment, useState, useEffect } from 'react'

import sortDescIcon from '../../asset/icons/sort-desc.png' //倒序图标
import sortAscIcon from '../../asset/icons/sort-asc.png' //正序图标
import sortIcon from '../../asset/icons/sort-default.png' //默认排序图标

const sortIcons = [sortIcon, sortAscIcon, sortDescIcon]
export default function tableHeaderCell({ columns = [], component = {}, sortHandler }) {

    const [headers, setHeaders] = useState([])
    const [sortStatus, setSortStatus] = useState({index:'',id:0})

    const handleSort = (key,cb) => {
        const {index,id} = sortStatus

        let next = id + 1
        
        if(index === '' || key !== index) next = 1

        if (next > sortIcons.length - 1 ) next = 0

        sortHandler(key,next,cb)
        
        setSortStatus({index:key,id:next})
    }

    useEffect(() => {
        let temp = columns.map((item, index) => {
            let hasSort = item.hasOwnProperty('sort')

            return (
                <component.cell
                    className={hasSort ? 'table-th-hasort' : ''}
                    style={{ textAlign: item.align, width: item.width }}
                    key={`table-header-${item.index}`}
                    onClick = {hasSort ? (e) => handleSort(item.dataIndex,item.sort) : null}
                    >
                        
                    {item.title}
                    {
                        hasSort
                            ?
                            <img className={'sort-img'} src={item.index === sortStatus.index ? sortIcons[sortStatus.id] : sortIcons[0]} />
                            :
                            null
                    }
                </component.cell>
            )
        })
        setHeaders(temp)
    }, [sortStatus])
    return (
        <Fragment>
            {headers}
        </Fragment>
    )
}
