interface FooterListProps{
    children: React.ReactNode
}

const FooterList: React.FC<FooterListProps> = ({children}) => {
    return ( 
        <div className=" flex flex-col gap-2 w-full sm:w-1/2 md:w-1/4 lg:1/6 mb-6 ">
            {children}
        </div>
     );
}
 
export default FooterList;