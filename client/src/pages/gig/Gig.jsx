import React, { useEffect } from 'react'
import './Gig.scss'
import { Slider } from 'infinite-react-carousel'
import { Link, useParams } from "react-router-dom"
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';
import Reviews from '../../components/reviews/Reviews';

function Gig() {

  const { id } = useParams()

  console.log(id);


  const { isPending, error, data } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        console.log(res);

        return res.data
      }).catch((err) => console.log(err)
      )
  })

    
    const { isPending: isPendingUser, error: errorUser, data: dataUser } = useQuery({
      queryKey: ["user"],
      queryFn: () =>
        newRequest.get(`/users/${data.userId}`).then((res) => {
          console.log(res);
  
          return res.data
        }).catch((err) => console.log(err)
        )
    })

  return (
    <div className="gig">
      {isPending ? "loading" : error ? "something went wrong" : <div className="container">
        <div className="left">
          <span className="breadcrumbs">Liverr {'>'} Graphics & Design {'>'}</span>

          <h1>{data.title}</h1>
          {isPendingUser ? "loading" : errorUser ? "Something went wrong" : <div className="user">
            <img
              className="pp"
              src={dataUser.img || "/img/noavatar.jpg"}
              alt=""
            />
            <span>{dataUser.username}</span>

            {!isNaN(data.totalStars / data.starNumber) &&
              <div className="stars">
                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (

                  <img key={i} src="/img/star.png" alt="" />
                ))}
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
              </div>}
          </div>}

          {(data && data?.images?.length > 0) && (
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data?.images?.map((img) => (

                <img
                  key={img}
                  src={img}
                  alt=""
                />
              ))}

            </Slider>
          )}

          <h2>About This Gig</h2>
          <p>{data.desc}</p>

          {isPendingUser ? "loading" : errorUser ? "Something went wrong" : <div className="seller">

            <h2>About The Seller</h2>
            <div className="user">
              <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) &&
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (

                      <img key={i} src="/img/star.png" alt="" />
                    ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>}
                <button>Contact Me</button>
              </div>
            </div>

            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
             <p>{dataUser.desc}</p>
            </div>
          </div>}

        <Reviews gigId={id}/>
        </div>

        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>
          <p>{data.shortDesc}</p>
          <div className="details">   <div className="item">
            <img src="/img/clock.png" alt="" />
            <span>{data.deliveryDate} Days Delivery</span>
          </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data?.features?.map((feature) => (
              <div className="item" key={feature}>
                <img src="/img/greencheck.png" alt="" />
                <span>{feature}</span>
              </div>
            ))}

          </div>
          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>
        </div>

      </div>}
    </div>
  )
}

export default Gig