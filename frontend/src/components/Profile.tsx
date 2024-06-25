// import React, { useState } from 'react'
// import { storage } from '../Firebaseconfig';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// const Profile = () => {

//     const [img,setImg] = useState(null);
//     const [showimg,setShowimg]= useState('/src/assets/default.png')

//     const uploadNow   = async() => {
//             if(img == null) return ;
//             const spaceRef = ref(storage,`/mainimages/`);
//             console.log('ref is =',spaceRef);

//             await uploadBytes(spaceRef,img).then((c) => {
//                 console.log('file uploaded Done');
//             })

//             const imgurl = await getDownloadURL(spaceRef);
//             console.log('url is =',imgurl);
//             setImg(null);
//     }

//     const changenow = (e:any) => {
//         setImg(e.target.files[0]);
//         setShowimg(URL.createObjectURL(e.target.files[0]));
//     }

//   return (
//     <div>
//         <div style = {{margin :'4%'}}>
//                 <label> Upload Image </label>
//                 <input  type = "file" 
//                  onChange={(e) => changenow(e)}
//                 />
//                 <button onClick={uploadNow}> Upload Now </button>
//         </div>

//         <div>
//             <h3> Image is = </h3>
//         <div>
//             <img src = {showimg}
//             style = {{width:'25%',height:'15%',objectFit:'cover'}} />
//         </div>
//         </div>
//     </div>  
//   )
// }

// export default Profile