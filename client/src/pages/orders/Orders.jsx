import React from "react";
import { Link } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        console.log(res);

        return res.data
      }).catch((err) => console.log(err)
      )
  })

  return (
    <div className="orders">
      {isPending ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              {/* {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>} */}
              <th>Contact</th>
            </tr>

            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    // onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
           
          </table>
        </div>)}
    </div>
  );
};

export default Orders;