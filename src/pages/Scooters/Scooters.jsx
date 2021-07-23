import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    TableCell,
    TableRow,
    CircularProgress,
    Table,
    Paper,
    TableContainer,
    TableHead,
    TableBody,
    TablePagination,
} from '@material-ui/core'
// import { useHistory } from 'react-router-dom'

import Loading from '../../components/Loading/Loading'
import { REMOVE_SCOOTERS, getScootersPaginationThunk } from '../../redux/reducers/scootersReducer'
import ScooterTableItem from './ScooterTableItem/ScooterTableItem'

// import * as styles from './Scooters.module.scss'

const Scooters = () => {
    // let history = useHistory()
    const dispatch = useDispatch()
    const scooters = useSelector((state) => state.scooters)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (_, newPage) => {
        setPage(newPage)
        dispatch(getScootersPaginationThunk(rowsPerPage * newPage, rowsPerPage))
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
        dispatch(getScootersPaginationThunk(0, +e.target.value))
    }

    useEffect(() => {
        dispatch(getScootersPaginationThunk(0, 10))
        return () => dispatch({ type: REMOVE_SCOOTERS })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="content">
            <div className="main-title">Самокаты</div>
            <Paper>
                <TableContainer style={{ height: '688px', width: '100%' }}>
                    <Table stickyHeader aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell align="center">Зарядка</TableCell>
                                <TableCell align="center">В работе</TableCell>
                                <TableCell align="center">У пользователя</TableCell>
                                <TableCell align="right">Сломан</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!scooters.loadingList ? (
                                scooters.data.map((item) => <ScooterTableItem key={item.scooterId} scooter={item} />)
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} style={{ border: 'none' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <CircularProgress />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    labelRowsPerPage="Самокатов на странице"
                    rowsPerPageOptions={[10, 25, 50]}
                    count={+scooters.scootersListCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {scooters.loading && <Loading />}
        </div>
    )
}

export default Scooters
