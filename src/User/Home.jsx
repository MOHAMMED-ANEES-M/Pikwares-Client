import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css'
import ImageSlider from "../components/ImageSlider/ImageSlider";
import baseUrl from "../config";
import Loader from "../components/Loader/Loader";

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

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};


const Home = () => {

  const [products,setProducts] = useState([''])
  const [showProducts,setShowProducts] = useState(false)
  const [mobileProducts,setMobileProducts] = useState([''])
  const [laptopProducts,setLaptopProducts] = useState([''])
  const [headsetProducts,setHeadsetProducts] = useState([''])
  const [menProducts,setMenProducts] = useState([''])
  const [womenProducts,setWomenProducts] = useState([''])
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(18);
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
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading] = useState(false)
  const [results, setResults] = useState(['']);
  const [isSearchActive,setisSearchActive] = useState(false)
  const navigate = useNavigate()

  let token = localStorage.getItem('token')
  let userId = localStorage.getItem('userId')
  

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


  const handleSearch = async () => {
    try {
      setLoading(true)
      const mobileResponse = await axios.get(`${baseUrl}/products/mobiles/find?s=${searchTerm}`);
      const laptopResponse = await axios.get(`${baseUrl}/products/laptops/find?s=${searchTerm}`);
      const headsetResponse = await axios.get(`${baseUrl}/products/headsets/find?s=${searchTerm}`);
      const menResponse = await axios.get(`${baseUrl}/products/men/find?s=${searchTerm}`);
      const womenResponse = await axios.get(`${baseUrl}/products/women/find?s=${searchTerm}`);

      const filteredMobileResults = mobileResponse.data.filter(product => product.productname.toLowerCase().includes(searchTerm.toLowerCase()));
      const filteredLaptopResults = laptopResponse.data.filter(product => product.productname.toLowerCase().includes(searchTerm.toLowerCase()));
      const filteredHeadsetResults = headsetResponse.data.filter(product => product.productname.toLowerCase().includes(searchTerm.toLowerCase()));
      const filteredMenResults = menResponse.data.filter(product => product.productname.toLowerCase().includes(searchTerm.toLowerCase()));
      const filteredWomenResults = womenResponse.data.filter(product => product.productname.toLowerCase().includes(searchTerm.toLowerCase()));
     
      const allResults = [ ...filteredMobileResults, ...filteredLaptopResults, ...filteredHeadsetResults, ...filteredMenResults, ...filteredWomenResults ];

      console.log(allResults,'response search');
      setResults(allResults); 
      setisSearchActive(true);
      setLoading(false)
      console.log(isSearchActive,'search active');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(()=>{

    try{
      setShowProducts(true)
      
      if(userId === '659a975490f6b3e4142f9d45'){
        navigate('/homeadmin')
      }
      

      let fetchMobileProducts= async ()=>{
        setLoading(true)
        let response = await axios.get(`${baseUrl}/products/mobiles/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('mobileProducts response: ',response);
        setMobileProducts(response.data)
        setProducts(response.data)
        setLoading(false)
      }
      fetchMobileProducts()

      let fetchLaptopProducts= async ()=>{
        setLoading(true)
        let response = await axios.get(`${baseUrl}/products/laptops/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('laptopProducts response: ',response);
        setLaptopProducts(response.data)
        setProducts(response.data)
        setLoading(false)
      }
      fetchLaptopProducts()

      let fetchHeadsetProducts= async ()=>{
        setLoading(true)
        let response = await axios.get(`${baseUrl}/products/headsets/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('headsetProducts response: ',response);
        setHeadsetProducts(response.data)
        setProducts(response.data)
        setLoading(false)
      }
      fetchHeadsetProducts()

      let fetchMenProducts= async ()=>{
        setLoading(true)
        let response = await axios.get(`${baseUrl}/products/men/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('menProducts response: ',response);
        setMenProducts(response.data)
        setProducts(response.data)
        setLoading(false)
      }
      fetchMenProducts()

      let fetchWomenProducts= async ()=>{
        setLoading(true)
        let response = await axios.get(`${baseUrl}/products/women/find`,{
          headers: {
              Authorization: token
            },
      })
        console.log('womenProducts response: ',response);
        setWomenProducts(response.data)
        setProducts(response.data)
        setLoading(false)
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
    
  },[])

  const allProducts = [ ...laptopProducts, ...headsetProducts, ...mobileProducts, ...menProducts, ...womenProducts];
  // shuffleArray(allProducts);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentProducts = allProducts.slice(indexOfFirstOrder, indexOfLastOrder);
  const currentMobilePro = mobileProducts.slice(indexOfFirstOrder, indexOfLastOrder);
  const currentLaptopPro = laptopProducts.slice(indexOfFirstOrder, indexOfLastOrder);
  const currentHeadsetPro = headsetProducts.slice(indexOfFirstOrder, indexOfLastOrder);
  const currentMenPro = menProducts.slice(indexOfFirstOrder, indexOfLastOrder);
  const currentWomenPro = womenProducts.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  return (
    <div className="mt-38 mb-10 min-h-screen">
      {loading ? (<Loader />) : (
    <>
<div className="fixed top-10 h-14 z-10 bg-green-100 w-full flex flex-wrap justify-center gap-3 sm:gap-10 mt-7 sm:mt-9">
    <div class="dropdown pt-4">
  <button>Electronics</button>
  <div class="dropdown-options text-center mt-2 -right-12 -left-12 ">
    <button className="w-40 mb-1 mt-2 buttondd" onClick={showMobiles}>Mobile Phones</button><br />
    <button className="w-40 mb-1 buttondd" onClick={showLaptops}>Laptops</button><br />
    <button className="w-40 mb-2 buttondd" onClick={showHeadsets}>Headsets</button>
  </div>
</div>
    <button className="list-none button" onClick={showMen}>Men</button>
    <button className="list-none button" onClick={showWomen}>Women</button>
    </div>



    
    {/* display all products */}
    <div>
     {showProducts ? (
      <>
      <h1 className='font-semibold text-center text-3xl mt-28 md:mt-32'>
        <ImageSlider/>
      </h1>

      <div className='w-50 m-auto text-center mt-5'>
        <input className='w-2/4 border me-3 border-black h-10 ps-3 rounded mb-3' type="text" placeholder="Search Products..." value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') {handleSearch()} }}
        />
      <button onClick={handleSearch} className='btn bg-black  px-5 h-10 text-white rounded'>Search</button>
      </div>
        

      <div className="mt-10 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 min-[410px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
            {isSearchActive ? (
              results.length > 0 ? (
                results.map((item) => (
                  <Link to={`/viewproduct/${item._id}/${item.productcategory}`} key={item._id}>
                    <div className="border rounded-xl text-center">
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No search results found.</p>
              )
            ) : (
              currentProducts.map((item) => (
                <Link to={`/viewproduct/${item._id}/${item.productcategory}`} key={item._id}>
                  <div className="border rounded-xl text-center">
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
            { isSearchActive ? (null) : (
                 <div className='flex justify-center mt-10 mb-10'>
                 {Array.from({ length: Math.ceil(allProducts.length / ordersPerPage) }, (_, index) => (
                   <button key={index} onClick={() => paginate(index + 1)} 
                   className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'border-2'}`}>
                     {index + 1}
                   </button>
                 ))}
            </div>
            )}

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
      <div className="mt-10 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 min-[410px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {currentMobilePro.length > 0 ? (
            currentMobilePro.map((item) => (
              <Link to={`/viewproduct/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
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
              </div></Link>
            ))
          ) : (
            <p>No mobile products found.</p>
          )}
        </div>

        <div className='flex justify-center mt-10 mb-10'>
            {Array.from({ length: Math.ceil(mobileProducts.length / ordersPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} 
              className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'border-2'}`}>
                {index + 1}
              </button>
            ))}
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
      <div className="mt-10 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 min-[410px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {currentLaptopPro.length > 0 ? (
            currentLaptopPro.map((item) => (
              <Link to={`/viewproduct/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
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
              </div></Link>
            ))
          ) : (
            <p>No laptop products found.</p>
          )}
        </div>

        <div className='flex justify-center mt-10 mb-10'>
            {Array.from({ length: Math.ceil(laptopProducts.length / ordersPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} 
              className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'border-2'}`}>
                {index + 1}
              </button>
            ))}
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
      <div className="mt-10 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 min-[410px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {currentHeadsetPro.length > 0 ? (
            currentHeadsetPro.map((item) => (
              <Link to={`/viewproduct/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
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
              </div></Link>
            ))
          ) : (
            <p>No headset products found.</p>
          )}
        </div>

        <div className='flex justify-center mt-10 mb-10'>
            {Array.from({ length: Math.ceil(headsetProducts.length / ordersPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} 
              className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'border-2'}`}>
                {index + 1}
              </button>
            ))}
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
      <div className="mt-10 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 min-[410px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {currentMenPro.length > 0 ? (
            currentMenPro.map((item) => (
              <Link to={`/viewproduct/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
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
              </div></Link>
            ))
          ) : (
            <p>No men products found.</p>
          )}
        </div>

        <div className='flex justify-center mt-10 mb-10'>
            {Array.from({ length: Math.ceil(menProducts.length / ordersPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} 
              className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'border-2'}`}>
                {index + 1}
              </button>
            ))}
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
      <div className="mt-10 mx-10 grid grid-cols-1 gap-x-6 gap-y-10 min-[410px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {currentWomenPro.length > 0 ? (
            currentWomenPro.map((item) => (
              <Link to={`/viewproduct/${item._id}/${item.productcategory}`}><div className="border rounded-xl text-center" key={item._id}>
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
              </div></Link>
            ))
          ) : (
            <p>No women products found.</p>
          )}
        </div>

        <div className='flex justify-center mt-10 mb-10'>
            {Array.from({ length: Math.ceil(womenProducts.length / ordersPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} 
              className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'border-2'}`}>
                {index + 1}
              </button>
            ))}
       </div>

      </>
    ) : null}
    </div>

</>
      )}
    </div>
  )
}

export default Home
