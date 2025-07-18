import React, { useEffect, useRef, useState } from 'react'
import './Gigs.scss'
// import { gigs } from '../../data';
import GigCard from '../../components/gigCard/GigCard';
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

function Gigs() {

  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();



  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }

  const {search} = useLocation()

  console.log(location );
  
  
  const { isPending, error, data , refetch} = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get(`/gigs${search ? search : "?"}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res) => {
        console.log(res);
        
        return res.data 
      }).catch((err)=> console.log(err)
      )
  })

  console.log(data);
  
  useEffect(()=> {
    refetch()
  },[sort])

  const apply = ()=> {
    console.log(minRef.current.value);
    console.log(maxRef.current.value);
    
    refetch()
  }


  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr {'>'} Graphics & Design {'>'}</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>

          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === 'sales' ? "Best Selling" : 'Newest'}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && <div className="rightMenu">

              {sort === 'sales' ? (<span onClick={() => reSort('createdAt')}>Newest</span>)
                :
                (<span onClick={() => reSort('sales')}>Best Selling</span>
                )}

            </div>}


          </div>

        </div>

        <div className="cards">
          {isPending ? "loading" : error ? "Something went wrong" : data?.map((gig) => (
            <GigCard key={gig._id} item={gig} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Gigs