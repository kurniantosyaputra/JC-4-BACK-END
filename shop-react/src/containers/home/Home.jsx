import React from 'react';
import './Home.css';
import { listSeason } from '../../function';

import Featured from '../../components/featured/Featured';

class Home extends React.Component {
    state = {
        listSeason: []
    }

    componentWillMount() {
        listSeason().then(season => {
            let imgFeatured = [];
            let testimoniFeatured = [];
            let featured = season.data.map((el, index) => 
                <Featured 
                    key={el.id}
                    idFeatured={el.id}
                    featuredName={el.kategori}
                    testimoniFeatured={testimoniFeatured[index]} 
                    imgFeatured={imgFeatured}
                />
            )
            this.setState({ listSeason: featured })
        });
    }

    render() {
        return (
            
 
             <div id="home">
                <div id="featured-list">
                    {this.state.listSeason}
                </div>
            </div>    

        )
    }
}

export default Home;