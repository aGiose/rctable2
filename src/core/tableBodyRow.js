import React, { Fragment, useState, useEffect } from 'react'
import Cell from './tableBodyCell'
export default function tableBodyRow(props) {
    const { component, data = [], onRow, rowClass = '' } = props
    const [rows, setRows] = useState([])
    const [rowDatas, setRowDatas] = useState(data)

    if (rowDatas !== data) setRowDatas(data)
    useEffect(() => {
        const temp = rowDatas.map((item, index) => {
            let handlers = typeof onRow === 'function' ? onRow(item) : {}
            let _rowClass = typeof rowClass === 'function' ? rowClass(index) : rowClass
            return (
                <component.row className={_rowClass} key={`table-row-${index}`} {...handlers}>
                    <Cell {...props} data={item} />
                </component.row>
            )
        })
        setRows(temp)
    }, [rowDatas])
    return (
        <Fragment>
            {rows}
        </Fragment>
    )
}
