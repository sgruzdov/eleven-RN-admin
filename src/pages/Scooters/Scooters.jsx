import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TableCell, TableRow, CircularProgress, Table, Paper, TableContainer, TableHead, TableBody, Collapse, TablePagination, IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import GoogleMapReact from 'google-map-react'
// import { useHistory } from 'react-router-dom'

import Loading from '../../components/Loading/Loading'
import { REMOVE_SCOOTERS, getScootersPaginationThunk } from '../../redux/reducers/scootersReducer'
import * as styles from './Scooters.module.scss'
import { GOOGLE_API_KEY } from '../../assets/constants'
import Marker from '../../components/Marker'


const Row = ({ scooter }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow>
                <TableCell className={styles.scooter_cell}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className={styles.scooter_cell}>{scooter.scooterId}</TableCell>
                <TableCell className={styles.scooter_cell} align="center">{scooter.charge}</TableCell>
                <TableCell className={styles.scooter_cell} align="center">{scooter.active ? 'Активно' : 'Не активно'}</TableCell>
                <TableCell className={styles.scooter_cell} align="center">{scooter.userActive ? 'Активно' : 'Не активно'}</TableCell>
                <TableCell className={styles.scooter_cell} align="right">{scooter.breakdown ? 'Активно' : 'Не активно'}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{padding: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <div className={styles.scooter_cell_descr}>
                            
                        </div>
                        <div className={styles.scooter_cell_map}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                                defaultCenter={[scooter.location.latitude, scooter.location.longitude]}
                                defaultZoom={14}
                            >
                                <Marker
                                    lat={scooter.location.latitude}
                                    lng={scooter.location.longitude}
                                    marker={scooter}
                                />
                            </GoogleMapReact>
                        </div>
                        
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

const Scooters = () => {
    // let history = useHistory()
    const dispatch = useDispatch()
    const scooters = useSelector(state => state.scooters)

    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage)
      dispatch(getScootersPaginationThunk(rowsPerPage*newPage, rowsPerPage))
    }
  
    const handleChangeRowsPerPage = e => {
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
                                <TableRow >
                                    <TableCell></TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Зарядка</TableCell>
                                    <TableCell align="center">В работе</TableCell>
                                    <TableCell align="center">У пользователя</TableCell>
                                    <TableCell align="right">Сломан</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    !scooters.loadingList
                                    ? scooters.data.map(item => (<Row key={item.scooterId} scooter={item}/>))
                                    : <TableRow><TableCell colSpan={6} style={{border: 'none'}}><div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></div></TableCell></TableRow>
                                }
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
