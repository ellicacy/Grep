import { useParams } from "react-router-dom";
import PackForm from "./PackForm";
// import CategoryForm from "./CategoryForm";

export default function AjoutPack(){
//   const {idParam} = useParams();
//   console.log('idParam='+idParam)
  return (
    <div style={{ padding: '0 20px' }}>
      {/* <h1>user : {user.name} - role : {user.role}</h1> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <PackForm />
      </div>
    </div>
  )
}