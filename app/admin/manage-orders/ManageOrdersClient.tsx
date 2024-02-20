/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { formatRupiah } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";

interface ManageOrdersClientProps{
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user : User
}

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({orders}) => {
    let rows: any = []
    const router = useRouter()

    if(orders){
        rows = orders.map((order) =>{
            return{
                id: order.id,
                customer: order.user.name,
                amount: formatRupiah(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliverStatus: order.deliveryStatus
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id',  headerName: 'ID', width: 220},
        { field: "customer", headerName: "Nama Customer", width: 130},
        { field: "amount", headerName: "Harga", width: 130, renderCell:(params) =>{
            return( 
            <div className="font-bold text-slate-800">
                {params.row.amount}
            </div>
            )
        },
        },
        // field Status Pembayaran
        { field: "paymentStatus", headerName: "Status Pembayaran", width: 150, renderCell:(params) =>{
            return( 
            <div className="">
                {params.row.paymentStatus == 'pending' ? (
                <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700"/>

                  ) : params.row.paymentStatus == 'complete' ? (
                <Status text="complete" icon={MdDone} bg="bg-green-200" color="text-green-700"/>
                  ) :(
                  <></>)}
            </div>
            )
        }},

        // field Status Pengiriman
        { field: "deliverStatus", headerName: "Status Pengiriman", width: 150, renderCell:(params) =>{
            return( 
            <div className="">
                {params.row.deliverStatus == 'pending' ? (
                <Status 
                text="Belum Dikirim" 
                icon={MdAccessTimeFilled} 
                bg="bg-slate-200" 
                color="text-slate-700"
                />
                ) : params.row.deliverStatus == 'dispatched' ? (
                <Status 
                text="Dalam Perjalanan" 
                icon={MdDeliveryDining} 
                bg="bg-purple-200" 
                color="text-purple-700"/>
                ) : params.row.deliverStatus == 'delivered' ?  (
                    <Status 
                    text="Sampai Tujuan" 
                    icon={MdDone} 
                    bg="bg-green-200" 
                    color="text-green-700"/>
                ) : <></>}
            </div>
            )
        },
    },    
        { field: "date", headerName: "Tanggal", width: 100},


        { field: "action", headerName: "Aksi", width: 200, renderCell:(params) =>{
            return( 
            <div className="flex justify-between gap-4 w-full">
                <ActionBtn icon={MdDeliveryDining} onClick={() => {
                    handleDispatch(params.row.id)
                }} />
                <ActionBtn icon={MdDone} onClick={() => {
                    handleDeliver(params.row.id)
                }} />
                <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                    router.push(`order/${params.row.id}`)
                }} />
            </div>
            )
        }},

    ] 

    const handleDeliver = useCallback((id: string) => { 
        axios.
        put("api/order",{
        id,
        deliveryStatus: 'delivered'
    }).then ((res)=>{
        toast.success("Orderan telah dikirim")
        router.refresh()
    }).catch((err) => {
        toast.error('Terjadi kesalahan')
        console.log(err)
        })
    }, [])

    const handleDispatch = useCallback((id: string) => { 
        axios.
        put("/api/order",{
        id,
        deliverStatus: 'dispatched'
    }).then ((res)=>{
        toast.success("Status Pengiriman telah berubah")
        router.refresh()
    }).catch((err) => {
        toast.error('Terjadi kesalahan')
        console.log(err)
        })
    }, [])

    return ( 
    <div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading title="Mengola Orderan" center/>
        </div>
        <div style={{ height: 600, width:"100%" }}>
        <DataGrid rows={rows} columns={columns} initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            />
        </div>
    </div>
    );
}
 
export default ManageOrdersClient;