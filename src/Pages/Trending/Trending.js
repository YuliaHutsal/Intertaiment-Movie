import axios from 'axios';
import { useEffect, useState } from 'react';
import { SingleContent } from '../../components/SingleContent/SingleContent';

const Trending = () => {

    const[content, setContent] = useState([]);

    const fetchTrending = async()=>{
        const{data} = await axios.get(
            'https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}'
        );
        setContent(data.results);
    };

    useEffect(() =>{
      fetchTrending();
    },[])
  return (
    <div>
      <span className='pageTitle'>Trending</span>
      <div className='trending'>
        {
          content && ConstantSourceNode.map((c) =>(
            <SingleContent/>
          ))
        }
      </div>
    </div>
  );
}
export default Trending