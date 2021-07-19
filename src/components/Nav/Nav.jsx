import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'

import MenuIcon from '@material-ui/icons/Menu'
import * as styles from './Nav.module.scss'

import { IS_MENU } from '../../redux/reducers/settingsReducer'

const menuData = [
    {
        label: 'Карта',
        to: '/',
        icon: <svg viewBox="0 0 24 24" ><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"></path></svg>
    },
    {
        label: 'Самокаты',
        to: '/scooters',
        icon: <svg viewBox="0 0 24 24"><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"></path></svg>
    }
]

const MenuLink = ({ label, to, icon, activeOnlyWhenExact }) => {
    let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
    });
  
    return (
        <Link to={to} className={`${styles.nav_item} ${match ? styles.active : ''}`}>
            <span>{icon}</span>
            <span>{label}</span>
        </Link>
    )
}


const Nav = React.memo(() => {
    const dispatch = useDispatch()
    const menu = useSelector(state => state.settings.isMenu)


    return (
        <div className={`${styles.nav} ${menu ? styles.open : ''}`}>
            <MenuIcon
                onClick={() => dispatch({ type: IS_MENU })}
                className={styles.nav_hamburger} /> 
            <div className={styles.nav_list}>
                {menuData.map((item, index) => {
                    return (
                        <MenuLink
                            key={index.toString()}
                            activeOnlyWhenExact={true}
                            to={item.to}
                            label={item.label}
                            icon={item.icon}
                        />
                    )
                })}
            </div>
        </div>
    )
})

export default Nav
