import classes from './Header.module.scss'

function Header(props: any) {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.ul}>
                    <li className={classes.cats}><a>Все котики</a></li>
                    <li><a className={classes.lovely}>Любимые котики</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;