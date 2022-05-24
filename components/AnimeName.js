
import Link from 'next/link'
const AnimeName = ({name, route}) => {
    return (
        <div className="name-wrapper">
            <Link href={`/${route}`}>
                <span className="name-text">{name}</span>
            </Link>
        </div>
    );
}

export default AnimeName;