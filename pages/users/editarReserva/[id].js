import React,{useState, useEffect} from 'react'
import { useRouter } from "next/router";
import useBranchData from '../../../Hooks/useBranchData';
import { useSelector } from 'react-redux';


const Edit = () => {
useBranchData()
const branches = useSelector((state) => state.branches)
const router = useRouter()
const { id } = router.query; // ID de la reserva 
const [newBranch, setNewBranch] = useState()
const [newDate, setNewDate] = useState()
const [newShift, setNewShift] = useState()
// const [booking, setBooking] = useState()

console.log("ID RESERVA", id)

// http://localhost:3000/api/shift/reserva/

const handlerUpdate = async () => {
    const response = fetch(`http://localhost:3000/api/shift/reserva/${id}`,
    {
     method: "PUT",
    }

    )
}

  return (
    <div>Edit</div>
  )
}

export default Edit