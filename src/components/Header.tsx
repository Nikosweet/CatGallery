import classes from './Header.module.scss'

function Header(props: any) {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.ul}>
                    <li><a className={classes.cats} href={'/cats'}>Все котики</a></li>
                    <li><a className={classes.lovely} href={'/lovely'}>Любимые котики</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;