import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AccountCustomer = () => {

    const [data,setData] = useState({
      pincode: '',
      city: '',
      district: '',
      state: '',
      landmark: '',
    })
    const [personalData,setisPersonalData] = useState('')
    const [profile,setProfile] = useState('')
    const [address,setAddress] = useState({
      pincode: '',
      city: '',
      district: '',
      state: '',
      landmark: '',
    })
    const [addressId,setaddressId] = useState('')
    const [isNotAddress,setisNotAddress] = useState(false)
    const [isNotEditable,setisNotEditable] = useState(true)
    const [isPersonalEdit,setisPersonalEdit] = useState(false)
    const [refresh,setrefresh] = useState(false)
    const navigate = useNavigate()
    const inputRef = useRef()
    const inputRefFirstname = useRef()

    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')


  let handleChange=(e)=>{
      setData({...data,[e.target.name]:e.target.value})
  }

  let handlePersonalChange=(e)=>{
    setisPersonalData({...personalData,[e.target.name]:e.target.value})
  }

  let handleEdit=()=>{
    setisNotEditable(!isNotEditable)
  }

  let handleCancel=()=>{
    setisNotEditable(!isNotEditable)
  }

  let handleEditPersonal=()=>{
    setisPersonalEdit(!isPersonalEdit)
  }

  let handleCancelEditPersonal=()=>{
    setisPersonalEdit(!isPersonalEdit)
  }

    let handleSubmit=async (e)=>{
        e.preventDefault()

        try{
         
          let response=await axios.post('http://localhost:8000/customer/address/insert',data,{
            params: {
                id: userId,
              },
          })
          if(response){
            console.log(response,'res');
            setisNotAddress(!isNotAddress)
            setrefresh(!refresh)
            alert('Address added')
          }
        }
        catch(err){
          console.log(err.response.data.message);
          alert(err.response.data.message)
        }
    }

    let handleUpdate=async (e)=>{
      e.preventDefault()

      try{

        const id = addressId
        console.log(addressId);
        console.log('adrsid:',id);

        console.log('adress',address);
        console.log('pin',address.pincode);

        if(!data.pincode){
          data.pincode=address.pincode
        }
        if(!data.city){
          data.city=address.city
        }
        if(!data.district){
          data.district=address.district
        }
        if(!data.state){
          data.state=address.state
        }
        if(!data.landmark){
          data.landmark=address.landmark
        }

        let response=await axios.put('http://localhost:8000/customer/address/update',data,{
          params: {
              id: addressId,
            },
        })
        if(response){
          console.log(response,'res');
          setisNotEditable(!isNotEditable)
          alert('Address details updated')
        }
      }
      catch(err){
        console.log(err.response.data.message);
        alert(err.response.data.message)
      }
  }

  let handleUpdatePersonal= async (e)=>{
    e.preventDefault()
    console.log('perdata: ',personalData);

    try{

      if(!personalData.firstname){
        personalData.firstname=profile.firstname
      }
      if(!personalData.lastname){
        personalData.lastname=profile.lastname
      }
      if(!personalData.number){
        personalData.number=profile.number
      }
      if(!personalData.email){
        personalData.email=profile.email
      }

      let response=await axios.put('http://localhost:8000/customer/update',personalData,{
        params: {
            id: userId,
          },
      })
      if(response){
        console.log('updatedPersonal: ',response);
        setisPersonalEdit(!isPersonalEdit)
        setrefresh(!refresh)
        alert('Personal details updated')
      }

    }catch(err){
      console.log(err.response.data.message);
      alert(err.response.data.message)
    }
  }


    useEffect(()=>{

      
      if(!token){
        return navigate('/login')
     }

        if (!isNotEditable) {
            inputRef.current.focus();
          }

          if (!isNotAddress && inputRefFirstname.current) {
            inputRefFirstname.current.focus();
          }

        let fetchAccount= async ()=>{
                try{

                let response = await axios.get(`http://localhost:8000/customer/findAccount/`,{
                    headers: {
                        Authorization: token
                      },
                      params: {
                        id: userId,
                      },
                })
                console.log('account response: ',response);
                setProfile(response.data)
                
            }catch(err){
                console.log(err);
            }
        }
        fetchAccount()

        let fetchAddress= async ()=>{
            console.log(userId,'id');
            try{
                let response = await axios.get(`http://localhost:8000/customer/address/findAddress`,{
                    headers: {
                        Authorization: token
                      },
                      params: {
                        id: userId,
                      },
                })
                console.log('address response: ',response);
                setAddress(response.data)
                setaddressId(response.data._id)
                setisNotAddress(false)
                console.log(response.data._id,'idas');
                console.log(isNotAddress);
              }catch(err){
                console.log(err);
                console.log(isNotAddress);
            }
        }
        fetchAddress()

        console.log(address,'adrsssss');
      if(address.pincode===''&&address.city===''&&address.district===''&&address.state===''&&address.landmark===''){
        setisNotAddress(!isNotAddress)
        console.log(isNotAddress,'bjhdsb');
      }
      console.log(isNotAddress,'sdb');

    },[userId,token,isNotEditable,navigate,refresh])
  return (
    <div>
      
        <div className='w-2/3 m-auto text-start p-10 mt-10 rounded-3xl'>

            <h1 className='font-semibold text-3xl text-center mb-10 '>Account Details</h1>
            <div className='flex flex-wrap justify-center gap-10'>




            {/* Personal Details Part */}

            { isPersonalEdit ? (

                  <div className='w-2/5 bg-green-100 p-5 rounded-3xl'>
                  <h1 className='font-medium text-2xl text-center mb-10 '>Update Personal Details</h1>
                  <form onSubmit={handleUpdatePersonal}>
                  <div className='pl-2 mb-3'><label  htmlFor="firstname">First Name</label></div>
                  <input type="text" onChange={handlePersonalChange} onKeyDown={(e) => /[0-9]/i.test(e.key) && e.preventDefault()} name='firstname' ref={inputRefFirstname} placeholder={profile.firstname} className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
                  <div className='pl-2 mb-3'><label  htmlFor="lastname">Last Name</label></div>
                  <input type="text" onChange={handlePersonalChange} onKeyDown={(e) => /[0-9]/i.test(e.key) && e.preventDefault()} name='lastname' placeholder={profile.lastname} className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
                  <div className='pl-2 mb-3'><label  htmlFor="number">Phone Number</label></div>
                  <input type="number" onChange={handlePersonalChange} name='number' placeholder={profile.number} className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
                  <div className='pl-2 mb-3'><label  htmlFor="email">Email</label></div>
                  <input type="email" onChange={handlePersonalChange} name='email' placeholder={profile.email} className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
                  <div className=' flex flex-wrap gap-2 justify-center'>
                    <input type="submit" value='Update' className='bg-green-500 ml-2 text-white py-2 px-4 rounded-xl h-fit'/>
                  <input type='button' value='Cancel' onClick={handleCancelEditPersonal} className='bg-white border text-black py-2 px-4 mr-2 rounded-xl h-fit'/>
                  </div>
                  </form>
                  </div>
            ) : (

           
            <div className='w-2/5 bg-green-100 p-5 rounded-3xl'>
            <h1 className='font-medium text-2xl text-center mb-10 '>Personal Details</h1>
            <div className='pl-2 mb-3'><label  htmlFor="firstname">First Name</label></div>
            <input type="text" value={profile.firstname} className=' w-full bg-white h-10 mb-5 rounded-lg border p-3' disabled />
            <div className='pl-2 mb-3'><label  htmlFor="lastname">Last Name</label></div>
            <input type="text" value={profile.lastname} className=' w-full bg-white h-10 mb-5 rounded-lg border p-3' disabled />
            <div className='pl-2 mb-3'><label  htmlFor="number">Phone Number</label></div>
            <input type="number" value={profile.number} className=' w-full bg-white h-10 mb-5 rounded-lg border p-3' disabled />
            <div className='pl-2 mb-3'><label  htmlFor="email">Email</label></div>
            <input type="email" value={profile.email} className=' w-full bg-white h-10 mb-5 rounded-lg border p-3' disabled />
            <div className='text-center'>
              <input type="submit" onClick={handleEditPersonal} value='Edit' className='bg-green-500 ml-2 text-white py-2 px-4 rounded-xl h-fit'/></div>
            </div>
 )}
            {/* Personal Details Part End*/}









            {/* Address Details Part */}

            { isNotAddress ? (

                  <div className='w-3/6 bg-green-100 rounded-3xl p-5'>
                  <h1 className='font-medium text-2xl text-center mb-10 '>Add Address Details</h1>
                  <form onSubmit={handleSubmit}>
                  <div className='flex flex-wrap gap-5'>
                      <div>
                  <div className='pl-2 mb-3'><label  htmlFor="pincode">Pincode</label></div>
                  <input type="number" ref={inputRef} onChange={handleChange} placeholder='Enter pincode' id='pincode' name='pincode' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
                  </div><div>
                  <div className='pl-2 mb-3'><label  htmlFor="city">City</label></div>
                  <input type="text" onChange={handleChange} placeholder='Enter city' id='city' name='city' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
                  </div>
                  </div>

                  <div className='flex flex-wrap gap-5'>
                  <div>
                  <div className='pl-2 mb-3'><label  htmlFor="district">District</label></div>
                  <input type="text" onChange={handleChange} placeholder='Enter district' id='district' name='district' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
                  </div><div>
                  <div className='pl-2 mb-3'><label  htmlFor="state">State</label></div>
                  <input type="text" onChange={handleChange} placeholder='Enter state' id='state' name='state' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
                  </div>
                  </div>

                  <div className='pl-2 mb-3 '><label  htmlFor="address">Address</label></div>
                  <textarea type="text" onChange={handleChange} placeholder='Enter address' id='address' name='address' className=' w-full bg-white h-16 mb-5 rounded-lg border p-3'  />
                  <div className='pl-2 mb-3 '><label  htmlFor="landmark">Landmark</label></div>
                  <textarea type="text" onChange={handleChange} placeholder='Enter landmark' id='landmark' name='landmark' className=' w-full bg-white h-16 mb-5 rounded-lg border p-3'  />
                  <div className='text-center'>
                  <input type='submit' value='Save' className='bg-green-500 ml-2 text-white py-2 px-4 rounded-xl h-fit'/></div>
                  </form>
                  </div>
            ):(

              <div>
            
            { isNotEditable ? (

                <div className='w-full bg-green-100 rounded-3xl p-5'>
                <h1 className='font-medium text-2xl text-center mb-10 '> Address Details</h1>
                <div className='flex flex-wrap gap-5'>
                    <div>
                <div className='pl-2 mb-3'><label  htmlFor="pincode">Pincode</label></div>
                <input type="number" onChange={handleChange} value={address.pincode} id='pincode' name='pincode' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  disabled/>
                </div><div>
                <div className='pl-2 mb-3'><label  htmlFor="city">City</label></div>
                <input type="text" onChange={handleChange} value={address.city} id='city' name='city' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3' disabled />
                </div>
                </div>

                <div className='flex flex-wrap gap-5'>
                    <div>
                <div className='pl-2 mb-3'><label  htmlFor="district">District</label></div>
                <input type="text" onChange={handleChange} value={address.district} id='district' name='district' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  disabled/>
                </div><div>
                <div className='pl-2 mb-3'><label  htmlFor="state">State</label></div>
                <input type="text" onChange={handleChange} value={address.state} id='state' name='state' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  disabled/>
                </div>
                </div>

                <div className='pl-2 mb-3 '><label  htmlFor="address">Address</label></div>
                <textarea type="text" onChange={handleChange} value={address.address} id='address' name='address' className=' w-full bg-white h-16 mb-5 rounded-lg border p-3' disabled />
                <div className='pl-2 mb-3 '><label  htmlFor="landmark">Landmark</label></div>
                <textarea type="text" onChange={handleChange} value={address.landmark} id='landmark' name='landmark' className=' w-full bg-white h-16 mb-5 rounded-lg border p-3' disabled />
                <div className='text-center'><button onClick={handleEdit} className='bg-green-500 text-white py-2 px-4  rounded-xl h-fit'>Edit</button></div>
                </div>

            ):(

            
            <div className='w-full bg-green-100 rounded-3xl p-5'>
            <h1 className='font-medium text-2xl text-center mb-10 '>Update Address Details</h1>
            <form onSubmit={handleUpdate}>
            <div className='flex flex-wrap gap-5'>
                <div>
            <div className='pl-2 mb-3'><label  htmlFor="pincode">Pincode</label></div>
            <input type="number" onChange={handleChange} ref={inputRef} placeholder={address.pincode} id='pincode' name='pincode' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
            </div><div>
            <div className='pl-2 mb-3'><label  htmlFor="city">City</label></div>
            <input type="text" onChange={handleChange} placeholder={address.city} id='city' name='city' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
            </div>
            </div>

            <div className='flex flex-wrap gap-5'>
                <div>
            <div className='pl-2 mb-3'><label  htmlFor="district">District</label></div>
            <input type="text" onChange={handleChange} placeholder={address.district} id='district' name='district' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
            </div><div>
            <div className='pl-2 mb-3'><label  htmlFor="state">State</label></div>
            <input type="text" onChange={handleChange} placeholder={address.state} id='state' name='state' className=' w-full bg-white h-10 mb-5 rounded-lg border p-3'  />
            </div>
            </div>

            <div className='pl-2 mb-3 '><label  htmlFor="address">Address</label></div>
            <textarea type="text" onChange={handleChange} placeholder={address.address} id='address' name='address' className=' w-full bg-white h-16 mb-5 rounded-lg border p-3'  />
            <div className='pl-2 mb-3 '><label  htmlFor="landmark">Landmark</label></div>
            <textarea type="text" onChange={handleChange} placeholder={address.landmark} id='landmark' name='landmark' className=' w-full bg-white h-16 mb-5 rounded-lg border p-3'  />
            <div className='flex flex-wrap gap-2 justify-center'>
            <input type='submit' value='Update' className='bg-green-500 ml-2 text-white cursor-pointer py-2 px-4 rounded-xl h-fit'/>
            <button onClick={handleCancel} className='bg-white border text-black py-2 px-4 mr-2 rounded-xl h-fit'>Cancel</button>
            </div>
            </form>
            </div>

)}
</div>
)}

            {/* Address Details Part End*/}



            </div>
        </div>
        
    </div>
  )
}

export default AccountCustomer
