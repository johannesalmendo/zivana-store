import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { FaWhatsapp,FaInstagram,FaFacebook } from "react-icons/fa6";

const Footer = () => {
    return ( 
        <footer className="bg-slate-600 text-slate-100 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Kategori</h3>
                        <Link href='#'>Peralatan Dapur</Link>
                        <Link href='#'>Barang Elektronik</Link>
                        <Link href='#'>Perlengkapan Kamar Tidur</Link>
                        <Link href='#'>Alat Pembersih</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">Tentang Kami</h3>
                        <p className="mb-2">Kami adalah toko grosir alat rumah tangga yang ada di Kota Bengkulu.
                        <br/>
                        Kami menyediakan semua produk yang anda cari dan inginkan.</p>
                    </div>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Kontak Kami</h3>
                        <div className="flex gap-2">
                        <Link href='#'>
                            <FaFacebook size={24}/>
                        </Link>
                        <Link href='#'>
                            <FaWhatsapp size={24}/>
                        </Link>
                        <Link href='#'>
                            <FaInstagram size={24}/>
                        </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
     );
}
 
export default Footer;