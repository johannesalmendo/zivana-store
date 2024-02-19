import { MdStorefront } from "react-icons/md";
import { BiRestaurant } from "react-icons/bi";
import { BiPlug } from "react-icons/bi";
import { BiSolidBed } from "react-icons/bi";
import { BiSolidBrushAlt } from "react-icons/bi";

export const categories = [
    {
        label: "Semua", 
        icon: MdStorefront
    },
    {
        label: "Peralatan Dapur",
        icon: BiRestaurant
    },
    {
        label: "Barang Elektronik",
        icon: BiPlug
    },
    {
        label: "Barang Ruang Tidur",
        icon: BiSolidBed
    },
    {
        label: "Alat Pembersih",
        icon: BiSolidBrushAlt
    },
]