'use client'

import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import toast from "react-hot-toast";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";



interface LoginFormProps{
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues: {email: "", password: "", },
    })

    dotSpinner.register()
    const router = useRouter()
    
    useEffect (() => {
        if(currentUser){
            router.push('/')
            router.refresh()
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
    signIn('credentials',{
        ...data,
        redirect: false,
    })
    .then((callback) => {
        setIsLoading(false);
        if(callback?.ok){
            router.push('/')
            router.refresh()
            toast.success('Berhasil Masuk')
        }

        if(callback?.error){
            toast.error(callback.error)
        }
    })
}

    if (currentUser) {
        return <l-dot-spinner size="40" speed="0.9"  color="green" ></l-dot-spinner>
    }

    return ( 
        <>
        <Heading title="Login"/>
        <Button outline label="Lanjut dengan Google" icon={AiOutlineGoogle} onClick={() =>{signIn("google")}}/>
        <hr className="bg-slate-300 w-full h-px" />
        <Input
        id="email"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        />
        <Button onClick={handleSubmit(onSubmit)} label={isLoading ? "Loading" : "Login"}/>
        <p className="text-sm">
            Belum punya akun?
            <Link className="underline text-blue-700" href='/register'> Daftar</Link>
        </p>
        </>
     );
}
 
export default LoginForm;