import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import { CustomPagination } from '../../components/Pagination/CustomPagination';


const Search = () => {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [numOfPage, setNumOfPage] = useState();

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "discover" : "movie"}?api_key=73a73dda6aef402ee87166dd70d8aa0d&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setNumOfPage(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [type, page]);


    return (
        <div>
            <Box style={{ display: "flex", margin: "15px 0" }}
                component="form"
                sx={{
                    maxWidth: '100%',
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        style={{ flex: 1, color: 'rgba(0, 0, 0, 0.85)' }}
                        id="fullWidth"
                        className='searchBox'
                        label="Search"
                        type="search"
                        variant="standard"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>


                <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch}>
                    <SearchIcon />
                </Button>
            </Box>
            <Tabs
                value={type}
                indicatorColor='primary'
                textColor='primary'
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                }}
                style={{ paddingBottom: 5, color: 'rgba(0, 0, 0, 0.85)' }}
            >
                <Tab style={{ width: "50%" }} label="Search Movies" />
                <Tab style={{ width: "50%" }} label="Search TV Series" />
            </Tabs>
            <div className="trending">
                {content && content.map((c) => (
                    <SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type={type ? "discover" : "movie"}
                        vote_average={c.vote_average}
                    />
                ))}
                {searchText && !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
                }
            </div>
            {numOfPage > 1 && (
                <CustomPagination setPage={setPage} />
            )}
        </div>
    );
};
export default Search;