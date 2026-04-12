import { NavLink } from 'react-router-dom'
import classes from './Header.module.scss'

function Header() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.ul}>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                `${classes.cats} ${isActive ? classes.active : ''}`
                            }
                            to={'/cats'}
                        >
                            Все котики
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                `${classes.lovely} ${isActive ? classes.active : ''}`
                            }
                            to={'/lovely'}
                        >
                            Любимые котики
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header