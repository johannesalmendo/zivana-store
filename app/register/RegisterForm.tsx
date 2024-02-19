'use client'

import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues: {nama:"", email: "", password: "", },
    })

    const router = useRouter()

const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    setIsLoading(true)
    axios.post('/api/register', data).then(() =>{
        toast.success('Akun telah dibuat')

        signIn("credentials",{
            email: data.email,
            password: data.password,
            redirect: false,
        }).then((callback) => {
            if(callback?.ok){
                router.push('/cart')
                router.refresh()
                toast.success('Berhasil Masuk')
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    })
    .catch(() => toast.error('Terjadi Kesalahan'))
    .finally(() => {
        setIsLoading(false)
    })
}

    return ( 
        <>
        <Heading title="Daftar Akun"/>
        <Button outline label="Lanjut dengan Google" icon={AiOutlineGoogle} onClick={() =>{signIn("google")}}/>
        <hr className="bg-slate-300 w-full h-px" />
        <Input
        id="name"
        label="Nama Lengkap"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="email"
        label="Email"
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
        <Button 
        onClick={handleSubmit(onSubmit)} 
        label={isLoading ? "Loading" : "Daftar"}/>
        <p className="text-sm">
            Sudah punya akun?
            <Link className="underline text-blue-700" href='/login'> Login</Link>
        </p>
        </>
     );
}
 
export default RegisterForm;