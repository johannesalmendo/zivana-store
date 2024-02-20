/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { formatRupiah } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductsClientProps{
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({products}) => {
    let rows: any = []
    const router = useRouter()
    const storage = getStorage(firebaseApp)

    if(products){
        rows = products.map((product) =>{
            return{
                id: product.id,
                name: product.name,
                price: formatRupiah(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id',  headerName: 'ID', width: 220},
        { field: "name", headerName: "Nama Produk", width: 220},
        { field: "price", headerName: "Harga", width: 100, renderCell:(params) =>{
            return( 
            <div className="font-bold text-slate-800">
                {params.row.price}
            </div>
            )
        },
    },
        { field: "category", headerName: "Kategori", width: 100},
        { field: "brand", headerName: "Nama Brand", width: 100},
        { field: "inStock", headerName: "inStock", width: 150, renderCell:(params) =>{
            return( 
            <div className="">
                {params.row.inStock == true ? (
                <Status text="Stok Masih Ada" icon={MdDone} bg="bg-teal-200" color="text-teal-700"/>
                  ): (
                <Status text="Stok Habis" icon={MdClose} bg="bg-rose-200" color="text-rose-700"/>
                  )}
            </div>
            )
        }},
        { field: "action", headerName: "Aksi", width: 200, renderCell:(params) =>{
            return( 
            <div className="flex justify-between gap-4 w-full">
                <ActionBtn icon={MdCached} onClick={() => {
                    handleToogleStock(params.row.id, params.row.inStock)
                }} />
                <ActionBtn icon={MdDelete} onClick={() => {
                    handleDelete(params.row.id, params.row.images)
                }} />
                <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                    router.push(`product/${params.row.id}`)
                }} />
            </div>
            )
        }},

    ] 

    const handleToogleStock = useCallback((id: string, inStock: boolean) => { 
        axios.
        put("/api/product",{
        id,
        inStock: !inStock  
    }).then ((res)=>{
        toast.success("Status Produk telah berubah")
        router.refresh()
    }).catch((err) => {
        toast.error('Terjadi kesalahan')
        console.log(err)
        })
    }, [])

    const handleDelete = useCallback(async (id: string, images:any[]) => {
        toast("Tunggu Sebentar")

        const handleImageDelete = async() =>{
            try{
                for(const item of images){
                    if(item.image){
                        const imageRef = ref(storage, item.image)
                        await deleteObject(imageRef)
                        console.log("gambar terhapus", item.image)
                    }
                }
            } catch (error){
                return console.log("Terjadi error saat menghapus gambar")
            }
        }

        await handleImageDelete()
        axios.delete(`/api/product/${id}`).then(
            (res)=>{
                toast.success("Produk telah terhapus")
                router.refresh()
        }).catch((err) => {
            toast.error('gagal menghapus produk')
            console.log(err)
        })
    }, [])

    return ( 
    <div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading title="Mengola Produk" center/>
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
 
export default ManageProductsClient;