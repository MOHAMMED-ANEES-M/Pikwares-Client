import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeAdmin.css'

const ProductSlider = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {Array.isArray(images) && images.length > 0 ? (
        images.map((pic, index) => (
          <div className="h-1/2 bg-white p-1" key={index}>
            <img
              src={pic}
              alt={`product-${index}`}
              className="h-full w-full object-contain object-center aspect-square lg:h-full lg:w-full"
            />
          </div>
        ))
      ) : (
        <p className="text-center mt-10">image loading...</p>
      )}
    </Slider>
  );
};



const HomeAdmin = () => {

  const [products,setProducts] = useState([''])
  const [showProducts,setShowProducts] = useState(false)
  const [mobileProducts,setMobileProducts] = useState([''])
  const [laptopProducts,setLaptopProducts] = useState([''])
  const [headsetProducts,setHeadsetProducts] = useState([''])
  const [menProducts,setMenProducts] = useState([''])
  const [womenProducts,setWomenProducts] = useState([''])
  const [showMobileProducts,setShowMobileProducts] = useState(false)
  const [showLaptopProducts,setShowLaptopProducts] = useState(false)
  const [showHeadsetProducts,setShowHeadsetProducts] = useState(false)
  const [showMenProducts,setShowMenProducts] = useState(false)
  const [showWomenProducts,setShowWomenProducts] = useState(false)
  const [isMobileLoading, setIsMobileLoading] = useState(false);
  const [isLaptopLoading, setIsLaptopLoading] = useState(false);
  const [isHeadsetLoading, setIsHeadsetLoading] = useState(false);
  const [isMenLoading, setIsMenLoading] = useState(false);
  const [isWomenLoading, setIsWomenLoading] = useState(false);
  const [refresh,setRefresh] = useState(false)
  const navigate = useNavigate()

  let token = localStorage.getItem('token')


  let showMobiles = () => {
    setIsMobileLoading(true);
      setShowLaptopProducts(false);
      setShowHeadsetProducts(false);
      setShowMenProducts(false);
      setShowWomenProducts(false);
      setShowProducts(false)
    const timer = setTimeout(() => {
      setIsMobileLoading(false);
      setShowMobileProducts(true);
      console.log('mobiles');
    }, 100);
    return () => clearTimeout(timer);
  };

  let showLaptops = () => {
    setIsLaptopLoading(true);
      setShowMobileProducts(false);
      setShowHeadsetProducts(false);
      setShowMenProducts(false);
      setShowWomenProducts(false);
      setShowProducts(false)
    const timer = setTimeout(() => {
      setShowLaptopProducts(true);
      setIsLaptopLoading(false);
      console.log('laptops');
    }, 100);
    return () => clearTimeout(timer);
  };

  let showHeadsets = () => {
    setIsHeadsetLoading(true);
      setShowLaptopProducts(false);
      setShowMobileProducts(false);
      setShowMenProducts(false);
      setShowWomenProducts(false);
      setShowProducts(false)
    const timer = setTimeout(() => {
      setShowHeadsetProducts(true);
      setIsHeadsetLoading(false);
      console.log('laptops');
    }, 100);
    return () => clearTimeout(timer);
  };

  let showMen = () => {
    setIsMenLoading(true);
      setShowLaptopProducts(false);
      setShowMobileProducts(false);
      setShowHeadsetProducts(false);
      setShowWomenProducts(false);
      setShowProducts(false)
    const timer = setTimeout(() => {
      setIsMenLoading(false);
      setShowMenProducts(true);
      console.log('laptops');
    }, 100);
    return () => clearTimeout(timer);
  };

  let showWomen = () => {
    setIsWomenLoading(true);
    setShowLaptopProducts(false);
      setShowMobileProducts(false);
      setShowHeadsetProducts(false);
      setShowMenProducts(false);
      setShowProducts(false)
    const timer = setTimeout(() => {
      setIsWomenLoading(false);
      setShowWomenProducts(true);
      console.log('laptops');
    }, 100);
    return () => clearTimeout(timer);
  };

  let handleMobileDelete= async (id,e)=>{
    if (e) {
      e.preventDefault(); 
    }
    console.log(id);
    console.log('handleMobiledelete');
    let response = await axios.delete(`http://localhost:8000/deleteMobiles/${id}`)
    console.log(response);
    setRefresh(!refresh)
      setShowLaptopProducts(false);
      setShowMobileProducts(true);
      setShowHeadsetProducts(false);
      setShowMenProducts(false);
      setShowProducts(false)
      setShowWomenProducts(false);
  }

  let handleLaptopDelete= async (id,e)=>{
    if (e) {
      e.preventDefault(); 
    }
    console.log(id);
    console.log('handleLaptopdelete');
    let response = await axios.delete(`http://localhost:8000/deleteLaptops/${id}`)
    console.log(response);
    setRefresh(!refresh)
  }

  let handleHeadsetDelete= async (id,e)=>{
    if (e) {
      e.preventDefault(); 
    }
    console.log(id);
    console.log('handleHeadsetdelete');
    let response = await axios.delete(`http://localhost:8000/deleteHeadsets/${id}`)
    console.log(response);
    setRefresh(!refresh)
  }

  let handleMenDelete= async (id,e)=>{
    if (e) {
      e.preventDefault(); 
    }
    console.log(id);
    console.log('handleMendelete');
    let response = await axios.delete(`http://localhost:8000/deleteMen/${id}`)
    console.log(response);
    setRefresh(!refresh)
  }

  let handleWomenDelete= async (id,e)=>{
    if (e) {
      e.preventDefault(); 
    }
    console.log(id);
    console.log('handleWomendelete');
    let response = await axios.delete(`http://localhost:8000/deleteWomen/${id}`)
    console.log(response);
    setRefresh(!refresh)
  }

  useEffect(()=>{
    
    
    try{
      console.log('load start');
      
      if(!refresh){
        setShowProducts(true)
      }

      if(!token){
        navigate('/login')
      }
      

      let fetchMobileProducts= async ()=>{
        
        let response = await axios.get(`http://localhost:8000/products/mobiles/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('mobileProducts response: ',response);
        setMobileProducts(response.data)
        setProducts(response.data)
        
      }
      fetchMobileProducts()

      let fetchLaptopProducts= async ()=>{
        
        let response = await axios.get(`http://localhost:8000/products/laptops/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('laptopProducts response: ',response);
        setLaptopProducts(response.data)
        setProducts(response.data)
        
      }
      fetchLaptopProducts()

      let fetchHeadsetProducts= async ()=>{
        
        let response = await axios.get(`http://localhost:8000/products/headsets/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('headsetProducts response: ',response);
        setHeadsetProducts(response.data)
        setProducts(response.data)
    
      }
      fetchHeadsetProducts()

      let fetchMenProducts= async ()=>{
        
        let response = await axios.get(`http://localhost:8000/products/men/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('menProducts response: ',response);
        setMenProducts(response.data)
        setProducts(response.data)
    
      }
      fetchMenProducts()

      let fetchWomenProducts= async ()=>{
        
        let response = await axios.get(`http://localhost:8000/products/women/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('womenProducts response: ',response);
        setWomenProducts(response.data)
        setProducts(response.data)
        
      }
      fetchWomenProducts()

      let productList = {womenProducts,menProducts,mobileProducts,laptopProducts,headsetProducts}
      console.log('All Products: ',productList);

    }catch(err){
      console.log(err);
    }finally {
      setIsMobileLoading(false); 
      setIsLaptopLoading(false); 
      setIsHeadsetLoading(false); 
      setIsMenLoading(false); 
      setIsWomenLoading(false); 
      console.log('load stop');
    }

  
    
  },[token,navigate,refresh])

  return (
    <div className="mt-20">

    <div className="fixed top-10 h-14 z-10 bg-green-100 w-full flex flex-wrap ps-5 sm:justify-center gap-3 sm:gap-10 mt-7 sm:mt-9">
    <div class="dropdown pt-4 relative">
  <button>Electronics</button>
  <div class="dropdown-options text-center ">
    <button className="w-40 mb-1 mt-2 buttondd" onClick={showMobiles}>Mobile Phones</button><br />
    <button className="w-40 mb-1 buttondd" onClick={showLaptops}>Laptops</button><br />
    <button className="w-40 mb-2 buttondd" onClick={showHeadsets}>Headsets</button>
  </div>
</div>
    <button className="list-none button" onClick={showMen}>Men</button>
    <button className="list-none button" onClick={showWomen}>Women</button>
    <Link to='/addproductadmin'><button className="absolute top-2 right-2 sm:right-5 bg-green-500 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-xl h-fit">Add Product</button></Link>
    </div>



    
    {/* display all products */}
    <div>
     {showProducts ? (
      <>
      <h1 className='font-semibold text-center text-3xl mt-40'>Products</h1>
        <div className="mt-20 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">

          {mobileProducts.length > 0 ? (
            mobileProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className=" mx-5">
                  <div className="group relative bg-white">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          
          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                    
                  </div>
                </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer " onClick={(e) => handleMobileDelete(item._id,e)}>
                            Delete
                </button>
              </div></Link>
            ))
          ) : (
            null
          )}
       
          {laptopProducts.length > 0 ? (
            laptopProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className=" mx-5">
                  <div className="group relative bg-white ">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          <div></div>
                          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer" onClick={(e) => handleLaptopDelete(item._id,e)}>
                            Delete
                          </button>
              </div></Link>
            ))
          ) : (
            null
          )}


{headsetProducts.length > 0 ? (
            headsetProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className=" mx-5">
                  <div className="group relative bg-white">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          <div></div>
                          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer" onClick={(e) => handleHeadsetDelete(item._id,e)}>
                            Delete
                          </button>
              </div></Link>
            ))
          ) : (
            null
          )}


{menProducts.length > 0 ? (
            menProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className="mx-5">
                  <div className="group relative bg-white">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          <div></div>
                          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer" onClick={(e) => handleMenDelete(item._id,e)}>
                            Delete
                          </button>
              </div></Link>
            ))
          ) : (
            null
          )}


{womenProducts.length > 0 ? (
            womenProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className="mx-5">
                  <div className="group relative bg-white">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          <div></div>
                          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer" onClick={(e) => handleWomenDelete(item._id,e)}>
                            Delete
                          </button>
              </div></Link>
            ))
          ) : (
            null
          )}


        </div>
      </>
    ) : null}
    </div>

    
      


      {/* display mobile products */}
    <div>
    {isMobileLoading ? (
      <div className="loading-container m-auto text-center mt-60">
        <p>Loading mobile products...</p>
      </div>
    ) : showMobileProducts ? (
      <>
      <h1 className='font-semibold text-center text-3xl mt-40'>Mobile Phones</h1>
      <div className="mt-20 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {mobileProducts.length > 0 ? (
            mobileProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className=" mx-5">
                  <div className="group relative bg-white">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          <div></div>
                          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer" onClick={(e) => handleMobileDelete(item._id,e)}>
                            Delete
                          </button>
              </div></Link>
            ))
          ) : (
            <p>No mobile products found.</p>
          )}
        </div>
      </>
    ) : null}
    </div>



     {/* display laptop products */}
     <div>
    {isLaptopLoading ? (
      <div className="loading-container m-auto text-center mt-60">
        <p>Loading laptop products...</p>
      </div>
    ) : showLaptopProducts ? (
      <>
      <h1 className='font-semibold text-center text-3xl mt-40'>Laptops</h1>
      <div className="mt-20 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {laptopProducts.length > 0 ? (
            laptopProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className=" mx-5">
                  <div className="group relative bg-white">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          <div></div>
                          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer" onClick={(e) => handleLaptopDelete(item._id,e)}>
                            Delete
                          </button>
              </div></Link>
            ))
          ) : (
            <p>No laptop products found.</p>
          )}
        </div>
      </>
    ) : null}
    </div>


    {/* display headset products */}
    <div>
    {isHeadsetLoading ? (
      <div className="loading-container m-auto text-center mt-60">
        <p>Loading headset products...</p>
      </div>
    ) : showHeadsetProducts ? (
      <>
      <h1 className='font-semibold text-center text-3xl mt-40'>Headsets</h1>
      <div className="mt-20 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {headsetProducts.length > 0 ? (
            headsetProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className=" mx-5">
                  <div className="group relative bg-white">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          <div></div>
                          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer" onClick={(e) => handleHeadsetDelete(item._id,e)}>
                            Delete
                          </button>
              </div></Link>
            ))
          ) : (
            <p>No headset products found.</p>
          )}
        </div>
      </>
    ) : null}
    </div>



    {/* display men products */}
    <div>
    {isMenLoading ? (
      <div className="loading-container m-auto text-center mt-60">
        <p>Loading men products...</p>
      </div>
    ) : showMenProducts ? (
      <>
      <h1 className='font-semibold text-center text-3xl mt-40'>Men</h1>
      <div className="mt-20 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {menProducts.length > 0 ? (
            menProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className=" mx-5">
                <div className="group relative bg-white">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          <div></div>
                          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                </div>
              </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer z-10" onClick={(e) => handleMenDelete(item._id,e)}>
                            Delete
                          </button>
                  </div></Link>
            ))
          ) : (
            <p>No men products found.</p>
          )}
        </div>
      </>
    ) : null}
    </div>



    {/* display women products */}
    <div>
    {isWomenLoading ? (
      <div className="loading-container m-auto text-center mt-60">
        <p>Loading women products...</p>
      </div>
    ) : showWomenProducts ? (
      <>
      <h1 className='font-semibold text-center text-3xl mt-40'>Women</h1>
      <div className="mt-20 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {womenProducts.length > 0 ? (
            womenProducts.map((item) => (
              <Link to={`/viewproductadmin/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
                <div className=" mx-5">
                  <div className="group relative bg-white">
                    <ProductSlider images={item.images} />
                    <div className="flex justify-between">
                      <div className="m-auto mt-10 text-center">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {item.productname}
                          </h3>
                          <p className="my-2 text-sm text-gray-700">Rs {item.productprice}</p>
                          <div></div>
                          
                        </div>
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">$35</p> */}
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-center bg-red-500 text-sm text-white p-1 mb-5 px-5 rounded-xl cursor-pointer" onClick={(e) => handleWomenDelete(item._id,e)}>
                            Delete
                          </button>
              </div></Link>
            ))
          ) : (
            <p>No women products found.</p>
          )}
        </div>
      </>
    ) : null}
    </div>


    </div>
  )
}

export default HomeAdmin
