import './home.styles.css'
import Content from '../../component/content/content.component'

const Home = ({ title }) => {
    return (
            <div className="container">
                <div className="quoteBox">
                    <h1>{title}</h1>
                    <Content />
                </div>
            </div>
    )
}

export default Home;