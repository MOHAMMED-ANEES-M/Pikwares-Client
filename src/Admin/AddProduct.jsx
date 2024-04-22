import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import { successToast, warnToast } from '../components/Toast';
import baseUrl from '../config';



const AddProduct = () => {
    const [data,setData] = useState({
      productname: '',
      productprice: '',
      productactualprice: '',
      deliverycharge: '',
      stock: '',
      productcategory: '',
      productdescription: '',
    })
    const [images, setImages] = useState([]);
    const [displayImages, setDisplayImages] = useState([]);
    const [showImg,setShowImg] = useState(false)
    const [refresh,setrefresh] = useState(false)
    const navigate = useNavigate()
    
    const [fileInputKey, setFileInputKey] = useState(0);

    let userId = localStorage.getItem('userId')




  const handleDone = (res) => {
    console.log('FileBase64 Response:', res);
    const base64 = res[0].base64;
    setImages((prevImages) => [...prevImages, base64]);
    console.log('Image Data:', images);
  };

  let removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((img, i) => i !== index));
    setDisplayImages((prevdisplayImages) => prevdisplayImages.filter((img, i) => i !== index));
    setrefresh((prevRefresh) => !prevRefresh);
    console.log('rfr');
  };


    let handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
    console.log('data',data);
    }

    let displayImage=()=>{
      const latestImage = images[images.length - 1];
      setDisplayImages((prevDisplayImages) => [...prevDisplayImages, latestImage]);
      setShowImg(true)
      setFileInputKey((prevKey) => prevKey + 1);
      console.log(displayImages,'imgs');
    } 

    let handleSubmit = async (e) => {
      e.preventDefault();

    const formData = new FormData();
      displayImages.forEach(image => {
      formData.append('images', image);
    });
    formData.append('productname', data.productname);
    formData.append('productprice', data.productprice);
    formData.append('productactualprice', data.productactualprice);
    formData.append('deliverycharge', data.deliverycharge);
    formData.append('stock', data.stock);
    formData.append('productcategory', data.productcategory);
    formData.append('productdescription', data.productdescription);

      console.log('dispaly images: ',displayImages);
      console.log('Product Data:', data);
      console.log('formData: ', formData);
      
      try{

        if (displayImages.length===0) {
          return warnToast('Images are required')
        }

        if(displayImages){
          console.log('sub',displayImages);
          
          let response=await axios.post(`${baseUrl}/products/insert`,formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          console.log('product response: ',response);
          if(response.data){
            successToast('Product added')
            setrefresh(!refresh)
            setData({
              productname: '',
              productactualname: '',
              deliverycharge: '',
              stock: '',
              productprice: '',
              productcategory: "",
              productdescription: '',
            });
            setImages([]);
            setDisplayImages([]);
            setShowImg(false);
            // window.location.reload();
        }
              
      }else{
        warnToast('Image are required')
        console.log('no',displayImages);
        console.log(data,'data');
      }

      }catch(err){
        console.log(err);
        warnToast(err.response.data.message)
      }
    };

    

    useEffect(()=>{

      if(userId !== 'a1b2c3'){
        navigate('/')
      }

      if (displayImages.length === 0) {
        setShowImg(false);
      }


    },[refresh])


  return (
    <div>
        
        <h1 className='font-semibold text-center text-3xl mt-32'>Add Product</h1>
      <div className='m-auto pt-20 text-center flex flex-wrap justify-evenly'>
            <div className='w-full sm:w-4/5 md:w-2/5 '>
        <form onSubmit={handleSubmit}>

            <div className='text-start w-1/2 m-auto pl-1 mb-2'><label htmlFor="productname">Product Name</label></div>
            <input className='w-1/2 h-10 mb-7 rounded-lg border p-3' type="text" name='productname' value={data.productname} placeholder='Enter Product Name' onChange={handleChange} /><br />
            <div className='text-start w-1/2 m-auto pl-1 mb-2'><label htmlFor="productactualprice">Product Price</label></div>
            <input className='w-1/2 h-10 mb-7 rounded-lg border p-3' type="number" name='productactualprice' value={data.productactualprice} placeholder='Enter Product Price' onChange={handleChange} /><br />
            <div className='text-start w-1/2 m-auto pl-1 mb-2'><label htmlFor="productprice">Product Offer Price</label></div>
            <input className='w-1/2 h-10 mb-7 rounded-lg border p-3' type="number" name='productprice' value={data.productprice} placeholder='Enter Product Offer Price' onChange={handleChange} /><br />
            <div className='text-start w-1/2 m-auto pl-1 mb-2'><label htmlFor="productdescription">Product Description</label></div>
            <textarea className='w-1/2 mb-7 rounded-lg border h-28 p-3' type="text" name='productdescription' value={data.productdescription} placeholder='Product Description...' onChange={handleChange} /><br />
            <div className='text-start w-1/2 m-auto pl-1 mb-2'><label htmlFor="deliverycharge">Delivery Charge</label></div>
            <input className='w-1/2 h-10 mb-7 rounded-lg border p-3' type="number" name='deliverycharge' value={data.deliverycharge} placeholder='Enter Delivery Charge' onChange={handleChange} /><br />
            <div className='text-start w-1/2 m-auto pl-1 mb-2'><label htmlFor="stock">Available Stock</label></div>
            <input className='w-1/2 h-10 mb-7 rounded-lg border p-3' type="number" name='stock' value={data.stock} placeholder='Enter Available Stock' onChange={handleChange} /><br />
            <div className='text-start w-1/2 m-auto pl-1 mb-2'><label htmlFor="productcategory">Product Category</label></div>
            <select className='w-1/2 h-10 rounded-lg mb-7 px-3 border' name="productcategory" id="productcategory" value={data.productcategory} onChange={handleChange}> 
               <option value="" disabled>Select product</option> 
               <option value="mobilephones">Mobile Phones</option> 
               <option value="laptops">Laptops</option> 
               <option value="headsets">Headsets</option> 
               <option value="men">Men</option> 
               <option value="women">Women</option> 
            </select><br />
            <div className='w-1/2 m-auto text-start'><p className='text-red-500 mb-5 '>*Upload images before adding product</p></div>
            <button className='bg-green-500 text-white py-2 px-4 mb-20 rounded-xl h-fit'>Add</button>
            </form>
            </div>
            
            <div className='w-4/5 md:w-2/5'>
            <div className='mb-5'>
              <div className='text-start mb-5'><label htmlFor="image">Product images</label></div>
            <FileBase64 key={fileInputKey} multiple={true} id='image' onDone={handleDone}/>
            <button onClick={displayImage} className='bg-green-500 text-white py-2 px-4 mt-5 rounded-xl h-fit'>+</button>
            </div>
        <h1 className='font-semibold text-3xl mt-20 mb-10'>Uploaded Images</h1>
        <div>
        { showImg ? (
          <div className=' grid grid-cols-2 md:grid-cols-3 gap-3 flex-wrap justify-evenly '>
            {displayImages.map((img, index) => (
              <div key={index} className='relative'>
              <button onClick={() => removeImage(index)} className='absolute top-7 right-3 bg-red-500 text-white p-1 rounded'>
                X
              </button>
            <img key={index} className='w-full h-full object-fill m-auto mt-5' src={img} alt='error image upload' />
            </div>
            ))} 
            </div>
        ):(
          <p className='text-red-500'>No Images uploaded</p>
        )}
                   
            </div>
            </div>
      </div>
    </div>
  )
}

export default AddProduct
