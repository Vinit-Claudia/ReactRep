import './App.css';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { Card, Box } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux'
import { getUsers } from './stores/user'

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const InfiniteScroll = () => {
  // const [details, setDetails] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()  

  useEffect(()=>{
    dispatch(getUsers(page))
  },[page])

  /** Using local State */

  // useEffect(() => {
  //     fetchData();
  // }, [page]);


  // const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //         const res = await fetch(
  //             `https://reqres.in/api/users?page=${page}`);
  //         const data = await res.json();
  //         setDetails(prevPosts => [...prevPosts, ...data.data]);
  //         setHasMore(data.page !== data.total_pages);
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     } finally {
  //         setLoading(false);
  //     }
  // };


  const handleScroll = () => {
      if (!users.loading && users.hasMore &&
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 20) {
          
          setPage(prevPage => prevPage + 1);
      }
  };


  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, [users.loading, users.hasMore]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {users.value.map((photo) => (        
          <Grid key={photo.id} size={{ xs: 12, sm: 6, md: 4 }} style={{height: '350px'}}>
            <Item>
              <img src={photo.avatar} alt={photo.first_name} />
              <h3>{photo.first_name}</h3>
              <h3>{photo.last_name}</h3>
              <p style={{fontSize:'12px'}}>{photo.email}</p>
            </Item>
          </Grid>
        ))}
        {
          users.loading &&
          <div>Loading...</div>
        }
      </Grid>
    </Box>
  );
};

export default InfiniteScroll;
