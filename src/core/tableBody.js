import React, { useState, useEffect } from 'react'

import Row from './tableBodyRow'

export default function (props) {
    const { data, component, columns } = props
    return (
        <props.component.container>
            {
                data.length > 0
                    ?
                    <Row {...props} />
                    :
                    <component.row>
                        <component.cell colSpan={columns.length}>
                            <div className='no-data-content'>暂无数据</div>
                        </component.cell>
                    </component.row>

            }
        </props.component.container>

    )
}