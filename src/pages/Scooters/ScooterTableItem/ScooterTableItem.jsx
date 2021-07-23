import React, { useState } from 'react'
import { TableCell, Button, TableRow, Collapse, IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import GoogleMapReact from 'google-map-react'
import { GOOGLE_API_KEY } from '../../../assets/constants'
import Marker from '../../../components/Marker/Marker'
import PropTypes from 'prop-types'

import styles from '../Scooters.module.scss'

const ScooterTableItem = ({ scooter }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow>
                <TableCell className={styles.scooter_cell}>
                    <IconButton
                        className="button_collapse"
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className={styles.scooter_cell}>{scooter.scooterId}</TableCell>
                <TableCell className={styles.scooter_cell} align="center">
                    {scooter.charge}
                </TableCell>
                <TableCell className={styles.scooter_cell} align="center">
                    {scooter.active ? 'Активно' : 'Не активно'}
                </TableCell>
                <TableCell className={styles.scooter_cell} align="center">
                    {scooter.userActive ? 'Активно' : 'Не активно'}
                </TableCell>
                <TableCell className={styles.scooter_cell} align="right">
                    {scooter.breakdown ? 'Активно' : 'Не активно'}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit className="collapse">
                        <div className={styles.scooter_cell_wrap}>
                            <div className={styles.scooter_cell_descr}>
                                <div className={styles.scooter_cell_descr_title}>Действия</div>

                                <div className={styles.scooter_cell_descr_buttons}>
                                    <Button color="primary" variant="outlined">
                                        Изменить статусы
                                    </Button>
                                    <Button color="secondary" variant="outlined">
                                        Удалить самокат
                                    </Button>
                                </div>
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
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

ScooterTableItem.propTypes = {
    scooter: PropTypes.shape({
        location: PropTypes.objectOf(PropTypes.number),
        _id: PropTypes.string,
        scooterId: PropTypes.number,
        charge: PropTypes.number,
        active: PropTypes.bool,
        userActive: PropTypes.bool,
        breakdown: PropTypes.bool,
        __v: PropTypes.number,
    }),
}

export default ScooterTableItem
