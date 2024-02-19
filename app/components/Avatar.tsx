import Image from "next/image";
import { LuUserCircle2 } from "react-icons/lu";

interface AvatarProps{
    src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
    if(src){
        return (<Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height="30"
        width="30"
        />)
    }
    return ( 
        <LuUserCircle2 size={22}/>
     );
}
 
export default Avatar;
