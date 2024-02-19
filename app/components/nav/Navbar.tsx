import Link from "next/link";
import Container from "../Container";
import { Bricolage_Grotesque } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from '@/actions/getCurrentUser'

const fontBricolage = Bricolage_Grotesque({
    subsets: ['latin'], 
    weight:["700"]
})

const Navbar = async () => {
    const currentUser = await getCurrentUser()
    console.log("user <<<",currentUser)
    return ( 
    <div className="sticky top-0 w-full bg-slate-600 z-30 shadow-sm text-slate-100">
        <div className="py-4 border-b-[1px]">
            <Container >
                <div className="flex items-center justify-between gap-3 md:gap-0">
                    <Link href="/" className={`${fontBricolage.className} font-bold text-2xl`}>
                        Zivana
                    </Link>
                    <div className="hidden md:block">Search</div>
                    <div className="flex items-center gap-8 md:gap-10">
                        <CartCount/>
                        <UserMenu currentUser = {currentUser} />
                    </div>
                </div>
            </Container>
        </div>
    </div> 
    );
}
 
export default Navbar;