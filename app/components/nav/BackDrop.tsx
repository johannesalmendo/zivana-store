interface BackDropProps {
    onClick: () => void
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
    return ( 
        <div 
        onClick={onClick} 
        className="z-20 bg-slate-200 opacity-50 fixed w-screen h-screen top-0 left-0 backdrop-blur">
        </div>
     );
}
 
export default BackDrop;